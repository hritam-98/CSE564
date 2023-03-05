import pandas as pd
import numpy as np
from random import sample

def originalData():
    df = pd.read_csv("final_data.csv")
    features  = ["age",
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
    df = df[features]
    df = df.dropna()
    print(df)
    return df