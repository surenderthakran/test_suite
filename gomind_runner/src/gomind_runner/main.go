package main

import (
	"flag"
	"fmt"
	"math/rand"
	"net/http"

	log "github.com/golang/glog"
	"github.com/surenderthakran/gomind"
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

	http.HandleFunc("/train", func(w http.ResponseWriter, r *http.Request) {
		log.Info("A new /train request received!")
		trainNetwork(mind)
		fmt.Fprintf(w, "Training complete")
	})

	err = http.ListenAndServe(":18550", nil)
	log.Fatal(err)
}

func initNeuralNetwork() (*gomind.NeuralNetwork, error) {
	return gomind.NewNeuralNetwork(len(trainingSet()[0][0]), 3, len(trainingSet()[0][1]))
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

	trainingSet := trainingSet()
	testSet := testSet()

	mind.Describe()
	log.Info("========================================================")
	for i := 0; i < 10; i++ {
		fmt.Println(i)
		index := rand.Intn(len(trainingSet))

		fmt.Println(fmt.Sprintf("%v %v", trainingSet[index][0], trainingSet[index][1]))
		mind.Train(trainingSet[index][0], trainingSet[index][1])

		fmt.Println(mind.LastOutput())
		fmt.Println(fmt.Sprintf("Error: %v\n", mind.CalculateError(trainingSet[index][1])))
	}
	fmt.Println(fmt.Sprintf("\nTotal Error: %v", mind.CalculateTotalError(trainingSet)))
	fmt.Println("========================================================")
	mind.Describe()
	fmt.Println("========================================================")
	for _, test := range testSet {
		fmt.Println(test)
		fmt.Println(mind.CalculateOutput(test[0]))
	}
	fmt.Println("========================================================")
}
