# 🎮 Dummy Store — Tienda de Videojuegos

Tienda de videojuegos con frontend en HTML/CSS/JS (una página por sección) y
backend real en **Node.js + Express**, con persistencia en archivo JSON.

---

## 📁 Estructura del proyecto

```
dummy-store-node/
├── server.js         # Backend (API REST, sesiones, CRUD)
├── package.json
├── data/db.json       # Base de datos (usuarios, juegos, mensajes)
└── public/
    ├── welcome/        # Pantalla de bienvenida (Registrarse / Iniciar Sesión)
    ├── login/          # Inicio de sesión
    ├── register/       # Registro
    ├── tienda/         # Tienda: carrusel + categorías
    ├── carrito/        # Ventana de compra
    ├── admin/          # Panel del administrador
    └── shared/         # Estilos comunes
```

Cada página tiene su propio HTML, CSS y JS.

---

## 🚀 Cómo ejecutarlo

### 1. Instalar Node.js (si no lo tienes)
Descárgalo desde 👉 https://nodejs.org (versión LTS) e instálalo con "Next" en todo.

Verifica que quedó instalado:
```bash
node -v
npm -v
```

### 2. Instalar Git (si no lo tienes, para clonar/subir el repo)
Descárgalo desde 👉 https://git-scm.com/download/win e instálalo con "Next" en todo.
Verifica:
```bash
git --version
```

### 3. Ubícate en la carpeta del proyecto
```bash
cd ruta/a/dummy-store-node
```
⚠️ Asegúrate de estar en la carpeta que tiene `server.js` adentro (a veces al
descomprimir un ZIP se crea una carpeta duplicada, sigue entrando con `cd` hasta verlo).

### 4. Instalar las dependencias
```bash
npm install
```

### 5. Levantar el servidor
```bash
npm start
```
Deberías ver:
```
Dummy Store backend corriendo en http://localhost:3000
Admin de prueba -> usuario: admin | contraseña: admin123
```
Deja esa terminal abierta mientras uses la app. Para apagarla: `Ctrl + C`.

### 6. Abrir en el navegador
👉 http://localhost:3000

---

## 👤 Usuario administrador de prueba
| Usuario | Contraseña |
|---------|------------|
| `admin` | `admin123` |

---

## 🩹 Problemas comunes (Windows / PowerShell)

**"npm no se reconoce" o error `PSSecurityException` al correr `npm install`**
Abre PowerShell **como administrador** y ejecuta una sola vez:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**"git no se reconoce como un cmdlet..."**
Es que Git no está instalado. Ver paso 2 más arriba, y luego cerrar y volver a abrir PowerShell.

---

## 🛠️ Funcionalidades principales

- Registro e inicio de sesión con validaciones (formato, longitud, coincidencia de contraseña).
- Tienda con carrusel de reservas y categorías dinámicas.
- Carrito de compra (confirmar / cancelar).
- Mensajes de contacto al administrador.
- **Panel admin:**
  - CRUD de juegos (agregar, editar, eliminar) con combobox de categorías.
  - Contador de usuarios (registrados, activos, bloqueados).
  - Bloquear / desbloquear / eliminar usuarios.
  - Bandeja de mensajes recibidos.

---

## 👥 Equipo — mejoras implementadas

| Integrante | Sección | Detalle |
|---|---|---|
| **Pedro Castro** | Base de datos | Estructura de `data/db.json` y campo `bloqueado` para las cuentas de usuario. |
| **Diego Soto** | Sección visual | Tarjetas de estadísticas, tabla de gestión de usuarios y banner de aviso de bloqueo. |
| **Maickoll Challapa** | Backend | Endpoints de administración, validación de login y expulsión automática de usuarios bloqueados. |

---

## 📌 Notas
- Los datos se guardan en `data/db.json`, así que se mantienen aunque cierres el servidor.
- Las contraseñas se guardan encriptadas (hash SHA-256), no en texto plano.
