import { useRef } from 'react';

export default function CarruselHorizontal({ etiqueta, children }) {
  const ref = useRef(null);
  const mover = (dir) => ref.current?.scrollBy({ left: dir * 380, behavior: 'smooth' });
  return (
    <div>
      <div className="d-flex gap-2 justify-content-end mb-2">
        <button type="button" className="btn btn-outline-primary rounded-circle" aria-label="Anterior" onClick={() => mover(-1)}>‹</button>
        <button type="button" className="btn btn-outline-primary rounded-circle" aria-label="Siguiente" onClick={() => mover(1)}>›</button>
      </div>
      <div ref={ref} className="mum-carrusel" tabIndex={0} aria-label={etiqueta}>
        {children}
      </div>
    </div>
  );
}
