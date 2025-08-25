import "../styles/from.css";
import React, { useState } from 'react';
import axios from 'axios';

const RegisterTratamiento = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [costo, setCosto] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !costo) {
      setMensaje('El nombre y el costo son obligatorios');
      return;
    }

    const data = {
      nombre,
      descripcion,
      costo,
    };

    try {
      // Enviar los datos para registrar el tratamiento
      await axios.post('http://localhost:3000/api/tratamientos/register', data);
      setMensaje('¡Tratamiento registrado con éxito!');
      setNombre('');
      setDescripcion('');
      setCosto('');
    } catch (error) {
      setMensaje('Error al registrar el tratamiento');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre del Tratamiento"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <textarea
        placeholder="Descripción del Tratamiento"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />
      <input
        type="number"
        placeholder="Costo del Tratamiento"
        value={costo}
        onChange={(e) => setCosto(e.target.value)}
        required
      />
      <button type="submit">Registrar Tratamiento</button>
      {mensaje && <div>{mensaje}</div>}
    </form>
  );
};

export default RegisterTratamiento;
