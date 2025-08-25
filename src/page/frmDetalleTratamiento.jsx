import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/from.css";

const RegisterDetalleTratamiento = () => {
  const [idCita, setIdCita] = useState('');
  const [idTratamiento, setIdTratamiento] = useState('');
  const [citas, setCitas] = useState([]);
  const [tratamientos, setTratamientos] = useState([]);
  const [observaciones, setObservaciones] = useState('');
  const [precioFinal, setPrecioFinal] = useState('');
  const [mensaje, setMensaje] = useState('');

  // Función para cargar citas y tratamientos
  useEffect(() => {
    // Obtener citas
    axios.get("http://localhost:3000/api/citas")
      .then(response => setCitas(response.data))
      .catch(error => console.error('Error al obtener citas:', error));

    // Obtener tratamientos
    axios.get("http://localhost:3000/api/tratamientos")
      .then(response => setTratamientos(response.data))
      .catch(error => console.error('Error al obtener tratamientos:', error));
  }, []);

  // Manejador de submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación
    if (!idCita || !idTratamiento || !precioFinal) {
      setMensaje('Todos los campos son obligatorios');
      return;
    }

    const data = {
      id_cita: idCita,
      id_tratamiento: idTratamiento,
      observaciones,
      precio_final: precioFinal,
    };

    try {
      // Enviar los datos para registrar el tratamiento en la cita
      await axios.post('http://localhost:3000/api/tratamientos/detalle/register', data);
      setMensaje('¡Tratamiento registrado con éxito!');
      setIdCita('');
      setIdTratamiento('');
      setObservaciones('');
      setPrecioFinal('');
    } catch (error) {
      setMensaje('Error al registrar el tratamiento.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Selección de Cita */}
      <select onChange={(e) => setIdCita(e.target.value)} value={idCita}>
        <option value="">Seleccionar Cita</option>
        {citas.map((cita) => (
          <option key={cita.id_cita} value={cita.id_cita}>
            Cita ID: {cita.id_cita} - {cita.fecha} {cita.hora}
          </option>
        ))}
      </select>

      {/* Selección de Tratamiento */}
      <select onChange={(e) => setIdTratamiento(e.target.value)} value={idTratamiento}>
        <option value="">Seleccionar Tratamiento</option>
        {tratamientos.map((tratamiento) => (
          <option key={tratamiento.id_tratamiento} value={tratamiento.id_tratamiento}>
            {tratamiento.nombre}
          </option>
        ))}
      </select>

      {/* Observaciones */}
      <textarea
        placeholder="Observaciones"
        value={observaciones}
        onChange={(e) => setObservaciones(e.target.value)}
      />

      {/* Precio Final */}
      <input
        type="number"
        placeholder="Precio Final"
        value={precioFinal}
        onChange={(e) => setPrecioFinal(e.target.value)}
        required
      />

      <button type="submit">Registrar Tratamiento</button>

      {mensaje && <div>{mensaje}</div>}
    </form>
  );
};

export default RegisterDetalleTratamiento;
