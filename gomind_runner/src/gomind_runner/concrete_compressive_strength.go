package main

import (
	"bufio"
	"encoding/csv"
	"io"
	"os"
	"strconv"

	log "github.com/golang/glog"
	"gomind_runner/gomind"
)

func trainConcreteCompressiveStrength(mind *gomind.NeuralNetwork) {
	log.Info("inside trainConcreteCompressiveStrength()")
	csvFile, err := os.Open("src/gomind_runner/data/concrete_compressive_strength.csv")
	if err != nil {
		log.Errorf("error reading csv file: %v", err)
		return
	}

	reader := csv.NewReader(bufio.NewReader(csvFile))

	data := make(map[int]float64)

	counter := 0

	for {
		line, error := reader.Read()
		if error == io.EOF {
			break
		} else if error != nil {
			log.Fatal(error)
			break
		}

		log.Info("==================================================")
		log.Info(line)

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
		input = append(input, cement, slag, ash, water, plasticizer, coarse, fine, age)

		strength, err := strconv.ParseFloat(line[8], 64)
		if err != nil {
			log.Errorf("unable to parse: %v as float64", line[8])
			break
		}

		output := []float64{strength / 100}

		log.Infof("input: %v", input)
		log.Infof("target: %v", output)

		mind.Train(input, output)
		log.Infof("actual: %v", mind.LastOutput())
		outputError := mind.CalculateError(output)
		log.Infof("error: %v", outputError)

		data[counter] = outputError
		counter++
	}

	graphData = data
}
