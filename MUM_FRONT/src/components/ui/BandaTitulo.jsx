/** Cabecera de página con el H1 (un solo H1 por página, RNF02). */
export default function BandaTitulo({ titulo, texto, color = 'turquesa', children }) {
  return (
    <header className={`mum-banda mum-banda--${color} rounded-5 p-4 p-md-5 my-4 d-flex flex-wrap gap-3 align-items-center justify-content-between`}>
      <div>
        <h1 className="h2 m-0">{titulo}</h1>
        {texto && <p className="mb-0 mt-2">{texto}</p>}
      </div>
      {children}
    </header>
  );
}
