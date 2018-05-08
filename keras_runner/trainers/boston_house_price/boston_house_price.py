#!/usr/bin/env python2

# https://machinelearningmastery.com/regression-tutorial-keras-deep-learning-library-python/

from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

import os

import numpy
import pandas
from keras.models import Sequential
from keras.layers import Dense
from keras.wrappers.scikit_learn import KerasRegressor
from sklearn.model_selection import cross_val_score
from sklearn.model_selection import KFold
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline

def baseline_model():
  model = Sequential([
      Dense(13, input_dim=13, kernel_initializer='normal', activation='relu'),
      Dense(1, kernel_initializer='normal'),
  ])

  model.compile(loss='mean_squared_error', optimizer='adam')
  return model

def larger_model():
  model = Sequential([
      Dense(13, input_dim=13, kernel_initializer='normal', activation='relu'),
      Dense(6, kernel_initializer='normal', activation='relu'),
      Dense(1, kernel_initializer='normal'),
  ])

  model.compile(loss='mean_squared_error', optimizer='adam')
  return model

def wider_model():
  model = Sequential([
      Dense(20, input_dim=13, kernel_initializer='normal', activation='relu'),
      Dense(1, kernel_initializer='normal'),
  ])

  model.compile(loss='mean_squared_error', optimizer='adam')
  return model

def run():
  dir_path = os.path.dirname(os.path.realpath(__file__))

  dataframe = pandas.read_csv(dir_path + '/house.csv', sep=',', header=None)

  dataset = dataframe.values

  x = dataset[:, 0:13]
  y = dataset[:, 13]

  seed = 7
  numpy.random.seed(seed)

  # evaluate baseline model
  estimator = KerasRegressor(
      build_fn=baseline_model, epochs=100, batch_size=5, verbose=0)
  kfold = KFold(n_splits=10, random_state=seed)
  results = cross_val_score(estimator, x, y, cv=kfold)
  print("Results: %.2f (%.2f) MSE" % (results.mean(), results.std()))

  # evaluate baseline model with standardized dataset
  estimators = []
  estimators.append(('standardize', StandardScaler()))
  estimators.append(('mlp', KerasRegressor(build_fn=baseline_model, epochs=50,
                                           batch_size=5, verbose=0)))
  pipeline = Pipeline(estimators)
  kfold = KFold(n_splits=10, random_state=seed)
  results = cross_val_score(pipeline, x, y, cv=kfold)
  print("Standardized: %.2f (%.2f) MSE" % (results.mean(), results.std()))

  # evaluate larger model with standardized dataset
  estimators = []
  estimators.append(('standardize', StandardScaler()))
  estimators.append(('mlp', KerasRegressor(build_fn=larger_model, epochs=50,
                                           batch_size=5, verbose=0)))
  pipeline = Pipeline(estimators)
  kfold = KFold(n_splits=10, random_state=seed)
  results = cross_val_score(pipeline, x, y, cv=kfold)
  print("Larger: %.2f (%.2f) MSE" % (results.mean(), results.std()))

  # evaluate wider model with standardized dataset
  estimators = []
  estimators.append(('standardize', StandardScaler()))
  estimators.append(('mlp', KerasRegressor(build_fn=wider_model, epochs=100,
                                           batch_size=5, verbose=0)))
  pipeline = Pipeline(estimators)
  kfold = KFold(n_splits=10, random_state=seed)
  results = cross_val_score(pipeline, x, y, cv=kfold)
  print("Wider: %.2f (%.2f) MSE" % (results.mean(), results.std()))

if __name__ == '__main__':
  run()
