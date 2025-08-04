const Register = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-blue-50">
      <form className="bg-white p-8 rounded shadow-md w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center text-blue-600">Crear Cuenta</h2>
        <input type="text" placeholder="Nombre completo" className="w-full p-2 border rounded" />
        <input type="email" placeholder="Correo electrónico" className="w-full p-2 border rounded" />
        <input type="password" placeholder="Contraseña" className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Registrarse
        </button>
        <p className="text-center text-sm text-gray-600">
          ¿Ya tienes cuenta? <a href="/login" className="text-blue-500 hover:underline">Inicia sesión</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
