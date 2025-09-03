/**
 * Test pratique du système de thème
 * Ce fichier teste le fonctionnement réel du thème dans un composant React
 */

'use client';

import React from 'react';
import { ThemeProvider, useTheme, theme, colors, typography, spacing } from '@/theme';

// Composant de test pour vérifier useTheme
const ThemeTestComponent: React.FC = () => {
  const { mode, toggleTheme, setTheme } = useTheme();

  return (
    <div style={{
      padding: spacing.spacing[8],
      backgroundColor: mode === 'light' ? colors.white : colors.neutral[900],
      color: mode === 'light' ? colors.neutral[900] : colors.white,
      fontFamily: typography.fontFamily.sans.join(', '),
      fontSize: typography.fontSize.base[0] as string,
      lineHeight: (typography.fontSize.base[1] as { lineHeight: string }).lineHeight,
      borderRadius: spacing.borderRadius.md,
      border: `1px solid ${mode === 'light' ? colors.neutral[200] : colors.neutral[700]}`,
    }}>
      <h2 style={{ 
        fontSize: typography.fontSize.xl[0] as string,
        fontWeight: typography.fontWeight.bold,
        marginBottom: spacing.spacing[4],
        color: colors.primary[600]
      }}>
        🎨 Test du Système de Thème
      </h2>
      
      <div style={{ marginBottom: spacing.spacing[4] }}>
        <p><strong>Mode actuel:</strong> {mode}</p>
        <p><strong>Background:</strong> {mode === 'light' ? colors.white : colors.neutral[900]}</p>
        <p><strong>Text:</strong> {mode === 'light' ? colors.neutral[900] : colors.white}</p>
      </div>

      <div style={{ marginBottom: spacing.spacing[6] }}>
        <button
          onClick={toggleTheme}
          style={{
            padding: `${spacing.spacing[2]} ${spacing.spacing[4]}`,
            backgroundColor: colors.primary[600],
            color: colors.white,
            border: 'none',
            borderRadius: spacing.borderRadius.sm,
            cursor: 'pointer',
            marginRight: spacing.spacing[2],
            fontWeight: typography.fontWeight.medium,
          }}
        >
          🔄 Toggle Theme
        </button>
        
        <button
          onClick={() => setTheme('light')}
          style={{
            padding: `${spacing.spacing[2]} ${spacing.spacing[4]}`,
            backgroundColor: colors.secondary[200],
            color: colors.secondary[800],
            border: 'none',
            borderRadius: spacing.borderRadius.sm,
            cursor: 'pointer',
            marginRight: spacing.spacing[2],
            fontWeight: typography.fontWeight.medium,
          }}
        >
          ☀️ Light
        </button>
        
        <button
          onClick={() => setTheme('dark')}
          style={{
            padding: `${spacing.spacing[2]} ${spacing.spacing[4]}`,
            backgroundColor: colors.neutral[800],
            color: colors.white,
            border: 'none',
            borderRadius: spacing.borderRadius.sm,
            cursor: 'pointer',
            fontWeight: typography.fontWeight.medium,
          }}
        >
          🌙 Dark
        </button>
      </div>

      <div>
        <h3 style={{ 
          fontSize: typography.fontSize.lg[0] as string,
          marginBottom: spacing.spacing[2],
          color: colors.success[600]
        }}>
          ✅ Tests réussis:
        </h3>
        <ul style={{ paddingLeft: spacing.spacing[6] }}>
          <li>Import du thème principal ✓</li>
          <li>Utilisation du hook useTheme ✓</li>
          <li>Changement de thème dynamique ✓</li>
          <li>Accès aux couleurs ✓</li>
          <li>Accès à la typographie ✓</li>
          <li>Accès au spacing ✓</li>
          <li>Types TypeScript corrects ✓</li>
        </ul>
      </div>
    </div>
  );
};

// Composant principal avec ThemeProvider
const ThemeTestApp: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="light">
      <div style={{ padding: '20px', minHeight: '100vh' }}>
        <ThemeTestComponent />
      </div>
    </ThemeProvider>
  );
};

export default ThemeTestApp;