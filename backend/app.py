import pandas as pd
import numpy as np

features = [
    "green_space", "air_quality", "water", "climate_risk",
    "housing_density", "transit", "road_dependence", "energy_mix",
    "inequality", "healthcare", "education", "population_growth",
    "job_diversity", "cost_of_living", "automation", "tax_structure"
]

# generate synthetic cities dataset (2000 cities)
# each city having random starting conditions with all features ∈ [0,100]

n = 2000

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
    model = RandomForestRegressor(n_estimators = 100)
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

# advice based on segmentation segment

advice_map = {
    "Livability" : {
        "General City Resident" : "organizing or participating in local events",
        "Student" : "creating or participating in school clubs to initiate sustainability efforts",
        "Business Owner" : "providing jobs and essential services (e.g. grocery stores, cafes)",
        "Public Official" : "allocating tax revenue to public infrastructure spaces (e.g. libraries, healthcare, safe streets)"
    }, "Sustainability" : {
        "General City Resident" : "reducing water waste, choose public transit options",
        "Student" : "encouraging recycling/composting programs and reusing materials",
        "Business Owner" : "practicing being a “circular economy,” incentivizing reusing goods, reducing package, and sourcing locally to reduce transport emission",
        "Public Official" : "passing zoning laws that prevent urban sprawl and mandating green building codes"
    }, "Resilience" : {
        "General City Resident" : "getting to know your neighbors to comfortably share resources in case of a disaster",
        "Student" : "reviewing school policies in common crises",
        "Business Owner" : "diversifying local supply chains so if one source fails, the city still has access to food or goods",
        "Public Official" : "investing in hard infrastructure (e.g. sea walls, backup power grids, emergency response systems)"
    }, "Equity" : {
        "General City Resident" : "supporting local, diverse businesses and voting for inclusive housing policies",
        "Student" : "learning digital literacy and budgeting advocacy",
        "Business Owner" : "practicing fair-wage hiring and providing entry-level opportunities for marginalized groups",
        "Public Official" : "implementing progressive policies (subsidized transit passes, affordable housing mandates)"
    }
}

def get_recommendation(scores, role, year):
    categories = ["Livability", "Sustainability", "Resilience", "Equity"]

    smallest = min(categories, key = lambda x: scores[x])
    advice = advice_map[smallest].get(role)

    # dynamic sentence based on the year
    if year == 0:
        time_text = "currently"
    else:
        time_text = f"in year {year}"

    sentence = f"As a {role.lower()}, {time_text}, you can help fix your city's low {smallest.lower()} by {advice}!"
    return sentence

# based on the inputs, give recommendations on how to fix your lower score

def city_alert(cities, scores):
    categories = ["Livability", "Sustainability", "Resilience", "Equity"]

    if all(scores[cat] >= 90 for cat in categories):
        return "Perfect city! Try to maintain this balance!"
    
    smallest = min(categories, key = lambda x: scores[x])
    
    issue = ""

    if smallest == "Livability":
        if cities.get("air_quality") < 70: 
            issue = "polluted air levels"
        elif cities.get("inequality") > 40: 
            issue = "a wide wealth gap"
        elif cities.get("green_space") < 60: 
            issue = "a lack of parks and green space"
        elif cities.get("healthcare") < 55: 
            issue = "poor access to medical services"
        elif cities.get("education") < 60: 
            issue = "low investment in schools"
        else: 
            issue = "the high cost of living"

    elif smallest == "Sustainability":
        if cities.get("energy_mix") < 50: 
            issue = "heavy reliance on fossil fuels"
        elif cities.get("green_space") < 60: 
            issue = "insufficient urban canopy"
        elif cities.get("water") < 60: 
            issue = "fragile water security"
        elif cities.get("climate_risk") > 50:
            issue = "unaddressed environmental threats"
        else: 
            issue = "high road dependence"

    elif smallest == "Resilience":
        if cities.get("climate_risk") > 40: 
            issue = "vulnerability to natural disasters"
        elif cities.get("transit") < 50: 
            issue = "a fragile transportation network"
        elif cities.get("energy_mix") < 50: 
            issue = "an unstable energy grid"
        elif cities.get("job_diversity") < 45: 
            issue = "an over-specialized, risky economy"
        else: 
            issue = "overwhelming population strain"

    elif smallest == "Equity":
        if cities.get("inequality") > 30: 
            issue = "a massive wealth gap"
        elif cities.get("healthcare") < 65: 
            issue = "unequal access to medical care"
        elif cities.get("cost_of_living") > 45: 
            issue = "unaffordable housing and goods"
        elif cities.get("education") < 65: 
            issue = "barriers to quality schooling"
        elif cities.get("job_diversity") < 50: 
            issue = "a lack of diverse career paths"
        else: 
            issue = "an inequitable tax structure"
    
    return f"City Alert: {smallest} is low due to {issue}."

# this part is from gemini - how to implement flask with python to be used by react

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # This allows React to talk to Python

@app.route('/simulate', methods=['POST'])
def simulate():
    city_data = request.json 
    
    # Extract role from UI (default to General Resident if not provided)
    role = city_data.get("role", "General City Resident")
    
    initial_scores = score_city(city_data)
    timeline_matrix = generate_timeline(initial_scores)
    
    history = []
    for i, row in enumerate(timeline_matrix):
        year = i * 10
        
        # Create a mini-dictionary for just this decade's scores
        # Index 0=Liv, 1=Sus, 2=Res, 3=Eq
        scores_this_decade = {
            "Livability": row[0],
            "Sustainability": row[1],
            "Resilience": row[2],
            "Equity": row[3]
        }
        
        # Get the specific advice for this decade
        decade_advice = get_recommendation(scores_this_decade, role, year)
        
        history.append({
            "year": year,
            "Livability": row[0],
            "Sustainability": row[1],
            "Resilience": row[2],
            "Equity": row[3],
            "Overall": row[4],
            "advice": decade_advice  # <--- React can now show this!
        })

    return jsonify({
        "current": initial_scores,
        "timeline": history
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)