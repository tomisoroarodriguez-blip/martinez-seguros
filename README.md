# Martínez Seguros — sitio web (v1, local)

Next.js (App Router) + TypeScript + Tailwind CSS 4 + Lucide + Motion. Sin backend ni base de datos.

## Ejecutar

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # versión de producción
```

Copiar `.env.example` a `.env.local` para definir `NEXT_PUBLIC_SITE_URL` (dominio real) y `NEXT_PUBLIC_GA_ID` (Google Analytics; vacío = desactivado, y solo carga tras consentimiento).

## Dónde editar

- `src/config/site.ts` — teléfono, WhatsApp, correo, dirección, horarios, Instagram.
- `src/config/insurance.ts` — categorías de seguros y preguntas frecuentes (pensado para migrar luego a un panel/BD).
- `src/components/Cotizador.tsx` — campos del formulario por tipo de seguro y armado del mensaje de WhatsApp.

## Pendiente de confirmar con el cliente

- Teléfono/WhatsApp y correo: el Instagram muestra **099 419 210** y **shmartinez66@hotmail.com** (los vigentes en el sitio); la ficha comercial indicaba 098 808 293 e info.martinezseguros@gmail.com.
- Dirección (Juan Paullier 1117) y horarios.
- Categorías sin confirmar: motos, comercio/empresas, otros.
- Fotografías propias/autorizadas, historia y equipo, política de privacidad (revisión legal).
- Escritura del nombre: «Martínez» vs «Martinez» en el logo.
