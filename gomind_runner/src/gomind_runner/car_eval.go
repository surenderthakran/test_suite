package main

import (
	"bufio"
	"encoding/csv"
	"io"
	"os"

	log "github.com/golang/glog"
	"gomind_runner/gomind"
)

func trainCarEvaluation(mind *gomind.NeuralNetwork) {
	log.Info("inside trainCarEvaluation()")
	csvFile, err := os.Open("src/gomind_runner/data/car_eval.csv")
	if err != nil {
		log.Errorf("error reading csv file: %v", err)
		return
	}

	reader := csv.NewReader(bufio.NewReader(csvFile))

	buyingMap := make(map[string]int)
	buyingMap["low"] = 0
	buyingMap["med"] = 1
	buyingMap["high"] = 2
	buyingMap["vhigh"] = 3

	maintMap := make(map[string]int)
	maintMap["low"] = 0
	maintMap["med"] = 1
	maintMap["high"] = 2
	maintMap["vhigh"] = 3

	doorsMap := make(map[string]int)
	doorsMap["2"] = 0
	doorsMap["3"] = 1
	doorsMap["4"] = 2
	doorsMap["5more"] = 3

	personsMap := make(map[string]int)
	personsMap["2"] = 0
	personsMap["4"] = 1
	personsMap["more"] = 2

	bootMap := make(map[string]int)
	bootMap["small"] = 0
	bootMap["med"] = 1
	bootMap["big"] = 2

	safetyMap := make(map[string]int)
	safetyMap["low"] = 0
	safetyMap["med"] = 1
	safetyMap["high"] = 2

	carMap := make(map[string]int)
	carMap["unacc"] = 0
	carMap["acc"] = 1
	carMap["good"] = 2
	carMap["vgood"] = 3

	mind.Describe()

	for {
		line, error := reader.Read()
		if error == io.EOF {
			break
		} else if error != nil {
			log.Fatal(error)
		}

		if line[6] == "unacc" {
			continue
		}

		log.Info("========================================================")
		log.Info(line)

		buyingInput := []float64{0, 0, 0, 0}
		buyIndex, ok := buyingMap[line[0]]
		if ok == false {
			log.Errorf("unrecognized value for buying: %v", line[0])
			break
		}
		buyingInput[buyIndex] = 1
		// log.Infof("buying: %v", line[0])
		// log.Info(buyingInput)

		maintInput := []float64{0, 0, 0, 0}
		maintIndex, ok := maintMap[line[1]]
		if ok == false {
			log.Errorf("unrecognized value for maint: %v", line[1])
			break
		}
		maintInput[maintIndex] = 1
		// log.Infof("maint: %v", line[1])
		// log.Info(maintInput)

		doorsInput := []float64{0, 0, 0, 0}
		doorsIndex, ok := doorsMap[line[2]]
		if ok == false {
			log.Errorf("unrecognized value for doors: %v", line[2])
			break
		}
		doorsInput[doorsIndex] = 1
		// log.Infof("doors: %v", line[2])
		// log.Info(doorsInput)

		personsInput := []float64{0, 0, 0}
		personsIndex, ok := personsMap[line[3]]
		if ok == false {
			log.Errorf("unrecognized value for persons: %v", line[3])
			break
		}
		personsInput[personsIndex] = 1
		// log.Infof("persons: %v", line[3])
		// log.Info(personsInput)

		bootInput := []float64{0, 0, 0}
		bootIndex, ok := bootMap[line[4]]
		if ok == false {
			log.Errorf("unrecognized value for boot: %v", line[4])
			break
		}
		bootInput[bootIndex] = 1
		// log.Infof("boot: %v", line[4])
		// log.Info(bootInput)

		safetyInput := []float64{0, 0, 0}
		safetyIndex, ok := safetyMap[line[5]]
		if ok == false {
			log.Errorf("unrecognized value for safety: %v", line[5])
			break
		}
		safetyInput[safetyIndex] = 1
		// log.Infof("safety: %v", line[5])
		// log.Info(safetyInput)

		var input []float64
		input = append(input, buyingInput...)
		input = append(input, maintInput...)
		input = append(input, doorsInput...)
		input = append(input, personsInput...)
		input = append(input, bootInput...)
		input = append(input, safetyInput...)

		log.Info(input)

		output := []float64{0, 0, 0, 0}
		car, ok := carMap[line[6]]
		if ok == false {
			log.Errorf("unrecognized value for car: %v", line[6])
			break
		}
		output[car] = 1
		log.Info(output)

		mind.Train(input, output)
		log.Info(mind.LastOutput())

		break
	}
	mind.Describe()
}
