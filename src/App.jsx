import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Servicios from "./components/Servicios";
import Contacto from "./components/Contacto";
import Login from "./Auth/Login";
import Register from "./Auth/Register";

import Doctor from "./page/frmDoctor";
import Paciente from "./page/frmPacientes";
import Historial from "./page/frmHistorial";
import Cita from "./page/frmCita";               
import Tratamiento from "./page/frmTratamiento";
import DetalleTratamiento from "./page/frmDetalleTratamiento";

import Doctores from "./page/frmDoctores";
import Resumen from "./page/frmResumenPaciente";

import ProtectedRoute from "./components/ProtectedRoute";
import "./styles/global.css";

function Home() {
  return (
    <>
      <Hero />
      <Servicios />
      <Contacto />
    </>
  );
}

function NotFound() {
  return (
    <section className="section container">
      <h2 className="section-title">Página no encontrada</h2>
      <p className="section-subtitle">La ruta solicitada no existe.</p>
    </section>
  );
}

export default function App() {
  const rutasPrivadas = [
    ["/doctores", <Doctores />],
    ["/resumen", <Resumen />],           
    ["/doctor", <Doctor />],
    ["/pacientes", <Paciente />],
    ["/historial", <Historial />],
    ["/tratamiento", <Tratamiento />],
    ["/detalle_tratamiento", <DetalleTratamiento />],
    ["/cita", <Cita />],
  ];

  return (
    <div className="container">
      {/* Barra lateral fija */}
      <Navbar />

      {/* Contenido principal */}
      <div className="main-content">
        <Routes>
          {/* Inicio público */}
          <Route path="/" element={<Home />} />

          {/* Rutas públicas */}
          <Route path="/login" element={<Login />} />

          {/* Solo admin puede registrar usuarios */}
          <Route
            path="/register"
            element={
              <ProtectedRoute rolesPermitidos={["admin"]}>
                <Register />
              </ProtectedRoute>
            }
          />

          {/* Rutas protegidas */}
          {(rutasPrivadas ?? [])
            .filter((item) => Array.isArray(item) && item.length >= 2 && item[0] && item[1])
            .map(([path, element]) => (
              <Route
                key={path}
                path={path}
                element={
                  <ProtectedRoute rolesPermitidos={["admin", "doctor", "secretaria"]}>
                    {element}
                  </ProtectedRoute>
                }
              />
            ))}

          {/* Extras */}
          <Route path="/inicio" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}
