import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDatos } from '../context/DatosContext';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { rutaLugar } from '../utils/categorias';
import BandaTitulo from '../components/ui/BandaTitulo';
import EstadoVacio from '../components/ui/EstadoVacio';
import MapaInteractivo from '../components/lugares/MapaInteractivo';
import PanelLugar from '../components/lugares/PanelLugar';

/** Lugares de interés (RF04): plano interactivo y recorrido imprimible. */
export default function Lugares() {
  const { lugares, especies } = useDatos();
  useDocumentTitle('Lugares');
  const [seleccionado, setSeleccionado] = useState(lugares[0]?.id);

  if (!lugares.length) {
    return (
      <div className="container pb-5">
        <BandaTitulo titulo="Lugares de interés" color="celeste" />
        <EstadoVacio titulo="Aún no hay lugares publicados." />
      </div>
    );
  }

  const idx = Math.max(0, lugares.findIndex((l) => l.id === seleccionado));
  const lugar = lugares[idx];
  const mover = (d) => setSeleccionado(lugares[(idx + d + lugares.length) % lugares.length].id);
  const relacionadas = especies.filter((e) => e.lugares?.includes(lugar.id));

  return (
    <div className="container pb-5">
      <BandaTitulo titulo="Lugares de interés" texto={`${lugares.length} sectores del humedal.`} color="celeste" />

      <div className="row g-4 d-print-none">
        <div className="col-lg-7">
          <MapaInteractivo lugares={lugares} seleccionadoId={lugar.id} onSeleccionar={setSeleccionado} />
          <p className="small text-muted mt-2">Plano ilustrativo. Las posiciones reales se cargarán cuando cada ubicación esté confirmada.</p>
        </div>
        <div className="col-lg-5">
          <PanelLugar lugar={lugar} posicion={idx + 1} total={lugares.length} especies={relacionadas} onAnterior={() => mover(-1)} onSiguiente={() => mover(1)} />
        </div>
      </div>

      <section className="mt-5">
        <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center">
          <h2 className="h3 m-0">Recorrido sugerido</h2>
          <button type="button" className="btn btn-outline-primary rounded-pill d-print-none" onClick={() => window.print()}>
            Imprimir recorrido
          </button>
        </div>
        <p className="text-muted mt-2">Los lugares en orden. Sin reservas ni registro.</p>
        <ol className="mum-lista">
          {lugares.map((l) => (
            <li key={l.id}><Link to={rutaLugar(l)}>{l.nombre}</Link></li>
          ))}
        </ol>
      </section>
    </div>
  );
}
