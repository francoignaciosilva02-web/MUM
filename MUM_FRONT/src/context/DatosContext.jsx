import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { cargarHumedal, humedalActivo } from '../services/api';

const DatosContext = createContext(null);

export function DatosProvider({ children }) {
  const [estado, setEstado] = useState({ cargando: true, error: null, datos: null });
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    let vivo = true;
    setEstado({ cargando: true, error: null, datos: null });
    cargarHumedal(humedalActivo())
      .then((datos) => vivo && setEstado({ cargando: false, error: null, datos }))
      .catch((error) => vivo && setEstado({ cargando: false, error, datos: null }));
    return () => {
      vivo = false;
    };
  }, [intento]);

  const reintentar = useCallback(() => setIntento((n) => n + 1), []);
  const valor = useMemo(() => ({ ...estado, reintentar }), [estado, reintentar]);

  return <DatosContext.Provider value={valor}>{children}</DatosContext.Provider>;
}

/** Estado de carga completo (solo lo usa App.jsx). */
export const useEstadoDatos = () => useContext(DatosContext);

/** Datos del humedal ya cargados. Úsalo en cualquier página o componente. */
export function useDatos() {
  const ctx = useContext(DatosContext);
  if (!ctx?.datos) throw new Error('useDatos debe usarse dentro de <DatosProvider> con datos cargados.');
  return ctx.datos;
}
