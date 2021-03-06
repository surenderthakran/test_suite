import numpy as np
from keras.models import Sequential
from keras.layers import Dense, Activation

# the four different states of the XOR gate
training_data = np.array(
    [
        [0, 0, 0],
        [0, 0, 1],
        [0, 1, 0],
        [0, 1, 1],
        [1, 0, 0],
        [1, 0, 1],
        [1, 1, 0],
        [1, 1, 1],
    ], 'float32')

# the four expected results in the same order
target_data = np.array([[0], [1], [1], [0], [1], [0], [0], [1]], 'float32')

def run():
  model = Sequential()
  model.add(Dense(16, input_dim=3, activation='relu'))
  model.add(Dense(1, activation='sigmoid'))

  model.compile(loss='mse',
                optimizer='adam',
                metrics=['binary_accuracy'])

  model.fit(training_data, target_data, epochs=5, verbose=2)

  print model.predict(training_data).round()

if __name__ == '__main__':
  run()
