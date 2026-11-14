import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useDatos } from '../../context/DatosContext';
import NavbarMUM from './NavbarMUM';
import FooterMUM from './FooterMUM';
import ErrorBoundary from './ErrorBoundary';
import BuscadorGlobal from '../busqueda/BuscadorGlobal';

export default function Layout() {
  const { territorio, navegacion, visita } = useDatos();
  const { pathname } = useLocation();
  const main = useRef(null);
  const primera = useRef(true);

  // Al cambiar de página: arriba y foco al contenido (RNF02). No en la primera carga.
  useEffect(() => {
    if (primera.current) {
      primera.current = false;
      return;
    }
    window.scrollTo(0, 0);
    main.current?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarMUM
        territorio={territorio}
        enlaces={navegacion.enlaces}
        cta={navegacion.cta}
        extra={<BuscadorGlobal />}
      />
      <main id="contenido" ref={main} tabIndex={-1} className="flex-grow-1">
        <ErrorBoundary key={pathname}>
          <Outlet />
        </ErrorBoundary>
      </main>
      <FooterMUM territorio={territorio} canales={visita?.canales} />
    </div>
  );
}
