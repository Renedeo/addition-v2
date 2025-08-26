/**
 * Interface de base pour les couleurs
 * Principe ISP : Séparation des couleurs
 */
export interface ColorPalette {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  disabled: string;
}

/**
 * Interface pour les couleurs avec variants
 * Principe ISP : Spécialisation des couleurs avec nuances
 */
export interface ExtendedColorPalette extends ColorPalette {
  primary50: string;
  primary100: string;
  primary200: string;
  primary300: string;
  primary400: string;
  primary500: string;
  primary600: string;
  primary700: string;
  primary800: string;
  primary900: string;
  
  gray50: string;
  gray100: string;
  gray200: string;
  gray300: string;
  gray400: string;
  gray500: string;
  gray600: string;
  gray700: string;
  gray800: string;
  gray900: string;
}

/**
 * Interface pour la typographie
 * Principe ISP : Séparation de la typographie
 */
export interface Typography {
  fontFamily: {
    sans: string;
    serif: string;
    mono: string;
  };
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
    '6xl': string;
  };
  fontWeight: {
    thin: number;
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
    extrabold: number;
  };
  lineHeight: {
    tight: number;
    normal: number;
    relaxed: number;
    loose: number;
  };
}

/**
 * Interface pour l'espacement
 * Principe ISP : Séparation de l'espacement
 */
export interface Spacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
  '5xl': string;
  '6xl': string;
}

/**
 * Interface pour les bordures
 * Principe ISP : Séparation des bordures
 */
export interface BorderRadius {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  full: string;
}

/**
 * Interface pour les ombres
 * Principe ISP : Séparation des ombres
 */
export interface BoxShadow {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  inner: string;
}

/**
 * Interface pour les breakpoints
 * Principe ISP : Séparation des points de rupture
 */
export interface Breakpoints {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

/**
 * Interface pour les z-index
 * Principe ISP : Séparation des couches
 */
export interface ZIndex {
  auto: string;
  base: number;
  dropdown: number;
  sticky: number;
  fixed: number;
  overlay: number;
  modal: number;
  popover: number;
  tooltip: number;
  toast: number;
}

/**
 * Interface pour les transitions
 * Principe ISP : Séparation des animations
 */
export interface Transitions {
  duration: {
    fast: string;
    normal: string;
    slow: string;
  };
  easing: {
    linear: string;
    easeIn: string;
    easeOut: string;
    easeInOut: string;
  };
}

/**
 * Interface complète pour un thème
 * Composition de toutes les interfaces thématiques
 */
export interface Theme {
  name: string;
  mode: 'light' | 'dark' | 'auto';
  colors: ExtendedColorPalette;
  typography: Typography;
  spacing: Spacing;
  borderRadius: BorderRadius;
  boxShadow: BoxShadow;
  breakpoints: Breakpoints;
  zIndex: ZIndex;
  transitions: Transitions;
}

/**
 * Interface pour la configuration du thème
 * Principe ISP : Séparation de la configuration
 */
export interface ThemeConfig {
  defaultTheme: string;
  themes: Record<string, Theme>;
  storageKey: string;
  enableSystemTheme: boolean;
  enableColorSchemeQuery: boolean;
}

/**
 * Interface pour le contexte de thème
 * Principe ISP : Séparation du contexte React
 */
export interface ThemeContextValue {
  currentTheme: Theme;
  themeName: string;
  mode: 'light' | 'dark' | 'auto';
  setTheme: (themeName: string) => void;
  setMode: (mode: 'light' | 'dark' | 'auto') => void;
  toggleMode: () => void;
  isLoading: boolean;
}

/**
 * Interface pour les tokens de design système
 * Principe ISP : Séparation des tokens
 */
export interface DesignTokens {
  space: Record<string, string>;
  colors: Record<string, string>;
  fonts: Record<string, string>;
  fontSizes: Record<string, string>;
  fontWeights: Record<string, number>;
  lineHeights: Record<string, number>;
  radii: Record<string, string>;
  shadows: Record<string, string>;
  sizes: Record<string, string>;
  borders: Record<string, string>;
}

/**
 * Interface pour les composants thématisés
 * Principe ISP : Séparation des styles de composants
 */
export interface ComponentTheme {
  defaultProps?: Record<string, unknown>;
  styleOverrides?: Record<string, Record<string, unknown>>;
  variants?: Record<string, Record<string, unknown>>;
}

/**
 * Interface pour la personnalisation du thème
 * Principe ISP : Fonctionnalité de customisation séparée
 */
export interface ThemeCustomization {
  palette?: Partial<ExtendedColorPalette>;
  typography?: Partial<Typography>;
  spacing?: Partial<Spacing>;
  components?: Record<string, ComponentTheme>;
  customProperties?: Record<string, string>;
}