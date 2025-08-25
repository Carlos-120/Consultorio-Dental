import "../styles/servicios.css"

const Servicios = () => {
  return (
    <section id="servicios" className="section">
      <h3 className="section-title">Nuestros Servicios</h3>
      <p className="section-subtitle">
        Brindamos atención dental profesional y personalizada para toda la familia.
      </p>

      <div className="grid grid-auto">
        <div className="card card-hover">
          <h4>Limpieza Dental</h4>
          <p>Elimina placa y sarro profesionalmente con técnicas modernas.</p>
        </div>

        <div className="card card-hover">
          <h4>Ortodoncia</h4>
          <p>Brackets metálicos, estéticos e invisibles para una sonrisa perfecta.</p>
        </div>

        <div className="card card-hover">
          <h4>Implantes</h4>
          <p>Recupera piezas dentales perdidas con seguridad y durabilidad.</p>
        </div>
      </div>
    </section>
  );
};

export default Servicios;
