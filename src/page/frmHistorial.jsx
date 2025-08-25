import React, { useState } from 'react';
import axios from 'axios';
import "../styles/from.css";

const RegisterHistorial = () => {
  const [cedulaPaciente, setCedulaPaciente] = useState('');
  const [idPaciente, setIdPaciente] = useState('');
  const [idCita, setIdCita] = useState('');
  const [fechaCita, setFechaCita] = useState('');  // Asegúrate de que este estado sea actualizado correctamente
  const [diagnostico, setDiagnostico] = useState('');
  const [notas, setNotas] = useState('');
  const [mensaje, setMensaje] = useState('');

  const [paciente, setPaciente] = useState({});
  const [citas, setCitas] = useState([]);  // Estado para almacenar las citas disponibles

  // Función para buscar paciente por cédula y obtener sus citas
  const buscarPaciente = async () => {
    if (!cedulaPaciente) {
      setMensaje('Por favor ingresa una cédula');
      return;
    }

    try {
      // Obtener el paciente por cédula
      const response = await axios.get(`http://localhost:3000/api/pacientes/buscar/${cedulaPaciente}`);
      setPaciente(response.data);
      setIdPaciente(response.data.id_paciente); // Establece el ID del paciente
      setMensaje('Paciente encontrado');

      // Obtener las citas del paciente usando el ID
      obtenerCitasPaciente(response.data.id_paciente);
    } catch (error) {
      setMensaje('Paciente no encontrado');
    }
  };

  // Función para obtener las citas del paciente
  const obtenerCitasPaciente = async (idPaciente) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/citas/por-cedula/${cedulaPaciente}`);
      setCitas(response.data);  // Guardar las citas en el estado
      if (response.data.length === 0) {
        setMensaje('No se encontraron citas para este paciente');
      }
    } catch (error) {
      setMensaje('Error al obtener citas');
    }
  };

  // Manejador de submit para registrar el historial clínico
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación
    if (!idCita || !fechaCita || !diagnostico) {
      setMensaje('La cita, fecha y el diagnóstico son obligatorios');
      return;
    }

    const data = {
      id_paciente: idPaciente,
      fecha_registro: fechaCita,  // Usamos la fecha de la cita seleccionada
      diagnostico,
      notas,
    };

    try {
      // Enviar los datos para registrar el historial clínico
      await axios.post('http://localhost:3000/api/historial/register', data);
      setMensaje('¡Historial clínico registrado con éxito!');
      setIdCita('');
      setDiagnostico('');
      setNotas('');
      setFechaCita('');
    } catch (error) {
      setMensaje('Error al registrar el historial clínico.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Buscar paciente por cédula */}
      <input
        type="text"
        placeholder="Cédula del Paciente"
        value={cedulaPaciente}
        onChange={(e) => setCedulaPaciente(e.target.value)}
      />
      <button type="button" onClick={buscarPaciente}>Buscar Paciente</button>

      <input
        type="text"
        placeholder="Nombre del Paciente"
        value={paciente.nombre || ''}
        disabled
      />
      <input
        type="text"
        placeholder="Apellido del Paciente"
        value={paciente.apellido || ''}
        disabled
      />

      {/* Selección de Cita */}
      <select onChange={(e) => {
        const citaSeleccionada = citas.find(cita => cita.id_cita === parseInt(e.target.value)); // Encuentra la cita seleccionada
        setIdCita(citaSeleccionada?.id_cita || ''); // Establece el ID de la cita seleccionada
        setFechaCita(citaSeleccionada?.fecha || '');  // Establecer la fecha de la cita seleccionada
      }} value={idCita}>
        <option value="">Seleccionar Cita</option>
        {citas.map((cita) => (
          <option key={cita.id_cita} value={cita.id_cita}>
            {cita.fecha} {cita.hora}
          </option>
        ))}
      </select>

      <textarea
        placeholder="Diagnóstico"
        value={diagnostico}
        onChange={(e) => setDiagnostico(e.target.value)}
        required
      />

      <textarea
        placeholder="Notas"
        value={notas}
        onChange={(e) => setNotas(e.target.value)}
      />

      <button type="submit">Registrar Historial Clínico</button>
      {mensaje && <div>{mensaje}</div>}
    </form>
  );
};

export default RegisterHistorial;
