"use client";
import React from "react";

/**
 * Props pour le composant AnalysisCard
 */
interface AnalysisCardProps {
  /** Titre affiché sur la carte */
  title: string;
  /** Niveau d'information affiché */
  level: string;
  /** Description détaillée */
  description: string;
  /** Icône affichée avec le titre */
  icon: string;
}

/**
 * Composant de carte d'analyse affichant un titre, niveau, description et icône.
 * 
 * @component
 * @param {AnalysisCardProps} props - Les props du composant
 * @returns {JSX.Element} Carte d'analyse stylisée
 * 
 * @example
 * ```tsx
 * <AnalysisCard
 *   title="Performance"
 *   level="Élevé"
 *   description="Cette carte fournit une analyse des métriques de performance."
 *   icon="🚀"
 * />
 * ```
 */
export const AnalysisCard: React.FC<AnalysisCardProps> = React.memo(({ title, level, description, icon }) => (
  <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200 transition-all duration-200 hover:shadow-md">
    <div className="flex items-center mb-3">
      <span className="text-xl mr-3">{icon}</span>
      <h3 className="font-semibold text-gray-800">{title}</h3>
    </div>
    <div className="space-y-2">
      <div className="flex items-center">
        <span className="text-sm font-medium text-gray-500 w-20">Level:</span>
        <span className="p-3 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">
          {level}
        </span>
      </div>
      <div>
        <span className="text-sm font-medium text-gray-500">Description:</span>
        <p className="text-sm text-gray-600 mt-1 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  </div>
));

AnalysisCard.displayName = "AnalysisCard";
