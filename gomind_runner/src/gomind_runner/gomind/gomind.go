// Package gomind for a simple Multi Layer Perceptron (MLP) Feed Forward Artificial Neural Network library.
package gomind

import (
	"errors"
	"fmt"
	"math/rand"
	"strings"
	"time"

	"gomind_runner/gomind/activation"
	"gomind_runner/gomind/network"
)

const (
	DEFAULT_HIDDEN_LAYER_ACTIVATION_FUNCTION_REGRESSION = "LEAKY_RELU"
	DEFAULT_OUTPUT_LAYER_ACTIVATION_FUNCTION_REGRESSION = "SIGMOID"
)

type Model struct {
	numberOfInputs                    int
	numberOfHiddenNeurons             int
	hiddenLayerActivationFunctionName string
	numberOfOutputs                   int
	outputLayerActivationFunctionName string
	modelType                         string
	learningRate                      float64
	network                           *network.NeuralNetwork
}

type ModelConfiguration struct {
	NumberOfInputs                    int    // mandatory
	NumberOfOutputs                   int    // mandatory
	ModelType                         string // mandatory
	NumberOfHiddenLayerNeurons        int
	LearningRate                      float64
	HiddenLayerActivationFunctionName string
	OutputLayerActivationFunctionName string
}

var (
	modelTypes = []string{"REGRESSION"}
)

// LearnSample function trains the neural network using the given input/output sample.
func (model *Model) LearnSample(input, output []float64) error {
	// fmt.Println("sampleInput: ", input)
	// fmt.Println("========== calculating output")
	outputs := model.network.CalculateOutput(input)
	// fmt.Println(outputs)
	if err := model.network.CalculateNewOutputLayerWeights(outputs, output); err != nil {
		return err
	}
	if err := model.network.CalculateNewHiddenLayerWeights(); err != nil {
		return err
	}
	model.network.UpdateWeights()
	return nil
}

// LastOutput function returns the last output of the network.
func (model *Model) LastOutput() []float64 {
	return model.network.LastOutput()
}

// CalculateError function generates the error value for the given target output against the network's last output.
func (model *Model) CalculateError(targetOutput []float64) (float64, error) {
	return model.network.CalculateError(targetOutput)
}

// Describe function prints the current state of the neural network and its components.
func (model *Model) Describe(showNeurons bool) {
	fmt.Println(fmt.Sprintf("Input Layer: (No of nodes: %v)", model.numberOfInputs))
	fmt.Println(fmt.Sprintf("Hidden Layer: (No of neurons: %v, Activation Function: %v)", len(model.network.HiddenLayer().Neurons()), model.network.HiddenLayer().Activation().Name()))
	if showNeurons == true {
		model.network.HiddenLayer().Describe()
	}
	fmt.Println(fmt.Sprintf("Output Layer: (No of neurons: %v, Activation Function: %v))", len(model.network.OutputLayer().Neurons()), model.network.OutputLayer().Activation().Name()))
	if showNeurons == true {
		model.network.OutputLayer().Describe()
	}
}

// estimateIdealNumberOfHiddenLayerNeurons function attempts to estimate the ideal number of neural networks in the hidden layer
// of the network for a given number of inputs and outputs.
func estimateIdealNumberOfHiddenLayerNeurons(numberOfInputs, numberOfOutputs int) int {
	var possibleResults []int
	twoThirdRule := ((numberOfInputs * 2) / 3) + numberOfOutputs
	possibleResults = append(possibleResults, twoThirdRule)
	if len(possibleResults) == 1 && possibleResults[0] < 2*numberOfInputs {
		if numberOfInputs < numberOfOutputs && numberOfInputs <= possibleResults[0] && possibleResults[0] <= numberOfOutputs {
			return possibleResults[0]
		} else if numberOfOutputs < numberOfInputs && numberOfOutputs <= possibleResults[0] && possibleResults[0] <= numberOfInputs {
			return possibleResults[0]
		} else if numberOfOutputs == numberOfInputs {
			return possibleResults[0]
		}
	}
	return numberOfInputs
}

func validModelType(name string) string {
	name = strings.Replace(strings.TrimSpace(strings.ToUpper(name)), " ", "", -1)
	for _, modelType := range modelTypes {
		if modelType == name {
			return modelType
		}
	}
	return ""
}

func New(configuration *ModelConfiguration) (*Model, error) {
	fmt.Println("Initializing new Neural Network!")
	// setting timestamp as seed for random number generator.
	rand.Seed(time.Now().UnixNano())

	model := &Model{}

	if configuration.NumberOfInputs == 0 {
		return nil, errors.New("NumberOfInputs field in ModelConfiguration is a mandatory field which cannot be zero.")
	}
	model.numberOfInputs = configuration.NumberOfInputs

	if configuration.NumberOfOutputs == 0 {
		return nil, errors.New("NumberOfOutputs field in ModelConfiguration is a mandatory field which cannot be zero.")
	}
	model.numberOfOutputs = configuration.NumberOfOutputs

	model.modelType = validModelType(configuration.ModelType)
	if model.modelType == "" {
		return nil, fmt.Errorf("invalid neural network model type: %v. Model type should be amongst: %v", configuration.ModelType, modelTypes)
	}

	model.learningRate = 0.5
	if configuration.LearningRate != 0 {
		if configuration.LearningRate < 0 || configuration.LearningRate > 1 {
			return nil, errors.New("LearningRate cannot be less than 0 or greater than 1.")
		}
		model.learningRate = configuration.LearningRate
	}

	model.numberOfHiddenNeurons = configuration.NumberOfHiddenLayerNeurons
	if model.numberOfHiddenNeurons == 0 {
		model.numberOfHiddenNeurons = estimateIdealNumberOfHiddenLayerNeurons(model.numberOfInputs, model.numberOfOutputs)
		fmt.Println("Estimated Ideal Number Of Hidden Layer Neurons: ", model.numberOfHiddenNeurons)
	}

	model.hiddenLayerActivationFunctionName = activation.ValidFunction(configuration.HiddenLayerActivationFunctionName)
	if model.hiddenLayerActivationFunctionName == "" {
		model.hiddenLayerActivationFunctionName = DEFAULT_HIDDEN_LAYER_ACTIVATION_FUNCTION_REGRESSION
		fmt.Println("Estimated Ideal Activation Function for Hidden Layer Neurons: ", model.hiddenLayerActivationFunctionName)
	}

	model.outputLayerActivationFunctionName = activation.ValidFunction(configuration.OutputLayerActivationFunctionName)
	if model.hiddenLayerActivationFunctionName == "" {
		model.outputLayerActivationFunctionName = DEFAULT_OUTPUT_LAYER_ACTIVATION_FUNCTION_REGRESSION
		fmt.Println("Estimated Ideal Activation Function for Output Layer Neurons: ", model.outputLayerActivationFunctionName)
	}

	neuralNetwork, err := network.New(model.numberOfInputs, model.numberOfHiddenNeurons, model.numberOfOutputs, model.learningRate, model.hiddenLayerActivationFunctionName, model.outputLayerActivationFunctionName)
	if err != nil {
		return nil, fmt.Errorf("error creating a neural network: %v", err)
	}
	model.network = neuralNetwork

	return model, nil
}