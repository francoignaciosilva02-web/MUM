import { useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDatos } from '../context/DatosContext';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { CATEGORIAS } from '../utils/categorias';
import { normalizar } from '../utils/texto';
import BandaTitulo from '../components/ui/BandaTitulo';
import GrillaEspecies from '../components/catalogo/GrillaEspecies';

/** Listado de una categoría: /aves, /fauna, /flora (RF03). */
export default function Categoria({ categoria }) {
  const { especies } = useDatos();
  const info = CATEGORIAS[categoria];
  const [consulta, setConsulta] = useState('');
  useDocumentTitle(info?.nombre);

  const delaCategoria = useMemo(() => especies.filter((e) => e.categoria === categoria), [especies, categoria]);
  const visibles = useMemo(() => {
    const q = normalizar(consulta).trim();
    return q ? delaCategoria.filter((e) => normalizar(`${e.nombreComun} ${e.nombreCientifico ?? ''}`).includes(q)) : delaCategoria;
  }, [delaCategoria, consulta]);

  return (
    <div className="container pb-5">
      <BandaTitulo titulo={info.nombre} texto={`${info.texto} ${delaCategoria.length} fichas.`} color={info.banda}>
        <input
          type="search"
          className="form-control rounded-pill w-auto"
          style={{ minWidth: '14rem' }}
          placeholder="Buscar por nombre"
          aria-label="Buscar por nombre"
          value={consulta}
          onChange={(e) => setConsulta(e.target.value)}
        />
      </BandaTitulo>
      <nav className="d-flex flex-wrap gap-2 mb-4" aria-label="Categorías">
        {Object.values(CATEGORIAS).map((c) => (
          <NavLink key={c.clave} to={`/${c.clave}`} className={({ isActive }) => `mum-chip btn rounded-pill${isActive ? ' active' : ''}`}>
            {c.nombre}
          </NavLink>
        ))}
      </nav>
      <GrillaEspecies especies={visibles} textoVacio={consulta ? 'No hay fichas que coincidan.' : 'Aún no hay fichas en esta categoría.'} />
    </div>
  );
}
