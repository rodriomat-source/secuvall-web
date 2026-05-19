# SECUVALL web

Proyecto intermodular de 2º SMR — Empresa de Ciberseguridad y Sistemas.

🌐 **Web en producción**: https://rodriomat-source.github.io/secuvall-web/

---

## 🚀 Características

- **Diseño moderno** tecnológico con paleta azul/violeta
- **Modo claro y oscuro** con persistencia (`localStorage`)
- **Responsive** mobile-first
- **Accesibilidad**: ARIA, focus visibles, soporte `prefers-reduced-motion`
- **SEO**: meta tags, Open Graph, canonical, robots.txt, sitemap.xml y Schema.org
- **Animaciones**: typing en hero, contadores, scroll reveal, parallax, glassmorphism
- **Banner de cookies** con configuración granular (RGPD-friendly)
- **Formulario** integrable con [Web3Forms](https://web3forms.com/) (sin backend)
- **Header/footer centralizados** mediante `js/components.js` para no duplicar HTML
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
├── planes.html              # Planes
├── robots.txt               # Reglas para crawlers
├── sitemap.xml              # Sitemap SEO
├── schema.json              # Schema.org JSON-LD
├── css/
│   └── style.css
├── js/
│   ├── components.js        # Header, footer, cookies y Schema.org comunes
│   └── main.js
├── img/
│   └── favicon.svg
└── README.md
```

## 👤 Autor

**rodriomat-source** — Proyecto intermodular 2º SMR
