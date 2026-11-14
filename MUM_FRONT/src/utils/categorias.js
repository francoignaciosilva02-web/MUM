export const CATEGORIAS = {
  aves: { clave: 'aves', nombre: 'Aves', texto: 'Las aves del humedal.', banda: 'turquesa' },
  fauna: { clave: 'fauna', nombre: 'Otra fauna', texto: 'Anfibios, peces, insectos y otros habitantes.', banda: 'marino' },
  flora: { clave: 'flora', nombre: 'Flora', texto: 'Plantas y árboles del humedal.', banda: 'oliva' },
};
export const CLAVES = Object.keys(CATEGORIAS);

export const rutaEspecie = (e) => `/biodiversidad/${e.categoria}/${e.id}`;
export const rutaLugar = (l) => `/lugares/${l.id}`;
