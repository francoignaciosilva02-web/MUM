import { Link, useParams } from 'react-router-dom';
import { useDatos } from '../context/DatosContext';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { CATEGORIAS, rutaLugar } from '../utils/categorias';
import ImagenFicha from '../components/ui/ImagenFicha';
import Insignia from '../components/ui/Insignia';
import VolverA from '../components/ui/VolverA';
import EnlaceCopiable from '../components/ui/EnlaceCopiable';
import GrillaEspecies from '../components/catalogo/GrillaEspecies';
import NoEncontrada from './NoEncontrada';

/** Ficha de especie (RF03, RF05, RF12). Cada campo vacío se oculta (RN02). */
export default function Especie() {
  const { categoria, id } = useParams();
  const { especies, lugares } = useDatos();
  const e = especies.find((x) => x.id === id && x.categoria === categoria);
  useDocumentTitle(e?.nombreComun);
  if (!e) return <NoEncontrada />;

  const cat = CATEGORIAS[e.categoria];
  const dondeVerla = lugares.filter((l) => e.lugares?.includes(l.id));
  const otras = especies.filter((x) => x.categoria === e.categoria && x.id !== e.id).slice(0, 4);
  const filas = [
    ['Categoría', cat?.nombre],
    ['Nombre científico', e.nombreCientifico && <em>{e.nombreCientifico}</em>],
    ...(e.atributos ?? []).filter((a) => a?.k && a?.v).map((a) => [a.k, a.v]),
    ['Fuente', e.fuente],
  ].filter(([, v]) => Boolean(v));

  return (
    <div className="container pb-5">
      <VolverA to={`/${e.categoria}`}>Volver a {cat?.nombre.toLowerCase()}</VolverA>
      <div className="row g-4 mt-1">
        <div className="col-md-5">
          <ImagenFicha foto={e.foto} categoria={e.categoria} alt={e.nombreComun} mostrarCredito />
        </div>
        <div className="col-md-7">
          <h1 className="h2">{e.nombreComun}</h1>
          <Insignia estado={e.estado} />
          {e.descripcion && <p className="mt-3">{e.descripcion}</p>}
          <div className="table-responsive">
            <table className="table align-middle">
              <tbody>
                {filas.map(([k, v]) => (
                  <tr key={k}><th scope="row" className="fw-medium text-muted w-50">{k}</th><td>{v}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          {dondeVerla.length > 0 && (
            <>
              <h2 className="h6">Dónde se puede ver</h2>
              <div className="d-flex flex-wrap gap-2 mb-3">
                {dondeVerla.map((l) => (
                  <Link key={l.id} to={rutaLugar(l)} className="mum-chip btn btn-sm rounded-pill">{l.nombre}</Link>
                ))}
              </div>
            </>
          )}
          <EnlaceCopiable />
        </div>
      </div>
      {otras.length > 0 && (
        <section className="mt-5">
          <h2 className="h4">Otras fichas de {cat?.nombre.toLowerCase()}</h2>
          <GrillaEspecies especies={otras} />
        </section>
      )}
    </div>
  );
}
