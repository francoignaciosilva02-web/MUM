import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDatos } from '../context/DatosContext';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { rutaEspecie, rutaLugar } from '../utils/categorias';
import BandaTitulo from '../components/ui/BandaTitulo';
import EstadoVacio from '../components/ui/EstadoVacio';
import EnlaceCopiable from '../components/ui/EnlaceCopiable';
import ImagenFicha from '../components/ui/ImagenFicha';
import Insignia from '../components/ui/Insignia';
import VolverA from '../components/ui/VolverA';
import NoEncontrada from './NoEncontrada';

const PESTANAS = [
  ['info', 'Información general'],
  ['fotos', 'Fotos'],
  ['plano', 'Plano'],
  ['como', 'Cómo llegar'],
];

/** Ficha de lugar (RF04, RF05). Sin ubicación confirmada no se inventa nada (RN03). */
export default function Lugar() {
  const { id } = useParams();
  const { lugares, especies } = useDatos();
  const [pestana, setPestana] = useState('info');
  const idx = lugares.findIndex((l) => l.id === id);
  const lugar = lugares[idx];
  useDocumentTitle(lugar?.nombre);
  if (!lugar) return <NoEncontrada />;

  const anterior = lugares[idx - 1];
  const siguiente = lugares[idx + 1];
  const relacionadas = especies.filter((e) => e.lugares?.includes(lugar.id));
  const fotos = lugar.fotos ?? [];

  return (
    <div className="container pb-5">
      <VolverA to="/lugares">Volver a lugares</VolverA>
      <BandaTitulo titulo={lugar.nombre} texto={`Lugar ${idx + 1} de ${lugares.length}`} color="celeste">
        <Insignia estado={lugar.estado} />
      </BandaTitulo>

      <div className="mum-tabs" role="tablist" aria-label="Secciones del lugar">
        {PESTANAS.map(([clave, etiqueta]) => (
          <button key={clave} type="button" role="tab" aria-selected={pestana === clave} onClick={() => setPestana(clave)}>
            {etiqueta}
          </button>
        ))}
      </div>

      <div className="py-4" role="tabpanel">
        {pestana === 'info' && (
          <>
            {lugar.descripcion ? <p>{lugar.descripcion}</p> : <EstadoVacio titulo="Descripción pendiente de la contraparte." />}
            {relacionadas.length > 0 && (
              <>
                <h2 className="h6">Especies que se pueden ver aquí</h2>
                <div className="d-flex flex-wrap gap-2">
                  {relacionadas.map((e) => (
                    <Link key={e.id} to={rutaEspecie(e)} className="mum-chip btn btn-sm rounded-pill">{e.nombreComun}</Link>
                  ))}
                </div>
              </>
            )}
          </>
        )}
        {pestana === 'fotos' &&
          (fotos.length ? (
            <div className="row g-3 row-cols-1 row-cols-sm-2 row-cols-lg-3">
              {fotos.map((f, i) => (
                <div className="col" key={f.id ?? i}>
                  <ImagenFicha foto={f} categoria="flora" alt={lugar.nombre} mostrarCredito />
                </div>
              ))}
            </div>
          ) : (
            <EstadoVacio titulo="Fotos pendientes de autorización." texto="Cada foto mostrará su autor o fuente." />
          ))}
        {pestana === 'plano' &&
          (lugar.plano ? <img src={lugar.plano} alt={`Plano de ${lugar.nombre}`} className="img-fluid rounded-4" /> : <EstadoVacio titulo="Plano del sector pendiente de la contraparte." />)}
        {pestana === 'como' &&
          (lugar.ubicacion?.url ? (
            <a className="btn btn-primary rounded-pill" href={lugar.ubicacion.url} target="_blank" rel="noopener noreferrer">Abrir en el mapa</a>
          ) : (
            <EstadoVacio titulo="Ubicación aún no confirmada." texto="No se muestra marcador hasta tener la ubicación oficial." />
          ))}
      </div>

      <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center">
        {anterior ? <Link className="btn btn-outline-primary rounded-pill" to={rutaLugar(anterior)}>← {anterior.nombre}</Link> : <span />}
        <EnlaceCopiable />
        {siguiente ? <Link className="btn btn-outline-primary rounded-pill" to={rutaLugar(siguiente)}>{siguiente.nombre} →</Link> : <span />}
      </div>
    </div>
  );
}
