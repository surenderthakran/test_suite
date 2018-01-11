package activation

import "fmt"

type Name int

const (
	SIGMOID Name = iota
	RELU
)

type Service struct {
	name Name
}

func New(name Name) (*Service, error) {
	if supportedFunction(name) {
		return &Service{
			name: name,
		}, nil
	}
	return nil, fmt.Errorf("invalid activation function: %v", name)
}

func (s *Service) Name() Name {
	return s.name
}

func (s *Service) String() string {
	switch s.name {
	case SIGMOID:
		return "SIGMOID"
	case RELU:
		return "RELU"
	}
	return ""
}

func supportedFunction(name Name) bool {
	supportedFunctions := []Name{SIGMOID, RELU}
	for _, functionName := range supportedFunctions {
		if functionName == name {
			return true
		}
	}
	return false
}
