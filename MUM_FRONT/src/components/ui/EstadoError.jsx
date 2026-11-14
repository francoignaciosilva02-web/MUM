import { Link } from 'react-router-dom';

export default function EstadoError({ titulo = 'No pudimos cargar esta información', mensaje, onReintentar }) {
  return (
    <div className="container py-5">
      <div className="alert alert-light border rounded-4 p-4" role="alert">
        <h1 className="h4">{titulo}</h1>
        {mensaje && <p>{mensaje}</p>}
        <div className="d-flex flex-wrap gap-2">
          {onReintentar && (
            <button type="button" className="btn btn-primary rounded-pill" onClick={onReintentar}>
              Reintentar
            </button>
          )}
          <Link className="btn btn-outline-primary rounded-pill" to="/">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
