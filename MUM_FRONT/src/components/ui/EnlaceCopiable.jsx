import { useEffect, useRef, useState } from 'react';

/** Copia el enlace de una ficha o lugar para compartirlo (RF02). No guarda nada. */
export default function EnlaceCopiable({ ruta, etiqueta = 'Copiar enlace' }) {
  const [mensaje, setMensaje] = useState('');
  const temporizador = useRef(null);
  useEffect(() => () => clearTimeout(temporizador.current), []);

  const copiar = async () => {
    const url = `${window.location.origin}${ruta ?? window.location.pathname}`;
    try {
      await navigator.clipboard.writeText(url);
      setMensaje('Enlace copiado.');
    } catch {
      setMensaje('No se pudo copiar el enlace.');
    }
    clearTimeout(temporizador.current);
    temporizador.current = setTimeout(() => setMensaje(''), 3000);
  };

  return (
    <span className="d-inline-flex align-items-center">
      <button type="button" className="btn btn-outline-primary btn-sm rounded-pill" onClick={copiar}>
        {etiqueta}
      </button>
      <span role="status" className="ms-2 small text-muted">{mensaje}</span>
    </span>
  );
}
