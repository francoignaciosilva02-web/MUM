import { Link } from 'react-router-dom';
import IlustracionCategoria from './IlustracionCategoria';

/** Tarjeta grande para entrar a una sección (Aves, Flora, Lugares…). */
export default function TarjetaAcceso({ to, titulo, texto, color = 'turquesa', categoria = 'flora' }) {
  return (
    <Link to={to} className={`mum-acceso mum-acceso--${color} rounded-5 p-4`}>
      <h3 className="h4 m-0">{titulo}</h3>
      {texto && <p className="m-0">{texto}</p>}
      <IlustracionCategoria categoria={categoria} className="mum-acceso__ilu" />
      <span className="mum-acceso__ver">Ver →</span>
    </Link>
  );
}
