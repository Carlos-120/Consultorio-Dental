// src/components/RegisterForm.js
import React, { useState } from "react";
import { register } from "../services/authServices";

export default function Register() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("doctor");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ correo, password, rol });
      setMensaje("¡Usuario registrado con éxito!");
    } catch (error) {
      setMensaje(error.response?.data?.mensaje || "Error al registrar.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Correo" value={correo} onChange={e => setCorreo(e.target.value)} required />
      <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
      <select value={rol} onChange={e => setRol(e.target.value)}>
        <option value="admin">Admin</option>
        <option value="doctor">Doctor</option>
        <option value="secretaria">Secretario/a</option>
      </select>
      <button type="submit">Registrarse</button>
      <div>{mensaje}</div>
    </form>
  );
}


