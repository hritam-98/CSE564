from flask import Flask, render_template, request, redirect, jsonify

import json
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.metrics import pairwise_distances
from sklearn.cluster import KMeans
from sklearn import manifold


app = Flask(__name__)


def get_orginal_data():
    df = pd.read_csv("./final_data_with_cat.csv")
    attrs = ["age",
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
    df = df[attrs]
    df = df.dropna()
    return df


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/mds', methods=['GET'])
def mds():
    return render_template('mds.html', taskJS="mds")


@app.route('/mds_data', methods=['GET'])
def mds_data():

    data = get_orginal_data()
    data = data.sample(n=500)
    scaler = StandardScaler()

    # created scaled version of DataFrame
    scaled_df = pd.DataFrame(scaler.fit_transform(data), columns=["age",
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

    # # data=data.sample(n = 500)
    # data_without_clusters = scaled_df
    # print(data_without_clusters.shape)
    # mds_data = manifold.MDS(n_components=2,metric=True,dissimilarity='euclidean').fit_transform(data_without_clusters)

    mds_data = manifold.MDS(n_components=2, dissimilarity='precomputed')

    similarity = pairwise_distances(scaled_df, metric='euclidean')
    mds = mds_data.fit_transform(similarity)

    # Perform k-means clustering on top 4 attributes
    kmeans = KMeans(n_clusters=4)
    kmeans.fit(scaled_df)
    clusters = kmeans.labels_

    return jsonify({"mds": mds.tolist(), "clusters": clusters.tolist()})


@app.route('/mds_variable', methods=['GET'])
def mds_var():
    return render_template('mds_var.html', taskJS="mds_var")


@app.route('/mds_var', methods=['GET'])
def mds_var_data():

    data = get_orginal_data()
    # data=data.sample(n = 500)
    scaler = StandardScaler()
    # created scaled version of DataFrame
    columns_arr = ["age",
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
    scaled_df = pd.DataFrame(scaler.fit_transform(data), columns=columns_arr)

    # data_without_clusters = data.loc[:, data.columns != 'color']
    data = 1 - abs(scaled_df.corr())
    mds_data = manifold.MDS(n_components=2, metric=True,
                            dissimilarity='precomputed').fit_transform(data)
    print(mds_data)
    # df = np.hstack((mds_data, columns_arr))

    # df = pd.DataFrame(data = df, columns = ['first', 'second','name'])
    return jsonify({"mds": mds_data.tolist(), "variables": columns_arr})


@app.route('/data')
def get_data():
    data = get_orginal_data()
    scaler = StandardScaler()

    scaled_df = pd.DataFrame(scaler.fit_transform(data), columns=["age",
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
    pca = PCA(n_components=10)
    pca_fit = pca.fit(scaled_df)
    variance = pca_fit.explained_variance_ratio_
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
    return jsonify({'components': components, 'lineData': line_data})


@app.route('/elbowplot', methods=['GET'])
def kmeans():
    return render_template('scree.html', taskJS="kmeans")


@app.route('/kmeans1', methods=['GET'])
def kmeans1():

    data = get_orginal_data()
    scaler = StandardScaler()

    # created scaled version of DataFrame
    scaled_df = pd.DataFrame(scaler.fit_transform(data), columns=["age",
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

    wcss = []
    for k in range(1, 11):
        kmeans = KMeans(n_clusters=k, init='k-means++',
                        max_iter=300, n_init=10, random_state=0)
        kmeans.fit(scaled_df)
        wcss.append(kmeans.inertia_)

    return jsonify({"k": list(range(1, 11)), "wcss": wcss})


@app.route('/biplot', methods=['GET'])
def biplot():

    # Load data into pandas DataFrame
    data = get_orginal_data()
    scaler = StandardScaler()

    # created scaled version of DataFrame
    scaled_df = pd.DataFrame(scaler.fit_transform(data), columns=["age",
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

    # # Export data to JSON
    # with open('data.json', 'w') as f:
    #     json.dump(data, f)

    return render_template('biplot.html', taskJS="biplot", data=data)


@app.route('/scatterplotmatrix', methods=['GET'])
def extra():

    data = get_orginal_data()
    scaler = StandardScaler()

    # created scaled version of DataFrame
    scaled_df = pd.DataFrame(scaler.fit_transform(data), columns=["age",
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

    json_data = json.dumps(final_data.to_dict(orient='records'))
    attributes = scaled_df.columns[top_indices]

    return render_template('scattermatrix.html', taskJS="scattermatrix", data=json_data, color_indices=color_indices)


@app.route('/scatterplotmatrixdata', methods=['GET', 'POST'])
def scatterplotmatrixdata():
    cl = request.get_json()

    data = get_orginal_data()
    scaler = StandardScaler()

    # created scaled version of DataFrame
    scaled_df = pd.DataFrame(scaler.fit_transform(data), columns=["age",
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

    # Perform k-means clustering on top 3 attributes
    kmeans = KMeans(n_clusters=3)
    kmeans.fit(scaled_df[scaled_df.columns[top_indices]])
    scaled_df['cluster'] = kmeans.labels_

    color_indices = list(set(scaled_df['cluster']))
    # Create scatterplot matrix using D3
    import json
    columns1 = cl['data']
    columns1.append('cluster')

    # Convert data to JSON format
    final_data = pd.DataFrame(scaled_df, columns=columns1)

    json_data = json.dumps(final_data.to_dict(orient='records'))

    attributes = scaled_df.columns[top_indices]

    return jsonify({"data": final_data.to_dict(orient='records'), "color_indices": color_indices})


@app.route('/data3', methods=['GET', 'POST'])
def receive_data1():

    intrinsic_dim = int(request.get_json()['data'])
    data = get_orginal_data()
    scaler = StandardScaler()

    # created scaled version of DataFrame
    scaled_df = pd.DataFrame(scaler.fit_transform(data), columns=["age",
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

    pca = PCA(n_components=10)
    pca.fit(scaled_df)
    X_pca = pca.transform(scaled_df)
    di = intrinsic_dim
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

    # Calculate the squared sum of PCA loadings for each attribute
    loadings = pca.components_[:di].T
    squared_loadings = loadings ** 2
    sum_squared_loadings = squared_loadings.sum(axis=1)

    # Select the four attributes with the highest squared sum of PCA loadings
    indices = np.argsort(sum_squared_loadings)[::-1][:4]
    selected_attributes = [columns[i] for i in indices]
    lt = [loadings[indices[0]], loadings[indices[1]],
          loadings[indices[2]], loadings[indices[3]]]
    # ltt = lt.T

    loadings_dict = {}
    columns = selected_attributes
    for i in range(len(selected_attributes)):
        attr_name = selected_attributes[i]
        # pc_name = 'PC' + str(i + 1)
        loadings_dict[attr_name] = {}
        for j in range(intrinsic_dim):
            pc_name = 'PC' + str(j + 1)
            # attr_name = columns[j]
            print(i, j)
            loading_value = lt[i][j]
            loadings_dict[attr_name][pc_name] = loading_value

    squared_sum = {}
    for pc_name, pc_loadings in loadings_dict.items():
        squared_sum[pc_name] = np.sum(np.square(list(pc_loadings.values())))

    for pc_name, pc_loadings in loadings_dict.items():
        pc_loadings["SQUARED SUM"] = squared_sum[pc_name]
    loadings_json = json.dumps(loadings_dict)

    return jsonify(loadings_dict)


@app.route('/data1')
def get_data1():
    data = get_orginal_data()

    scaler = StandardScaler()

    # created scaled version of DataFrame
    scaled_df = pd.DataFrame(scaler.fit_transform(data), columns=["age",
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
    kmeans = KMeans(n_clusters=3).fit(scaled_df)
    labels = kmeans.labels_

    return jsonify({"pcs": pcs.tolist(), "loadings": loadings.tolist(), "labels": labels.tolist()})


@app.route('/biplot.json')
def biplot_json():
    # Load the JSON file
    with open('biplot.json') as f:
        data = json.load(f)

    # Return the JSON data as a response
    return jsonify(data)


@app.route('/pcp_page', methods=['GET'])
def pcp_page():
    return render_template('pcp.html', taskJS="pcp")


@app.route('/pcp')
def pcp_plot():

    df = pd.read_csv("./final_data_with_cat.csv")
    attrs = ["age",
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
    "wage_eur",
    "work_rate",
    "club_contract_valid_until",
    "nationality_rank",
    "league_level",
    ]
    df = df[attrs]
    df.replace('', np.nan, inplace=True)
    df.replace('Not Found', np.nan, inplace=True)
    df.dropna(inplace=True)

    data = get_orginal_data()
    scaler = StandardScaler()
    scaled_df = pd.DataFrame(scaler.fit_transform(data), columns=["age",
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
    "wage_eur",
    # "work_rate",
    # "club_contract_valid_until",
    # "nationality_rank",
    # "league_level",
    ])

    kmeans = KMeans(n_clusters=3).fit(scaled_df)
    labels = kmeans.labels_
    df['color'] = labels
    # df = df.sample(1000)
    return json.dumps(df.to_json(orient='records'))


@app.route('/mdspcp')
def mdspcp_plot():
    data = get_orginal_data()
    scaler = StandardScaler()
    scaler = StandardScaler()
    scaled_df = pd.DataFrame(scaler.fit_transform(data), columns=["age",
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

    kmeans = KMeans(n_clusters=3).fit(scaled_df)
    labels = kmeans.labels_
    data['color'] = labels
    return json.dumps(data.to_json(orient='records'))


if __name__ == "__main__":
    app.run(debug=True)

# @app.route('/mds',methods=['GET'])
# def mds():
#     # data = raw_with_kmeans
#     data=get_orginal_data()

#     scaler = StandardScaler()

#     #created scaled version of DataFrame
#     scaled_df=pd.DataFrame(scaler.fit_transform(data), columns=['CRIMINAL_CASES','AGE','ASSETS','LIABILITIES','GENERAL_VOTES','POSTAL_VOTES','TOTAL_VOTES','TOTAL_ELECTORS_IN_CONSTITUENCY','TOTAL_VOTES_POLLED_IN_CONSTITUENCY','TOTAL_ELECTORS'])

#     # data=data.sample(n = 500)
#     data_without_clusters = scaled_df
#     print(data_without_clusters.shape)
#     mds_data = manifold.MDS(n_components=2,metric=True,dissimilarity='euclidean').fit_transform(data_without_clusters)
#     mds_data = np.hstack((mds_data,data['color'].to_numpy().reshape(500,1)))
#     print(mds_data.shape)

    # return render_template('mds.html',taskJS="mds")
    # df = pd.DataFrame(data = mds_data, columns = ['first', 'second','color'])
    # return json.dumps(df.to_json())
