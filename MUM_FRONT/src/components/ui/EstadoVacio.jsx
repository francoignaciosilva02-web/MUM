export default function EstadoVacio({ titulo, texto, children, className = '' }) {
  return (
    <div className={`mum-nota rounded-4 p-3 my-3 ${className}`} role="status">
      <strong>{titulo}</strong>
      {texto && <p className="mb-0">{texto}</p>}
      {children}
    </div>
  );
}
