from flask import Flask, render_template, request, redirect, Response, jsonify
import pandas as pd
import numpy as np
import random
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
from sklearn.manifold import MDS
from sklearn.preprocessing import StandardScaler
from scipy.spatial.distance import cdist, pdist
import matplotlib.pyplot as plt

app = Flask(__name__)

def plot_elbow(data_elbow):
    print("Elbow Plot Starting")
    k = range(1, 20)
    cluster = [KMeans(n_clusters=c, init='k-means++').fit(data_elbow) for c in k]
    clist = [cc.cluster_centers_ for cc in cluster]
    k_distance = [cdist(data_elbow, cent, 'euclidean') for cent in clist]
    cIndex = [np.argmin(kd, axis=1) for kd in k_distance]
    distances = [np.min(kd, axis=1) for kd in k_distance]
    avg = [np.sum(dist) / data_elbow.shape[0] for dist in distances]
    twosumsquare = [np.sum(dist ** 2) for dist in distances]
    onesumsquare = np.sum(pdist(data_elbow) ** 2) / data_elbow.shape[0]
    sumsquare = onesumsquare - twosumsquare
    fig = plt.figure()
    xx = k[2]
    yy = avg[2]
    print("Elbow plot done")
    return avg, xx, yy 


def clustering(data_elbow):
    scaled_df = data_elbow.copy()
    pcamodel = PCA()
    pca = pcamodel.fit_transform(scaled_df)
    kmeans = KMeans(n_clusters=3)
    kmeans.fit(data_elbow)
    kmeans_centres = kmeans.cluster_centers_
    kmeans_centres = [item[0:2] for item in pcamodel.transform(kmeans_centres).tolist()]
    labels = kmeans.labels_
    data_elbow['kcluster'] = pd.Series(labels)
    a = pca[:, 0]
    b = pca[:, 1]
    a1 =(a.flatten().tolist())
    b1 = (b.flatten().tolist())
    aa = [p[0] for p in kmeans_centres]
    bb = [p[1] for p in kmeans_centres]
    return a1, b1, aa, bb, labels.tolist()

@app.route('/')
def index():
    data = pd.read_csv('./static/data/final_data.csv')
    features = ["age",
    "overall",
    "height_cm",
    "weight_kg",
    "pace",
    "shooting",
    "passing",
    "dribbling",
    "defending",
    "physic",
    "attacking_crossing",
    "attacking_heading_accuracy",
    "attacking_short_passing",
    "skill_dribbling",
    "skill_curve",
    "power_shot_power",
    "power_jumping",
    "mentality_aggression",
    "mentality_interceptions",
    "mentality_vision",
    "mentality_penalties",
    "wage_eur"
    ]
    data = data[features]
    data = data.fillna(method='pad')

    # Scaling the data using z-score normalization/standardization
    scaled_data = pd.DataFrame(StandardScaler().fit_transform(data.values), index = data.index, columns = data.columns)
    categories = ['PCA1','PCA2','PCA3','PCA4','PCA5','PCA6','PCA7','PCA8','PCA9','PCA10','PCA11','PCA12','PCA13','PCA14','PCA15','PCA16','PCA17','PCA18','PCA19','PCA20','PCA21','PCA22']
    pca = PCA()
    x = pca.fit_transform(scaled_data)
    pcareturn = pca.explained_variance_ratio_.tolist()
    Evectors = pd.DataFrame(pca.components_.T,columns=categories, index = scaled_data.columns)
    diction = {
        'PCA1': Evectors['PCA1'].values.tolist(),
        'PCA2': Evectors['PCA2'].values.tolist()
    }
    pca1 = PCA()
    x1 = pca1.fit_transform(data)
    Evectors1 = pd.DataFrame(pca1.components_.T,columns=categories,index = data.columns)
    diction1 = {
        'PCA1': Evectors1['PCA1'].values.tolist(),
        'PCA2': Evectors1['PCA2'].values.tolist()
    }

    # Appending the sum of squared loadings to the data
    newEV = Evectors[categories]
    squaringL = []
    for i in categories[:22]:
        x = i +'sq'
        newEV[x]=newEV[i]**2
        squaringL.append(x)
    newEV['loadings'] = (newEV[squaringL].sum(axis=1))**0.5
    newEV = newEV.sort_values(["loadings"], ascending = False).head(4)
    newEV.reset_index()
    scatterplotmatrix = newEV.index.values.tolist()

    # Visualizing the elbow plot
    avg, xx, yy = plot_elbow(data)
    

    # Performing k-means clustering on the data
    a1, b1, aa1, bb1, labels = clustering(scaled_data)
    
    returnvalues = {'diction':diction, 'diction1':diction1, 'pcareturn':pcareturn, 'scatterplotmatrix':scatterplotmatrix,'avg':avg,'xx':xx,'yy':yy, 'labels':labels, 'a1':a1, 'b1':b1, 'aa1':aa1, 'bb1':bb1}
    return render_template('index.html',data = returnvalues)

if __name__ == '__main__':
    app.run(debug=True, port = 8000)
