package xor_gate

import (
	"encoding/json"
	"fmt"
	"math/rand"

	log "github.com/golang/glog"

	"gomind_runner/gomind"
)

func Train() ([]byte, error) {
	log.Info("Training for XOR Gate")
	trainingSet := [][][]float64{
		[][]float64{[]float64{0, 0}, []float64{0}},
		[][]float64{[]float64{0, 1}, []float64{1}},
		[][]float64{[]float64{1, 0}, []float64{1}},
		[][]float64{[]float64{1, 1}, []float64{0}},
	}

	mind, err := gomind.New(&gomind.ModelConfiguration{
		NumberOfInputs:                    2,
		NumberOfOutputs:                   1,
		NumberOfHiddenLayerNeurons:        16,
		HiddenLayerActivationFunctionName: "relu",
		OutputLayerActivationFunctionName: "sigmoid",
	})
	if err != nil {
		return nil, fmt.Errorf("unable to train. %v", err)
	}

	graphData := make(map[string][]float64)
	var errors []float64
	var targets []float64
	var actuals []float64

	// mind.Describe()
	// log.Info("==================================================================")

	for i := 0; i < 500; i++ {
		rand := rand.Intn(4)
		input := trainingSet[rand][0]
		output := trainingSet[rand][1]

		if err := mind.LearnSample(input, output); err != nil {
			return nil, fmt.Errorf("error while learning from sample input: %v, target: %v. %v", input, output, err)
		}

		actual := mind.LastOutput()
		outputError, err := mind.CalculateError(output)
		if err != nil {
			mind.Describe(true)
			return nil, fmt.Errorf("error while calculating error for input: %v, target: %v and actual: %v. %v", input, output, actual, err)
		}
		// outputAccuracy, err := mind.CalculateAccuracy(output)
		// if err != nil {
		// 	mind.Describe(true)
		// 	return nil, fmt.Errorf("error while calculating error for input: %v, target: %v and actual: %v. %v", input, output, actual, err)
		// }

		// log.Infof("Index: %v, Input: %v, Target: %v, Actual: %v, Error: %v, Accuracy: %v\n", i, input, output, actual, outputError, outputAccuracy)

		errors = append(errors, outputError)
		targets = append(targets, output...)
		actuals = append(actuals, actual...)
	}

	// log.Info("==================================================================")
	mind.Describe(false)

	graphData["errors"] = errors
	graphData["targets"] = targets
	graphData["actuals"] = actuals

	return json.Marshal(graphData)
}
