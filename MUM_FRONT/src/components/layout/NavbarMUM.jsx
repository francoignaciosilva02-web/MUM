import { useEffect, useId, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './NavbarMUM.css';

/**
 * Barra de navegación del MUM (RF02, RF11, RNF01-RNF03, RNF08).
 *
 * No contiene textos ni rutas fijas: todo llega por props (RF09/RF10).
 *
 * @param {Object}  props
 * @param {{nombre?: string, logo?: {src?: string, alt?: string}}} [props.territorio]
 * @param {Array<{label: string, to?: string, end?: boolean,
 *                children?: Array<{label: string, to: string, end?: boolean}>}>} [props.enlaces]
 * @param {{label: string, to: string}} [props.cta]  Botón destacado (ej. "Visita")
 * @param {import('react').ReactNode} [props.extra]  Elemento extra antes del botón (ej. buscador)
 */
const coincide = (pathname, to) => pathname === to || pathname.startsWith(`${to}/`);

function Marca({ territorio, onNavigate }) {
  const { nombre = 'Museo Urbano', logo } = territorio ?? {};
  const [logoFalla, setLogoFalla] = useState(false);

  // Si cambia el humedal (otro logo), se vuelve a intentar cargar la imagen.
  useEffect(() => setLogoFalla(false), [logo?.src]);

  const mostrarLogo = Boolean(logo?.src) && !logoFalla;

  return (
    <Link
      to="/"
      className="navbar-brand mum-brand m-0"
      aria-label={`${nombre}: ir al inicio`}
      onClick={onNavigate}
    >
      {mostrarLogo ? (
        <img
          src={logo.src}
          alt={logo.alt || nombre}
          className="mum-brand__logo"
          onError={() => setLogoFalla(true)}
        />
      ) : (
        <span className="mum-brand__texto">{nombre}</span>
      )}
    </Link>
  );
}

function EnlaceSimple({ item, onNavigate }) {
  return (
    <li className="nav-item">
      <NavLink
        to={item.to}
        end={item.end}
        className={({ isActive }) => `nav-link mum-link${isActive ? ' active' : ''}`}
        onClick={onNavigate}
      >
        {item.label}
      </NavLink>
    </li>
  );
}

function Desplegable({ item, abierto, onToggle, onNavigate, pathname }) {
  const menuId = useId();
  const hijos = (item.children ?? []).filter((h) => h?.to && h?.label);
  if (hijos.length === 0) return null;

  const activo = hijos.some((h) => coincide(pathname, h.to));

  return (
    <li className="nav-item dropdown">
      <button
        type="button"
        className={`nav-link mum-link dropdown-toggle${activo ? ' active' : ''}${abierto ? ' show' : ''}`}
        aria-expanded={abierto}
        aria-controls={menuId}
        onClick={onToggle}
      >
        {item.label}
      </button>
      <ul id={menuId} className={`dropdown-menu mum-dropdown rounded-4 border-0 shadow${abierto ? ' show' : ''}`}>
        {hijos.map((h) => (
          <li key={h.to}>
            <NavLink
              to={h.to}
              end={h.end}
              className={({ isActive }) => `dropdown-item rounded-pill${isActive ? ' active' : ''}`}
              onClick={onNavigate}
            >
              {h.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </li>
  );
}

export default function NavbarMUM({ territorio, enlaces = [], cta, extra }) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [desplegableAbierto, setDesplegableAbierto] = useState(null);
  const navRef = useRef(null);
  const panelId = useId();
  const { pathname } = useLocation();

  const cerrarTodo = () => {
    setMenuAbierto(false);
    setDesplegableAbierto(null);
  };

  // Cada cambio de ruta cierra los menús (RF02).
  useEffect(cerrarTodo, [pathname]);

  // Cerrar con Escape o al hacer clic fuera (RNF02: teclado).
  useEffect(() => {
    const fuera = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) cerrarTodo();
    };
    const tecla = (e) => {
      if (e.key === 'Escape') cerrarTodo();
    };
    document.addEventListener('mousedown', fuera);
    document.addEventListener('keydown', tecla);
    return () => {
      document.removeEventListener('mousedown', fuera);
      document.removeEventListener('keydown', tecla);
    };
  }, []);

  const validos = (enlaces ?? []).filter((e) => e?.label && (e.to || e.children?.length));
  const hayMenu = validos.length > 0 || Boolean(cta?.to) || Boolean(extra);

  return (
    <header className="mum-header sticky-top d-print-none">
      <a className="visually-hidden-focusable mum-skip" href="#contenido">
        Saltar al contenido
      </a>

      <nav
        ref={navRef}
        className="navbar navbar-expand-lg mum-navbar bg-white rounded-bottom-4 shadow-sm py-2"
        aria-label="Principal"
      >
        <div className="container">
          <Marca territorio={territorio} onNavigate={cerrarTodo} />

          {hayMenu && (
            <>
              <button
                type="button"
                className="navbar-toggler border-0 rounded-pill"
                aria-controls={panelId}
                aria-expanded={menuAbierto}
                aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
                onClick={() => setMenuAbierto((v) => !v)}
              >
                <span className="navbar-toggler-icon" />
              </button>

              <div id={panelId} className={`collapse navbar-collapse${menuAbierto ? ' show' : ''}`}>
                <ul className="navbar-nav ms-lg-auto align-items-lg-center gap-lg-1 mt-3 mt-lg-0">
                  {validos.map((item) =>
                    item.children ? (
                      <Desplegable
                        key={item.label}
                        item={item}
                        pathname={pathname}
                        abierto={desplegableAbierto === item.label}
                        onToggle={() =>
                          setDesplegableAbierto((actual) => (actual === item.label ? null : item.label))
                        }
                        onNavigate={cerrarTodo}
                      />
                    ) : (
                      <EnlaceSimple key={item.to} item={item} onNavigate={cerrarTodo} />
                    ),
                  )}
                </ul>

                {extra && <div className="ms-lg-2 mt-3 mt-lg-0">{extra}</div>}

                {cta?.to && cta?.label && (
                  <Link
                    to={cta.to}
                    className="btn mum-cta rounded-pill ms-lg-3 mt-3 mt-lg-0"
                    onClick={cerrarTodo}
                  >
                    {cta.label}
                  </Link>
                )}
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
