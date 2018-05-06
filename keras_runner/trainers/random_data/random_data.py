#!/usr/bin/env python2

from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

import numpy as np
from keras.models import Sequential
from keras.layers import Dense

def run():
  model = Sequential([
      Dense(32, input_shape=(100,), activation='relu', use_bias=True),
      Dense(1, activation='sigmoid', use_bias=True),
  ])

  model.compile(optimizer='rmsprop',
                loss='binary_crossentropy',
                metrics=['accuracy'])

  data = np.random.random((1000, 100))
  labels = np.random.randint(2, size=(1000, 1))

  model.fit(data, labels, epochs=10, batch_size=10, validation_split=0.2)

  print(model.layers)
  print(model.get_config())
  print(model.summary())

if __name__ == '__main__':
  run()
