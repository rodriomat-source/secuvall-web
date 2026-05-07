# SECUVALL web

Proyecto intermodular de 2º SMR — Empresa de Ciberseguridad y Sistemas.

🌐 **Web en producción**: https://rodriomat-source.github.io/secuvall-web/

---

## 🚀 Características

- **Diseño moderno** tecnológico con paleta azul/violeta
- **Modo claro y oscuro** con persistencia (`localStorage`)
- **Responsive** mobile-first
- **Accesibilidad**: ARIA, focus visibles, soporte `prefers-reduced-motion`
- **SEO**: meta tags, Open Graph, semántica HTML
- **Animaciones**: typing en hero, contadores, scroll reveal, parallax, glassmorphism
- **Banner de cookies** con configuración granular (RGPD-friendly)
- **Formulario** integrable con [Web3Forms](https://web3forms.com/) (sin backend)
- **0 dependencias** · Vanilla HTML + CSS + JS

---

## 📁 Estructura

```
secuvall-web/
├── index.html               # Home
├── servicios.html           # Detalle de servicios
├── blog.html                # Listado de artículos
├── aviso-legal.html         # Aviso legal
├── politica-privacidad.html # Política de privacidad
├── politica-cookies.html    # Política de cookies
├── css/
│   └── style.css
├── js/
│   └── main.js
├── img/
│   └── favicon.svg
└── README.md
```

---

## ⚙️ Configuración pendiente

### 1. Activar el formulario de contacto (Web3Forms — gratis)

1. Ve a [web3forms.com](https://web3forms.com/) e introduce tu email
2. Recibirás una **access key** por correo
3. Edita `index.html` y busca esta línea:
   ```html
   <input type="hidden" name="access_key" value="REEMPLAZA-CON-TU-ACCESS-KEY">
   ```
4. Pega tu access key en `value`
5. ¡Listo! Los mensajes te llegarán al email

### 2. Datos de la empresa

Buscar y reemplazar en todos los archivos:
- `+34 600 000 000` → tu teléfono real
- `info@secuvall.com` → tu email real
- `Calle Ejemplo, 123, Galicia, España` → dirección real
- `[Pendiente de configurar]` → CIF/NIF en archivos legales

### 3. (Opcional) Google Analytics

En `js/main.js`, dentro de `applyCookiePrefs()`, descomenta y configura:
```js
if (prefs.analytics) loadGoogleAnalytics();
```

---

## 🎨 Personalización

Los colores principales se definen en `css/style.css` en `:root`:

```css
--blue: #4f7cff;
--violet: #9d5cff;
--grad-primary: linear-gradient(135deg, #4f7cff 0%, #9d5cff 100%);
```

Cambia esos valores y todo el sitio se actualiza automáticamente.

---

## 🛠️ Tecnologías

- HTML5 semántico
- CSS3 (variables, grid, flex, backdrop-filter, mask-image)
- JavaScript ES6+ (IntersectionObserver, fetch, localStorage)
- Google Fonts: Space Grotesk + Inter
- SVG vectorial (icons, logo, favicon)

---

## 👤 Autor

**rodriomat-source** — Proyecto intermodular 2º SMR
