import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from "./Components/Register"
import Login from "./Components/Login"


function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/register' element={<Register />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/' element={''}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App