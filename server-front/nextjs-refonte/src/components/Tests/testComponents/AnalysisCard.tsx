
"use client";
import React from "react";

/**
 * Props pour le composant AnalysisCard
 */
interface AnalysisCardProps {
  title: string;
  level: string;
  description: string;
  icon: string;
}

/**
 * Card d'analyse affichant un titre, un niveau, une description et une icône.
 * Utilisé pour présenter les résultats d'analyse de couleur (saturation, luminosité, etc).
 *
 * Props :
 * - title : Titre de l'analyse
 * - level : Niveau ou résultat (ex : "High", "Low")
 * - description : Explication ou détail du résultat
 * - icon : Emoji ou icône illustrant le type d'analyse
 */
export const AnalysisCard: React.FC<AnalysisCardProps> = React.memo(({ title, level, description, icon }) => (
  <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200 transition-all duration-200 hover:shadow-md">
    {/* Ligne d'en-tête avec icône et titre */}
    <div className="flex items-center mb-3">
      <span className="text-xl mr-3">{icon}</span>
      <h3 className="font-semibold text-gray-800">{title}</h3>
    </div>
    <div className="space-y-2">
      {/* Affichage du niveau d'analyse */}
      <div className="flex items-center">
        <span className="text-sm font-medium text-gray-500 w-20">Level:</span>
        <span className="p-3 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">
          {level}
        </span>
      </div>
      {/* Description détaillée */}
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
