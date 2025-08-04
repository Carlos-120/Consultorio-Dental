const Contacto = () => {
    return (
      <section id="contacto" className="p-10 bg-blue-50">
        <h3 className="text-3xl font-bold text-center mb-6">Contáctanos</h3>
        <form className="max-w-md mx-auto space-y-4">
          <input type="text" placeholder="Tu nombre" className="w-full p-2 border rounded" />
          <input type="email" placeholder="Correo" className="w-full p-2 border rounded" />
          <textarea placeholder="Mensaje" className="w-full p-2 border rounded h-32" />
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">Enviar</button>
        </form>
      </section>
    );
  };
  
  export default Contacto;
  