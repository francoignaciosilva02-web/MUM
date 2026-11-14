/**
 * Capa de datos (RF09 y RF10).
 * Hoy lee los JSON de src/data/<humedal>/. Cuando exista la API de Express + MySQL,
 * solo se cambia el cuerpo de `cargarHumedal` por fetch('/api/...'). Las vistas no se tocan.
 */
const archivos = import.meta.glob('../data/*/*.json');
const RECURSOS = ['territorio', 'navegacion', 'especies', 'lugares', 'galeria', 'visita', 'app'];

/** Humedal activo: ?humedal=demo en la URL, luego VITE_HUMEDAL en .env, luego "mayaca". */
export function humedalActivo() {
  const q = new URLSearchParams(window.location.search).get('humedal');
  return q || import.meta.env.VITE_HUMEDAL || 'mayaca';
}

export async function cargarHumedal(id) {
  const pares = await Promise.all(
    RECURSOS.map(async (recurso) => {
      const cargar = archivos[`../data/${id}/${recurso}.json`];
      if (!cargar) return [recurso, null];
      const modulo = await cargar();
      return [recurso, modulo.default];
    }),
  );
  const d = Object.fromEntries(pares);
  if (!d.territorio) throw new Error(`No hay datos para el humedal "${id}".`);

  // Valores por defecto: ningún recurso faltante rompe la app (RNF08).
  return {
    territorio: d.territorio,
    navegacion: d.navegacion ?? { enlaces: [] },
    especies: Array.isArray(d.especies) ? d.especies : [],
    lugares: Array.isArray(d.lugares) ? d.lugares : [],
    galeria: d.galeria ?? { fotos: [], video: null },
    visita: d.visita ?? {},
    app: d.app ?? {},
  };
}
