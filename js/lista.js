import { supabaseClient } from './supabaseClient.js';

document.addEventListener('DOMContentLoaded', async () => {
  console.log("✅ lista.js cargado y DOM listo");

  const contenedor = document.getElementById('listaHistorias');
  if (!contenedor) {
    console.error("❌ No se encontró el contenedor con id listaHistorias");
    return;
  }

  // 🔹 Consultamos las historias desde Supabase
  const { data: historias, error } = await supabaseClient
    .from('historias')
    .select('*')
    .order('fechaRegistro', { ascending: false });

  if (error) {
    console.error("❌ Error al cargar historias desde Supabase:", error);
    contenedor.innerHTML = '<p>Error al cargar las historias.</p>';
    return;
  }

  console.log("📦 Historias en Supabase:", historias);

  if (!historias || historias.length === 0) {
    contenedor.innerHTML = '<p>No hay historias registradas</p>';
    return;
  }

  contenedor.innerHTML = '';

  historias.forEach((h) => {
    const item = document.createElement('div');
    item.className = 'historia-item';

    item.innerHTML = `
      <h3>${h.nombre || 'Sin nombre'}</h3>
      <p><strong>Tipo de documento:</strong> ${h.tipoDoc || '-'}</p>
      <p><strong>N° Documento:</strong> ${h.documento || '-'}</p>
      <p><strong>Género:</strong> ${h.genero || '-'}</p>
      <p><strong>Fecha de nacimiento:</strong> ${h.nacimiento || '-'}</p>
      <p><strong>Teléfono:</strong> ${h.telefono || '-'}</p>
      <p><strong>Contacto de emergencia:</strong> ${h.emergencia || '-'}</p>
      <p><strong>Tel. emergencia:</strong> ${h.telEmergencia || '-'}</p>
      <p><strong>Diagnóstico:</strong> ${h.diagnostico || '-'}</p>
      <p><strong>Alergias:</strong> ${h.alergias || '-'}</p>
      <p><strong>Medicamentos recientes:</strong> ${h.medicamentos || '-'}</p>
      <p><strong>Enfermedades crónicas:</strong> ${h.cronicas || '-'}</p>
      <p><strong>Síntoma principal:</strong> ${h.sintoma || '-'}</p>
      <p><strong>Intensidad del dolor:</strong> ${h.intensidad || '-'}</p>
      <p class="muted"><small><strong>Fecha de registro:</strong> ${h.fechaRegistro || ''}</small></p>
    `;

    contenedor.appendChild(item);
  });
});
