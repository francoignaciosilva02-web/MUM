/** Plano esquemático con un punto por lugar. Las posiciones salen de los datos (posicionPlano). */
export default function MapaInteractivo({ lugares, seleccionadoId, onSeleccionar }) {
  return (
    <div className="mum-mapa position-relative rounded-5 overflow-hidden">
      <svg viewBox="0 0 500 400" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Plano esquemático del humedal">
        <path d="M0 330C100 300 160 340 260 320S420 290 500 320V400H0Z" fill="#c9e3cf" />
        <path d="M60 200C70 110 170 70 280 100C390 130 460 120 470 210C480 300 360 350 250 336C130 322 50 300 60 200Z" fill="#72a2ee" opacity=".7" />
        <path d="M130 205C150 165 230 155 305 178C370 198 410 218 380 256C340 286 200 282 150 262C120 248 118 226 130 205Z" fill="#00c9a7" opacity=".5" />
        <path d="M0 60C100 90 160 40 260 56S420 30 500 70" stroke="#72a2ee" strokeWidth="5" fill="none" />
      </svg>
      {lugares
        .filter((l) => l.posicionPlano)
        .map((l, i) => (
          <button
            key={l.id}
            type="button"
            className="mum-pin"
            style={{ left: `${l.posicionPlano.x}%`, top: `${l.posicionPlano.y}%` }}
            aria-pressed={l.id === seleccionadoId}
            aria-label={l.nombre}
            onClick={() => onSeleccionar(l.id)}
          >
            {l.orden ?? i + 1}
          </button>
        ))}
    </div>
  );
}
