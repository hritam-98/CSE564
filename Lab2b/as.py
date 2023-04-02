import numpy as np

# Define sigmoid activation function
def sigmoid(x):
    return 1 / (1 + np.exp(-x))

# Define training data
D = np.array([
    [0.5, 0, 0.2],
    [0, 0.3, 0],
    [0.4, 0.1, 0.5],
    [0.3, 0.2, 0.2]
])

# Define classification targets
C = np.array([1, 1, 0, 1])

# Initialize weights and biases
w1 = np.array([
    [0.5, 0.5, 0.5],
    [0.5, 0.5, 0.5]
])
w2 = np.array([
    [0.5, 0.5, 0.5],
    [0.5, 0.5, 0.5],
    [0.5, 0.5, 0.5],
    [0.5, 0.5, 0.5],
    [0.5, 0.5, 0.5],
    [0.5, 0.5, 0.5]
])
b1 = np.array([0.5, 0.5, 0.5])
b2 = np.array([0.5, 0.5, 0.5, 0.5, 0.5, 0.5])

# Set learning rate
lr = 0.2

# Perform one epoch of training
for i in range(len(D)):
    # Forward pass
    x = D[i]
    z1 = np.dot(w1, x) + b1
    y1 = sigmoid(z1)
    z2 = np.dot(w2, np.concatenate([y1, b2])) 
    y2 = sigmoid(z2)
    
    # Compute output error
    e2 = (C[i] - y2) * y2 * (1 - y2)
    
    # Compute hidden error
    e1 = np.dot(w2[:, :3].T, e2) * y1 * (1 - y1)
    
    # Compute weight updates
    dw1 = lr * np.outer(e1, x)
    db1 = lr * e1
    dw2 = lr * np.outer(e2, np.concatenate([y1, b2]))
    db2 = lr * e2
    
    # Update weights and biases
    w1 += dw1
    b1 += db1
    w2 += dw2
    b2 += db2
    
# Print final weights and biases
print("Final weights for hidden layer:")
print(w1)
print("Final biases for hidden layer:")
print(b1)
print("Final weights for output layer:")
print(w2)
print("Final biases for output layer:")
print(b2)
