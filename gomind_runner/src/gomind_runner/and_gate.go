package main

import (
	"encoding/json"
	"math/rand"

	log "github.com/golang/glog"

	"gomind_runner/gomind"
)

func trainAndGate() ([]byte, error) {
	log.Info("Training for AND Gate")
	mind, err := gomind.New(&gomind.ModelConfiguration{
		NumberOfInputs:                    2,
		NumberOfOutputs:                   1,
		ModelType:                         "regression",
		HiddenLayerActivationFunctionName: "sigmoid",
	})
	if err != nil {
		log.Info(err)
		return nil, err
	}

	graphData := make(map[string][]float64)
	var errors []float64
	var targets []float64
	var actuals []float64

	trainingSet := [][][]float64{
		[][]float64{[]float64{0, 0}, []float64{0}},
		[][]float64{[]float64{0, 1}, []float64{1}},
		[][]float64{[]float64{1, 0}, []float64{1}},
		[][]float64{[]float64{1, 1}, []float64{0}},
	}

	// mind.Describe()
	// log.Info("==================================================================")

	for i := 0; i < 10000; i++ {
		rand := rand.Intn(4)
		input := trainingSet[rand][0]
		output := trainingSet[rand][1]

		mind.Train(input, output)

		error := mind.CalculateError(output)
		actual := mind.LastOutput()

		// log.Infof("Index: %v, Input: %v, Target: %v, Actual: %v, Error: %v \n", i, input, output, actual, error)

		errors = append(errors, error)
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
