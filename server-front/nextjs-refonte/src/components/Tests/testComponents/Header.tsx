"use client";
import React from "react";

/**
 * En-tête de l'application Color Analysis Studio.
 * 
 * Affiche le titre, l'icône et la description de l'application.
 * 
 * @component
 * @returns {JSX.Element} Le composant Header
 * 
 * @example
 * ```tsx
 * <Header />
 * ```
 */
export const Header: React.FC = React.memo(() => (
  <div className="text-center mb-8 sm:mb-12">
    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
      <div className="w-8 h-8 bg-white rounded-lg opacity-90"></div>
    </div>

    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
      Color Analysis Studio
    </h1>

    <p className="text-gray-600">
      Professional color analysis with accessibility insights, format
      conversions, and contrast ratios
    </p>
  </div>
));

Header.displayName = "Header";