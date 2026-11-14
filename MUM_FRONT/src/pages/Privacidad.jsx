import useDocumentTitle from '../hooks/useDocumentTitle';
import BandaTitulo from '../components/ui/BandaTitulo';
import EstadoVacio from '../components/ui/EstadoVacio';

export default function Privacidad() {
  useDocumentTitle('Privacidad');
  return (
    <div className="container pb-5">
      <BandaTitulo titulo="Aviso de privacidad" color="marino" />
      <p>Este sitio no pide ni guarda datos personales de las personas que lo visitan. No tiene cuentas, formularios, reservas ni carga de imágenes.</p>
      <EstadoVacio titulo="Texto legal por revisar con la contraparte." texto="Debe ajustarse a la Ley 21.719 antes de publicar." />
    </div>
  );
}
