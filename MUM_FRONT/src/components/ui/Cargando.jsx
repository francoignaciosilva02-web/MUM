export default function Cargando({ texto = 'Cargando…' }) {
  return (
    <div className="d-flex align-items-center justify-content-center gap-3 py-5" role="status">
      <div className="spinner-border text-primary" aria-hidden="true" />
      <span>{texto}</span>
    </div>
  );
}
