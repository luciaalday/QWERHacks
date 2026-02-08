import { useState } from "react"

export default function CityAspects({
  env1, setEnv1, env2, setEnv2, env3, setEnv3, env4, setEnv4,
  infr1, setInfr1, infr2, setInfr2, infr3, setInfr3, infr4, setInfr4,
  soc1, setSoc1, soc2, setSoc2, soc3, setSoc3, soc4, setSoc4,
  econ1, setEcon1, econ2, setEcon2, econ3, setEcon3, econ4, setEcon4,
  onGenerateCity
}) {
  /** view set variables */
  const [viewSet, setViewSet] = useState("Environment");

  const handleViewChange = (aspect) => {
    setViewSet(aspect)
  }


  return (
    <div>
      <h2>Create your city!</h2>
      <select for="aspect-select" onChange={(e) => handleViewChange(e.target.value)}>
        <option value="Environment">Environment</option>
        <option value="Infrastructure">Infrastructure</option>
        <option value="Society">Society</option>
        <option value="Economy">Economy</option>
      </select>
      {viewSet === "Environment" &&
      <>
      <p>Green space</p>
      <div className="slider-container">
        <input type="range" min="1" max="100" onChange={(e)=>setEnv1(e.target.value)} value={env1} class="slider"/>
        <p>{env1}</p>
      </div>
      <p>Air quality</p>
      <div className="slider-container">
        <input type="range" min="1" max="100" onChange={(e)=>setEnv2(e.target.value)} value={env2} class="slider"/>
        <p>{env2}</p>
      </div>
      <p>Water</p>
      <div className="slider-container">
        <input type="range" min="1" max="100" onChange={(e)=>setEnv3(e.target.value)} value={env3} class="slider"/>
        <p>{env3}</p>
      </div>
      <p>Climate risk</p>
      <div className="slider-container">
        <input type="range" min="1" max="100" onChange={(e)=>setEnv4(e.target.value)} value={env4} class="slider"/>
        <p>{env4}</p>
      </div>
      </>
      }
      {viewSet === "Infrastructure" &&
      <>
      <p>Housing density</p>
      <div className="slider-container">
        <input type="range" min="1" max="100" onChange={(e)=>setInfr1(e.target.value)} value={infr1} class="slider"/>
        <p>{infr1}</p>
      </div>
      <p>Transit</p>
      <div className="slider-container">
        <input type="range" min="1" max="100" onChange={(e)=>setInfr2(e.target.value)} value={infr2} class="slider"/>
        <p>{infr2}</p>
      </div>
      <p>Road dependence</p>
      <div className="slider-container">
        <input type="range" min="1" max="100" onChange={(e)=>setInfr3(e.target.value)} value={infr3} class="slider"/>
        <p>{infr3}</p>
      </div>
      <p>Energy mix</p>
      <div className="slider-container">
        <input type="range" min="1" max="100" onChange={(e)=>setInfr4(e.target.value)} value={infr4} class="slider"/>
        <p>{infr4}</p>
      </div>
      </>
      }
      {viewSet === "Society" &&
      <>
      <p>Inequality</p>
      <div className="slider-container">
        <input type="range" min="1" max="100" onChange={(e)=>setSoc1(e.target.value)} value={soc1} class="slider"/>
        <p>{soc1}</p>
      </div>
      <p>Healthcare</p>
      <div className="slider-container">
        <input type="range" min="1" max="100" onChange={(e)=>setSoc2(e.target.value)} value={soc2} class="slider"/>
        <p>{soc2}</p>
      </div>
      <p>Education</p>
      <div className="slider-container">
        <input type="range" min="1" max="100" onChange={(e)=>setSoc3(e.target.value)} value={soc3} class="slider"/>
        <p>{soc3}</p>
      </div>
      <p>Population growth</p>
      <div className="slider-container">
        <input type="range" min="1" max="100" onChange={(e)=>setSoc4(e.target.value)} value={soc4} class="slider"/>
        <p>{soc4}</p>
      </div>
      </>}
      {viewSet === "Economy" &&
      <>
      <p>Job diversity</p>
      <div className="slider-container">
        <input type="range" min="1" max="100" onChange={(e)=>setEcon1(e.target.value)} value={econ1} class="slider"/>
        <p>{econ1}</p>
      </div>
      <p>Cost of living</p>
      <div className="slider-container">
        <input type="range" min="1" max="100" onChange={(e)=>setEcon2(e.target.value)} value={econ2} class="slider"/>
        <p>{econ2}</p>
      </div>
      <p>Automation</p>
      <div className="slider-container">
        <input type="range" min="1" max="100" onChange={(e)=>setEcon3(e.target.value)} value={econ3} class="slider"/>
        <p>{econ3}</p>
      </div>
      <p>Tax structure</p>
      <div className="slider-container">
        <input type="range" min="1" max="100" onChange={(e)=>setEcon4(e.target.value)} value={econ4} class="slider"/>
        <p>{econ4}</p>
      </div>
      </>}
      <button className="go" onClick={onGenerateCity}>Create city!</button>
    </div>
  )
}