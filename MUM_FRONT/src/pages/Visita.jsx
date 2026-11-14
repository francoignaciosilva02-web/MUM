import { useDatos } from '../context/DatosContext';
import useDocumentTitle from '../hooks/useDocumentTitle';
import BandaTitulo from '../components/ui/BandaTitulo';
import EstadoVacio from '../components/ui/EstadoVacio';
import Insignia from '../components/ui/Insignia';

/** Información para visitantes (RF08). Recomendaciones vigentes separadas de la historia. */
export default function Visita() {
  const { visita } = useDatos();
  useDocumentTitle('Información para visitantes');
  const recomendaciones = visita.recomendaciones ?? [];
  const si = visita.normas?.si ?? [];
  const no = visita.normas?.no ?? [];
  const canales = (visita.canales ?? []).filter((c) => c?.nombre && c?.url);

  return (
    <div className="container pb-5">
      <BandaTitulo titulo="Información para visitantes" color="turquesa">
        <Insignia estado={visita.estado} texto="Pendiente de aprobación" />
      </BandaTitulo>

      <section className="mb-5">
        <h2 className="h4">Recomendaciones actuales</h2>
        {recomendaciones.length ? (
          <ul>{recomendaciones.map((r) => <li key={r}>{r}</li>)}</ul>
        ) : (
          <EstadoVacio titulo="Recomendaciones pendientes de aprobación de la contraparte." />
        )}
      </section>

      {(si.length > 0 || no.length > 0) && (
        <section className="mb-5">
          <h2 className="h4">Normas del humedal</h2>
          <div className="row g-3">
            {si.length > 0 && (
              <div className="col-md-6">
                <div className="rounded-5 p-4 h-100" style={{ background: 'var(--mum-suave)' }}>
                  <h3 className="h5">Sí</h3>
                  <ul className="list-unstyled mb-0">{si.map((t) => <li key={t} className="d-flex gap-2 mb-2"><span aria-hidden="true" className="fw-bold">✓</span><span><span className="visually-hidden">Permitido: </span>{t}</span></li>)}</ul>
                </div>
              </div>
            )}
            {no.length > 0 && (
              <div className="col-md-6">
                <div className="rounded-5 p-4 h-100" style={{ background: 'var(--mum-suave)' }}>
                  <h3 className="h5">No</h3>
                  <ul className="list-unstyled mb-0">{no.map((t) => <li key={t} className="d-flex gap-2 mb-2"><span aria-hidden="true" className="fw-bold">✕</span><span><span className="visually-hidden">No permitido: </span>{t}</span></li>)}</ul>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {visita.historia && (
        <section className="mb-5">
          <h2 className="h4">Historia del lugar</h2>
          <p className="small text-muted">Contexto histórico: no corresponde a permisos actuales de acceso, baño o recolección.</p>
          <p>{visita.historia}</p>
        </section>
      )}

      <section>
        <h2 className="h4">Canales oficiales</h2>
        {canales.length ? (
          <ul>{canales.map((c) => <li key={c.url}><a href={c.url} target="_blank" rel="noopener noreferrer">{c.nombre}</a></li>)}</ul>
        ) : (
          <EstadoVacio titulo="Canales oficiales por confirmar." />
        )}
      </section>
    </div>
  );
}
