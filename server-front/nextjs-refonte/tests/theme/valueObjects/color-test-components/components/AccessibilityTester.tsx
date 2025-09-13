/**
 * ♿ AccessibilityTester - Testeur d'Accessibilité
 * 
 * Composant pour tester le contraste et la conformité WCAG
 */

import React from 'react';
import type { AccessibilityTesterProps } from '../types';
import { createColorFromHex, ColorConstants } from '@/theme/domain/valueObjects/Color';
import Tooltip from './Tooltip';

const AccessibilityTester: React.FC<AccessibilityTesterProps> = ({
  primaryColor,
  comparisonColor,
  onComparisonColorChange
}) => {
  const handleComparisonColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hex = event.target.value;
    try {
      const color = createColorFromHex(hex);
      onComparisonColorChange(hex, color);
    } catch (error) {
      console.error('Erreur couleur comparaison:', error);
    }
  };

  const setQuickComparison = (hex: string) => {
    try {
      const color = createColorFromHex(hex);
      onComparisonColorChange(hex, color);
    } catch (error) {
      console.error('Erreur couleur comparaison:', error);
    }
  };

  // Calculs de contraste
  const contrast = primaryColor.getContrast(comparisonColor);
  const contrastWithWhite = primaryColor.getContrast(createColorFromHex('#ffffff'));
  const contrastWithBlack = primaryColor.getContrast(createColorFromHex('#000000'));

  // Descriptions détaillées des normes WCAG
  const wcagDescriptions = {
    aaNormal: (
      <div className="space-y-2">
        <div className="font-semibold">WCAG AA - Texte Normal</div>
        <div>Ratio minimum : <strong>4.5:1</strong></div>
        <div>• Texte de taille normale (moins de 18pt / ~24px)</div>
        <div>• Niveau de conformité standard</div>
        <div>• Requis pour la plupart des sites web</div>
        <div>• Assure une lisibilité acceptable pour la majorité des utilisateurs</div>
      </div>
    ),
    aaLarge: (
      <div className="space-y-2">
        <div className="font-semibold">WCAG AA - Texte Large</div>
        <div>Ratio minimum : <strong>3:1</strong></div>
        <div>• Texte de 18pt+ (~24px) ou 14pt+ en gras (~18.5px)</div>
        <div>• Exigences réduites pour le texte plus visible</div>
        <div>• Titres et éléments graphiques importants</div>
      </div>
    ),
    aaaNormal: (
      <div className="space-y-2">
        <div className="font-semibold">WCAG AAA - Texte Normal</div>
        <div>Ratio minimum : <strong>7:1</strong></div>
        <div>• Niveau de conformité le plus élevé</div>
        <div>• Accessibilité maximale</div>
        <div>• Recommandé pour les contenus critiques</div>
        <div>• Facilite la lecture pour tous les utilisateurs</div>
      </div>
    ),
    aaaLarge: (
      <div className="space-y-2">
        <div className="font-semibold">WCAG AAA - Texte Large</div>
        <div>Ratio minimum : <strong>4.5:1</strong></div>
        <div>• Texte de 18pt+ (~24px) ou 14pt+ en gras (~18.5px)</div>
        <div>• Niveau AAA pour le texte large</div>
        <div>• Excellence en accessibilité</div>
      </div>
    ),
    info: (
      <div className="space-y-2">
        <div className="font-semibold">💡 Informations sur le Contraste</div>
        <div>Le contraste mesure la différence de luminosité entre deux couleurs.</div>
        
        <div className="mt-3">
          <div className="font-medium">📊 Signification du Ratio (X:1) :</div>
          <div>• <strong>Premier nombre (X)</strong> : Luminosité relative de la couleur la plus claire</div>
          <div>• <strong>Second nombre (1)</strong> : Luminosité relative de la couleur la plus sombre</div>
          <div>• <strong>Calcul</strong> : (L1 + 0.05) / (L2 + 0.05)</div>
          <div>• <strong>0.05</strong> : Constante qui évite la division par zéro et simule la réflexion ambiante</div>
        </div>

        <div className="mt-3">
          <div className="font-medium">🎯 Exemples pratiques :</div>
          <div>• <strong>1:1</strong> = aucun contraste (même couleur = invisible)</div>
          <div>• <strong>4.5:1</strong> = couleur claire 4.5× plus lumineuse</div>
          <div>• <strong>21:1</strong> = contraste maximum (blanc pur vs noir pur)</div>
        </div>

        <div className="mt-3">
          <div className="font-medium">⚡ Règle simple :</div>
          <div>Plus le premier nombre est élevé, plus le texte est lisible !</div>
        </div>
      </div>
    )
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl font-semibold">♿ Tests d'Accessibilité</h2>
        <Tooltip content={wcagDescriptions.info} position="right">
          <span className="inline-flex items-center justify-center w-5 h-5 text-xs bg-blue-100 text-blue-600 rounded-full cursor-help hover:bg-blue-200 transition-colors">
            ?
          </span>
        </Tooltip>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Sélecteur de couleur de comparaison */}
        <div>
          <h3 className="font-medium mb-3">Couleur de Comparaison</h3>
          <div className="flex items-center space-x-4 mb-4">
            <input
              type="color"
              value={comparisonColor.toString()}
              onChange={handleComparisonColorChange}
              className="w-12 h-12 border-2 border-gray-300 rounded cursor-pointer"
            />
            <div>
              <p className="font-medium">{comparisonColor.toString()}</p>
              <p className="text-sm text-gray-600">
                {comparisonColor.isLight() ? 'Couleur claire' : 'Couleur sombre'}
              </p>
            </div>
          </div>

          {/* Boutons de comparaison rapide */}
          <div className="space-y-2">
            <button
              onClick={() => setQuickComparison('#ffffff')}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50"
            >
              Comparer avec Blanc
            </button>
            <button
              onClick={() => setQuickComparison('#000000')}
              className="w-full px-3 py-2 bg-gray-900 text-white rounded text-sm hover:bg-gray-800"
            >
              Comparer avec Noir
            </button>
          </div>
        </div>

        {/* Résultats de contraste */}
        <div>
          <h3 className="font-medium mb-3">Résultats de Contraste</h3>
          
          {/* Aperçu du contraste */}
          <div 
            className="p-4 rounded-lg mb-4 flex items-center justify-between"
            style={{
              backgroundColor: primaryColor.toString(),
              color: comparisonColor.toString()
            }}
          >
            <span className="font-medium">Texte d'exemple</span>
            <span className="text-sm opacity-90">
              {contrast.toFixed(2)}:1
            </span>
          </div>

          {/* Évaluations WCAG */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span>WCAG AA Normal:</span>
                <Tooltip content={wcagDescriptions.aaNormal} position="top">
                  <span className="inline-flex items-center justify-center w-4 h-4 text-xs bg-gray-100 text-gray-600 rounded-full cursor-help hover:bg-gray-200 transition-colors">
                    i
                  </span>
                </Tooltip>
              </div>
              <span className={contrast >= ColorConstants.CONTRAST_RATIOS.AA_NORMAL ? 'text-green-600 font-medium' : 'text-red-600'}>
                {contrast >= ColorConstants.CONTRAST_RATIOS.AA_NORMAL ? '✅ Conforme' : '❌ Non conforme'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span>WCAG AA Large:</span>
                <Tooltip content={wcagDescriptions.aaLarge} position="top">
                  <span className="inline-flex items-center justify-center w-4 h-4 text-xs bg-gray-100 text-gray-600 rounded-full cursor-help hover:bg-gray-200 transition-colors">
                    i
                  </span>
                </Tooltip>
              </div>
              <span className={contrast >= ColorConstants.CONTRAST_RATIOS.AA_LARGE ? 'text-green-600 font-medium' : 'text-red-600'}>
                {contrast >= ColorConstants.CONTRAST_RATIOS.AA_LARGE ? '✅ Conforme' : '❌ Non conforme'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span>WCAG AAA Normal:</span>
                <Tooltip content={wcagDescriptions.aaaNormal} position="top">
                  <span className="inline-flex items-center justify-center w-4 h-4 text-xs bg-gray-100 text-gray-600 rounded-full cursor-help hover:bg-gray-200 transition-colors">
                    i
                  </span>
                </Tooltip>
              </div>
              <span className={contrast >= ColorConstants.CONTRAST_RATIOS.AAA_NORMAL ? 'text-green-600 font-medium' : 'text-red-600'}>
                {contrast >= ColorConstants.CONTRAST_RATIOS.AAA_NORMAL ? '✅ Conforme' : '❌ Non conforme'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span>WCAG AAA Large:</span>
                <Tooltip content={wcagDescriptions.aaaLarge} position="top">
                  <span className="inline-flex items-center justify-center w-4 h-4 text-xs bg-gray-100 text-gray-600 rounded-full cursor-help hover:bg-gray-200 transition-colors">
                    i
                  </span>
                </Tooltip>
              </div>
              <span className={contrast >= ColorConstants.CONTRAST_RATIOS.AAA_LARGE ? 'text-green-600 font-medium' : 'text-red-600'}>
                {contrast >= ColorConstants.CONTRAST_RATIOS.AAA_LARGE ? '✅ Conforme' : '❌ Non conforme'}
              </span>
            </div>
          </div>

          {/* Contrastes de référence */}
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm font-medium mb-2">Contrastes de référence :</p>
            <p className="text-sm">Avec blanc: {contrastWithWhite.toFixed(2)}:1</p>
            <p className="text-sm">Avec noir: {contrastWithBlack.toFixed(2)}:1</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityTester;