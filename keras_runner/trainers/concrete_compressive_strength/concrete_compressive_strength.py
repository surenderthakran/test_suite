#!/usr/bin/env python2

from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

import os

from keras.models import Sequential
from keras.layers import Dense
import pandas as pd

def run():
  print('running...')
  dir_path = os.path.dirname(os.path.realpath(__file__))

  training_data = pd.read_csv(dir_path + "/concrete_compressive_strength.csv",
                              sep=',')

  input_data = training_data.iloc[:, 0:8]
  output_data = training_data.iloc[:, -1]

  model = Sequential([
      Dense(4, input_dim=8, activation='relu', kernel_initializer='uniform'),
      Dense(4, activation='relu', kernel_initializer='uniform'),
      Dense(1, activation='relu', kernel_initializer='uniform'),
  ])

  model.compile(optimizer='adam', loss='mean_squared_error')

  model.fit(input_data, output_data, epochs=100, batch_size=32)

  pred = model.predict(input_data)

  pred = [x[0] for x in pred]

  print(pd.concat([output_data, pd.Series(pred)], axis=1))

if __name__ == '__main__':
  run()
