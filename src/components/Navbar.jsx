const Navbar = () => {
    return (
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">Clinica Dental</h1>
        <ul className="flex gap-6">
          <li><a href="#inicio" className="text-gray-700 hover:text-blue-500">Inicio</a></li>
          <li><a href="#servicios" className="text-gray-700 hover:text-blue-500">Servicios</a></li>
          <li><a href="#contacto" className="text-gray-700 hover:text-blue-500">Contacto</a></li>
        </ul>
      </nav>
    );
  };
  
  export default Navbar;
  