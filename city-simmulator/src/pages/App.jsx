import CityAspects from "../components/CityAspects"
import CityOutput from "../components/CityOutput"
import Footer from "../components/Footer"
import Nav from "../components/Nav"
import Resources from "../components/Resources"

export default function App() {

  return (
    <>
    <Nav />
    <div className="container">
      <div className="left col">
        <CityAspects/>
      </div>
      <div className="middle col">
        <CityOutput />
      </div>
      <div className="right col">
        <Resources />
      </div>
    </div>
    <Footer />
    </>
  )
}