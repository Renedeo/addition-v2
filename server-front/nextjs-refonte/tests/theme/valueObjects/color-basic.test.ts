/**
 * 🧪 Test Simple du Value Object Color
 * 
 * Test basique pour valider l'import et l'utilisation du ColorValue
 */

// Test des imports avec les alias TypeScript
import type { Color, ColorFormat } from '@/theme/domain/valueObjects/Color/types';
import { 
  ColorValue, 
  createColor, 
  createColorFromHex,
  createColorFromRgb,
  ColorConstants
} from '@/theme/domain/valueObjects/Color';

console.log('🎨 Test du Value Object Color');
console.log('===============================');

// Test 1: Import des constantes
console.log('📋 Constantes Color:', ColorConstants);

// Test 2: Création d'une couleur simple
try {
  console.log('\n🔵 Test création couleur rouge:');
  const redColor = createColorFromHex('#ff0000');
  console.log('Couleur créée:', redColor);
  console.log('CSS Value:', redColor.toString());
  console.log('RGB:', redColor.toRgb());
  console.log('HSL:', redColor.toHsl());
} catch (error) {
  console.error('❌ Erreur création couleur rouge:', error);
}

// Test 3: Création depuis RGB
try {
  console.log('\n🟢 Test création couleur verte depuis RGB:');
  const greenColor = createColorFromRgb(0, 255, 0);
  console.log('Couleur verte:', greenColor);
  console.log('Hex:', greenColor.toHex());
} catch (error) {
  console.error('❌ Erreur création couleur verte:', error);
}

// Test 4: Test de validation
try {
  console.log('\n⚠️ Test validation couleur invalide:');
  const invalidColor = createColorFromHex('#gggggg');
  console.log('Couleur invalide créée (ne devrait pas arriver):', invalidColor);
} catch (error) {
  const err = error as Error;
  console.log('✅ Erreur attendue pour couleur invalide:', err.message);
}

// Test 5: Test des utilitaires
try {
  console.log('\n💡 Test utilitaires accessibilité:');
  const whiteColor = createColorFromHex('#ffffff');
  const blackColor = createColorFromHex('#000000');
  
  console.log('Couleur blanche - isLight():', whiteColor.isLight());
  console.log('Couleur noire - isDark():', blackColor.isDark());
  
  // Test contraste
  try {
    const contrast = whiteColor.getContrast(blackColor);
    console.log('Contraste blanc/noir:', contrast);
  } catch (contrastError) {
    console.log('⚠️ Méthode getContrast non encore implémentée');
  }
} catch (error) {
  console.error('❌ Erreur utilitaires:', error);
}

console.log('\n✅ Tests terminés!');