import { Link } from 'react-router-dom';
import { CATEGORIAS, rutaEspecie, rutaLugar } from '../../utils/categorias';
import EnlaceCopiable from '../ui/EnlaceCopiable';
import Insignia from '../ui/Insignia';

export default function PanelLugar({ lugar, posicion, total, especies, onAnterior, onSiguiente }) {
  if (!lugar) return null;
  return (
    <div className="rounded-5 p-4" style={{ background: 'var(--mum-suave)' }} aria-live="polite">
      <p className="small text-muted mb-1">Lugar {posicion} de {total}</p>
      <h2 className="h4">{lugar.nombre}</h2>
      <Insignia estado={lugar.estado} />
      {lugar.descripcion && <p className="mt-3">{lugar.descripcion}</p>}

      {especies.length > 0 && (
        <>
          <h3 className="h6 mt-3">Especies que se pueden ver aquí</h3>
          <div className="d-flex flex-wrap gap-2">
            {especies.map((e) => (
              <Link key={e.id} to={rutaEspecie(e)} className="mum-chip btn btn-sm rounded-pill">
                {e.nombreComun}
              </Link>
            ))}
          </div>
        </>
      )}

      <div className="d-flex flex-wrap gap-2 mt-4">
        <button type="button" className="btn btn-outline-primary rounded-pill" onClick={onAnterior}>← Anterior</button>
        <button type="button" className="btn btn-primary rounded-pill" onClick={onSiguiente}>Siguiente →</button>
      </div>
      <div className="d-flex flex-wrap gap-3 align-items-center mt-3">
        <Link to={rutaLugar(lugar)} className="fw-medium">Ver ficha del lugar</Link>
        <EnlaceCopiable ruta={rutaLugar(lugar)} />
      </div>
    </div>
  );
}
