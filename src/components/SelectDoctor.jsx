// src/components/SelectDoctor.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const SelectDoctor = ({ onSelect }) => {
  const [doctores, setDoctores] = useState([]);
  const [idDoctor, setIdDoctor] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const cargar = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/doctores");
        setDoctores(data || []);
      } catch (e) {
        setMsg("No se pudo cargar la lista de doctores.");
      }
    };
    cargar();
  }, []);

  const handleChange = (e) => {
    const id = e.target.value;
    setIdDoctor(id);
    const doc = doctores.find(d => String(d.id) === String(id));
    onSelect?.(doc || null);
  };

  return (
    <div className="space-y-1">
      <select value={idDoctor} onChange={handleChange}>
        <option value="">-- Selecciona un doctor --</option>
        {doctores.map((d) => (
          <option key={d.id} value={d.id}>
            {d.nombres} {d.apellidos} — {d.especialidad}
          </option>
        ))}
      </select>
      {msg && <small>{msg}</small>}
    </div>
  );
};

export default SelectDoctor;
