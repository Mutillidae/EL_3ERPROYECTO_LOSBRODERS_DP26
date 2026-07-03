VSIAF REACT + VITE

## Cómo correrlo

```bash
npm install
npm run dev
```

Luego abre la URL que muestra la terminal (normalmente `http://localhost:5173`).

Para generar una build de producción:

```bash
npm run build
npm run preview
```

## Qué incluye

- Ventana principal con menú **Sistema / Ayuda**, banner V.S.I.A.F., menú lateral y barra de estado.
- Solo puede haber **una ventana abierta a la vez**: al apretar un botón del menú se
  abre esa ventana y se cierra automáticamente la que estaba abierta. Si vuelves a
  apretar el mismo botón, esa ventana se cierra. El botón activo queda resaltado
  en el menú lateral.
- Ventanas flotantes arrastrables (se pueden mover tomándolas del título), cada una
  con su propia lógica:
  - **Activos Fijos** — alta y listado de activos.
  - **Grupos y Auxiliares** — grupos contables con sus auxiliares.
  - **Oficinas y Responsables** — alta de oficinas y su tabla de responsables.
  - **Generar Reportes** — formulario de filtros para reportes a medida.
  - **Administradores** — alta de usuarios del sistema.
  - **Iniciar sesión** — login simulado (cualquier usuario/contraseña no vacíos funciona).
  - **Respaldos BD** — simulación de backups (crear/borrar/ver detalle).
  - **Administrar Unidad** — panel de administración de recursos (cierre de gestión, etc.).
  - **Localización BD** — cambia y "graba" la ruta de la base de datos (solo visual).

## Estructura

```
src/
  assets/          Imágenes u otros recursos estáticos (vacío por ahora)
  components/      Piezas reutilizables del layout (Header, Sidebar, StatusBar, WindowFrame, etc.)
  pages/           Cada "ventana" del sistema como componente independiente
  styles/          CSS global (tema visual estilo Windows clásico/Delphi) y layout
  App.jsx          Orquesta qué ventana está abierta (solo una a la vez)
  main.jsx         Punto de entrada de React
```

## Personalizar

- Colores y tema: `src/styles/index.css` (variables CSS en `:root`).
- Botones del menú principal: `src/components/Sidebar.jsx`.
- Cada ventana es independiente, así que puedes editar su lógica en `src/windows/*.jsx`
  sin afectar a las demás.

## Siguiente paso sugerido

Cuando quieras conectarlo a datos reales, lo más simple es reemplazar los `useState`
locales de cada ventana por llamadas a una API (fetch/axios) hacia tu backend.
