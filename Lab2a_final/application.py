from flask import Flask, render_template,request, redirect, jsonify
# from flask import Flask, jsonify

import getdata
from sklearn.cluster import KMeans
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt
import json
from sklearn.metrics import pairwise_distances
from sklearn import manifold


app = Flask(__name__)



@app.route('/')
def index():
    return render_template('index.html')

@app.route('/screeplot',methods=['GET'])
def task2A():
    return render_template('task.html',taskJS="task2a")

@app.route('/data')
def get_data():
    dataOriginal = getdata.originalData()
    # Load the data
    # df = pd.read_csv('data.csv')

    # Perform PCA
    # pca = PCA()
    # pca.fit(df)

    data = dataOriginal
    #define columns to use for PCA
    # df = data.iloc[:, 1:5]

    #define scaler
    scaler = StandardScaler()


    #created scaled version of DataFrame
    scaled_df=pd.DataFrame(scaler.fit_transform(data), columns=["age",
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
    ])

    #define PCA model to use
    pca = PCA(n_components=22)

    #fit PCA model to data
    pca_fit = pca.fit(scaled_df)
    print("==========================")
    # print(pca_fit)
   # Calculate the percentage of explained variance
    variance = pca_fit.explained_variance_ratio_
    # Calculate the percentage of explained variance
    # variance = pca.explained_variance_ratio_
    cumulative_variance = np.cumsum(variance)

    # Create a list of dictionaries with the component number, variance, and cumulative variance
    components = []
    for i in range(len(variance)):
        component = {}
        component['Component'] = i + 1
        component['Variance'] = variance[i]
        component['CumulativeVariance'] = cumulative_variance[i]
        components.append(component)

    # Create a list of dictionaries with the x and y values for the line chart
    line_data = []
    for i in range(len(cumulative_variance)):
        data_point = {}
        data_point['x'] = i + 1
        data_point['y'] = cumulative_variance[i]
        line_data.append(data_point)

    # Return the data as a JSON object
    print(line_data)
    return jsonify({'components': components, 'lineData': line_data})

@app.route('/elbowplot',methods=['GET'])
def task2a_4():
    return render_template('task.html',taskJS="task2a_4")

@app.route('/task2a4d',methods=['GET'])
def task2a_4_data():

    dataOriginal=getdata.originalData()
    scaler = StandardScaler()


    #created scaled version of DataFrame
    scaled_df=pd.DataFrame(scaler.fit_transform(dataOriginal), columns=["age",
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
    ])

    # load data from file
    # X = np.loadtxt('data.csv', delimiter=',')

    # calculate WCSS for k = 1 to 10
    wcss = []
    for k in range(1, 11):
        kmeans = KMeans(n_clusters=k, init='k-means++', max_iter=300, n_init=22, random_state=0)
        kmeans.fit(scaled_df)
        wcss.append(kmeans.inertia_)

    # create JSON object
    # elbow_data = {"k": list(range(1, 11)), "wcss": wcss}

    # save JSON object to file
    print("=========================")
    print({"k": list(range(1, 23)), "wcss": wcss})
    return jsonify({"k": list(range(1, 11)), "wcss": wcss})
    # with open('elbow_data.json', 'w') as f:
    #     json.dump(elbow_data, f)
    #     return render_template('task.html',taskJS="task2a_4",data=data)

@app.route('/biplot',methods=['GET'])
def biplot():

    # Load data into pandas DataFrame
    dataOriginal=getdata.originalData()
    scaler = StandardScaler()


    #created scaled version of DataFrame
    scaled_df=pd.DataFrame(scaler.fit_transform(dataOriginal), columns=["age",
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
    ])

    # Perform PCA
    pca = PCA()
    principal_components = pca.fit_transform(scaled_df)
    explained_variances = pca.explained_variance_ratio_
    import json

    # Convert numpy arrays to lists
    principal_components = principal_components.tolist()
    explained_variances = explained_variances.tolist()

    # Create dictionary with data
    data = {
        'principal_components': principal_components,
        'explained_variances': explained_variances,
        'features': list(["age",
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
    ])
    }

    # Export data to JSON
    with open('data.json', 'w') as f:
        json.dump(data, f)

    return render_template('task2a_3.html',taskJS="task2a_3",data=data)


@app.route('/task3c',methods=['GET'])
def task3c():

    dataOriginal=getdata.originalData()

    dataOriginal = StandardScaler().fit_transform(dataOriginal)

    pca = PCA(n_components = 4)
    def return_dict_arr(data,yVal):
        array=[]
        yVal=np.array(yVal)
        for i in range(len(data)):
            array.append({"target":yVal[i],"PCA1":data[i,0],"PCA2":data[i,1],"PCA3":data[i,2],"PCA1":data[i,3]})

        return array

    originalPCA = pca.fit_transform(dataOriginal)
    originalPCA = {"values":return_dict_arr(originalPCA,dataOriginalY)}

#     randomPCA = pca.fit_transform(dataRandom)
#     randomPCA = {"values":return_dict_arr(randomPCA,dataRandomY)}

#     stratPCA = pca.fit_transform(dataStrat)
#     stratPCA={"values":return_dict_arr(stratPCA,dataStratY)}

    print(originalPCA)

    data=[json.dumps(originalPCA)]#,"randomPCA":dataOriginalY,dataRandomY,stratPCA,dataStratY}
    data=pd.DataFrame(data)
    data=data.to_json()
    #data=json.dumps(data)
    return render_template('task3c.html',taskJS="task3c",data=data)

@app.route('/scatterplotmatrix',methods=['GET'])
def extra():
    import numpy as np
    import matplotlib.pyplot as plt
    from sklearn.decomposition import PCA

    # Load the Iris dataset
    # iris = load_iris()
    # X = iris.data

    # # Perform PCA on the dataset
    # pca = PCA()
    # pca.fit(X)

    dataOriginal=getdata.originalData()
    scaler = StandardScaler()


    #created scaled version of DataFrame
    scaled_df=pd.DataFrame(scaler.fit_transform(dataOriginal), columns=["age",
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
    ])

    # Perform PCA
    pca = PCA()
    pca.fit_transform(scaled_df)

    # Get the squared sum of PCA loadings
    loadings = pca.components_ ** 2
    sum_loadings = np.sum(loadings, axis=0)

    # Sort the attributes by their squared sum of PCA loadings
    indices = np.argsort(sum_loadings)[::-1]

    # Select the top four attributes
    top_indices = indices[:4]


    # Perform k-means clustering on top 4 attributes
    kmeans = KMeans(n_clusters=4)
    kmeans.fit(scaled_df[scaled_df.columns[top_indices]])
    scaled_df['cluster'] = kmeans.labels_

    color_indices = list(set(scaled_df['cluster']))
    # Create scatterplot matrix using D3
    import json

    # Convert data to JSON format
    final_data = pd.DataFrame(scaled_df, columns=["age",
    "overall",
    "height_cm",
    'cluster'])
    c = 0

        # if i['cluster'] ==1:
        #     c +=1
    print("-------c")
    k = 0
    m = 0
    l = 0
    for i in final_data['cluster']:
        if i ==1:
            k +=1
        elif i==2:
            m +=1
        elif i==0:
            l +=1
    print(k,m,l)
    json_data = json.dumps(final_data.to_dict(orient='records'))

    print("=========================")

    # print(json_data)


    print(top_indices)
    attributes = scaled_df.columns[top_indices]
    print(attributes)

    # data=json.dumps(data)
    return render_template('task2a_2.html',taskJS="task2a_2",data=json_data,color_indices=color_indices)


@app.route('/scatterplotmatrixdata',methods=['GET','POST'])
def scatterplotmatrixdata():
    cl = request.get_json()
    print("``````````````````")
    print(cl['data'])
    # Load the Iris dataset
    # iris = load_iris()
    # X = iris.data

    # # Perform PCA on the dataset
    # pca = PCA()
    # pca.fit(X)

    dataOriginal=getdata.originalData()
    scaler = StandardScaler()


    #created scaled version of DataFrame
    scaled_df=pd.DataFrame(scaler.fit_transform(dataOriginal), columns=["age",
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
    ])

    # Perform PCA
    pca = PCA()
    pca.fit_transform(scaled_df)

    # Get the squared sum of PCA loadings
    loadings = pca.components_ ** 2
    sum_loadings = np.sum(loadings, axis=0)

    # Sort the attributes by their squared sum of PCA loadings
    indices = np.argsort(sum_loadings)[::-1]

    # Select the top four attributes
    top_indices = indices[:4]


    # Perform k-means clustering on top 4 attributes
    kmeans = KMeans(n_clusters=4)
    kmeans.fit(scaled_df[scaled_df.columns[top_indices]])
    scaled_df['cluster'] = kmeans.labels_

    color_indices = list(set(scaled_df['cluster']))
    # Create scatterplot matrix using D3
    import json
    columns1 = cl['data']
    columns1.append('cluster')
    print("+++++++++++++++++++++++++++++++++++++++++++++++++++")

    print(columns1)
    # Convert data to JSON format
    final_data = pd.DataFrame(scaled_df, columns=columns1)
    c = 0

        # if i['cluster'] ==1:
        #     c +=1
    print("-------c")
    k = 0
    m = 0
    l = 0
    for i in final_data['cluster']:
        if i ==1:
            k +=1
        elif i==2:
            m +=1
        elif i==0:
            l +=1
    print(k,m,l)
    json_data = json.dumps(final_data.to_dict(orient='records'))

    print("=========================")

    # print(json_data)


    print(top_indices)
    attributes = scaled_df.columns[top_indices]
    print(attributes)

    # data=json.dumps(data)
    # return jsonify(loadings_dict)
    return jsonify({"data": final_data.to_dict(orient='records'), "color_indices": color_indices})

    # return render_template('task2a_2.html',taskJS="task2a_2",data=json_data,color_indices=color_indices)


@app.route('/data2',methods=['GET','POST'])
def receive_data():
    print(request.get_json())
    intrinsic_dim = int(request.get_json()['data'])
    # Do something with the data
    # print("00000000000000000000000000000")
    # print(data)

    dataOriginal=getdata.originalData()
    scaler = StandardScaler()


    #created scaled version of DataFrame
    scaled_df=pd.DataFrame(scaler.fit_transform(dataOriginal), columns=["age",
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
    ])

    # Perform PCA
    pc_arr = ['PC1', 'PC2', 'PC3', 'PC4', 'PC5', 'PC6', 'PC7', 'PC8', 'PC9', 'PC10', 'PC11', 'PC12', 'PC13', 'PC14', 'PC15', 'PC16', 'PC17', 'PC18', 'PC19', 'PC20', 'PC21', 'PC22' ]
    pca = PCA(n_components=22)
    pca.fit_transform(scaled_df)
    X_pca = pca.transform(scaled_df)

    # loadings = pd.DataFrame(pca.components_.T, columns=['CRIMINAL_CASES', 'TOTAL_ELECTORS', 'GENERAL_VOTES', 'ASSETS'], index=pc_arr[0:int(data)])

    # Get the squared sum of PCA loadings
    loadings = pca.components_ ** 2
    sum_loadings = np.sum(loadings, axis=0)
    # print("00000000000000000000000000000")
    # print(len(X_pca[:,0]))
    # print(loadings)
    # Sort the attributes by their squared sum of PCA loadings
    
    loadings_dict = {}
    columns=["age",
    "overall",
    "height_cm",
    "weight_kg"
    # "pace",
    # "shooting",
    # "passing",
    # "dribbling",
    # "defending",
    # "physic",
    # "attacking_crossing",
    # "attacking_heading_accuracy",
    # "attacking_short_passing",
    # "skill_dribbling",
    # "skill_curve",
    # "power_shot_power",
    # "power_jumping",
    # "mentality_aggression",
    # "mentality_interceptions",
    # "mentality_vision",
    # "mentality_penalties",
    # "wage_eur"
    ]
    for i in range(intrinsic_dim):
        pc_name = 'PC' + str(i + 1)
        loadings_dict[pc_name] = {}
        for j in range(len(columns)):
            attr_name = columns[j]
            loading_value = loadings[i][j]
            loadings_dict[pc_name][attr_name] = loading_value

    squared_sum = {}
    for pc_name, pc_loadings in loadings_dict.items():
        squared_sum[pc_name] = np.sum(np.square(list(pc_loadings.values())))

    # add the squared sum to the loadings table
    for pc_name, pc_loadings in loadings_dict.items():
        pc_loadings["Squared Sum"] = squared_sum[pc_name]
# convert the dictionary to a JSON object and print it
    loadings_json = json.dumps(loadings_dict)
    # print("******************")
    # print(loadings_json)
    return jsonify(loadings_dict)


@app.route('/data3',methods=['GET','POST'])
def receive_data1():

    intrinsic_dim = int(request.get_json()['data'])
    dataOriginal=getdata.originalData()
    scaler = StandardScaler()


    #created scaled version of DataFrame
    scaled_df=pd.DataFrame(scaler.fit_transform(dataOriginal), columns=["age",
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
    ])

    pca = PCA(n_components=22)
    pca.fit(scaled_df)
    X_pca = pca.transform(scaled_df)
    di = intrinsic_dim
    # from sklearn.datasets import load_iris

    # # Load the iris dataset
    # iris = load_iris()
    # X = iris.data
    columns = ["age",
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

    # Perform PCA on the dataset
    # pca = PCA()
    # pca.fit(X)

    # Determine the intrinsic dimensionality index (di)
    # variance_ratio_cumsum = np.cumsum(pca.explained_variance_ratio_)
    # di = np.argmax(variance_ratio_cumsum >= 0.95) + 1

    # Keep the PCA components with a dimensionality index ≤ di
    # X_pca = pca.transform(scaled_df)[:, :di]

    # Calculate the squared sum of PCA loadings for each attribute
    loadings = pca.components_[:di].T
    squared_loadings = loadings ** 2
    sum_squared_loadings = squared_loadings.sum(axis=1)

    # Select the four attributes with the highest squared sum of PCA loadings
    indices = np.argsort(sum_squared_loadings)[::-1][:4]
    selected_attributes = [columns[i] for i in indices]
    print("--------------")
    print(di)
    print("+++++++++++++++")
    print(selected_attributes)
    print("******************")
    print(X_pca)
    lt = [loadings[indices[0]],loadings[indices[1]],loadings[indices[2]],loadings[indices[3]]]
    # ltt = lt.T


    loadings_dict = {}
    columns= selected_attributes
    for i in range(len(selected_attributes)):
        attr_name = selected_attributes[i]
        # pc_name = 'PC' + str(i + 1)
        loadings_dict[attr_name] = {}
        for j in range(intrinsic_dim):
            pc_name = 'PC' + str(j + 1)
            # attr_name = columns[j]
            print(i,j)
            loading_value = lt[i][j]
            loadings_dict[attr_name][pc_name] = loading_value

    squared_sum = {}
    for pc_name, pc_loadings in loadings_dict.items():
        squared_sum[pc_name] = np.sum(np.square(list(pc_loadings.values())))

    # add the squared sum to the loadings table
    for pc_name, pc_loadings in loadings_dict.items():
        pc_loadings["SQUARED SUM"] = squared_sum[pc_name]
# convert the dictionary to a JSON object and print it
    loadings_json = json.dumps(loadings_dict)
    # print("******************")
    print(loadings_json)
    return jsonify(loadings_dict)



@app.route('/data1')
def get_data1():
    dataOriginal=getdata.originalData()

    scaler = StandardScaler()

    #created scaled version of DataFrame
    scaled_df=pd.DataFrame(scaler.fit_transform(dataOriginal), columns=["age",
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
    ])

    # Perform PCA and obtain loadings
    pca = PCA(n_components=2)
    pca.fit(scaled_df)
    pcs = pca.fit_transform(scaled_df)
    loadings = pca.components_.T * np.sqrt(pca.explained_variance_)

    # Obtain principal component scores
    scores = pca.transform(scaled_df)

    # Perform K-means clustering
    kmeans = KMeans(n_clusters=4, random_state=0).fit(scaled_df)
    labels = kmeans.labels_
    print("---------")
    print(loadings)
    return jsonify({"pcs": pcs.tolist(), "loadings": loadings.tolist(), "labels": labels.tolist()})

if __name__== "__main__":
    app.run(debug=True, port = 8000)
