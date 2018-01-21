package main

import (
	"flag"
	"math"
	"net/http"

	log "github.com/golang/glog"

	concrete_compressive_strength "gomind_runner/trainers/concrete_compressive_strength"
	// winequality "gomind_runner/trainers/wine_quality"
	// xor_gate "gomind_runner/trainers/xor_gate"
)

var (
	staticFs = http.FileServer(http.Dir("/workspace/src/gomind_runner/static"))
)

func main() {
	// Overriding glog's logtostderr flag's value to print logs to stderr.
	flag.Lookup("logtostderr").Value.Set("true")
	// Calling flag.Parse() so that all flag changes are picked.
	flag.Parse()

	http.HandleFunc("/train", func(w http.ResponseWriter, r *http.Request) {
		log.Info("A new /train request received!")

		data, err := concrete_compressive_strength.Train()
		// data, err := winequality.Train()
		// data, err := xor_gate.Train()
		if err != nil {
			log.Error(err)
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write(data)
	})

	http.Handle("/", http.StripPrefix("/", staticFs))

	log.Info("Starting HTTP Server of port 18550...")
	log.Fatal(http.ListenAndServe(":18550", nil))
}

func round(num float64) int {
	return int(num + math.Copysign(0.5, num))
}

func roundTo(input float64, precision int) float64 {
	output := math.Pow(10, float64(precision))
	return float64(round(input*output)) / output
}
