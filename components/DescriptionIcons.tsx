const circleStyle = "w-10 h-10 bg-[#0D1E5B] rounded-full flex items-center justify-center";

export const WheelIcon = () => (
  <div className={circleStyle}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFD600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="8" />
      <line x1="12" y1="16" x2="12" y2="22" />
      <line x1="2" y1="12" x2="8" y2="12" />
      <line x1="16" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="4.93" x2="8.46" y2="8.46" />
      <line x1="15.54" y1="15.54" x2="19.07" y2="19.07" />
      <line x1="4.93" y1="19.07" x2="8.46" y2="15.54" />
      <line x1="15.54" y1="8.46" x2="19.07" y2="4.93" />
    </svg>
  </div>
);

export const VanIcon = () => (
  <div className={circleStyle}>
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#FFD600"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Cuerpo principal */}
      <rect x="3" y="7" width="13" height="10" rx="1" ry="1" />
      
      {/* Parte frontal */}
      <path d="M16 9h3.5a1 1 0 0 1 .9.6l1.2 2.4V17h-5.6V9z" />
      
      {/* Llantas */}
      <circle cx="7.5" cy="18.5" r="1.5" />
      <circle cx="17.5" cy="18.5" r="1.5" />

      {/* Detalles opcionales: ventanas */}
      <line x1="5" y1="9" x2="9" y2="9" />
      <line x1="10" y1="9" x2="13" y2="9" />
    </svg>
  </div>
);

export const LoadIcon = () => (
  <div className={circleStyle}>
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#FFD600"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Caja base */}
      <rect x="3" y="8" width="18" height="12" rx="2" />
      {/* Tapa levantada o marcada arriba */}
      <path d="M8 3h8v5H8z" />

      {/* Líneas opcionales para dar efecto 3D */}
      <path d="M8 3l-2 5" />
      <path d="M16 3l2 5" />
      {/* Base: como una bandeja o contenedor */}
      <path d="M4 17h16a1 1 0 0 1 1 1v2H3v-2a1 1 0 0 1 1-1z" />

      {/* Flecha hacia abajo (acción de aplicar/cargar) */}
      <path d="M12 3v10" />
      <path d="M8 10l4 4 4-4" />
    </svg>
  </div>
);

export const ServiceVanIcon = () => (
  <div className={circleStyle}>
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#FFD600"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Cabina corta */}
      <path d="M4 13V9a2 2 0 0 1 2-2h5v6H4z" />

      {/* Caja trasera tipo pickup */}
      <path d="M11 11h7a2 2 0 0 1 2 2v2h-9v-4z" />

      {/* Neumáticos */}
      <circle cx="6" cy="18" r="1.5" />
      <circle cx="18" cy="18" r="1.5" />

      {/* Línea del chasis */}
      <path d="M3 15h18" />
    </svg>
  </div>
);

export const TagIcon = () => (
  <div className={circleStyle}>
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#FFD600"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Cuerpo principal de la etiqueta */}
      <path d="M4 10V4h6l10 10a2 2 0 0 1 0 2.83l-5.17 5.17a2 2 0 0 1-2.83 0L4 10z" />

      {/* Agujero del tag */}
      <circle cx="7" cy="7" r="1.5" />
    </svg>
  </div>
);