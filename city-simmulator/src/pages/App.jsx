import Footer from "../components/Footer"
import Nav from "../components/Nav"

export default function App() {

  return (
    <>
      <Nav />
    <div className="container">
      <div className="left col">
        <p>left column</p>
      </div>
      <div className="middle col">
        <p>middle column</p>
      </div>
      <div className="right col">
        <p>right column</p>
      </div>
    </div>
      <Footer />
    </>
  )
}