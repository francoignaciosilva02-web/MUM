import { useEffect, useRef, useState } from 'react';

/**
 * Video autorizado (RF06): silenciado, en bucle, con botón de pausa.
 * Si el archivo no existe o falla, muestra un aviso claro en vez de un reproductor roto.
 *
 * @param {{src: string, titulo?: string}} [props.video]
 */
export default function VideoPlayer({ video, ancho = false, className = '' }) {
  const ref = useRef(null);
  const [lista, setLista] = useState(false);
  const [falla, setFalla] = useState(false);
  const [pausado, setPausado] = useState(false);

  useEffect(() => {
    setLista(false);
    setFalla(false);
    setPausado(false);
  }, [video?.src]);

  if (!video?.src) return null;

  const alternar = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setPausado(false);
    } else {
      v.pause();
      setPausado(true);
    }
  };

  return (
    <div className={`mum-video${ancho ? ' mum-video--ancho' : ''} position-relative rounded-5 overflow-hidden ${className}`}>
      {!falla && (
        <video
          ref={ref}
          muted
          loop
          autoPlay
          playsInline
          preload="metadata"
          aria-label={video.titulo || 'Video del humedal'}
          onCanPlay={() => setLista(true)}
          onError={() => setFalla(true)}
        >
          <source src={video.src} type="video/mp4" onError={() => setFalla(true)} />
        </video>
      )}
      {(!lista || falla) && (
        <div className="mum-video__aviso position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center text-white text-center p-3">
          {falla ? 'El video no está disponible por ahora.' : 'Cargando video…'}
        </div>
      )}
      {lista && !falla && (
        <button type="button" className="mum-video__btn btn btn-sm btn-primary rounded-pill" onClick={alternar}>
          {pausado ? 'Reproducir video' : 'Pausar video'}
        </button>
      )}
    </div>
  );
}
