import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { getUserFromToken, logout } from "../utils/auth";
import "../styles/navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false); // si no usas "open", puedes quitarlo
  const user = getUserFromToken();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <div className="layout-shell">
      {/* Barra lateral */}
      <nav className="navbar">
        <div className="nav-header">
          <Link to="/" className="brand" onClick={() => setOpen(false)}>
            Clinica Dental
          </Link>
        </div>

        <div className="nav-body">
          <ul className="nav-list">
            {/* Público */}
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                onClick={() => setOpen(false)}
              >
                Inicio
              </NavLink>
            </li>
            <li>
              <a href="#servicios" className="nav-link" onClick={() => setOpen(false)}>
                Servicios
              </a>
            </li>
            <li>
              <a href="#contacto" className="nav-link" onClick={() => setOpen(false)}>
                Contacto
              </a>
            </li>

            {/* No autenticado */}
            {!user && (
              <li>
                <Link to="/login" className="btn btn-primary" onClick={() => setOpen(false)}>
                  Iniciar sesión
                </Link>
              </li>
            )}

            {/* Autenticado */}
            {user && (
              <>
                <li>
                  <NavLink
                    to="/doctores"
                    className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                    onClick={() => setOpen(false)}
                  >
                    Doctores
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/resumen"
                    className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                    onClick={() => setOpen(false)}
                  >
                    Historial del Paciente
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/doctor"
                    className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                    onClick={() => setOpen(false)}
                  >
                    Añadir Doctores
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/pacientes"
                    className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                    onClick={() => setOpen(false)}
                  >
                    Añadir Pacientes
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/historial"
                    className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                    onClick={() => setOpen(false)}
                  >
                    Añadir Historial
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/tratamiento"
                    className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                    onClick={() => setOpen(false)}
                  >
                    Resetar Tratamiento
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/detalle_tratamiento"
                    className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                    onClick={() => setOpen(false)}
                  >
                    Añadir detalles de Tratamiento
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/cita"
                    className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                    onClick={() => setOpen(false)}
                  >
                    Agendar cita
                  </NavLink>
                </li>

                {/* Solo admin */}
                {user?.rol === "admin" && (
                  <li>
                    <NavLink
                      to="/register"
                      className={({ isActive }) => (isActive ? "btn btn-emerald active" : "btn btn-emerald")}
                      onClick={() => setOpen(false)}
                    >
                      Registrar usuario
                    </NavLink>
                  </li>
                )}
              </>
            )}
          </ul>
        </div>

        <div className="nav-footer">
          {user && (
            <button className="logout" onClick={handleLogout}>
              Cerrar sesión
            </button>
          )}
        </div>
      </nav>

      {/* Contenido de la página (recuerda darle padding-left en CSS) */}
      {/* <main className="main-content">...</main> */}
    </div>
  );
};

export default Navbar;
