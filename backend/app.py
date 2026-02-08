import pandas as pd
import numpy as np

features = [
    "green_space", "air_quality", "water", "climate_risk",
    "housing_density", "transit", "road_dependence", "energy_mix",
    "inequality", "healthcare", "education", "population_growth",
    "job_diversity", "cost_of_living", "automation", "tax_structure"
]

# generate synthetic cities dataset (10000 cities)
# each city having random starting conditions with all features ∈ [0,100]

n = 10000

df = pd.DataFrame({f: np.random.uniform(0, 100, n) for f in features})

# output scores: livability (quality of life), sustainability (resource viabilty), resilience (survival from disasters), equity (dist. of benefits)
# dependent on features of city development

livability = (0.25 * df.green_space +
              0.30 * df.air_quality +
              0.20 * df.healthcare +
              0.20 * df.education -
              0.25 * df.inequality -
              0.15 * df.cost_of_living)

sustainability = (0.30 * df.green_space + 
                  0.35 * df.energy_mix + 
                  0.30 * df.water - 
                  0.25 * df.climate_risk - 
                  0.15 * df.road_dependence)

resilience = (0.30 * df.transit + 
              0.20 * df.job_diversity + 
              0.25 * df.energy_mix - 
              0.35 * df.climate_risk - 
              0.15 * df.population_growth)

equity = (0.40 * (100 - df.inequality) + 
          0.25 * df.healthcare + 
          0.15 * df.job_diversity +
          0.20 * df.education - 
          0.20 * df.cost_of_living + 
          0.15 * df.tax_structure)

# consider that two cities with the exact same policies need not end up with the same outcomes
# underlying unknown noise/randomness (adding random shifts into the model)

for score in [livability, sustainability, resilience, equity]:
    score += np.random.normal(0, 5, n)

# using random forest in skicit learn to train ML models
# learning the complex relations between features and detecting the patterns

targets = {"Livability" : livability,
           "Sustainability" : sustainability,
           "Resilience" : resilience,
           "Equity" : equity}

from sklearn.ensemble import RandomForestRegressor

models = {}

for name in targets:
    score = targets[name]
    model = RandomForestRegressor(n_estimators = 200)
    model.fit(df, score)
    models[name] = model

# reads each slider values in a dictionary format, score each output based on this, and return

def score_city(city_dict):
    table = pd.DataFrame([city_dict]) 
    scores = {}

    for name, model in models.items():
        prediction = model.predict(table)   
        scores[name] = round(float(prediction[0]), 2)

    overall_score = sum(scores.values()) / 4
    scores["Overall_Score"] = round(overall_score, 2)

    return scores

# see how current livability, sustainability, and resilience, equity scores to predict the future within 0-100 years, in 10 year increments

def generate_timeline(initial_scores):
    curr_state = np.array([initial_scores["Livability"],
                           initial_scores["Sustainability"],
                           initial_scores["Resilience"], 
                           initial_scores["Equity"], 
                           initial_scores["Overall_Score"]])
    timeline = []
    timeline.append(curr_state.copy()) # year 0 is the current score

    for decade in range(1, 11):
        stress = np.mean(100 - curr_state[:4])
        
        # determining growth or decay

        if stress > 45:
            delta = -(stress - 45) / 10
        elif stress < 30:
            delta = (30 - stress) / 15
        else:
            delta = np.random.normal(0, 0.2)

        curr_state[:4] = np.clip(curr_state[:4] + delta, 0, 100)
        curr_state[4] = np.mean(curr_state[:4])
        timeline.append(np.round(curr_state.copy(), 2))
    
    return np.array(timeline)

# this part is from gemini - how to implement flask with python to be used by react

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # This allows React to talk to Python

@app.route('/simulate', methods=['POST'])
def simulate():
    # 1. Receive the slider values from the React UI
    city_data = request.json 
    
    # 2. Run your functions
    initial_scores = score_city(city_data)
    timeline_matrix = generate_timeline(initial_scores)
    
    # 3. Format the timeline so React can graph it easily
    # We turn the matrix into a list of objects
    history = []
    for i, row in enumerate(timeline_matrix):
        history.append({
            "year": i * 10,
            "Livability": row[0],
            "Sustainability": row[1],
            "Resilience": row[2],
            "Equity": row[3],
            "Overall": row[4]
        })

    return jsonify({
        "current": initial_scores,
        "timeline": history
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)