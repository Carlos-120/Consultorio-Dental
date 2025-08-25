import React, { useState } from 'react';
import { registrarPaciente } from '../services/pacienteServices';
import "../styles/from.css";

const RegisterPacientes = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [genero, setGenero] = useState('masculino');
  const [cedula, setCedula] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [direccion, setDireccion] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Aseguramos que la fecha esté en el formato correcto (YYYY-MM-DD)
    const fechaFormateada = new Date(fechaNacimiento).toISOString().split('T')[0];

    const data = {
      nombre,
      apellido,
      genero,
      cedula,
      fecha_nacimiento: fechaFormateada, // Fecha convertida al formato correcto
      telefono,
      correo,
      direccion,
    };

    try {
      // Llamada a la función que registra el paciente
      await registrarPaciente(data);
      setMensaje('¡Paciente registrado con éxito!'); // Mensaje de éxito
    } catch (error) {
      setMensaje(error.response?.data?.mensaje || 'Error al registrar el paciente.'); // Manejo de errores
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Apellido"
        value={apellido}
        onChange={(e) => setApellido(e.target.value)}
        required
      />
      <select value={genero} onChange={(e) => setGenero(e.target.value)}>
        <option value="masculino">Masculino</option>
        <option value="femenino">Femenino</option>
        <option value="otro">Otro</option>
      </select>
      <input
        type="text"
        placeholder="Cédula"
        value={cedula}
        onChange={(e) => setCedula(e.target.value)}
        required
      />
      <input
        type="date"
        placeholder="Fecha de Nacimiento"
        value={fechaNacimiento}
        onChange={(e) => setFechaNacimiento(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
      />
      <input
        type="email"
        placeholder="Correo"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
      />
      <input
        type="text"
        placeholder="Dirección"
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)}
      />
      <button type="submit">Registrar Paciente</button>
      {mensaje && <div>{mensaje}</div>} {/* Mostrar mensaje de éxito o error */}
    </form>
  );
};

export default RegisterPacientes;
