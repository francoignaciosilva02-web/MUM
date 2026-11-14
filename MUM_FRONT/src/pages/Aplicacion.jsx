import { useDatos } from '../context/DatosContext';
import useDocumentTitle from '../hooks/useDocumentTitle';
import BandaTitulo from '../components/ui/BandaTitulo';

/** Botón de tienda. Sin enlace oficial: "Próximamente disponible" (RN06). */
function BotonTienda({ nombre, url }) {
  if (url) {
    return (
      <a className="btn btn-primary btn-lg rounded-pill" href={url} target="_blank" rel="noopener noreferrer">
        Descargar para {nombre}
      </a>
    );
  }
  return (
    <button type="button" className="btn btn-outline-secondary btn-lg rounded-pill" disabled aria-disabled="true">
      {nombre}: próximamente disponible
    </button>
  );
}

/** Aplicación móvil (RF07). */
export default function Aplicacion() {
  const { app } = useDatos();
  useDocumentTitle('Aplicación móvil');
  const beneficios = (app.beneficios ?? []).filter((b) => b?.titulo);

  return (
    <div className="container pb-5">
      <BandaTitulo titulo="Aplicación móvil" texto={app.descripcion ?? 'Acompaña tu recorrido por el humedal.'} color="turquesa" />
      {beneficios.length > 0 && (
        <div className="row g-3 mb-4">
          {beneficios.map((b) => (
            <div className="col-md-4" key={b.titulo}>
              <div className="mum-tarjeta rounded-5 p-4">
                <h2 className="h5">{b.titulo}</h2>
                {b.texto && <p className="mb-0">{b.texto}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="d-flex flex-wrap gap-3">
        <BotonTienda nombre="Android" url={app.android} />
        <BotonTienda nombre="iOS" url={app.ios} />
      </div>
    </div>
  );
}
