/**
 * Test des types du système de thème
 * Ce fichier teste la cohérence des types TypeScript
 */

import type { 
  ThemeMode, 
  ThemeContextType,
  ThemeProviderProps 
} from '@/theme';

import type {
  StringRecord,
  ColorScale,
  FontSizeTuple,
  FontWeightValue
} from '@/theme/interface';

// Test 1: Vérification des types de base
console.log('🧪 Test des types de base');

const testMode: ThemeMode = 'light';
console.log('✅ ThemeMode:', testMode);

// Test 2: Vérification des types de couleurs
console.log('\n🧪 Test des types de couleurs');

const testColorScale: ColorScale = {
  50: '#fafafa',
  100: '#f5f5f5',
  200: '#e5e5e5',
  300: '#d4d4d4',
  400: '#a3a3a3',
  500: '#737373',
  600: '#525252',
  700: '#404040',
  800: '#262626',
  900: '#171717',
  950: '#0a0a0a',
};
console.log('✅ ColorScale défini correctement');

// Test 3: Vérification des types de typographie
console.log('\n🧪 Test des types de typographie');

const testFontSize: FontSizeTuple = ['16px', { lineHeight: '24px' }];
const testFontWeight: FontWeightValue = '400';
console.log('✅ FontSizeTuple:', testFontSize);
console.log('✅ FontWeightValue:', testFontWeight);

// Test 4: Vérification des types de contexte
console.log('\n🧪 Test des types de contexte');

const testContextType: Partial<ThemeContextType> = {
  mode: 'dark',
  toggleTheme: () => console.log('toggle'),
  setTheme: (mode: ThemeMode) => console.log('set to', mode)
};
console.log('✅ ThemeContextType défini correctement');

const testProviderProps: Partial<ThemeProviderProps> = {
  defaultTheme: 'light'
};
console.log('✅ ThemeProviderProps défini correctement');

// Test 5: Vérification des types utilitaires
console.log('\n🧪 Test des types utilitaires');

const testStringRecord: StringRecord = {
  key1: 'value1',
  key2: 'value2'
};
console.log('✅ StringRecord défini correctement');

console.log('\n🎉 Tous les tests de types sont passés !');

export {};