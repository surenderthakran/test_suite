package main

import (
	"bufio"
	"encoding/csv"
	"encoding/json"
	"fmt"
	"io"
	"os"
	"strconv"

	log "github.com/golang/glog"

	"gomind_runner/gomind"
)

var (
	normalizeData = true
	normalizer    [][]float64
	trainingSet   [][]float64
	filePath      = "src/gomind_runner/data/concrete_compressive_strength.csv"
)

// Training data attributes:
// cement, slag, ash, water, plasticizer, coarse, fine, age, strength

func trainConcreteCompressiveStrength() ([]byte, error) {
	log.Info("Training for Concrete Compressive Strength")
	if err := readTrainingSet(); err != nil {
		return nil, fmt.Errorf("unable to train: %v", err)
	}

	if normalizeData {
		normalizeTrainingSet()
	}

	mind, err := gomind.New(&gomind.ModelConfiguration{
		NumberOfInputs:                    8,
		NumberOfOutputs:                   1,
		ModelType:                         "regression",
		HiddenLayerActivationFunctionName: "leaky_relu",
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

		mind.Train(input, output)

		outputError, err := mind.CalculateError(output)
		if err != nil {
			return nil, fmt.Errorf("error while training: %v", err)
		}
		actual := mind.LastOutput()

		fmt.Printf("Index: %v, Target: %v, Actual: %v, Error: %v \n", counter, output, actual, outputError)
		// fmt.Printf("Index: %v, Input: %v, Target: %v, Actual: %v, Error: %v \n", counter, input, output, actual, outputError)

		errors = append(errors, outputError)
		targets = append(targets, output...)
		actuals = append(actuals, actual...)
	}

	mind.Describe(true)

	graphData["errors"] = errors
	graphData["targets"] = targets
	graphData["actuals"] = actuals

	return json.Marshal(graphData)
}

func readTrainingSet() error {
	log.Info("Reading training set")
	file, err := os.Open(filePath)
	if err != nil {
		return fmt.Errorf("error reading csv file: %v", err)
	}

	reader := csv.NewReader(bufio.NewReader(file))

	// A 2D normalizer array which for all 9 attributes, stores
	// their min value, max value and difference of max - min.
	normalizer = [][]float64{}
	for i := 0; i < 9; i++ {
		// Used 1000 as the initial value for max value and difference
		// since no value in the trainingSet is larger than it.
		normalizer = append(normalizer, []float64{1000, 0, 1000})
	}

	trainingSet = [][]float64{}

	for {
		line, error := reader.Read()
		if error == io.EOF {
			break
		} else if error != nil {
			log.Fatal(error)
			break
		}

		var dataPoint []float64

		for i := 0; i <= 8; i++ {
			val, err := strconv.ParseFloat(line[i], 64)
			if err != nil {
				log.Errorf("unable to parse: %v as float64", line[i])
				break
			}

			dataPoint = append(dataPoint, val)

			if normalizeData {
				if val < normalizer[i][0] {
					normalizer[i][0] = val
				} else if val > normalizer[i][1] {
					normalizer[i][1] = val
				}

				normalizer[i][2] = normalizer[i][1] - normalizer[i][0]
			}
		}
		trainingSet = append(trainingSet, dataPoint)
	}
	return nil
}

func normalizeTrainingSet() {
	log.Info("Normalizing training set")
	for _, dataPoint := range trainingSet {
		for j, value := range dataPoint {
			dataPoint[j] = normalizeValue(value, j)
		}
	}
	log.Info("Normalized training set")
}

// normalizeValue normalizes a value from a set using the following equation:
// normalizedValue = (Value - MinValue)/(MaxValue - MinValue)
// The goal is to have all the values in the range of 0 to 1.
func normalizeValue(val float64, index int) float64 {
	new := (val - normalizer[index][0]) / normalizer[index][2]
	return new
}
