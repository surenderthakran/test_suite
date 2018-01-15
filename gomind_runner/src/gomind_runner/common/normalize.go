package common

import (
	log "github.com/golang/glog"
)

func LinearScaleNormalize(dataset [][]float64) [][]float64 {
	log.Info("Normalizing data set with Linear Scale")

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
			newSample = append(newSample, (value-normalizer[i][0])/normalizer[i][2])
		}
		result = append(result, newSample)
	}

	return result
}
