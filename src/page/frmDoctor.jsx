// /frontend/src/components/frmDoctor.jsx
import React, { useState } from 'react';
import { registerDoctor } from '../services/doctorServices';
import "../styles/from.css";

const RegisterDoctor = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [genero, setGenero] = useState('masculino');
  const [cedula, setCedula] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { nombre, apellido, genero, cedula, especialidad, telefono, correo };
    try {
      await registerDoctor(data);
      setMensaje('¡Doctor registrado con éxito!');
    } catch (error) {
      setMensaje(error.response?.data?.mensaje || 'Error al registrar el doctor.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
      <input type="text" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
      <select value={genero} onChange={(e) => setGenero(e.target.value)}>
        <option value="masculino">Masculino</option>
        <option value="femenino">Femenino</option>
        <option value="otro">Otro</option>
      </select>
      <input type="text" placeholder="Cédula" value={cedula} onChange={(e) => setCedula(e.target.value)} required />
      <input type="text" placeholder="Especialidad" value={especialidad} onChange={(e) => setEspecialidad(e.target.value)} required />
      <input type="text" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
      <input type="email" placeholder="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
      <button type="submit">Registrar Doctor</button>
      <div>{mensaje}</div>
    </form>
  );
};

export default RegisterDoctor;
