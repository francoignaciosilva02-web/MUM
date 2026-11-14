import { useEffect, useState } from 'react';
import IlustracionCategoria from './IlustracionCategoria';

/**
 * Foto con crédito (RN05). Si no hay foto, o falla al cargar, muestra una
 * ilustración de reserva con el mismo tamaño: la grilla nunca se rompe (RNF08).
 *
 * @param {{url?: string, alt?: string, credito?: string}} [props.foto]
 */
export default function ImagenFicha({ foto, categoria, alt = '', proporcion = '4x3', mostrarCredito = false, className = '' }) {
  const [falla, setFalla] = useState(false);
  useEffect(() => setFalla(false), [foto?.url]);

  const hayFoto = Boolean(foto?.url) && !falla;

  return (
    <div className={className}>
      <div className={`ratio ratio-${proporcion} rounded-4 overflow-hidden mum-imagen`}>
        {hayFoto ? (
          <img src={foto.url} alt={foto.alt || alt} loading="lazy" onError={() => setFalla(true)} />
        ) : (
          <div className="mum-imagen__reserva" role="img" aria-label={`Imagen pendiente: ${alt}`}>
            <IlustracionCategoria categoria={categoria} />
          </div>
        )}
      </div>
      {mostrarCredito && hayFoto && (
        <p className="small text-muted mt-1 mb-0">Foto: {foto.credito || 'crédito pendiente'}</p>
      )}
    </div>
  );
}
