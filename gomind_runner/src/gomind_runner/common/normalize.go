package common

import (
	"errors"
	"math"

	log "github.com/golang/glog"
)

// Also called Min-Max Normalization.
func LinearScale(dataset [][]float64, outputRange string) ([][]float64, error) {
	log.Info("Linear Scaling the data set")

	// A 2D normalizer array which for all attributes, it stores
	// their min value, max value and difference of max - min.
	var normalizer [][]float64
	for _, sample := range dataset {
		for index, value := range sample {
			if len(normalizer) < index+1 {
				normalizer = append(normalizer, []float64{value, value, 0})
			} else {
				if value < normalizer[index][0] {
					normalizer[index][0] = value
				} else if value > normalizer[index][1] {
					normalizer[index][1] = value
				}

				normalizer[index][2] = normalizer[index][1] - normalizer[index][0]
			}
		}
	}

	var result [][]float64
	for _, sample := range dataset {
		var newSample []float64
		for i, value := range sample {
			var newValue float64
			if outputRange == "0to1" {
				newValue = (value - normalizer[i][0]) / normalizer[i][2]
			} else if outputRange == "-1to1" {
				newValue = (value - ((normalizer[i][0] + normalizer[i][1]) / 2)) / ((normalizer[i][1] - normalizer[i][0]) / 2)
			} else {
				return result, errors.New("invalid linear scale normalization range.")
			}
			newSample = append(newSample, newValue)
		}
		result = append(result, newSample)
	}

	return result, nil
}

// also called z-score normalization
func GaussianNormalization(dataset [][]float64) ([][]float64, error) {
	numberOfSamples := float64(len(dataset))

	var sums []float64
	for _, sample := range dataset {
		for index, value := range sample {
			if len(sums) < index+1 {
				sums = append(sums, value)
			} else {
				sums[index] += value
			}
		}
	}

	var means []float64
	for _, sum := range sums {
		means = append(means, sum/numberOfSamples)
	}
	log.Info(means)

	var sumOfValueMinusMeanSquared []float64
	for _, sample := range dataset {
		for index, value := range sample {
			if len(sumOfValueMinusMeanSquared) < index+1 {
				sumOfValueMinusMeanSquared = append(sumOfValueMinusMeanSquared, math.Pow((value-means[index]), 2))
			} else {
				sumOfValueMinusMeanSquared[index] += math.Pow((value - means[index]), 2)
			}
		}
	}

	var standardDeviation []float64
	for _, sum := range sumOfValueMinusMeanSquared {
		variance := sum / (numberOfSamples - 1)
		standardDeviation = append(standardDeviation, math.Sqrt(variance))
	}
	log.Info(standardDeviation)

	var result [][]float64
	for _, sample := range dataset {
		var newSample []float64
		for i, value := range sample {
			newValue := (value - means[i]) / standardDeviation[i]
			newSample = append(newSample, newValue)
		}
		// log.Info(newSample)
		result = append(result, newSample)
	}

	return result, nil
}
