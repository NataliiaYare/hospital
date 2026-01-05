import React from "react";

function MobileHeader({ onMenuClick }) {
  return (
    <header
      className="
        md:hidden
        fixed top-0 left-0 right-0 z-40
        h-14
        bg-[#015CE9]
        flex items-center justify-center
        shadow
      "
    >
      {/* Menu button */}
      <button
        onClick={onMenuClick}
        className="absolute left-4 text-white text-2xl"
        aria-label="Open menu"
      >
        ☰
      </button>

      {/* Center logo */}
      <img src="/logotype.png" alt="Logo" className="h-8" />
    </header>
  );
}

export default MobileHeader;
