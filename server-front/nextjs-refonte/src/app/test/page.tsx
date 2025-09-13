'use client';

/**
 * 📄 Page de Test Next.js - Value Object Color
 * 
 * Page d'affichage des tests du Value Object Color
 */

import React from 'react';
import ColorTestComponent from '../../../tests/theme/valueObjects/color-test-components/ColorTestComponent';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <ColorTestComponent />
      </div>
    </div>
  );
}