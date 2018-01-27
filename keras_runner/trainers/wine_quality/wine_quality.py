import numpy as np
import os
import pandas as pd

dir_path = os.path.dirname(os.path.realpath(__file__))

# Read in white wine data 
white = pd.read_csv(dir_path + "/winequality-white.csv", sep=';')
print white.describe()

# Read in red wine data 
red = pd.read_csv(dir_path + "/winequality-red.csv", sep=';')
print red.describe()

print "red wine alchocol distribution"
print(np.histogram(red.alcohol, bins=[7,8,9,10,11,12,13,14,15]))
print "white wine alchocol distribtion"
print(np.histogram(white.alcohol, bins=[7,8,9,10,11,12,13,14,15]))

regression = True
if regression:
	# Add `type` column to `red` with value 1
        red['type'] = 1

        # Add `type` column to `white` with value 0
        white['type'] = 0

	# Append `white` to `red`
        wines = red.append(white, ignore_index=True)
        print wines.describe()

	# Isolate target labels
	Y = wines.quality

	# Isolate data
	X = wines.drop('quality', axis=1)

	# Import `StandardScaler` from `sklearn.preprocessing`
        from sklearn.preprocessing import StandardScaler

	# Scale the data with `StandardScaler`
	X = StandardScaler().fit_transform(X)

	# Import `Sequential` from `keras.models`
	from keras.models import Sequential

	# Import `Dense` from `keras.layers`
	from keras.layers import Dense

	from sklearn.model_selection import StratifiedKFold

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

classification = False
if classification:
	# Add `type` column to `red` with value 1
	red['type'] = 1

	# Add `type` column to `white` with value 0
	white['type'] = 0

	# Append `white` to `red`
	wines = red.append(white, ignore_index=True)
	print wines.describe()

	# Import `train_test_split` from `sklearn.model_selection`
	from sklearn.model_selection import train_test_split

	# Specify the data
	X=wines.ix[:,0:11]

	# Specify the target labels and flatten the array
	y= np.ravel(wines.type)

	# Split the data up in train and test sets
	X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.33, random_state=42)

	# Import `StandardScaler` from `sklearn.preprocessing`
	from sklearn.preprocessing import StandardScaler

	# Define the scaler 
	scaler = StandardScaler().fit(X_train)

	# Scale the train set
	X_train = scaler.transform(X_train)

	# Scale the test set
	X_test = scaler.transform(X_test)

	# Import `Sequential` from `keras.models`
	from keras.models import Sequential

	# Import `Dense` from `keras.layers`
	from keras.layers import Dense

	# Initialize the constructor
	model = Sequential()

	# Add an input layer 
	model.add(Dense(12, activation='relu', input_shape=(11,)))

	# Add one hidden layer 
	model.add(Dense(8, activation='relu'))

	# Add an output layer 
	model.add(Dense(1, activation='sigmoid'))

	# Model output shape
	model.output_shape

	# Model summary
	model.summary()

	# Model config
	model.get_config()

	# List all weight tensors 
	model.get_weights()

	model.compile(loss='binary_crossentropy',
              optimizer='adam',
              metrics=['accuracy'])

	model.fit(X_train, y_train,epochs=20, batch_size=1, verbose=1)

	y_pred = model.predict(X_test)

	score = model.evaluate(X_test, y_test,verbose=1)

	print(score)
