#!/usr/bin/env python2

from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

import os

from keras.models import Sequential
from keras.layers import Dense
import numpy as np
import pandas as pd
from sklearn.model_selection import StratifiedKFold
from sklearn.preprocessing import StandardScaler

dir_path = os.path.dirname(os.path.realpath(__file__))

# Read in red wine data
red = pd.read_csv(dir_path + "/winequality-red.csv", sep=';')

# Read in white wine data
white = pd.read_csv(dir_path + "/winequality-white.csv", sep=';')

# Add `type` column to `red` with value 1
red['type'] = 1

# Add `type` column to `white` with value 0
white['type'] = 0

# Append `white` to `red`
wines = red.append(white, ignore_index=True)

# Isolate target labels
Y = wines.quality

# Isolate data
X = wines.drop('quality', axis=1)

# Scale the data with `StandardScaler`
X = StandardScaler().fit_transform(X)

seed = 7
np.random.seed(seed)

kfold = StratifiedKFold(n_splits=5, shuffle=True, random_state=seed)
for train, test in kfold.split(X, Y):
  model = Sequential()
  model.add(Dense(64, input_dim=12, activation='relu'))
  model.add(Dense(1))
  model.compile(optimizer='rmsprop', loss='mse', metrics=['mae'])
  model.fit(X[train], Y[train], epochs=10, verbose=1)

  mse_value, mae_value = model.evaluate(X[test], Y[test], verbose=0)

print(mse_value)
