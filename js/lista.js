import { supabaseClient } from './supabaseClient.js';

document.addEventListener('DOMContentLoaded', async () => {
  console.log("✅ lista.js cargado y DOM listo");

  const contenedor = document.getElementById('listaHistorias');
  const buscador = document.getElementById('buscador');

  // Modal
  const modal = document.getElementById('modalDetalle');
  const cerrarModal = document.getElementById('cerrarModalDetalle');
  const detalleDiv = document.getElementById('detalleContenido');

  // ==== Helpers para formatear fechas ====
  function formatRelative(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const diff = Date.now() - d.getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'Hace un momento';
  if (minutes < 60) return `Hace ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Hace ${hours} h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `Hace ${days} días`;
  return d.toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' });
  }


  let historiasGlobal = [];

  function formatFecha(fechaStr) {
  if (!fechaStr) return '';
  const d = new Date(fechaStr);

  // Ajuste manual: Colombia está en UTC-5
  // Si tu ISO viene en UTC, sumamos -5 horas para mostrar local
  d.setHours(d.getHours() - 5);

  const dia = String(d.getDate()).padStart(2, '0');
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const año = d.getFullYear();

  const horas = String(d.getHours()).padStart(2, '0');
  const minutos = String(d.getMinutes()).padStart(2, '0');

  return `${dia}/${mes}/${año}-${horas}:${minutos}`;
}




  // FUNCION PARA ABRIR EL MODAL
  function mostrarDetalle(h) {
  const fechaExportacion = new Date();
  const fechaFormateada = fechaExportacion.toLocaleDateString('es-CO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  document.getElementById('fechaExportacion').textContent = fechaFormateada;
  const personales = document.getElementById('detallePersonales');
  const clinicos = document.getElementById('detalleClinicos');

  personales.innerHTML = `
    <div class="ficha-item"><span class="ficha-label">Nombre:</span><span class="ficha-value">${h.nombre || ''}</span></div>
    <div class="ficha-item"><span class="ficha-label">Documento:</span><span class="ficha-value">${h.documento || ''}</span></div>
    <div class="ficha-item"><span class="ficha-label">Género:</span><span class="ficha-value">${h.genero || ''}</span></div>
    <div class="ficha-item"><span class="ficha-label">Nacimiento:</span><span class="ficha-value">${h.nacimiento || ''}</span></div>
    <div class="ficha-item"><span class="ficha-label">Teléfono:</span><span class="ficha-value">${h.telefono || ''}</span></div>
    <div class="ficha-item"><span class="ficha-label">Contacto emergencia:</span><span class="ficha-value">${h.emergencia || ''}</span></div>
    <div class="ficha-item"><span class="ficha-label">Tel. emergencia:</span><span class="ficha-value">${h.telEmergencia || ''}</span></div>
    <div class="ficha-item"><span class="ficha-label">Registrado:</span><span class="ficha-value">${formatFecha(h.fechaRegistro)}</span></div>
  `;

  clinicos.innerHTML = `
    <div class="ficha-item"><span class="ficha-label">Diagnóstico:</span><span class="ficha-value">${h.diagnostico || ''}</span></div>
    <div class="ficha-item"><span class="ficha-label">Alergias:</span><span class="ficha-value">${h.alergias || ''}</span></div>
    <div class="ficha-item"><span class="ficha-label">Medicamentos:</span><span class="ficha-value">${h.medicamentos || ''}</span></div>
    <div class="ficha-item"><span class="ficha-label">Enfermedades crónicas:</span><span class="ficha-value">${h.cronicas || ''}</span></div>
    <div class="ficha-item"><span class="ficha-label">Síntoma principal:</span><span class="ficha-value">${h.sintoma || ''}</span></div>
    <div class="ficha-item"><span class="ficha-label">Intensidad del dolor:</span><span class="ficha-value">${h.intensidad || ''}</span></div>
  `;

  // Abrir modal
  const modal = document.getElementById('modalDetalle');
  modal.style.display = "flex";

  // Exportar a PDF
  const btnPdf = document.getElementById('btnExportarPdf');
  btnPdf.onclick = () => window.print(); // o html2pdf si lo activaste
}

  // CERRAR MODAL
  cerrarModal.addEventListener('click', () => {
    modal.style.display = "none";
  });
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = "none";
  });


  // Cargar historias desde Supabase
  const { data: historias, error } = await supabaseClient
    .from('historias')
    .select('*')
    .order('fechaRegistro', { ascending: false });

  if (error) {
    console.error("❌ Error al cargar historias:", error);
    contenedor.innerHTML = '<p>Error al cargar las historias.</p>';
    return;
  }

  historiasGlobal = historias;

  function renderHistorias(lista) {
    contenedor.innerHTML = "";

    lista.forEach(h => {
      const item = document.createElement('div');
      item.className = 'historia-item';

      item.innerHTML = `
        <h3>${h.nombre}</h3>
        <p><strong>Documento:</strong> ${h.documento}</p>
        <p><strong>Diagnóstico:</strong> ${h.diagnostico}</p>
        <p class="card-sub"><strong>Registrado:</strong> ${formatFecha(h.fechaRegistro)}</p>
        <button class="btn-detalle">Ver detalles</button>
      `;

      // Evento para abrir modal
      item.querySelector('.btn-detalle').addEventListener('click', () => {
        mostrarDetalle(h);
      });

      contenedor.appendChild(item);
    });
  }

  // Primera carga
  renderHistorias(historiasGlobal);

  // FILTRO
  buscador.addEventListener('input', () => {
    const texto = buscador.value.toLowerCase();

    const filtradas = historiasGlobal.filter(h =>
      h.nombre.toLowerCase().includes(texto) ||
      h.documento.toLowerCase().includes(texto)
    );

    renderHistorias(filtradas);
  });

});
