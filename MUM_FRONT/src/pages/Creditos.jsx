import { useDatos } from '../context/DatosContext';
import useDocumentTitle from '../hooks/useDocumentTitle';
import BandaTitulo from '../components/ui/BandaTitulo';
import Insignia from '../components/ui/Insignia';

/** Créditos y procedencia (RF12). La tabla se genera desde los datos. */
export default function Creditos() {
  const { especies, lugares, galeria } = useDatos();
  useDocumentTitle('Créditos');

  const filas = [
    ...especies.map((e) => ({ clave: `e-${e.id}`, nombre: e.nombreComun, tipo: 'Ficha', fuente: e.fuente, estado: e.estado })),
    ...lugares.map((l) => ({ clave: `l-${l.id}`, nombre: l.nombre, tipo: 'Lugar', fuente: l.fuente, estado: l.estado })),
    ...(galeria.fotos ?? []).map((f, i) => ({ clave: `f-${f.id ?? i}`, nombre: f.alt ?? 'Foto', tipo: 'Foto', fuente: f.credito, estado: f.estado })),
    ...(galeria.video?.src ? [{ clave: 'video', nombre: galeria.video.titulo ?? 'Video', tipo: 'Video', fuente: galeria.video.credito, estado: galeria.video.estado }] : []),
  ];

  return (
    <div className="container pb-5">
      <BandaTitulo titulo="Créditos y procedencia" texto="Fuente y estado de aprobación de cada contenido." color="marino" />
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr><th scope="col">Contenido</th><th scope="col">Tipo</th><th scope="col">Fuente o autor</th><th scope="col">Estado</th></tr>
          </thead>
          <tbody>
            {filas.map((f) => (
              <tr key={f.clave}>
                <td>{f.nombre}</td>
                <td>{f.tipo}</td>
                <td>{f.fuente || 'Pendiente'}</td>
                <td>{f.estado === 'aprobado' ? 'Aprobado' : <Insignia estado={f.estado ?? 'pendiente'} />}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
