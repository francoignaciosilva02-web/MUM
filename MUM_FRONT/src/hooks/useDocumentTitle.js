import { useEffect } from 'react';
import { useDatos } from '../context/DatosContext';

export default function useDocumentTitle(titulo) {
  const { territorio } = useDatos();
  useEffect(() => {
    document.title = titulo ? `${titulo} · ${territorio.nombre}` : territorio.nombre;
  }, [titulo, territorio.nombre]);
}
