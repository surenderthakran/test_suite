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
	filePath      = "src/gomind_runner/data/concrete_compressive_strength.csv"
)

// createNormalizer creates a 2D normalizer array which for all 9 attributes
// stores their min and max value and also a difference of max - min.
func createNormalizer() {
	log.Info("Normalizing training data..")
	file, err := os.Open(filePath)
	if err != nil {
		log.Errorf("error reading csv file: %v", err)
		return
	}

	reader := csv.NewReader(bufio.NewReader(file))

	normalizer = [][]float64{}
	for i := 0; i < 9; i++ {
		normalizer = append(normalizer, []float64{1000, 0, 1000})
	}

	for {
		line, error := reader.Read()
		if error == io.EOF {
			break
		} else if error != nil {
			log.Fatal(error)
			break
		}

		for i := 0; i < 9; i++ {
			val, err := strconv.ParseFloat(line[i], 64)
			if err != nil {
				log.Errorf("unable to parse: %v as float64", line[i])
				break
			}

			if val < normalizer[i][0] {
				normalizer[i][0] = val
			} else if val > normalizer[i][1] {
				normalizer[i][1] = val
			}

			normalizer[i][2] = normalizer[i][1] - normalizer[i][0]
		}
	}
}

// normalizeValue normalizes a value from a set using the following equation:
// normalizedValue = (Value - MinValue)/(MaxValue - MinValue)
// The goal is to have all the values in the range of 0 to 1.
func normalizeValue(val float64, index int) float64 {
	new := (val - normalizer[index][0]) / normalizer[index][2]
	return new
}

func trainConcreteCompressiveStrength() ([]byte, error) {
	log.Info("Training for Concrete Compressive Strength")
	mind, err := gomind.New(&gomind.ModelConfiguration{
		NumberOfInputs:  8,
		NumberOfOutputs: 1,
		ModelType:       "regression",
	})
	if err != nil {
		return nil, fmt.Errorf("unable to train: %v", err)
	}

	csvFile, err := os.Open(filePath)
	if err != nil {
		return nil, fmt.Errorf("error reading csv file: %v", err)
	}

	if normalizeData {
		createNormalizer()
	}

	reader := csv.NewReader(bufio.NewReader(csvFile))

	graphData := make(map[string][]float64)
	var errors []float64
	var targets []float64
	var actuals []float64

	counter := float64(0)

	for {
		line, error := reader.Read()
		if error == io.EOF {
			break
		} else if error != nil {
			log.Fatal(error)
			break
		}

		// log.Info("==================================================")
		// log.Info(line)

		cement, err := strconv.ParseFloat(line[0], 64)
		if err != nil {
			log.Errorf("unable to parse: %v as float64", line[0])
			break
		}
		slag, err := strconv.ParseFloat(line[1], 64)
		if err != nil {
			log.Errorf("unable to parse: %v as float64", line[1])
			break
		}
		ash, err := strconv.ParseFloat(line[2], 64)
		if err != nil {
			log.Errorf("unable to parse: %v as float64", line[2])
			break
		}
		water, err := strconv.ParseFloat(line[3], 64)
		if err != nil {
			log.Errorf("unable to parse: %v as float64", line[3])
			break
		}
		plasticizer, err := strconv.ParseFloat(line[4], 64)
		if err != nil {
			log.Errorf("unable to parse: %v as float64", line[4])
			break
		}
		coarse, err := strconv.ParseFloat(line[5], 64)
		if err != nil {
			log.Errorf("unable to parse: %v as float64", line[5])
			break
		}
		fine, err := strconv.ParseFloat(line[6], 64)
		if err != nil {
			log.Errorf("unable to parse: %v as float64", line[6])
			break
		}
		age, err := strconv.ParseFloat(line[7], 64)
		if err != nil {
			log.Errorf("unable to parse: %v as float64", line[7])
			break
		}

		var input []float64
		if normalizeData {
			// we normalize all values so that they are between 0 and 1.
			input = append(input, normalizeValue(cement, 0), normalizeValue(slag, 1), normalizeValue(ash, 2), normalizeValue(water, 3), normalizeValue(plasticizer, 4), normalizeValue(coarse, 5), normalizeValue(fine, 6), normalizeValue(age, 7))
		} else {
			input = append(input, cement, slag, ash, water, plasticizer, coarse, fine, age)
		}

		strength, err := strconv.ParseFloat(line[8], 64)
		if err != nil {
			log.Errorf("unable to parse: %v as float64", line[8])
			break
		}

		var output []float64
		if normalizeData {
			// we normalize the output so that it is between 0 and 1.
			output = []float64{normalizeValue(strength, 8)}
		} else {
			output = []float64{strength}
		}

		mind.Train(input, output)

		outputError := mind.CalculateError(output)
		actual := mind.LastOutput()

		// fmt.Printf("Index: %v, Target: %v, Actual: %v, Error: %v \n", counter, output, actual, outputError)
		// fmt.Printf("Index: %v, Input: %v, Target: %v, Actual: %v, Error: %v \n", counter, input, output, actual, outputError)

		errors = append(errors, outputError)
		targets = append(targets, output...)
		actuals = append(actuals, actual...)

		counter++
	}

	// mind.Describe()

	graphData["errors"] = errors
	graphData["targets"] = targets
	graphData["actuals"] = actuals

	return json.Marshal(graphData)
}
