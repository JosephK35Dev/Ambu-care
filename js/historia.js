import { supabaseClient } from './supabaseClient.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log("✅ historia.js cargado y DOM listo");

  const form = document.getElementById('form-historia');
  const mensaje = document.createElement('div');
  mensaje.id = 'mensaje-flotante';
  document.body.appendChild(mensaje);

  // 🟢 Función para mostrar mensajes bonitos
  function mostrarMensaje(texto, tipo = 'exito') {
    console.log("Mostrando mensaje:", texto, tipo);
    mensaje.textContent = texto;
    mensaje.className = tipo;
    mensaje.style.display = 'block';
    setTimeout(() => mensaje.style.display = 'none', 2500);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const historia = {
      nombre: form.querySelector('[name="nombre"]').value.trim(),
      tipoDoc: form.querySelector('[name="tipoDoc"]').value.trim(),
      documento: form.querySelector('[name="documento"]').value.trim(),
      genero: form.querySelector('[name="genero"]').value.trim(),
      nacimiento: form.querySelector('[name="nacimiento"]').value,
      telefono: form.querySelector('[name="telefono"]').value.trim(),
      emergencia: form.querySelector('[name="emergencia"]').value.trim(),
      telEmergencia: form.querySelector('[name="telEmergencia"]').value.trim(),
      diagnostico: form.querySelector('[name="diagnostico"]').value.trim(),
      alergias: form.querySelector('[name="alergias"]').value.trim(),
      medicamentos: form.querySelector('[name="medicamentos"]').value.trim(),
      cronicas: form.querySelector('[name="cronicas"]').value.trim(),
      sintoma: form.querySelector('[name="sintoma"]').value.trim(),
      intensidad: form.querySelector('[name="intensidad"]').value.trim(),
      fechaRegistro: new Date().toISOString(),
    };


    console.log(historia);
    // 🔴 Validar que todos los campos estén llenos
    const vacios = Object.values(historia).some(v => !v);
    if (vacios) {
      mostrarMensaje('⚠️ Por favor, completa todos los campos.', 'error');
      return;
    }

    try {
      // 🟢 Insertar en Supabase
      const { error } = await supabaseClient.from('historias').insert([historia]);

      if (error) {
        console.error("❌ Error al guardar historia:", error);
        mostrarMensaje('Error al guardar la historia.', 'error');
      } else {
        form.reset();
        mostrarMensaje('✅ Historia registrada con éxito.', 'exito');
      }
    } catch (err) {
      console.error("❌ Error inesperado:", err);
      mostrarMensaje('Ocurrió un error inesperado.', 'error');
    }
  });
  // Puedes llamarlo manualmente desde la consola del navegador
  async function verHistorias() {
  const { data, error } = await supabaseClient.from('historias').select('*');
  console.log(data, error);
  }
  window.verHistorias = verHistorias;
});
