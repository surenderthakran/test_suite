package concrete_compressive_strength

import (
	"bufio"
	"encoding/csv"
	"encoding/json"
	"fmt"
	"io"
	"os"
	"strconv"

	log "github.com/golang/glog"

	"gomind_runner/common"
	"gomind_runner/gomind"
)

var (
	normalizeData = true
	filePath      = "src/gomind_runner/trainers/concrete_compressive_strength/concrete_compressive_strength.csv"
)

// Training data attributes:
// cement, slag, ash, water, plasticizer, coarse, fine, age, strength

func Train() ([]byte, error) {
	log.Info("Training for Concrete Compressive Strength")
	trainingSet, err := readTrainingSet()
	if err != nil {
		return nil, fmt.Errorf("unable to train: %v", err)
	}

	if normalizeData {
		trainingSet, err = common.LinearScale(trainingSet, "0to1")
		// trainingSet, err = common.GaussianNormalization(trainingSet)
		if err != nil {
			return nil, fmt.Errorf("unable to train: %v", err)
		}
	}

	mind, err := gomind.New(&gomind.ModelConfiguration{
		NumberOfInputs:  8,
		NumberOfOutputs: 1,
		// NumberOfHiddenLayerNeurons:        10,
		ModelType:                         "regression",
		LearningRate:                      0.3,
		HiddenLayerActivationFunctionName: "relu",
		OutputLayerActivationFunctionName: "sigmoid",
	})
	if err != nil {
		return nil, fmt.Errorf("unable to train: %v", err)
	}

	graphData := make(map[string][]float64)
	var errors []float64
	var targets []float64
	var actuals []float64

	for counter, dataPoint := range trainingSet {
		input := dataPoint[:8]
		output := dataPoint[8:]

		if err := mind.LearnSample(input, output); err != nil {
			return nil, fmt.Errorf("error while learning from sample input: %v, target: %v. %v", input, output, err)
		}

		actual := mind.LastOutput()
		outputError, err := mind.CalculateError(output)
		if err != nil {
			mind.Describe(true)
			return nil, fmt.Errorf("error while calculating error for input: %v, target: %v and actual: %v. %v", input, output, actual, err)
		}

		fmt.Printf("Index: %v, Target: %v, Actual: %v, Error: %v \n", counter, output, actual, outputError)
		// fmt.Printf("Index: %v, Input: %v, Target: %v, Actual: %v, Error: %v \n", counter, input, output, actual, outputError)

		// errors = append(errors, outputError)
		// targets = append(targets, output...)
		// actuals = append(actuals, actual...)

		if counter > 3 {
			errors = append(errors, outputError)
			targets = append(targets, output...)
			actuals = append(actuals, actual...)
		}
	}

	mind.Describe(true)

	graphData["errors"] = errors
	graphData["targets"] = targets
	graphData["actuals"] = actuals

	return json.Marshal(graphData)
}

func readTrainingSet() ([][]float64, error) {
	log.Info("Reading training set")
	trainingSet := [][]float64{}

	file, err := os.Open(filePath)
	if err != nil {
		return trainingSet, fmt.Errorf("error reading csv file: %v", err)
	}

	reader := csv.NewReader(bufio.NewReader(file))

	for {
		line, error := reader.Read()
		if error == io.EOF {
			break
		} else if error != nil {
			log.Fatal(error)
			break
		}

		var dataPoint []float64

		for i := 0; i < 9; i++ {
			val, err := strconv.ParseFloat(line[i], 64)
			if err != nil {
				log.Errorf("unable to parse: %v as float64", line[i])
				break
			}

			dataPoint = append(dataPoint, val)
		}
		trainingSet = append(trainingSet, dataPoint)
	}
	return trainingSet, nil
}
