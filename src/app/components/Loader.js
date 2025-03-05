"use client";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen" dir="rtl">
      <div className="flex flex-row-reverse m-1">
        {/* Gradient Definitions */}
        <svg height="0" width="0" viewBox="0 0 64 64" className="absolute">
          <defs xmlns="http://www.w3.org/2000/svg">
            <linearGradient gradientUnits="userSpaceOnUse" y2="2" x2="0" y1="62" x1="0" id="gradient1">
              <stop stopColor="#973BED" />
              <stop stopColor="#007CFF" offset="1" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" y2="0" x2="0" y1="64" x1="0" id="gradient2">
              <stop stopColor="#FFC800" />
              <stop stopColor="#F0F" offset="1" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" y2="2" x2="0" y1="62" x1="0" id="gradient3">
              <stop stopColor="#00E0ED" />
              <stop stopColor="#00DA72" offset="1" />
            </linearGradient>
          </defs>
        </svg>

        {/* E */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" className="inline-block h-16 w-16">
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="8"
            stroke="url(#gradient1)"
            d="M10 4h44M10 4v56M10 32h35M10 60h44"
            className="animate-dash"
          />
        </svg>

        {/* L */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" className="inline-block h-16 w-16">
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="8"
            stroke="url(#gradient2)"
            d="M10 4v56M10 60h44"
            className="animate-dash"
          />
        </svg>

        {/* M */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" className="inline-block h-16 w-16">
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="8"
            stroke="url(#gradient3)"
            d="M10 60V4M10 4l22 33L54 4M54 60V4"
            className="animate-dash"
          />
        </svg>

        {/* Y */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" className="inline-block h-16 w-16">
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="8"
            stroke="url(#gradient1)"
            d="M10 4l22 26.5L54 4M32 30.5V60"
            className="animate-dash"
          />
        </svg>
      </div>
    </div>
  );
};

export default Loader;