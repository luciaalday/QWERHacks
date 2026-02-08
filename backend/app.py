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
        "General City Resident" : {
            "advice" : "organizing or participating in local events",
            "info" : [
                "https://www.eventbrite.com/b/ca--los-angeles/community/ (EventBrite", 
                "https://www.meetup.com/find/us--ca--los-angeles/ (MeetUp" , 
                "https://www.lapl.org/whats-on/calendar (LA Public Library"
            ]
        }, "Student" : {
            "advice:" : "creating or participating in school clubs to initiate sustainability efforts",
            "info" : [
                "https://esa.org/seeds/chapters/ (SEEDS Chapters",
                "https://projectgreenschools.org/start-a-ngss-chapter/ (National/International Green Schools Society"
            ]
        }, "Business Owner" : {
            "advice" : "providing jobs and essential services (e.g. grocery stores, cafes)",
            "info" : [
                "https://www.rd.usda.gov/about-rd/initiatives/healthy-food-financing-initiative (Healthy Food Financing Initiative",
                "https://www.sba.gov/funding-programs/loans (SBA Working Capital Pilot Program",
                "https://www.cleanenergyresourceteams.org/food-retail-improvement-and-development-grant-applications-due-march-10 (Food Retail Improvement and Development Grant - FRIDG"
            ]
        }, "Public Official" : {
            "advice" : "allocating tax revenue to public infrastructure spaces (e.g. libraries, healthcare, safe streets)",
            "info" : [
                "https://www.urbanlibraries.org/initiatives/advocacy (Urban Libraries Council",
                "https://www.astho.org/communications/blog/ (ASTHO - Public Health & Safety Policy",
                "https://www.smartgrowthamerica.org/programs-and-coalitions/national-complete-streets-coalition/ Smart Growth America - Complete Streets"
            ]
        }
    }, "Sustainability" : {
        "General City Resident" : {
            "advice" : "reducing water waste, choose public transit options",
            "info" : [
                "https://www.metro.net/riding/guide/ (LA Metro",
                "https://www.epa.gov/watersense/start-saving (US EPA"
            ]
        }, "Student" : {
            "advice" : "encouraging recycling/composting programs and reusing materials",
            "info" : [
                "https://calrecycle.ca.gov/recycle/schools/ (CA School Waste Reduction Program"
                "https://www.pepsicorecyclerally.com/ (Pepsico Recycle Rally Program"
            ]
        }, "Business Owner" : {
            "advice" : "practicing being a “circular economy,” incentivizing reusing goods, reducing package, and sourcing locally to reduce transport emission",
            "info" : [
                "https://www.ellenmacarthurfoundation.org/topics/circular-economy-introduction/overview (Circular Economy Introduction",
                "https://www.circle-economy.com/ (Circle Economy - Knowledge Hub",
                "https://exploreloop.com/en/ (Loop Global - Sustainable Package"
            ]
        }, "Public Official" : {
            "advice" : "passing zoning laws that prevent urban sprawl and mandating green building codes",
            "info" : [
                "https://www.smartgrowthamerica.org/programs-and-coalitions/center-for-zoning-solutions/ (Center for Zoning Solutions",
                "https://public-policies.usgbc.org/ (USGBC Policy Library",
                "https://progov21.org/ (ProGov21"
            ]
        }
    }, "Resilience" : {
        "General City Resident" : {
            "advice" : "getting to know your neighbors to comfortably share resources in case of a disaster",
            "info" : [
                "https://www.washoecounty.gov/em/preparedness/GettingToKnowYourNeighbors.php (Getting to Know Your Neighbors Guide",
                "https://zcralliance.org/resources/item/guide-to-facilitating-community-led-disaster-risk-management/ (Guide to Facilitating Community-Led Disaster Risk Management",
                "https://www.redcross.org/get-help/how-to-prepare-for-emergencies/mobile-apps.html (Red Cross Mobile Emergency App"
            ]
        }, "Student" : {
            "advice" : "reviewing school policies in common crises",
            "info" : [
                "https://www.csba.org/en/ProductsAndServices/PolicyServices/Gamut/GamutPolicy#gsc.tab=0 (CA School Boards Association GAMUT Policy",
                "https://docs.goohttps//www.cde.ca.gov/re/lr/do/ (CA Department of Education School Distinct Organization",
                "https://www.cde.ca.gov/be/ms/mm/sbestudentmemberinfo.asp (CA State Board of Education Student Member Application"
            ]
        }, "Business Owner" : {
            "advice" : "diversifying local supply chains so if one source fails, the city still has access to food or goods",
            "info" : [
                "https://www.usdalocalfoodportal.com/ (USDA Local Food Directory",
                "https://www.thecommonmarket.org/ (The Common Market",
                "https://www.nist.gov/mep (NIST Manufacturing Extension Partnership"
            ]
        }, "Public Official" : {
            "advice" : "investing in hard infrastructure (e.g. sea walls, backup power grids, emergency response systems)",
            "info" : [
                "https://www.weforum.org/stories/2025/10/how-investing-in-urban-resilience-can-foster-sustainable-growth/ (The Resilience Dividend - World Economic Forum",
                "https://infrastructurereportcard.org/ (Infrastructure Report Card",
                "https://www.fema.gov/grants/mitigation/learn/hazard-mitigation (FEMA Hazard Mitigation Grant Program"
            ]
        }
    }, "Equity" : {
        "General City Resident" : {
            "advice" : "supporting local, diverse businesses and voting for inclusive housing policies",
            "info" : [
                "https://www.senate.gov/senators/senators-contact.htm (Senators Information",
                "https://www.nga.org/governors/#GovContact (Governors Information",
                "https://www.house.gov/representatives (House of Representatives Information",
                "https://www.usmayors.org/mayors/ (Mayors Information"
            ]
        }, "Student" : {
            "advice" : "learning digital literacy and budgeting advocacy",
            "info" : [
                "https://sustain.ucla.edu/student-organizations/#undergrad (UCLA Student Organizations"
            ]
        }, "Business Owner" : {
            "advice" : "practicing fair-wage hiring and providing entry-level opportunities for marginalized groups",
            "info" : [
                "https://www.dol.gov/agencies/eta/wotc (Work Opportunity Tax Credit - WOTC", 
                "https://www.nelp.org/explore-the-issues/workers-with-records/resources-for-employers/ (Fair Chance Hiring Resources - NELP",
                "https://askearn.org/ (Employer Assistance and Resource Network - EARN"
            ]
        }, "Public Official" : {
            "advice" : "implementing progressive policies (subsidized transit passes, affordable housing mandates)",
            "info" : [
                "https://www.countyhealthrankings.org/strategies-and-solutions/what-works-for-health/strategies/individual-incentives-for-public-transportation (Individual Incentives for Public Transportation",
                "https://allincities.org/toolkit (All-In Cities Policy Toolkit",
                "https://planning.lacity.gov/plans-policies/initiatives-policies/housing (Los Angeles City Planning Housing Policy"
            ]
        }
    }
}

def get_recommendation(scores, role, year):
    categories = ["Livability", "Sustainability", "Resilience", "Equity"]

    if all(scores[cat] >= 90 for cat in categories):
        return {
            "advice_text" : "Great job! The city is thriving!",
            "links" : ["https://www.un.org/sustainabledevelopment/takeaction/ (Global Goals: Take Action"]
        }

    smallest = min(categories, key = lambda x: scores[x])
    role_data = advice_map[smallest].get(role, {})
    
    advice = role_data.get("advice", "contributing to city growth")
    links_list = role_data.get("links", [])

    # dynamic sentence based on the year
    if year == 0:
        time_text = "currently"
    else:
        time_text = f"in year {year}"

    sentence = f"As a {role.lower()}, {time_text}, you can help fix your city's low {smallest.lower()} by {advice}!"
    return {
        "advice_text" : sentence,
        "links" : links_list
    }

def get_role_advice(scores, role):
    """Get role-specific advice based on current city scores."""
    categories = ["Livability", "Sustainability", "Resilience", "Equity"]

    if all(scores[cat] >= 90 for cat in categories):
        return "Great job! The city is thriving!"

    smallest = min(categories, key = lambda x: scores[x])
    advice = advice_map[smallest].get(role)

    sentence = f"As a {role.lower()}, you can help fix your city's low {smallest.lower()} by {advice}!"
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

# realistic snapshots of major metros (approximate values based on our research) + sample utopia

real_cities = {
    "New York, USA": {
        "green_space": 40,
        "air_quality": 75,
        "water": 85,
        "climate_risk": 60,
        "housing_density": 90,
        "transit": 95,
        "road_dependence": 20,
        "energy_mix": 60,
        "inequality": 80,
        "healthcare": 80,
        "education": 85,
        "population_growth": 20,
        "job_diversity": 90,
        "cost_of_living": 95,
        "automation": 70,
        "tax_structure": 75
    },

    "Los Angeles, USA": {
        "green_space": 35,
        "air_quality": 50,
        "water": 30,
        "climate_risk": 75,
        "housing_density": 45,
        "transit": 40,
        "road_dependence": 90,
        "energy_mix": 65,
        "inequality": 75,
        "healthcare": 85,
        "education": 80,
        "population_growth": 30,
        "job_diversity": 85,
        "cost_of_living": 90,
        "automation": 75,
        "tax_structure": 60
    },

    "Chicago, USA": {
        "green_space": 55,
        "air_quality": 65,
        "water": 90,
        "climate_risk": 40,
        "housing_density": 60,
        "transit": 70,
        "road_dependence": 60,
        "energy_mix": 55,
        "inequality": 70,
        "healthcare": 80,
        "education": 75,
        "population_growth": 15,
        "job_diversity": 80,
        "cost_of_living": 70,
        "automation": 65,
        "tax_structure": 55
    },

    "New Delhi, India": {
        "green_space": 50,
        "air_quality": 15,
        "water": 35,
        "climate_risk": 60,
        "housing_density": 85,
        "transit": 65,
        "road_dependence": 50,
        "energy_mix": 30,
        "inequality": 85,
        "healthcare": 45,
        "education": 55,
        "population_growth": 85,
        "job_diversity": 70,
        "cost_of_living": 40,
        "automation": 50,
        "tax_structure": 40
    },

    "Jakarta, Indonesia": {
        "green_space": 20,
        "air_quality": 30,
        "water": 25,
        "climate_risk": 95,
        "housing_density": 80,
        "transit": 45,
        "road_dependence": 70,
        "energy_mix": 35,
        "inequality": 65,
        "healthcare": 50,
        "education": 60,
        "population_growth": 70,
        "job_diversity": 65,
        "cost_of_living": 45,
        "automation": 45,
        "tax_structure": 45
    },

    "Shanghai, China": {
        "green_space": 45,
        "air_quality": 55,
        "water": 60,
        "climate_risk": 70,
        "housing_density": 95,
        "transit": 90,
        "road_dependence": 30,
        "energy_mix": 45,
        "inequality": 60,
        "healthcare": 75,
        "education": 90,
        "population_growth": 40,
        "job_diversity": 85,
        "cost_of_living": 75,
        "automation": 90,
        "tax_structure": 50
    },

    "Seoul, South Korea": {
        "green_space": 60,
        "air_quality": 60,
        "water": 85,
        "climate_risk": 40,
        "housing_density": 90,
        "transit": 98,
        "road_dependence": 25,
        "energy_mix": 50,
        "inequality": 55,
        "healthcare": 95,
        "education": 95,
        "population_growth": 10,
        "job_diversity": 85,
        "cost_of_living": 80,
        "automation": 95,
        "tax_structure": 60
    },

    "Utopia": {
        "green_space": 100,
        "air_quality": 100,
        "water": 100,
        "climate_risk": 0,
        "housing_density": 70,
        "transit": 100,
        "road_dependence": 0,
        "energy_mix": 100,
        "inequality": 0,
        "healthcare": 100,
        "education": 100,
        "population_growth": 50,
        "job_diversity": 100,
        "cost_of_living": 10,
        "automation": 80,
        "tax_structure": 90
    }
}

# this part is from gemini - how to implement flask with python to be used by react

# --- FLASK IMPLEMENTATION ---
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

@app.route('/simulate', methods=['POST'])
def simulate():
    city_data = request.json

    # Extract role from UI
    role = city_data.get("role", "General City Resident")
    # Clean city_data for ML model
    model_input = {k: v for k, v in city_data.items() if k in features}

    initial_scores = score_city(model_input)
    timeline_matrix = generate_timeline(initial_scores)

    history = []
    for i, row in enumerate(timeline_matrix):
        year = i * 10
        scores_this_decade = {
            "Livability": row[0],
            "Sustainability": row[1],
            "Resilience": row[2],
            "Equity": row[3]
        }

        # get_recommendation now returns {"advice_text": "...", "links": [...]}
        rec_data = get_recommendation(scores_this_decade, role, year)

        history.append({
            "year": year,
            "Livability": row[0],
            "Sustainability": row[1],
            "Resilience": row[2],
            "Equity": row[3],
            "Overall": row[4],
            "advice": rec_data["advice_text"], # The string for the timeline
            "links": rec_data["links"]         # The links for that decade
        })

    return jsonify({
        "current": initial_scores,
        "timeline": history
    })

@app.route('/get-role-advice', methods=['POST'])
def get_advice_by_role_route():
    """Returns both the sentence AND the links for the Resources box."""
    data = request.json
    scores = data.get("scores", {})
    role = data.get("role", "General City Resident")
    
    # We use get_recommendation here because it returns the full dict with links
    # year=0 signifies 'currently'
    result = get_recommendation(scores, role, year=0)
    
    # Map the keys to match what Lucia's frontend is expecting
    return jsonify({
        "advice": result["advice_text"],
        "links": result["links"]
    })

# If you have a specific button for this, point it to the same logic
@app.route('/whatCanIdo', methods=['POST'])
def what_can_i_do():
    return get_advice_by_role_route()

if __name__ == '__main__':
    app.run(debug=True, port=5000)