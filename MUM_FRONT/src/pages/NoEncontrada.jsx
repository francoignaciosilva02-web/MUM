import { Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';

/** Ruta o ficha inexistente (RNF08): mensaje claro y navegación disponible. */
export default function NoEncontrada() {
  useDocumentTitle('Página no encontrada');
  return (
    <div className="container py-5 text-center">
      <h1 className="h2">No encontramos esa página</h1>
      <p className="text-muted">El enlace no existe o el contenido ya no está disponible.</p>
      <div className="d-flex flex-wrap gap-2 justify-content-center">
        <Link to="/" className="btn btn-primary rounded-pill">Volver al inicio</Link>
        <Link to="/biodiversidad" className="btn btn-outline-primary rounded-pill">Ver biodiversidad</Link>
      </div>
    </div>
  );
}
