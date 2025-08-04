import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Servicios from "./components/Servicios";
import Contacto from "./components/Contacto";
import Login from "./Auth/Login";
import Register from "./Auth/Register";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <Servicios />
            <Contacto />
          </>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
