import { Link } from 'react-router-dom';
import { CATEGORIAS, rutaEspecie } from '../../utils/categorias';
import ImagenFicha from '../ui/ImagenFicha';
import Insignia from '../ui/Insignia';

/** Tarjeta de especie. Oculta lo que falta (foto, nombre científico) sin romper la grilla (RN02, RNF08). */
export default function TarjetaEspecie({ especie }) {
  const { nombreComun, nombreCientifico, categoria, foto, estado } = especie;
  return (
    <Link to={rutaEspecie(especie)} className="mum-tarjeta rounded-4 overflow-hidden">
      <ImagenFicha foto={foto} categoria={categoria} alt={nombreComun} className="rounded-0" />
      <div className="p-3">
        <h3 className="h6 mb-1">{nombreComun}</h3>
        <p className="small text-muted mb-1">
          {CATEGORIAS[categoria]?.nombre}
          {nombreCientifico && <> · <em>{nombreCientifico}</em></>}
        </p>
        <Insignia estado={estado} />
      </div>
    </Link>
  );
}
