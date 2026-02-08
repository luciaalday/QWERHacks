import { useState } from "react"

export default function CityAspects() {
  const [env1, setEnv1] = useState(50);
  const [env2, setEnv2] = useState(50);
  const [env3, setEnv3] = useState(50);
  const [env4, setEnv4] = useState(50);
  const [infr1, setInfr1] = useState(50);
  const [infr2, setInfr2] = useState(50);
  const [infr3, setInfr3] = useState(50);
  const [infr4, setInfr4] = useState(50);
  const [soc1, setSoc1] = useState(50);
  const [soc2, setSoc2] = useState(50);
  const [soc3, setSoc3] = useState(50);
  const [soc4, setSoc4] = useState(50);
  const [econ1, setEcon1] = useState(50);
  const [econ2, setEcon2] = useState(50);
  const [econ3, setEcon3] = useState(50);
  const [econ4, setEcon4] = useState(50);

  const generateCity = async () => {

  }


  return (
    <div>
      <p>City inputs</p>
      <h2>Environment</h2>
        <input type="range" min="1" max="100" onChange={setEnv1} value={env1} class="slider"/>
        <input type="range" min="1" max="100" onChange={setEnv2} value={env2} class="slider"/>
        <input type="range" min="1" max="100" onChange={setEnv3} value={env3} class="slider"/>
        <input type="range" min="1" max="100" onChange={setEnv4} value={env4} class="slider"/>
      <h2>Infrastructure</h2>
        <input type="range" min="1" max="100" onChange={setInfr1} value={infr1} class="slider"/>
        <input type="range" min="1" max="100" onChange={setInfr2} value={infr2} class="slider"/>
        <input type="range" min="1" max="100" onChange={setInfr3} value={infr3} class="slider"/>
        <input type="range" min="1" max="100" onChange={setInfr4} value={infr4} class="slider"/>
      <h2>Society</h2>
        <input type="range" min="1" max="100" onChange={setSoc1} value={soc1} class="slider"/>
        <input type="range" min="1" max="100" onChange={setSoc2} value={soc2} class="slider"/>
        <input type="range" min="1" max="100" onChange={setSoc3} value={soc3} class="slider"/>
        <input type="range" min="1" max="100" onChange={setSoc4} value={soc4} class="slider"/>
      <h2>Economy</h2>
        <input type="range" min="1" max="100" onChange={setEcon1} value={econ1} class="slider"/>
        <input type="range" min="1" max="100" onChange={setEcon2} value={econ2} class="slider"/>
        <input type="range" min="1" max="100" onChange={setEcon3} value={econ3} class="slider"/>
        <input type="range" min="1" max="100" onChange={setEcon4} value={econ4} class="slider"/>

      <button onClick={generateCity}>Create city!</button>
    </div>
  )
}