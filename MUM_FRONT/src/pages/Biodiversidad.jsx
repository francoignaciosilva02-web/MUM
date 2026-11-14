import { useDatos } from '../context/DatosContext';
import useDocumentTitle from '../hooks/useDocumentTitle';
import BandaTitulo from '../components/ui/BandaTitulo';
import TarjetaAcceso from '../components/ui/TarjetaAcceso';
import GrillaEspecies from '../components/catalogo/GrillaEspecies';
import { CATEGORIAS } from '../utils/categorias';

/** Hub del catálogo (RF03). */
export default function Biodiversidad() {
  const { territorio, especies } = useDatos();
  useDocumentTitle('Biodiversidad');
  const cuenta = (c) => especies.filter((e) => e.categoria === c).length;

  return (
    <div className="container pb-5">
      <BandaTitulo titulo="Biodiversidad" texto={`Aves, otra fauna y flora del ${territorio.territorio ?? 'humedal'}.`} />
      <div className="row g-3">
        {Object.values(CATEGORIAS).map((c) => (
          <div className="col-md-4" key={c.clave}>
            <TarjetaAcceso to={`/${c.clave}`} titulo={c.nombre} texto={`${cuenta(c.clave)} fichas`} color={c.banda === 'marino' ? 'marino' : c.banda} categoria={c.clave} />
          </div>
        ))}
      </div>
      <h2 className="h3 mt-5">Fichas recientes</h2>
      <GrillaEspecies especies={especies.slice(0, 8)} textoVacio="Aún no hay fichas publicadas." />
    </div>
  );
}
