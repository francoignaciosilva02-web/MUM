const DIBUJOS = {
  aves: (
    <>
      <path d="M20 150H180" stroke="#00c9a7" strokeWidth="5" strokeLinecap="round" />
      <ellipse cx="95" cy="105" rx="42" ry="30" fill="currentColor" />
      <circle cx="140" cy="78" r="20" fill="currentColor" />
      <path d="M158 76L182 82L158 88Z" fill="#00c9a7" />
      <path d="M55 112L12 140L58 128Z" fill="currentColor" />
      <path d="M90 134V150M104 134V150" stroke="currentColor" strokeWidth="4" />
    </>
  ),
  fauna: (
    <>
      <ellipse cx="100" cy="120" rx="52" ry="34" fill="currentColor" />
      <circle cx="78" cy="82" r="14" fill="currentColor" />
      <circle cx="122" cy="82" r="14" fill="currentColor" />
      <circle cx="78" cy="80" r="5" fill="#00c9a7" />
      <circle cx="122" cy="80" r="5" fill="#00c9a7" />
      <path d="M52 135L26 162H60M148 135L174 162H140" stroke="currentColor" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  flora: (
    <>
      <path d="M100 110V180" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
      <ellipse cx="72" cy="150" rx="26" ry="10" transform="rotate(-30 72 150)" fill="#00c9a7" />
      <g fill="currentColor">
        <circle cx="100" cy="64" r="20" />
        <circle cx="130" cy="86" r="20" />
        <circle cx="70" cy="86" r="20" />
      </g>
      <circle cx="100" cy="86" r="15" fill="#00c9a7" />
    </>
  ),
};

/** Ilustración de reserva por categoría (cuando no hay foto). Decorativa. */
export default function IlustracionCategoria({ categoria = 'flora', className = '' }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" aria-hidden="true" focusable="false" className={className}>
      {DIBUJOS[categoria] ?? DIBUJOS.flora}
    </svg>
  );
}
