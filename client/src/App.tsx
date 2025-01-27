import '@fortawesome/fontawesome-free/css/all.min.css';
import Footer from "./shared/Footer/Footer"
import Nav from "./components/Nav"
import Hero from './components/Hero';


function App() {
  return (
    <>
      <Nav/>
      <Hero/>
      <h1 className="font-font text-3xl text-red-400">Hello World</h1>
      <Footer></Footer>
    </>
  )
}

export default App