from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

import numpy as np
from keras.models import Sequential
from keras.layers import Dense, Activation

def run():
  model = Sequential([
      Dense(32, input_shape=(100,)),
      Activation('relu'),
      Dense(1),
      Activation('sigmoid'),
  ])

  model.compile(optimizer='rmsprop',
                loss='binary_crossentropy',
                metrics=['accuracy'])

  data = np.random.random((1000, 100))
  labels = np.random.randint(2, size=(1000, 1))

  model.fit(data, labels, epochs=100, batch_size=10, validation_split=0.2)

if __name__ == '__main__':
  run()
