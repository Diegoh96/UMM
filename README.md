Dummy Store — Tienda de Videojuegos (Frontend por páginas + Backend Node.js)

Integrantes

IntegranteMejora a cargoDiego SotoContador visual de usuarios (panel admin)Pedro CastroGestión de usuarios (bloquear / desbloquear / eliminar)Maickoll ChallapaExpulsión en caliente

Mejoras UMM (Unidad Metodológica Mínima)

Sobre la base del proyecto ya entregado en la Unidad III, se integraron las
siguientes mejoras de JavaScript y experiencia de usuario:


Contador visual de usuarios (panel admin): tarjetas de estadísticas en
admin.html con el total de usuarios registrados, activos, bloqueados,
juegos en catálogo y mensajes nuevos (GET /api/admin/estadisticas).
Implementado por: Diego Soto.
Gestión de usuarios: nueva tabla en el panel admin para bloquear
("hasta nuevo aviso"), desbloquear y eliminar usuarios
(/api/admin/usuarios/...). El administrador está protegido: no puede ser
bloqueado ni eliminado.
Implementado por: Pedro Castro.
Aviso al usuario bloqueado: si un usuario bloqueado intenta iniciar
sesión, ve el mensaje "Usuario bloqueado hasta nuevo aviso" directamente en
el formulario de login; si intenta entrar por la pantalla de bienvenida
también se muestra un banner con el mismo aviso.
Implementado por: Pedro Castro.
Expulsión en caliente (mejora esencial agregada): si el admin bloquea a
un usuario que ya tiene una sesión activa, el servidor valida su estado en
cada petición (verificarBloqueoEnVivo) y lo desconecta de inmediato,
redirigiéndolo a la bienvenida con el aviso de bloqueo — no se limita a
impedir el próximo login.
Implementado por: Maickoll Challapa.


Estructura del proyecto

dummy-store-node/
├── server.js                 # Backend Node.js + Express (API REST, sesiones, CRUD)
├── package.json
├── data/
│   └── db.json                # "Base de datos" persistente (usuarios, juegos, mensajes)
└── public/
├── shared/
│   └── shared.css         # Variables de tema y estilos base comunes
├── welcome/                # Pantalla de bienvenida (SIEMPRE es la primera parada)
│   ├── welcome.html
│   ├── welcome.css
│   └── welcome.js
├── login/                  # Inicio de sesión (independiente)
│   ├── login.html
│   ├── login.css
│   └── login.js
├── register/                # Registro (independiente)
│   ├── register.html
│   ├── register.css
│   └── register.js
├── tienda/                  # Tienda: carrusel de reservas + categorías
│   ├── tienda.html
│   ├── tienda.css
│   └── tienda.js
├── carrito/                 # Ventana de compra
│   ├── carrito.html
│   ├── carrito.css
│   └── carrito.js
└── admin/                   # Panel del administrador (CRUD juegos + mensajes)
├── admin.html
├── admin.css
└── admin.js

Cada página tiene su propio HTML, CSS y JS, sin mezclarse entre sí (solo comparten
shared.css con las variables de color/tipografía para mantener el mismo tema visual
en todo el sitio, tal como en el boceto).

Backend (Node.js + Express)

Aunque la pauta de la evaluación (Unidad III) solo exige frontend, se agregó un
backend real "por si acaso":


Persistencia: archivo data/db.json (usuarios, juegos, mensajes).
Sesiones: cookie sid propia (sin librerías externas de sesión), guardada en
memoria del servidor.
Contraseñas: hasheadas con SHA-256 + salt (no se guardan en texto plano).
Rutas protegidas: /api/juegos (POST/PUT/DELETE) y /api/mensajes (GET) exigen
rol admin. /carrito y /admin exigen sesión iniciada.


Endpoints principales

MétodoRutaDescripciónAccesoGET/api/sesionEstado de la sesión actualPúblicoPOST/api/auth/registroCrear cuenta nuevaPúblicoPOST/api/auth/loginIniciar sesiónPúblicoPOST/api/auth/logoutCerrar sesiónCon sesiónGET/api/juegosListar juegosPúblicoPOST/api/juegosAgregar juegoAdminPUT/api/juegos/:idEditar juegoAdminDELETE/api/juegos/:idEliminar juegoAdminPOST/api/mensajesEnviar mensaje al adminCon sesiónGET/api/mensajesVer bandeja completaAdminGET/api/mensajes/miosVer mis propios mensajes enviadosCon sesiónPATCH/api/mensajes/:id/leidoMarcar mensaje como leídoAdminDELETE/api/mensajes/:idEliminar mensajeAdminGET/api/admin/estadisticasContadores para el panel adminAdminGET/api/admin/usuariosListar usuariosAdminPATCH/api/admin/usuarios/:username/bloquearBloquear usuario hasta nuevo avisoAdminPATCH/api/admin/usuarios/:username/desbloquearDesbloquear usuarioAdminDELETE/api/admin/usuarios/:usernameEliminar usuarioAdmin

Cómo ejecutar

bashcd dummy-store-node
npm install
npm start

Luego abre http://localhost:3000 en el navegador (redirige automáticamente a la
pantalla de bienvenida).

Usuario administrador de prueba


Usuario: admin
Contraseña: admin123


Flujo de usuario (obligatorio)


Al entrar a http://localhost:3000/, siempre se muestra la pantalla de
bienvenida con el nombre de la empresa y dos botones: Registrarse e
Iniciar Sesión (además de un enlace discreto para entrar como invitado
y solo mirar la tienda).
Si ya existe una sesión activa, la bienvenida redirige directo a la tienda.
Registro nuevo → validaciones (usuario, correo, contraseña, confirmación,
+1 regla adicional) tanto en el cliente como en el servidor.
Al intentar comprar sin sesión, se pide iniciar sesión antes de continuar
al carrito.
El usuario puede enviar un mensaje al admin desde el pie de página de la
tienda.
El admin recibe una notificación emergente con el mensaje y accede a su
panel (/admin/admin.html) para gestionar juegos (agregar/editar/eliminar)
y revisar/eliminar mensajes.


Requisitos cumplidos (rúbrica Unidad III)


Estructura y maqueta: una página por función, HTML/CSS/JS separados por
cada una.
DOM y eventos: click, submit, input (carrusel, formularios,
notificaciones), generación dinámica de tarjetas y filas de tabla.
Formularios y validaciones: registro con 4 campos y 6 reglas (requerido,
formato correo, formato usuario, longitud contraseña, coincidencia,
+1 regla de número), con mensajes de error por campo y preventDefault().
Persistencia: en el backend (data/db.json) además de sessionStorage
para datos temporales del carrito.
Panel admin: CRUD completo de juegos + bandeja de mensajes.


Preguntas de cierre


¿Qué validación fue la más compleja? Coordinar la validación de
formularios tanto en el cliente (feedback inmediato) como en el servidor
(seguridad real), evitando duplicar lógica de forma inconsistente.
¿Qué parte del DOM mejoró más la experiencia? La generación dinámica de
tarjetas de juegos y el carrusel con flechas independientes por categoría,
reflejando los cambios del CRUD del admin sin recargar la página.
Con 2 horas más: agregaría subida real de imágenes (multer) en vez de
URLs, y un token JWT en lugar de sesiones en memoria para que sobrevivan a
reinicios del servidor.
