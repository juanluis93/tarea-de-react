import React, { useState } from 'react';
import './App.css';
function App() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: ""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevenir que el formulario se envíe automáticamente

    // Crear un objeto con los datos del contacto
    const contacto = { ...formData };
    alert('contacto: ' + JSON.stringify(contacto));

    // Enviar los datos al servidor
    fetch("http://www.raydelto.org/agenda.php", {
      method: 'POST',
      body: JSON.stringify(contacto)
    })
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      alert('datos: ' + JSON.stringify(datos));

      // Mostrar una alerta con la respuesta del servidor
      alert(datos.mensaje);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

    // Limpiar los campos del formulario
    setFormData({
      nombre: "",
      apellido: "",
      telefono: ""
    });
  };

  return (
    <div>
      <h1>Agenda</h1>
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} required />
        <br />
        <label>Apellido:</label>
        <input type="text" name="apellido" value={formData.apellido} onChange={handleInputChange} required />
        <br />
        <label>Teléfono:</label>
        <input type="text" name="telefono" value={formData.telefono} onChange={handleInputChange} required />
        <br />
        <input type="submit" value="Agregar" />
      </form>
    </div>
  );
}

export default App;
