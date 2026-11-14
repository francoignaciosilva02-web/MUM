/** Minúsculas y sin tildes, para buscar sin depender de la ortografía. */
export const normalizar = (s) =>
  String(s ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
