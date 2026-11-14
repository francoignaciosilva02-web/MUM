import { Link } from 'react-router-dom';
import { useDatos } from '../context/DatosContext';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { rutaEspecie, rutaLugar, CATEGORIAS } from '../utils/categorias';
import VideoPlayer from '../components/media/VideoPlayer';
import TarjetaAcceso from '../components/ui/TarjetaAcceso';
import CarruselHorizontal from '../components/ui/CarruselHorizontal';
import ImagenFicha from '../components/ui/ImagenFicha';

/** Portada (RF01). Presenta el museo, el territorio y los accesos principales. */
export default function Inicio() {
  const { territorio, especies, lugares, galeria, app } = useDatos();
  useDocumentTitle();

  const cuenta = (c) => especies.filter((e) => e.categoria === c).length;
  const marcadas = especies.filter((e) => e.destacada);
  const destacadas = (marcadas.length ? marcadas : especies).slice(0, 6);
  const hayApp = Boolean(app?.descripcion || app?.android || app?.ios);

  return (
    <>
      <section className="mum-hero position-relative overflow-hidden">
        <span className="mum-blob" aria-hidden="true" />
        <span className="mum-blob mum-blob--2" aria-hidden="true" />
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <h1 className="display-4 fw-medium">{territorio.nombre}</h1>
              {territorio.intro && <p className="lead text-muted">{territorio.intro}</p>}
              <div className="d-flex flex-wrap gap-2">
                <Link className="btn btn-primary btn-lg rounded-pill" to="/biodiversidad">Ver biodiversidad</Link>
                <Link className="btn btn-outline-primary btn-lg rounded-pill" to="/lugares">Ver lugares</Link>
              </div>
              <dl className="d-flex flex-wrap gap-4 mt-4 mb-0">
                {lugares.length > 0 && (
                  <div className="mum-dato"><dt className="fw-medium">{lugares.length} lugares</dt><dd className="small text-muted m-0">para recorrer</dd></div>
                )}
                {especies.length > 0 && (
                  <div className="mum-dato"><dt className="fw-medium">{especies.length} fichas</dt><dd className="small text-muted m-0">de biodiversidad</dd></div>
                )}
              </dl>
            </div>
            {galeria.video?.src && (
              <div className="col-lg-5">
                <VideoPlayer video={galeria.video} className="mx-auto ms-lg-auto" />
                {galeria.video.titulo && <p className="small text-muted text-center mt-2 mb-0">{galeria.video.titulo}</p>}
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="container pb-4">
        <h2 className="h3">Explora el humedal</h2>
        <p className="text-muted">Tres formas de empezar.</p>
        <div className="row g-3">
          <div className="col-md-4"><TarjetaAcceso to="/aves" titulo="Aves" texto={`${cuenta('aves')} fichas`} color="turquesa" categoria="aves" /></div>
          <div className="col-md-4"><TarjetaAcceso to="/flora" titulo="Flora" texto={`${cuenta('flora')} fichas`} color="oliva" categoria="flora" /></div>
          <div className="col-md-4"><TarjetaAcceso to="/lugares" titulo="Lugares" texto={`${lugares.length} sectores`} color="celeste" categoria="flora" /></div>
        </div>

        {destacadas.length > 0 && (
          <section className="mt-5">
            <h2 className="h3">Especies destacadas</h2>
            <p className="text-muted">Una muestra del catálogo.</p>
            <CarruselHorizontal etiqueta="Especies destacadas">
              {destacadas.map((e) => (
                <Link key={e.id} to={rutaEspecie(e)} className="text-decoration-none">
                  <ImagenFicha foto={e.foto} categoria={e.categoria} alt={e.nombreComun} proporcion="1x1" />
                  <strong className="d-block mt-2 fw-medium">{e.nombreComun}</strong>
                  <small className="text-muted">{CATEGORIAS[e.categoria]?.nombre}</small>
                </Link>
              ))}
            </CarruselHorizontal>
          </section>
        )}

        {lugares.length > 0 && (
          <section className="mt-5">
            <h2 className="h3">Lugares de interés</h2>
            <ol className="mum-lista" style={{ columnCount: 'auto', columnWidth: '18rem', columnGap: '2.5rem' }}>
              {lugares.map((l) => (
                <li key={l.id}><Link to={rutaLugar(l)}>{l.nombre}</Link></li>
              ))}
            </ol>
          </section>
        )}

        {hayApp && (
          <section className="mum-app rounded-5 p-4 p-md-5 mt-5 d-flex flex-wrap gap-3 align-items-center justify-content-between">
            <div>
              <h2 className="h3">Lleva el museo en tu bolsillo</h2>
              {app.descripcion && <p className="mb-0">{app.descripcion}</p>}
            </div>
            <Link to="/aplicacion" className="btn btn-turquesa btn-lg rounded-pill">Conocer la app</Link>
          </section>
        )}

        <div className="row g-3 mt-2">
          <div className="col-md-6"><Link to="/galeria" className="mum-tarjeta rounded-5 p-4 text-decoration-none"><h3 className="h5">Galería</h3><p className="mb-0">Fotos y video del humedal, con crédito de cada autor.</p></Link></div>
          <div className="col-md-6"><Link to="/visita" className="mum-tarjeta rounded-5 p-4 text-decoration-none"><h3 className="h5">Información para visitantes</h3><p className="mb-0">Recomendaciones vigentes y normas de cuidado.</p></Link></div>
        </div>
      </div>
    </>
  );
}
