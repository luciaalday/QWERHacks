import { useState } from "react"
import CityAspects from "../components/CityAspects"
import CityOutput from "../components/CityOutput"
import Footer from "../components/Footer"
import Nav from "../components/Nav"
import Resources from "../components/Resources"

export default function App() {
  /** environment variables */
  const [env1, setEnv1] = useState(50);
  const [env2, setEnv2] = useState(50);
  const [env3, setEnv3] = useState(50);
  const [env4, setEnv4] = useState(50);
  /** infrastructure variables */
  const [infr1, setInfr1] = useState(50);
  const [infr2, setInfr2] = useState(50);
  const [infr3, setInfr3] = useState(50);
  const [infr4, setInfr4] = useState(50);
  /** society variables */
  const [soc1, setSoc1] = useState(50);
  const [soc2, setSoc2] = useState(50);
  const [soc3, setSoc3] = useState(50);
  const [soc4, setSoc4] = useState(50);
  /** economy variables */
  const [econ1, setEcon1] = useState(50);
  const [econ2, setEcon2] = useState(50);
  const [econ3, setEcon3] = useState(50);
  const [econ4, setEcon4] = useState(50);
  /** simulation results */
  const [simResults, setSimResults] = useState(null);

  const handleGenerateCity = async () => {
    // map sliders to the feature names expected by the backend
    const cityData = {
      green_space: Number(env1),
      air_quality: Number(env2),
      water: Number(env3),
      climate_risk: Number(env4),

      housing_density: Number(infr1),
      transit: Number(infr2),
      road_dependence: Number(infr3),
      energy_mix: Number(infr4),

      inequality: Number(soc1),
      healthcare: Number(soc2),
      education: Number(soc3),
      population_growth: Number(soc4),

      job_diversity: Number(econ1),
      cost_of_living: Number(econ2),
      automation: Number(econ3),
      tax_structure: Number(econ4),
    }

    try {
      const res = await fetch('http://localhost:5000/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cityData)
      })

      if (!res.ok) {
        console.error('Simulation request failed', res.statusText)
        return
      }

      const data = await res.json()
      setSimResults(data)
      console.log('Simulation result:', data)
    } catch (err) {
      console.error('Error calling simulation backend:', err)
    }
  }

  return (
    <>
    <Nav />
    <div className="container">
      <div className="left col">
        <CityAspects
          env1={env1} setEnv1={setEnv1}
          env2={env2} setEnv2={setEnv2}
          env3={env3} setEnv3={setEnv3}
          env4={env4} setEnv4={setEnv4}
          infr1={infr1} setInfr1={setInfr1}
          infr2={infr2} setInfr2={setInfr2}
          infr3={infr3} setInfr3={setInfr3}
          infr4={infr4} setInfr4={setInfr4}
          soc1={soc1} setSoc1={setSoc1}
          soc2={soc2} setSoc2={setSoc2}
          soc3={soc3} setSoc3={setSoc3}
          soc4={soc4} setSoc4={setSoc4}
          econ1={econ1} setEcon1={setEcon1}
          econ2={econ2} setEcon2={setEcon2}
          econ3={econ3} setEcon3={setEcon3}
          econ4={econ4} setEcon4={setEcon4}
          onGenerateCity={handleGenerateCity}
        />
      </div>
      <div className="middle col">
        <CityOutput results={simResults} />
      </div>
      <div className="right col">
        <Resources results={simResults} />
      </div>
    </div>
    <Footer />
    </>
  )
}