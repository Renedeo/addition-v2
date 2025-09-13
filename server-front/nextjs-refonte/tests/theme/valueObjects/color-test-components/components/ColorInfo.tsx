/**
 * 📊 ColorInfo - Affichage des Informations de Couleur
 * 
 * Composant pour afficher les propriétés et détails d'une couleur
 */

import React from 'react';
import type { ColorInfoProps } from '../types';
import Tooltip from './Tooltip';

const ColorInfo: React.FC<ColorInfoProps> = ({
  color,
  showDetails = true
}) => {
  // Description de la luminance relative
  const luminanceTooltip = (
    <div className="space-y-2">
      <div className="font-semibold">💡 Luminance Relative</div>
      <div>Mesure de la "brillance" perçue d'une couleur par l'œil humain.</div>
      
      <div className="mt-3">
        <div className="font-medium">🔢 Échelle de valeurs :</div>
        <div>• <strong>0</strong> = Noir pur (aucune lumière)</div>
        <div>• <strong>1</strong> = Blanc pur (luminosité maximale)</div>
        <div>• <strong>0.5</strong> = Gris moyen</div>
      </div>

      <div className="mt-3">
        <div className="font-medium">🧠 Calcul scientifique :</div>
        <div>• Basé sur la sensibilité de l'œil humain</div>
        <div>• Vert = plus brillant que rouge/bleu</div>
        <div>• Formule : 0.2126×R + 0.7152×G + 0.0722×B</div>
        
        <div className="mt-2 ml-4 text-xs">
          <div>📊 Signification des constantes :</div>
          <div>• <strong>0.2126</strong> : Poids du rouge (21.26%)</div>
          <div>• <strong>0.7152</strong> : Poids du vert (71.52%) - dominant</div>
          <div>• <strong>0.0722</strong> : Poids du bleu (7.22%)</div>
          <div>• Total = 100% (perception humaine calibrée)</div>
        </div>
      </div>

      <div className="mt-3">
        <div className="font-medium">🎯 Usage :</div>
        <div>• Calcul des ratios de contraste WCAG</div>
        <div>• Détermination automatique de la couleur de texte</div>
      </div>
    </div>
  );

  return (
    <div>
      <h3 className="font-medium mb-3">Propriétés</h3>
      
      {/* Aperçu principal */}
      <div 
        className="p-4 rounded-lg mb-4"
        style={{ 
          backgroundColor: color.toString(),
          color: color.isLight() ? '#000000' : '#ffffff'
        }}
      >
        <p className="font-semibold">Aperçu de la couleur</p>
        <div className="flex items-center gap-2">
          <span className="text-sm opacity-90">Luminance:</span>
          <span className="text-sm opacity-90">{color.getLuminance().toFixed(3)}</span>
          <Tooltip content={luminanceTooltip} position="bottom">
            <span className="inline-flex items-center justify-center w-4 h-4 text-xs bg-white bg-opacity-20 rounded-full cursor-help hover:bg-opacity-30 transition-colors">
              ?
            </span>
          </Tooltip>
        </div>
        <p className="text-sm opacity-90">
          Type: {color.isLight() ? 'Claire' : 'Sombre'}
        </p>
      </div>

      {/* Détails techniques */}
      {showDetails && (
        <div className="space-y-2 text-sm">
          <div className="bg-gray-50 p-3 rounded">
            <p className="font-medium mb-1">Formats de couleur :</p>
            <p><span className="font-mono">{color.toString()}</span> (HEX)</p>
            <p>
              <span className="font-mono">
                rgb({color.toRgb().r}, {color.toRgb().g}, {color.toRgb().b})
              </span>
            </p>
            <p>
              <span className="font-mono">
                hsl({color.toHsl().h}°, {color.toHsl().s}%, {color.toHsl().l}%)
              </span>
            </p>
          </div>
          
          <div className="bg-gray-50 p-3 rounded">
            <p className="font-medium mb-1">Propriétés techniques :</p>
            <div className="flex items-center gap-2">
              <span>Luminance relative:</span>
              <span>{color.getLuminance().toFixed(6)}</span>
              <Tooltip content={luminanceTooltip} position="top">
                <span className="inline-flex items-center justify-center w-4 h-4 text-xs bg-gray-200 text-gray-600 rounded-full cursor-help hover:bg-gray-300 transition-colors">
                  ?
                </span>
              </Tooltip>
            </div>
            <p>Classification: {color.isLight() ? 'Couleur claire' : 'Couleur sombre'}</p>
            <p>Canaux RGB: R={color.toRgb().r}, G={color.toRgb().g}, B={color.toRgb().b}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorInfo;