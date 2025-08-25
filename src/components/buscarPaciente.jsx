// src/components/BuscarPaciente.jsx
import React, { useState } from "react";
import axios from "axios";

const BuscarPaciente = ({ onSelect }) => {
  const [cedula, setCedula] = useState("");
  const [paciente, setPaciente] = useState(null);
  const [msg, setMsg] = useState("");

  const buscar = async () => {
    setMsg("");
    setPaciente(null);
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/pacientes`,
        { params: { cedula } }
      );
      if (!data) return setMsg("No se encontró paciente.");
      setPaciente(data);
      onSelect?.(data); // devuelve el paciente seleccionado
    } catch (e) {
      setMsg(e.response?.data?.mensaje || "Error al buscar paciente.");
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
          placeholder="Cédula del paciente"
        />
        <button type="button" onClick={buscar}>Buscar Paciente</button>
      </div>
      {msg && <small>{msg}</small>}
      {paciente && (
        <div className="text-sm">
          <b>Seleccionado:</b> {paciente.nombres} {paciente.apellidos} (ID: {paciente.id})
        </div>
      )}
    </div>
  );
};

export default BuscarPaciente;
