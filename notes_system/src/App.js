import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Navbar from "./component/navbar"
import Breadcrumbs from "./component/breadcrumbs";

function App() {
  return (
  <BrowserRouter>
      <Navbar/>
      <Breadcrumbs />
      <Routes>
        <Route path="/" element= {<Home />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
