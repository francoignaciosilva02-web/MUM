import { useEffect, useRef, useState } from 'react';
import { useDatos } from '../context/DatosContext';
import useDocumentTitle from '../hooks/useDocumentTitle';
import BandaTitulo from '../components/ui/BandaTitulo';
import EstadoVacio from '../components/ui/EstadoVacio';
import ImagenFicha from '../components/ui/ImagenFicha';
import Insignia from '../components/ui/Insignia';
import VideoPlayer from '../components/media/VideoPlayer';

const FILTROS = [
  ['todos', 'Todos'],
  ['paisaje', 'Paisaje'],
  ['fauna', 'Fauna'],
  ['flora', 'Flora'],
];
const ilustracion = (c) => (c === 'paisaje' ? 'flora' : c);

/** Galería y video (RF05, RF06, RF12). */
export default function Galeria() {
  const { galeria } = useDatos();
  useDocumentTitle('Galería');
  const [pestana, setPestana] = useState('fotos');
  const [filtro, setFiltro] = useState('todos');
  const [abierta, setAbierta] = useState(null);
  const dialogo = useRef(null);
  const disparador = useRef(null);

  const fotos = (galeria.fotos ?? []).filter((f) => filtro === 'todos' || f.categoria === filtro);

  useEffect(() => {
    if (abierta && !dialogo.current?.open) dialogo.current?.showModal();
  }, [abierta]);

  const cerrar = () => {
    dialogo.current?.close();
    setAbierta(null);
    disparador.current?.focus();
  };

  return (
    <div className="container pb-5">
      <BandaTitulo titulo="Galería" texto="Fotografías y video autorizados del humedal." color="marino" />

      <div className="mum-tabs" role="tablist" aria-label="Tipo de contenido">
        <button type="button" role="tab" aria-selected={pestana === 'fotos'} onClick={() => setPestana('fotos')}>Fotos</button>
        <button type="button" role="tab" aria-selected={pestana === 'video'} onClick={() => setPestana('video')}>Video</button>
      </div>

      <div className="py-4" role="tabpanel">
        {pestana === 'fotos' && (
          <>
            {!(galeria.fotos?.length) ? (
              <EstadoVacio titulo="Aún no hay fotos publicadas." />
            ) : (
              <>
                <div className="d-flex flex-wrap gap-2 mb-3" role="group" aria-label="Filtrar fotos">
                  {FILTROS.map(([clave, etiqueta]) => (
                    <button key={clave} type="button" className={`mum-chip btn rounded-pill${filtro === clave ? ' active' : ''}`} aria-pressed={filtro === clave} onClick={() => setFiltro(clave)}>
                      {etiqueta}
                    </button>
                  ))}
                </div>
                {galeria.fotos.some((f) => f.estado === 'pendiente') && (
                  <EstadoVacio titulo="Hay fotos pendientes de autorización." texto="Cada foto mostrará su autor o fuente y una descripción alternativa." />
                )}
                <div className="row g-3 row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
                  {fotos.map((f, i) => (
                    <div className="col" key={f.id ?? i}>
                      <button
                        type="button"
                        className="mum-tarjeta rounded-4 overflow-hidden border-0 text-start p-0 w-100"
                        onClick={(e) => {
                          disparador.current = e.currentTarget;
                          setAbierta(f);
                        }}
                      >
                        <ImagenFicha foto={f} categoria={ilustracion(f.categoria)} alt={f.alt ?? 'Foto del humedal'} className="rounded-0" />
                        <span className="d-block p-3 small">
                          <span className="d-block text-muted">Autor: {f.credito || 'pendiente'}</span>
                          <Insignia estado={f.estado} texto={f.estado === 'pendiente' ? 'Sin autorización' : undefined} />
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
        {pestana === 'video' &&
          (galeria.video?.src ? <VideoPlayer video={galeria.video} ancho /> : <EstadoVacio titulo="Aún no hay video publicado." />)}
      </div>

      <dialog ref={dialogo} className="mum-dialog rounded-5 border-0 p-0" aria-label="Foto ampliada" onClose={() => setAbierta(null)} onClick={(e) => e.target === dialogo.current && cerrar()}>
        {abierta && (
          <div className="p-3">
            <ImagenFicha foto={abierta} categoria={ilustracion(abierta.categoria)} alt={abierta.alt ?? 'Foto del humedal'} mostrarCredito />
            <p className="mt-2 mb-3">{abierta.alt}</p>
            <button type="button" className="btn btn-primary rounded-pill" onClick={cerrar}>Cerrar</button>
          </div>
        )}
      </dialog>
    </div>
  );
}
