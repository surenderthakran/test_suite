package main

import (
	"bufio"
	"encoding/csv"
	"flag"
	"fmt"
	"io"
	"math"
	"math/rand"
	"net/http"
	"os"

	log "github.com/golang/glog"
	"gomind_runner/gomind"
)

func main() {
	// Overriding glog's logtostderr flag's value to print logs to stderr.
	flag.Lookup("logtostderr").Value.Set("true")
	// Calling flag.Parse() so that all flag changes are picked.
	flag.Parse()

	mind, err := initNeuralNetwork()
	if err != nil {
		log.Info(err)
		return
	}
	mind.Describe()

	http.HandleFunc("/train", func(w http.ResponseWriter, r *http.Request) {
		log.Info("A new /train request received!")
		// trainNetwork(mind)
		trainCarEvaluation(mind)
		fmt.Fprintf(w, "Training complete")
	})

	err = http.ListenAndServe(":18550", nil)
	log.Fatal(err)
}

func round(num float64) int {
	return int(num + math.Copysign(0.5, num))
}

func roundTo(input float64, precision int) float64 {
	output := math.Pow(10, float64(precision))
	return float64(round(input*output)) / output
}

func initNeuralNetwork() (*gomind.NeuralNetwork, error) {
	// return gomind.NewNeuralNetwork(len(trainingSet()[0][0]), 3, len(trainingSet()[0][1]))
	return gomind.NewNeuralNetwork(6, 7, 4)
}

func trainCarEvaluation(mind *gomind.NeuralNetwork) {
	log.Info("inside trainCarEvaluation()")
	csvFile, err := os.Open("src/gomind_runner/data/car_eval.csv")
	if err != nil {
		log.Errorf("error reading csv file: %v", err)
		return
	}

	reader := csv.NewReader(bufio.NewReader(csvFile))

	buyingMap := make(map[string]float64)
	buyingMap["low"] = 0
	buyingMap["med"] = 1
	buyingMap["high"] = 2
	buyingMap["vhigh"] = 3

	maintMap := make(map[string]float64)
	maintMap["low"] = 0
	maintMap["med"] = 1
	maintMap["high"] = 2
	maintMap["vhigh"] = 3

	doorsMap := make(map[string]float64)
	doorsMap["2"] = 0
	doorsMap["3"] = 1
	doorsMap["4"] = 2
	doorsMap["5more"] = 3

	personsMap := make(map[string]float64)
	personsMap["2"] = 0
	personsMap["4"] = 1
	personsMap["more"] = 2

	bootMap := make(map[string]float64)
	bootMap["small"] = 0
	bootMap["med"] = 1
	bootMap["big"] = 2

	safetyMap := make(map[string]float64)
	safetyMap["low"] = 0
	safetyMap["med"] = 1
	safetyMap["high"] = 2

	carMap := make(map[string]int)
	carMap["unacc"] = 0
	carMap["acc"] = 1
	carMap["good"] = 2
	carMap["vgood"] = 3

	for {
		log.Info("========================================================")
		line, error := reader.Read()
		if error == io.EOF {
			break
		} else if error != nil {
			log.Fatal(error)
		}

		log.Info(line)

		buying, ok := buyingMap[line[0]]
		if ok == false {
			log.Errorf("unrecognized value for buying: %v", line[0])
			break
		}

		maint, ok := maintMap[line[1]]
		if ok == false {
			log.Errorf("unrecognized value for maint: %v", line[1])
			break
		}

		doors, ok := doorsMap[line[2]]
		if ok == false {
			log.Errorf("unrecognized value for doors: %v", line[2])
			break
		}

		persons, ok := personsMap[line[3]]
		if ok == false {
			log.Errorf("unrecognized value for persons: %v", line[3])
			break
		}

		boot, ok := bootMap[line[4]]
		if ok == false {
			log.Errorf("unrecognized value for boot: %v", line[4])
			break
		}

		safety, ok := safetyMap[line[5]]
		if ok == false {
			log.Errorf("unrecognized value for safety: %v", line[5])
			break
		}

		input := []float64{
			buying,
			maint,
			doors,
			persons,
			boot,
			safety,
		}
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
	}
}

func trainingSet() [][][]float64 {
	return [][][]float64{
		[][]float64{[]float64{0.1, 0.2}, []float64{0.3}},
		[][]float64{[]float64{0.15, 0.25}, []float64{0.4}},
		[][]float64{[]float64{0.12, 0.22}, []float64{0.34}},
		[][]float64{[]float64{0.01, 0.02}, []float64{0.03}},
		[][]float64{[]float64{0.2, 0.3}, []float64{0.5}},
		[][]float64{[]float64{0.3, 0.4}, []float64{0.7}},
		[][]float64{[]float64{0.4, 0.5}, []float64{0.9}},
		[][]float64{[]float64{0.5, 0.1}, []float64{0.6}},
		[][]float64{[]float64{0.6, 0.2}, []float64{0.8}},
		[][]float64{[]float64{0.7, 0.2}, []float64{0.9}},
	}
}

func testSet() [][][]float64 {
	return [][][]float64{
		[][]float64{[]float64{0.1, 0.3}},
		[][]float64{[]float64{0.2, 0.4}},
		[][]float64{[]float64{0.3, 0.5}},
		[][]float64{[]float64{0.4, 0.1}},
		[][]float64{[]float64{0.5, 0.2}},
		[][]float64{[]float64{0.05, 0.2}},
	}
}

func trainNetwork(mind *gomind.NeuralNetwork) {
	log.Info("inside trainNetwork()")
	log.Info("========================================================")
	for i := 0; i < 100000; i++ {
		input := rand.Float64()
		if input < 0.5 {
			output := input * 2

			// fmt.Println(i)
			// log.Infof("%v %v", input, output)
			mind.Train([]float64{input}, []float64{output})

			// log.Info(mind.LastOutput())
			log.Infof("Error: %v", mind.CalculateError([]float64{output}))
		}
	}
	log.Info("========================================================")
	mind.Describe()

	// trainingSet := trainingSet()
	// testSet := testSet()
	//
	// mind.Describe()
	// log.Info("========================================================")
	// for i := 0; i < 10; i++ {
	// 	log.Info(i)
	// 	index := rand.Intn(len(trainingSet))
	//
	// 	log.Infof("%v %v", trainingSet[index][0], trainingSet[index][1])
	// 	mind.Train(trainingSet[index][0], trainingSet[index][1])
	//
	// 	log.Info(mind.LastOutput())
	// 	log.Infof("Error: %v\n", mind.CalculateError(trainingSet[index][1]))
	// }
	// log.Infof("\nTotal Error: %v", mind.CalculateTotalError(trainingSet))
	// log.Info("========================================================")
	// mind.Describe()
	// log.Info("========================================================")
	// for _, test := range testSet {
	// 	log.Info(test)
	// 	log.Info(mind.CalculateOutput(test[0]))
	// }
	// log.Info("========================================================")
}
