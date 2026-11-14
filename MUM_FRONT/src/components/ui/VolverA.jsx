import { Link } from 'react-router-dom';

/** Enlace "← Volver al listado" (RF02). */
export default function VolverA({ to, children }) {
  return (
    <Link to={to} className="mum-volver d-inline-block mt-4 fw-medium text-decoration-none">
      ← {children}
    </Link>
  );
}
