'use strict';

(function() {
  document.addEventListener('DOMContentLoaded', function(){
    console.log("DOMContentLoaded");
    initNN();
  });

  let dataSet = [
    [[0, 0], [0]],
    [[0, 1], [1]],
    [[1, 0], [1]],
    [[1, 1], [0]],
  ];
  let NN;
  let weights = [
    0.15,
    0.20,
    0.25,
    0.30,
    0.40,
    0.45,
    0.50,
    0.55,
  ];

  function NeuralNetwork(numberOfInputNeurons, numberOfHiddenLayerNeurons, numberOfOutputNeurons) {
    this.inputs = numberOfInputNeurons;
    this.outputs = numberOfOutputNeurons;
    this.layers = [];
  }

  function Layer() {
    this.neurons = [];
    this.type;
  }

  function Neuron() {
    this.netInput;
    this.output;
  }

  function initNN() {
    console.log("inside initNN()");
    NN = new NeuralNetwork(2, 5, 1);
    let inputLayer = new Layer();
    inputLayer.type = 'input';
  }
})();
