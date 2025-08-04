const Servicios = () => {
    return (
      <section id="servicios" className="p-10">
        <h3 className="text-3xl font-bold text-center mb-6">Nuestros Servicios</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-4 shadow rounded-lg">
            <h4 className="text-xl font-semibold mb-2">Limpieza Dental</h4>
            <p>Elimina placa y sarro profesionalmente.</p>
          </div>
          <div className="bg-white p-4 shadow rounded-lg">
            <h4 className="text-xl font-semibold mb-2">Ortodoncia</h4>
            <p>Brackets metálicos, estéticos e invisibles.</p>
          </div>
          <div className="bg-white p-4 shadow rounded-lg">
            <h4 className="text-xl font-semibold mb-2">Implantes</h4>
            <p>Recupera piezas dentales perdidas.</p>
          </div>
        </div>
      </section>
    );
  };
  
  export default Servicios;
  