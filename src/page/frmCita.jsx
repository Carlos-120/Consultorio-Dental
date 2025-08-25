import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { registrarCita } from '../services/citaServices';  // Asegúrate de importar correctamente la función
import "../styles/from.css";

const RegisterCita = () => {
  const [idPaciente, setIdPaciente] = useState('');
  const [idDoctor, setIdDoctor] = useState('');
  const [cedulaPaciente, setCedulaPaciente] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [motivo, setMotivo] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [mensaje, setMensaje] = useState('');

  const [paciente, setPaciente] = useState({});
  const [doctor, setDoctor] = useState({});
  const [doctores, setDoctores] = useState([]);

  // Función para buscar paciente por cédula
  const buscarPaciente = async () => {
    if (!cedulaPaciente) {
      setMensaje('Por favor ingresa una cédula');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3000/api/pacientes/buscar/${cedulaPaciente}`);
      setPaciente(response.data);
      setIdPaciente(response.data.id_paciente); // Establece el ID del paciente
      setMensaje('Paciente encontrado');
    } catch (error) {
      setMensaje('Paciente no encontrado');
    }
  };

  // Función para obtener la lista de doctores
  const obtenerDoctores = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/doctors");
      setDoctores(response.data);
    } catch (error) {
      setMensaje('Error al obtener doctores');
    }
  };

  // Función para llenar los datos del doctor al seleccionar uno
  const seleccionarDoctor = (doctorId) => {
    const doctorSeleccionado = doctores.find(doc => doc.id_doctor === parseInt(doctorId)); // Asegúrate de que el doctorId sea entero
    if (doctorSeleccionado) {
      setDoctor(doctorSeleccionado); // Actualiza el estado con los datos del doctor
      setIdDoctor(doctorSeleccionado.id_doctor); // Establece el ID del doctor
    } else {
      setDoctor({});  // Si no se encuentra el doctor, limpia los campos
      setIdDoctor('');
    }
  };

  // Manejador de submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que todos los datos necesarios estén presentes
    if (!idPaciente || !idDoctor || !fecha || !hora) {
      setMensaje("Faltan datos obligatorios (paciente, doctor, fecha, hora).");
      return;
    }

    const data = {
      idPaciente,
      idDoctor,
      fecha,
      hora,
      motivo,
      observaciones,
    };

    try {
      // Enviar los datos para registrar la cita
      const result = await registrarCita(data);  // Llamamos al servicio registrarCita
      setMensaje(result.mensaje || '¡Cita registrada con éxito!');
    } catch (error) {
      setMensaje('Error al registrar la cita.');
    }
  };

  // Cargar la lista de doctores cuando el componente se monta
  useEffect(() => {
    obtenerDoctores();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      {/* Buscar paciente por cédula */}
      <input
        type="text"
        placeholder="Cédula del Paciente"
        value={cedulaPaciente}
        onChange={(e) => {
          setCedulaPaciente(e.target.value);
          setMensaje(''); // Limpia el mensaje de error cuando cambian los datos
        }}
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

      {/* Selección de Doctor */}
      <select onChange={(e) => seleccionarDoctor(e.target.value)} value={idDoctor}>
        <option value="">Seleccionar Doctor</option>
        {doctores.map((doctor) => (
          <option key={doctor.id_doctor} value={doctor.id_doctor}>
            {doctor.nombre} {doctor.apellido}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Especialidad del Doctor"
        value={doctor.especialidad || ''}
        disabled
      />
      <input
        type="text"
        placeholder="Nombre del Doctor"
        value={doctor.nombre || ''}
        disabled
      />
      <input
        type="text"
        placeholder="Apellido del Doctor"
        value={doctor.apellido || ''}
        disabled
      />

      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        required
      />
      <input
        type="time"
        value={hora}
        onChange={(e) => setHora(e.target.value)}
        required
      />
      <textarea
        placeholder="Motivo"
        value={motivo}
        onChange={(e) => setMotivo(e.target.value)}
      />
      <textarea
        placeholder="Observaciones"
        value={observaciones}
        onChange={(e) => setObservaciones(e.target.value)}
      />
      <button type="submit">Registrar Cita</button>
      {mensaje && <div>{mensaje}</div>}
    </form>
  );
};

export default RegisterCita;
