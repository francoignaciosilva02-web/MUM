const TEXTOS = { pendiente: 'Pendiente', prueba: 'Prueba' };

/** Muestra el estado de aprobación (RN01). Si el contenido está aprobado, no muestra nada. */
export default function Insignia({ estado, texto }) {
  if (!estado || estado === 'aprobado') return null;
  return <span className="badge rounded-pill text-bg-light border mum-insignia">{texto ?? TEXTOS[estado] ?? estado}</span>;
}
