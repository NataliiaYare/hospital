import React from "react";

// MobileHeader renders a fixed top header for mobile screens
// and provides a menu button to open the navigation drawer
function MobileHeader({ onMenuClick }) {
  return (
    // Fixed mobile-only header container
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
      {/* Menu button positioned on the left */}
      <button
        onClick={onMenuClick} // Calls parent handler to open menu
        className="absolute left-4 text-white text-2xl"
        aria-label="Open menu" // Accessibility label for screen readers
      >
        ☰
      </button>

      {/* Centered logo image */}
      <img src="/logotype.png" alt="Logo" className="h-8" />
    </header>
  );
}

export default MobileHeader;
