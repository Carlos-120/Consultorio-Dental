import "../styles/contacto.css"

const Contacto = () => {
  return (
    <section id="contacto" className="section">
      <h3 className="section-title">Contáctanos</h3>
      <p className="section-subtitle">
        ¿Tienes dudas o quieres agendar tu cita? Déjanos tu mensaje y te responderemos lo antes posible.
      </p>

      <form className="form">
        <div className="form-grid">
          <div className="field half">
            <label className="label">Nombre</label>
            <input type="text" placeholder="Tu nombre" required />
          </div>
          <div className="field half">
            <label className="label">Correo</label>
            <input type="email" placeholder="Tu correo" required />
          </div>
          <div className="field">
            <label className="label">Mensaje</label>
            <textarea placeholder="Escribe tu mensaje" required></textarea>
          </div>
        </div>

        <div className="actions">
          <button type="submit" className="btn btn-teal">Enviar</button>
        </div>
      </form>
    </section>
  );
};

export default Contacto;
