import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DatosProvider, useEstadoDatos } from './context/DatosContext';
import Layout from './components/layout/Layout';
import Cargando from './components/ui/Cargando';
import EstadoError from './components/ui/EstadoError';
import Inicio from './pages/Inicio';
import Biodiversidad from './pages/Biodiversidad';
import Categoria from './pages/Categoria';
import Especie from './pages/Especie';
import Lugares from './pages/Lugares';
import Lugar from './pages/Lugar';
import Galeria from './pages/Galeria';
import Aplicacion from './pages/Aplicacion';
import Visita from './pages/Visita';
import Creditos from './pages/Creditos';
import Privacidad from './pages/Privacidad';
import NoEncontrada from './pages/NoEncontrada';

function Rutas() {
  const { cargando, error, datos, reintentar } = useEstadoDatos();
  if (cargando) return <Cargando texto="Cargando el museo…" />;
  if (error || !datos) return <EstadoError mensaje={error?.message} onReintentar={reintentar} />;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path="biodiversidad" element={<Biodiversidad />} />
          <Route path="aves" element={<Categoria categoria="aves" />} />
          <Route path="fauna" element={<Categoria categoria="fauna" />} />
          <Route path="flora" element={<Categoria categoria="flora" />} />
          <Route path="biodiversidad/:categoria/:id" element={<Especie />} />
          <Route path="lugares" element={<Lugares />} />
          <Route path="lugares/:id" element={<Lugar />} />
          <Route path="galeria" element={<Galeria />} />
          <Route path="aplicacion" element={<Aplicacion />} />
          <Route path="visita" element={<Visita />} />
          <Route path="creditos" element={<Creditos />} />
          <Route path="privacidad" element={<Privacidad />} />
          <Route path="*" element={<NoEncontrada />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <DatosProvider>
      <Rutas />
    </DatosProvider>
  );
}
