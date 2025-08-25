import React, { useState } from "react";
import { fetchResumenPaciente } from "../services/pacienteServices";
import "../styles/from.css";

function PacienteResumen({ data = null }) {
  if (!data) {
    return (
      <div className="card" style={{ padding:"1rem" }}>
        Ingresa una cédula y presiona <strong>Buscar</strong> para ver el resumen.
      </div>
    );
  }

  const { paciente = {}, historiales = [], citas = [], doctoresAtendieron = [] } = data;

  return (
    <div className="grid" style={{ gap:"1rem" }}>
      {/* Datos del paciente */}
      <section className="card" style={{ padding:"1rem" }}>
        <h3 className="mb-0" style={{ marginTop:0 }}>Datos del Paciente</h3>
        <div className="form-grid" style={{ marginTop:".75rem" }}>
          <div className="field third"><span className="label">Nombre</span><div>{paciente.nombre} {paciente.apellido}</div></div>
          <div className="field third"><span className="label">Cédula</span><div>{paciente.cedula}</div></div>
          <div className="field third"><span className="label">Género</span><div style={{ textTransform:"capitalize" }}>{paciente.genero || "—"}</div></div>
          <div className="field third"><span className="label">Fecha Nac.</span><div>{paciente.fecha_nacimiento || "—"}</div></div>
          <div className="field third"><span className="label">Teléfono</span><div>{paciente.telefono || "—"}</div></div>
          <div className="field third"><span className="label">Correo</span><div>{paciente.correo || "—"}</div></div>
          <div className="field"><span className="label">Dirección</span><div>{paciente.direccion || "—"}</div></div>
        </div>
      </section>

      {/* Doctores que lo atendieron */}
      <section className="card" style={{ padding:"1rem" }}>
        <h3 className="mb-0">Doctores que lo atendieron</h3>
        {!doctoresAtendieron.length ? (
          <p style={{ color:"#475569" }}>Sin registros.</p>
        ) : (
          <div className="grid grid-auto" style={{ marginTop:".5rem" }}>
            {doctoresAtendieron.map(doc => (
              <div key={doc.id_doctor} className="card card-hover" style={{ padding:".75rem" }}>
                <strong>{doc.nombre} {doc.apellido}</strong>
                <div style={{ color:"#475569" }}>{doc.especialidad || "General"}</div>
                {doc.telefono && <div style={{ color:"#475569" }}>Tel.: {doc.telefono}</div>}
                {doc.correo && <div style={{ color:"#475569" }}>Email: {doc.correo}</div>}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Historial clínico */}
      <section className="card" style={{ padding:"1rem" }}>
        <h3 className="mb-0">Historial Clínico</h3>
        {!historiales.length ? (
          <p style={{ color:"#475569" }}>Sin historial.</p>
        ) : (
          <table className="table" style={{ marginTop:".5rem" }}>
            <thead><tr><th>Fecha</th><th>Diagnóstico</th><th>Notas</th></tr></thead>
            <tbody>
              {historiales.map(h => (
                <tr key={h.id_historial}>
                  <td>{h.fecha_registro}</td>
                  <td>{h.diagnostico}</td>
                  <td>{h.notas || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Citas + Tratamientos */}
      <section className="card" style={{ padding:"1rem" }}>
        <h3 className="mb-0">Citas y Tratamientos</h3>
        {!citas.length ? (
          <p style={{ color:"#475569" }}>Sin citas registradas.</p>
        ) : (
          <table className="table" style={{ marginTop:".5rem" }}>
            <thead>
              <tr>
                <th>Fecha</th><th>Hora</th><th>Motivo</th><th>Estado</th><th>Doctor</th><th>Tratamientos</th>
              </tr>
            </thead>
            <tbody>
              {citas.map(c => (
                <tr key={c.id_cita}>
                  <td>{c.fecha}</td>
                  <td>{c.hora}</td>
                  <td>{c.motivo || "—"}</td>
                  <td style={{ textTransform:"capitalize" }}>{c.estado}</td>
                  <td>{c.doctor ? `${c.doctor.nombre} ${c.doctor.apellido}` : "—"}</td>
                  <td>
                    {!c.detalles?.length ? "—" : (
                      <ul style={{ margin:0, paddingLeft:"1rem" }}>
                        {c.detalles.map(d => (
                          <li key={d.id_detalle}>
                            {d.tratamiento?.nombre || "Tratamiento"}
                            {d.precio_final != null ? ` — $${Number(d.precio_final).toFixed(2)}` : ""}
                            {d.observaciones ? ` — ${d.observaciones}` : ""}
                          </li>
                        ))}
                      </ul>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default function ResumenPacientePage() {
  const [cedula, setCedula] = useState("");
  const [loading, setLoading] = useState(false);
  const [resumen, setResumen] = useState(null);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true); setResumen(null);
    try {
      const data = await fetchResumenPaciente(cedula.trim());
      setResumen(data);
    } catch (e) {
      const msg = e?.response?.status === 404
        ? "No se encontró el paciente."
        : (e?.response?.data?.mensaje || "No se pudo obtener el resumen.");
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section container">
      <h2 className="section-title">Búsqueda de Paciente</h2>
      <p className="section-subtitle">Ingresa la cédula para ver datos personales, historial, citas y tratamientos.</p>

      {/* 🔎 Campo + botón de búsqueda */}
      <form onSubmit={onSubmit} className="card" style={{ padding:"1rem", marginBottom:"1rem" }}>
        <div className="form-grid">
          <div className="field half">
            <label className="label">Cédula</label>
            <input
              value={cedula}
              onChange={(e)=>setCedula(e.target.value)}
              placeholder="Ej.: 0102030405"
              required
            />
          </div>
        </div>
        <div className="actions">
          <button type="button" className="btn btn-ghost" onClick={()=>{ setCedula(""); setResumen(null); setError(""); }}>
            Limpiar
          </button>
          <button className="btn btn-teal">Buscar</button>
        </div>
      </form>

      {loading && <div className="card" style={{ padding:"1rem" }}>Buscando…</div>}
      {error && <div className="card" style={{ padding:"1rem", border:"1px solid #fecaca", background:"#fff1f2" }}>{error}</div>}

      <PacienteResumen data={resumen} />
    </section>
  );
}
