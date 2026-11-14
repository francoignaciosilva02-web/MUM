import EstadoVacio from '../ui/EstadoVacio';
import TarjetaEspecie from './TarjetaEspecie';

/** 1 columna a 360 px, 2 en tableta, 3 y 4 en escritorio (RNF01). */
export default function GrillaEspecies({ especies, textoVacio = 'No hay fichas que mostrar.' }) {
  if (!especies?.length) return <EstadoVacio titulo={textoVacio} />;
  return (
    <div className="row g-3 row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
      {especies.map((e) => (
        <div className="col" key={e.id}>
          <TarjetaEspecie especie={e} />
        </div>
      ))}
    </div>
  );
}
