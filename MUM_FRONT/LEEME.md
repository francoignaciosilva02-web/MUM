# MUM_FRONT · Sitio web del Museo Urbano del Mayaca

React 18 + Vite + Bootstrap 5.3 + React Router 6. Sin login, sin formularios, sin carga de imágenes, sin datos personales.

## Arrancar
npm install
npm run dev          # http://localhost:5173
npm run build        # genera /dist

## Cambiar de humedal (RF10)
- En la URL:       http://localhost:5173/?humedal=demo
- Por defecto:     archivo .env  ->  VITE_HUMEDAL=demo
Los datos viven en src/data/<humedal>/*.json. Para otro humedal, copia la carpeta "mayaca" y edítala.
Cuando exista la API (Express + MySQL), solo se cambia src/services/api.js. Ninguna vista se toca.

## Estructura
src/
  context/DatosContext.jsx      carga los datos y los reparte (loading / error / reintentar)
  services/api.js               único lugar que sabe de dónde vienen los datos
  components/layout/            NavbarMUM, FooterMUM, Layout, ErrorBoundary
  components/ui/                ImagenFicha, Insignia, EstadoVacio, EstadoError, BandaTitulo, ...
  components/catalogo/          TarjetaEspecie, GrillaEspecies
  components/lugares/           MapaInteractivo, PanelLugar
  components/media/             VideoPlayer
  components/busqueda/          BuscadorGlobal (Ctrl/Cmd + K)
  pages/                        una por ruta
  styles/                       tokens.css (paleta) y main.css

## Rutas
/  /biodiversidad  /aves  /fauna  /flora  /biodiversidad/:categoria/:id
/lugares  /lugares/:id  /galeria  /aplicacion  /visita  /creditos  /privacidad  *

## Contenido pendiente de la contraparte
Fichas reales, fotos con autor, nombres científicos, coordenadas, enlaces de tiendas,
canales oficiales y textos legales. Mientras tanto la interfaz muestra la insignia "Pendiente".
Video: public/video/mum-humedal.mp4 (si no existe, se muestra un aviso).
