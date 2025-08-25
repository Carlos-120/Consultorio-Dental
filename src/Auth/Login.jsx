import "../styles/login.css";

import React, { useState } from "react";
import { login } from "../services/authServices";

export default function LoginForm() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await login({ correo, password });
    if (res.data.token) {
      // Guarda el token en el localStorage
      localStorage.setItem("token", res.data.token);
      setMensaje("¡Login exitoso! Bienvenido " + res.data.usuario.correo);
      // Redirige a una página protegida o al home
      window.location.href = "/";
    }
  } catch (error) {
    setMensaje(error.response?.data?.mensaje || "Error al iniciar sesión.");
  }
};


  return (
    <form onSubmit={handleSubmit}>
      <div className="form-grid">
        <input type="email" placeholder="Correo" value={correo} onChange={e => setCorreo(e.target.value)} required />
      </div>
      <div className="form-grid">
              <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />

      </div>
      <button type="submit">Iniciar sesión</button>
      <div>{mensaje}</div>
    </form>
  );
}
