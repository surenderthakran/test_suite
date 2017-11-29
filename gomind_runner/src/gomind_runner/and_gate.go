package main

import (
	"encoding/json"
	// "math/rand"

	log "github.com/golang/glog"
	"gomind_runner/gomind"
)

func trainAndGate(mind *gomind.NeuralNetwork) ([]byte, error) {
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

	mind.Describe()
	log.Info("==================================================================")

	for i := 0; i < 1; i++ {
		// rand := rand.Intn(4)
		input := trainingSet[1][0]
		output := trainingSet[1][1]

		mind.Train(input, output)
		// log.Infof("actual: %v", mind.LastOutput())
		outputError := mind.CalculateError(output)
		// log.Infof("error: %v", outputError)

		errors = append(errors, outputError)
		targets = append(targets, output...)
		actuals = append(actuals, mind.LastOutput()...)
	}

	log.Info("==================================================================")
	mind.Describe()

	graphData["errors"] = errors
	graphData["targets"] = targets
	graphData["actuals"] = actuals

	return json.Marshal(graphData)
}
