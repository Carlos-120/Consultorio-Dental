import React, { useEffect, useState } from "react";
import { fetchDoctores } from "../services/doctorServices";
import "../styles/doctores.css";

export default function Doctores() {
  const [q, setQ] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({ data: [], page: 1, pages: 1, total: 0 });
  const [error, setError] = useState("");

  const items = Array.isArray(state?.data) ? state.data : [];

  const load = async (page = 1) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetchDoctores({ q, especialidad, page, size: 12 });
      setState(res ?? { data: [], page: 1, pages: 1, total: 0 });
    } catch (e) {
      setError("No se pudo cargar la lista de doctores.");
      setState({ data: [], page: 1, pages: 1, total: 0 });
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(1); }, []);
  const onSearch = (e) => { e.preventDefault(); load(1); };
  const next = () => (state?.page ?? 1) < (state?.pages ?? 1) && load(state.page + 1);
  const prev = () => (state?.page ?? 1) > 1 && load(state.page - 1);

  return (
   <>
  <h2 className="section-title">Nuestro Equipo Médico</h2>
  <p className="section-subtitle">Busca por nombre, apellido, cédula o especialidad.</p>

  <form onSubmit={onSearch} className="card search-card">
    <div className="form-grid">
      <div className="field half">
        <label className="label">Buscar</label>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Nombre, apellido o cédula" />
      </div>
      <div className="field half">
        <label className="label">Especialidad</label>
        <input value={especialidad} onChange={(e) => setEspecialidad(e.target.value)} placeholder="Ej.: Ortodoncia" />
      </div>
    </div>
    <div className="actions">
      <button type="button" className="btn btn-ghost" onClick={() => { setQ(""); setEspecialidad(""); }}>Limpiar</button>
      <button className="btn btn-teal">Buscar</button>
    </div>
  </form>

  {error && <div className="message-card">{error}</div>}
  {loading && <div className="card card-hover">Cargando…</div>}

  {/* AQUÍ EL CAMBIO: quitar "grid" */}
  <div className="grid-doctores">
    {items.map(d => (
      <article key={d.id_doctor} className="card-doctor card card-hover">
        <header>
          <h3>{d.nombre} {d.apellido}</h3>
          <span>{d.especialidad || "General"}</span>
        </header>
        <ul>
          {d.cedula && <li><strong>Cédula:</strong> {d.cedula}</li>}
          {d.telefono && <li><strong>Tel.:</strong> {d.telefono}</li>}
          {d.correo && <li><strong>Email:</strong> {d.correo}</li>}
        </ul>
      </article>
    ))}
  </div>

  {items.length === 0 && !error && (
    <div className="message-card">No hay doctores para mostrar.</div>
  )}

  <div className="pagination">
    <button className="btn btn-outline" disabled={state?.page <= 1} onClick={prev}>Anterior</button>
    <span>Página {state?.page} de {state?.pages} — {state?.total} doctores</span>
    <button className="btn btn-teal" disabled={state?.page >= state?.pages} onClick={next}>Siguiente</button>
  </div>
</>

  );
}
