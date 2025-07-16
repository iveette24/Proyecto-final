# Komuni 2.0

Komuni 2.0 es una plataforma colaborativa para reportar barreras urbanas, mejorar la accesibilidad y construir una comunidad más inclusiva.

## Características

- 🗺️ Reporta incidencias urbanas con foto, descripción y ubicación.
- 🔒 Autenticación segura con Google.
- 📋 Visualiza reportes recientes de la comunidad.
- ☁️ Almacenamiento en Firebase (Firestore y Storage).

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tuusuario/komuni2.0.git
   cd komuni2.0
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura Firebase en `src/firebase.js` si es necesario.

4. Inicia la aplicación:
   ```bash
   npm run dev
   ```

Accede a [http://localhost:5173](http://localhost:5173) en tu navegador.

## Estructura del proyecto

- `/src/components` — Componentes principales (formulario, lista de reportes)
- `/src` — Lógica de autenticación y configuración de Firebase

## Tecnologías

- React 19
- Vite
- Firebase (Auth, Firestore, Storage)

## Contribuir

¡Las contribuciones son bienvenidas! Por favor, abre un issue o pull request.

## Licencia

MIT
