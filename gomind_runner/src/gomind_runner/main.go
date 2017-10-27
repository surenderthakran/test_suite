package main

import (
	"flag"
	"fmt"
	"math"
	"net/http"

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
	log.Info("Neural Network Initialized!")

	http.HandleFunc("/train", func(w http.ResponseWriter, r *http.Request) {
		log.Info("A new /train request received!")
		// trainCarEvaluation(mind)
		trainConcreteCompressiveStrength(mind)
		fmt.Fprintf(w, "Training complete!!")
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
	return gomind.NewNeuralNetwork(8, 9, 1)
}
