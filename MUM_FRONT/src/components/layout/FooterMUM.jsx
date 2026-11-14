import { useState } from 'react';
import { Link } from 'react-router-dom';

/** Pie de página. Sin textos fijos del humedal: todo viene por props (RF10). */
export default function FooterMUM({ territorio, canales = [] }) {
  const [logoFalla, setLogoFalla] = useState(false);
  const logo = territorio?.logoOscuro;
  const canalesValidos = (canales ?? []).filter((c) => c?.nombre && c?.url);

  return (
    <footer className="mum-footer d-print-none mt-5 py-5 rounded-top-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-5">
            {logo?.src && !logoFalla ? (
              <img src={logo.src} alt={logo.alt || territorio.nombre} height="40" onError={() => setLogoFalla(true)} />
            ) : (
              <strong className="text-white fs-5">{territorio?.nombre}</strong>
            )}
            {territorio?.territorio && <p className="mt-3 mb-0">{territorio.territorio}</p>}
          </div>
          <nav className="col-6 col-md-3" aria-label="Información del sitio">
            <h2 className="h6 text-white">Sitio</h2>
            <ul className="list-unstyled mb-0">
              <li><Link to="/visita">Información para visitantes</Link></li>
              <li><Link to="/creditos">Créditos</Link></li>
              <li><Link to="/privacidad">Privacidad</Link></li>
            </ul>
          </nav>
          {canalesValidos.length > 0 && (
            <div className="col-6 col-md-4">
              <h2 className="h6 text-white">Canales oficiales</h2>
              <ul className="list-unstyled mb-0">
                {canalesValidos.map((c) => (
                  <li key={c.url}><a href={c.url} target="_blank" rel="noopener noreferrer">{c.nombre}</a></li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <hr className="border-light opacity-25 my-4" />
        <p className="small mb-0">© {new Date().getFullYear()} {territorio?.nombre}</p>
      </div>
    </footer>
  );
}
