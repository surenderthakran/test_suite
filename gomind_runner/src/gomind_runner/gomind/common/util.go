package common

import (
	"math"
)

func RoundFloat(num float64) int {
	return int(num + math.Copysign(0.5, num))
}

func RoundArray(arr []float64) []int {
	var response []int
	for index, num := range arr {
		response[index] = RoundFloat(num)
	}
	return response
}
