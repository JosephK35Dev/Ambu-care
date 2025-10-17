const STORAGE_KEY = "historiasAmbuCare";

// Guarda una historia nueva
function guardarHistoria(historia) {
  const historias = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  historias.push(historia);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(historias));
}

// Obtiene todas las historias
function obtenerHistorias() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

// Limpia todas las historias (opcional)
function limpiarHistorias() {
  localStorage.removeItem(STORAGE_KEY);
}
