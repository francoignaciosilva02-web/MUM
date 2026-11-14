import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDatos } from '../../context/DatosContext';
import { CATEGORIAS, rutaEspecie, rutaLugar } from '../../utils/categorias';
import { normalizar } from '../../utils/texto';

/**
 * Buscador global (Ctrl/Cmd + K). Busca en lugares y especies sin importar tildes.
 * Es solo lectura: no guarda historial ni datos de quien busca.
 */
export default function BuscadorGlobal() {
  const { especies, lugares } = useDatos();
  const navigate = useNavigate();
  const dialogo = useRef(null);
  const campo = useRef(null);
  const listaId = useId();
  const [consulta, setConsulta] = useState('');
  const [activo, setActivo] = useState(0);

  const indice = useMemo(
    () => [
      ...lugares.map((l) => ({ clave: `l-${l.id}`, nombre: l.nombre, tipo: 'Lugar', to: rutaLugar(l), texto: normalizar(l.nombre) })),
      ...especies.map((e) => ({
        clave: `e-${e.id}`,
        nombre: e.nombreComun,
        tipo: CATEGORIAS[e.categoria]?.nombre ?? 'Especie',
        to: rutaEspecie(e),
        texto: normalizar(`${e.nombreComun} ${e.nombreCientifico ?? ''}`),
      })),
    ],
    [especies, lugares],
  );

  const resultados = useMemo(() => {
    const q = normalizar(consulta).trim();
    return (q ? indice.filter((r) => r.texto.includes(q)) : indice).slice(0, 8);
  }, [consulta, indice]);

  const abrir = () => {
    setConsulta('');
    setActivo(0);
    if (!dialogo.current?.open) dialogo.current?.showModal();
    campo.current?.focus();
  };
  const cerrar = () => dialogo.current?.close();
  const ir = (r) => {
    cerrar();
    navigate(r.to);
  };

  useEffect(() => {
    const atajo = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        abrir();
      }
    };
    document.addEventListener('keydown', atajo);
    return () => document.removeEventListener('keydown', atajo);
  }, []);

  const alTeclear = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActivo((i) => Math.min(i + 1, resultados.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActivo((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && resultados[activo]) {
      ir(resultados[activo]);
    }
  };

  return (
    <>
      <button type="button" className="btn btn-outline-primary rounded-pill d-inline-flex align-items-center gap-2" onClick={abrir} aria-label="Buscar en el sitio">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
        <span>Buscar</span>
        <kbd className="d-none d-xl-inline small">Ctrl K</kbd>
      </button>

      <dialog
        ref={dialogo}
        className="mum-dialog rounded-5 border-0 p-0 shadow-lg"
        aria-label="Buscar en el sitio"
        onClick={(e) => e.target === dialogo.current && cerrar()}
      >
        <div className="p-3">
          <input
            ref={campo}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls={listaId}
            aria-activedescendant={resultados[activo] ? `${listaId}-${activo}` : undefined}
            aria-label="Buscar especies o lugares"
            className="form-control form-control-lg border-0 border-bottom rounded-0"
            placeholder="Busca especies o lugares…"
            autoComplete="off"
            value={consulta}
            onChange={(e) => {
              setConsulta(e.target.value);
              setActivo(0);
            }}
            onKeyDown={alTeclear}
          />
          <ul id={listaId} role="listbox" className="list-unstyled mt-2 mb-0" style={{ maxHeight: '50vh', overflow: 'auto' }}>
            {resultados.length === 0 && <li className="p-3 text-muted">Sin resultados.</li>}
            {resultados.map((r, i) => (
              <li key={r.clave} id={`${listaId}-${i}`} role="option" aria-selected={i === activo}>
                <button type="button" className="mum-opcion btn text-start w-100 d-flex justify-content-between rounded-4" aria-selected={i === activo} onClick={() => ir(r)}>
                  <span>{r.nombre}</span>
                  <small className="text-muted">{r.tipo}</small>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </>
  );
}
