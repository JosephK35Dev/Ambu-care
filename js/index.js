document.addEventListener('DOMContentLoaded', () => {
  const btnRegistrar = document.getElementById('btnRegistrarHistoria');
  const modal = document.getElementById('opcionesModal');
  const manualBtn = document.getElementById('manualBtn');
  const iaBtn = document.getElementById('iaBtn');
  const cerrarModal = document.getElementById('cerrarModal');
  const mensaje = document.getElementById('mensaje-flotante');

  function mostrarMensaje(texto, tipo = 'exito') {
    mensaje.textContent = texto;
    mensaje.className = tipo;
    mensaje.style.display = 'block';
    setTimeout(() => mensaje.style.display = 'none', 2500);
  }

  btnRegistrar.addEventListener('click', () => {
    modal.style.display = 'flex';
  });

  manualBtn.addEventListener('click', () => {
    window.location.href = 'historia.html';
  });

  iaBtn.addEventListener('click', () => {
    mostrarMensaje('🚧 Registro con IA será añadido pronto.', 'error');
    modal.style.display = 'none';
  });

  cerrarModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });
});