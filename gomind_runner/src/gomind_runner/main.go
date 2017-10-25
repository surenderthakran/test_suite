package main

import (
	"flag"
	glog "github.com/golang/glog"
	"log"
	"net/http"
)

func main() {
	// Overriding glog's logtostderr flag's value to print logs to stderr.
	flag.Lookup("logtostderr").Value.Set("true")
	// Calling flag.Parse() so that all flag changes are picked.
	flag.Parse()

	http.HandleFunc("/train", func(w http.ResponseWriter, r *http.Request) {
		glog.Info("A new /train request received!")
	})

	err := http.ListenAndServe(":18550", nil)
	log.Fatal(err)
}
