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

  function isNumeric(str) { return /^[0-9]+$/.test(str); }
function isPhone(str) { return /^[0-9]{7,15}$/.test(str); }
function isIntInRange(str, min, max) {
  const n = Number(str);
  return Number.isInteger(n) && n >= min && n <= max;
}
function notFuture(dateStr) {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  const today = new Date();
  const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return d <= todayOnly;
}

function validarHistoria(h) {
  const errors = [];

  // Requeridos básicos
  if (!h.nombre) errors.push('El nombre es requerido.');
  if (!h.tipoDoc) errors.push('El tipo de documento es requerido.');
  if (!h.documento) errors.push('El número de identificación es requerido.');
  if (!h.genero) errors.push('El género es requerido.');
  if (!h.nacimiento) errors.push('La fecha de nacimiento es requerida.');
  if (!h.telefono) errors.push('El teléfono es requerido.');
  if (!h.diagnostico) errors.push('El diagnóstico es requerido.');
  if (!h.sintoma) errors.push('El síntoma principal es requerido.');
  if (!h.intensidad) errors.push('La intensidad del dolor es requerida.');

  // Formatos específicos
  if (h.documento && !isNumeric(h.documento)) errors.push('El documento debe contener solo números.');
  if (h.telefono && !isPhone(h.telefono)) errors.push('El teléfono debe tener entre 7 y 15 dígitos.');
  if (h.telEmergencia && !isPhone(h.telEmergencia)) errors.push('El teléfono de emergencia debe tener entre 7 y 15 dígitos.');
  if (h.intensidad && !isIntInRange(h.intensidad, 1, 10)) errors.push('La intensidad del dolor debe ser un entero entre 1 y 10.');
  if (h.nacimiento && !notFuture(h.nacimiento)) errors.push('La fecha de nacimiento no puede ser futura.');

  return errors;
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
    const errores = validarHistoria(historia);
    if (errores.length) {
    mostrarMensaje('⚠️ ' + errores[0], 'error'); // Mostramos el primer error para no saturar
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
