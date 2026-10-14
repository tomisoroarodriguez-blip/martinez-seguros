/**
 * Identidad de Martínez Seguros recreada en SVG (sin usar la imagen de la propuesta).
 * Colores: coral #F2575B · gris #999999 · amarillo #F8C36B · azul #183766.
 */
const CORAL = "#F2575B";
const GRAY = "#999999";
const YELLOW = "#F8C36B";
const font = { fontFamily: "var(--font-manrope), system-ui, sans-serif" };

/** Isotipo: los tres círculos. Sirve para favicon y detalles pequeños. */
export function Isotipo({ className = "", ...rest }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 76 24" aria-hidden="true" className={className} fill="none" {...rest}>
      <circle cx="12" cy="12" r="12" fill={CORAL} />
      <circle cx="38" cy="12" r="12" fill={GRAY} />
      <circle cx="64" cy="12" r="12" fill={YELLOW} />
    </svg>
  );
}

/** Tres puntos pequeños para decoración sutil (separadores, esquinas de tarjetas). */
export function Dots({ className = "", size = 6 }: { className?: string; size?: number }) {
  return (
    <span aria-hidden="true" className={`inline-flex items-center gap-[3px] ${className}`}>
      {[CORAL, GRAY, YELLOW].map((c) => (
        <i key={c} className="block rounded-full" style={{ width: size, height: size, background: c }} />
      ))}
    </span>
  );
}

type Props = {
  /** "light": para fondos oscuros (texto blanco). "dark": para fondos claros. */
  tone?: "light" | "dark";
  variant?: "horizontal" | "vertical";
  tagline?: boolean;
  className?: string;
  title?: string;
};

export function Logo({ tone = "dark", variant = "horizontal", tagline = false, className = "", title = "Martínez Seguros" }: Props) {
  const text = tone === "light" ? "#FFFFFF" : "#183766";
  const sub = tone === "light" ? "rgba(255,255,255,0.7)" : "#6b7a93";

  if (variant === "vertical") {
    return (
      <svg viewBox="0 0 260 190" role="img" aria-label={title} className={className}>
        <Isotipo x={63} y={4} width={134} height={42} />
        <text x="130" y="92" textAnchor="middle" fontSize="48" fontWeight="500" fill={text} style={font}>
          Martinez
        </text>
        <text x="130" y="140" textAnchor="middle" fontSize="48" fontWeight="800" fill={text} style={font}>
          Seguros
        </text>
        {tagline && (
          <text x="130" y="176" textAnchor="middle" fontSize="10.5" letterSpacing="2.4" fill={sub} style={font}>
            TU TRANQUILIDAD, NUESTRA PRIORIDAD
          </text>
        )}
      </svg>
    );
  }

  return (
    <svg viewBox={tagline ? "0 0 250 62" : "0 0 218 46"} role="img" aria-label={title} className={className}>
      <Isotipo x={0} y={11} width={74} height={23} />
      <rect x="82" y="3" width="1.2" height="40" fill={text} opacity="0.55" />
      <text x="94" y="22" fontSize="21" fontWeight="500" fill={text} style={font}>
        Martinez
      </text>
      <text x="94" y="42" fontSize="21" fontWeight="800" fill={text} style={font}>
        Seguros
      </text>
      {tagline && (
        <text x="0" y="60" fontSize="7.2" letterSpacing="1.5" fill={sub} style={font}>
          TU TRANQUILIDAD, NUESTRA PRIORIDAD
        </text>
      )}
    </svg>
  );
}
