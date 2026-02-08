import { useState } from "react"

export default function CityAspects({
  env1, setEnv1, env2, setEnv2, env3, setEnv3, env4, setEnv4,
  infr1, setInfr1, infr2, setInfr2, infr3, setInfr3, infr4, setInfr4,
  soc1, setSoc1, soc2, setSoc2, soc3, setSoc3, soc4, setSoc4,
  econ1, setEcon1, econ2, setEcon2, econ3, setEcon3, econ4, setEcon4,
  onGenerateCity
}) {
  const [viewSet, setViewSet] = useState("Environment");

  const setCity = async (inputCity) => {
    if (inputCity === "New York City, USA") {
      setEnv1(40);setEnv2(75);setEnv3(85);setEnv4(60);
      setInfr1(90);setInfr2(95);setInfr3(95);setInfr4(20);
      setSoc1(60);setSoc2(80);setSoc3(80);setSoc4(85);
      setEcon1(90);setEcon2(95);setEcon3(70);setEcon4(75);
    }
    else if (inputCity === "Los Angeles, USA") {
      setEnv1(35);setEnv2(50);setEnv3(30);setEnv4(75);
      setInfr1(45);setInfr2(40);setInfr3(90);setInfr4(65);
      setSoc1(75);setSoc2(85);setSoc3(80);setSoc4(30);
      setEcon1(85);setEcon2(90);setEcon3(75);setEcon4(60);
    }
    else if (inputCity === "Chicago, USA") {
      setEnv1(55);setEnv2(65);setEnv3(90);setEnv4(40);
      setInfr1(60);setInfr2(70);setInfr3(60);setInfr4(55);
      setSoc1(70);setSoc2(80);setSoc3(75);setSoc4(15);
      setEcon1(80);setEcon2(70);setEcon3(65);setEcon4(55);
    }
    else if (inputCity === "New Delhi, India") {
      setEnv1(50);setEnv2(15);setEnv3(35);setEnv4(60);
      setInfr1(85);setInfr2(65);setInfr3(50);setInfr4(30);
      setSoc1(85);setSoc2(55);setSoc3(45);setSoc4(85);
      setEcon1(70);setEcon2(40);setEcon3(50);setEcon4(40);
    }
    else if (inputCity === "Jakarta, Indonesia") {
      setEnv1(20);setEnv2(30);setEnv3(25);setEnv4(95);
      setInfr1(80);setInfr2(45);setInfr3(70);setInfr4(35);
      setSoc1(65);setSoc2(50);setSoc3(60);setSoc4(70);
      setEcon1(65);setEcon2(45);setEcon3(45);setEcon4(45);
    }
    else if (inputCity === "Shanghai, China") {
      setEnv1(45);setEnv2(55);setEnv3(60);setEnv4(70);
      setInfr1(95);setInfr2(90);setInfr3(30);setInfr4(45);
      setSoc1(60);setSoc2(75);setSoc3(90);setSoc4(40);
      setEcon1(85);setEcon2(75);setEcon3(90);setEcon4(50);
    }
    else if (inputCity === "Seoul, South Korea") {
      setEnv1(60);setEnv2(60);setEnv3(85);setEnv4(40);
      setInfr1(90);setInfr2(98);setInfr3(25);setInfr4(50);
      setSoc1(55);setSoc2(95);setSoc3(95);setSoc4(10);
      setEcon1(85);setEcon2(80);setEcon3(95);setEcon4(60);
    }
    else {
      setEnv1(100);setEnv2(100);setEnv3(100);setEnv4(0);
      setInfr1(70);setInfr2(100);setInfr3(0);setInfr4(100);
      setSoc1(0);setSoc2(100);setSoc3(100);setSoc4(50);
      setEcon1(100);setEcon2(10);setEcon3(80);setEcon4(90);
    }
    onGenerateCity();
  }

  return (
    <div>
      <h2>Create your city!</h2>
      <select for="aspect-select" onChange={(e) => setViewSet(e.target.value)}>
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
      <hr></hr>
      <select for="pre-built" onChange={(e) => setCity(e.target.value)}>
        <option value={"New York City, USA"}>New York City, USA</option>
        <option value={"Los Angeles, USA"}>Los Angeles, USA</option>
        <option value={"Chicago, USA"}>Chicago, USA</option>
        <option value={"New Delhi, India"}>New Delhi, India</option>
        <option value={"Jakarta, Indonesia"}>Jakarta, Indonesia</option>
        <option value={"Shanghai, China"}>Shanghai, China</option>
        <option value={"Seoul, South Korea"}>Seoul, South Korea</option>
        <option value={"Utopia"}>Utopia</option>
      </select>
    </div>
  )
}