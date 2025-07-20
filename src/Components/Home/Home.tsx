import { Link } from "react-router-dom"
import Nav from "../Nav/Nav"

function Home() {
  return (
    <div className="container-home w-full h-500 bg-[#040019]">
      <div className="content w-[90%] flex mx-auto">
        <header className="w-full">
          <Nav />
          <div className="hero-language flex row w-160 mx-auto justify-between items-center mt-20">
            <Link to="/issues/language/mysql">
              <img src="/images/language/mysql.svg" alt="" />
            </Link>
            <Link to="/">
              <img src="/images/language/java.svg" alt="" />
            </Link>
            <Link to="/">
              <img src="/images/language/react.svg" alt="" />
            </Link>
            <Link to="/">
              <img src="/images/language/html.svg" alt="" />
            </Link>
            <Link to="/">
              <img src="/images/language/cpp.svg" alt="" />
            </Link>
            <Link to="/">
              <img src="/images/language/cs.svg" alt="" />
            </Link>
            <Link to="/">
              <img src="/images/language/python.svg" alt="" />
            </Link>
          </div>
          <div className="line w-160 h-0.5 bg-white mx-auto mt-5"></div>
        </header>
      </div>
    </div>
  )
}



export default Home