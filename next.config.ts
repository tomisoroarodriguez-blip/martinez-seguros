import type { NextConfig } from "next";

// Netlify Drop / hosting estático: STATIC_EXPORT=1 npm run build  -> carpeta /out
// Vercel (y `npm run dev`): sin la variable, Next corre normal y aplica las cabeceras de abajo.
const staticExport = process.env.STATIC_EXPORT === "1";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  ...(staticExport
    ? { output: "export", images: { unoptimized: true } }
    : { async headers() { return [{ source: "/(.*)", headers: securityHeaders }]; } }),
};

export default nextConfig;
