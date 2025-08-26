import { ReactNode, MouseEvent } from 'react';

/**
 * Interface de base pour les propriétés communes des boutons
 * Principe ISP : Interface minimale avec les propriétés essentielles
 */
export interface BaseButtonProps {
  children: ReactNode;
  disabled?: boolean;
  className?: string;
  'data-testid'?: string;
}

/**
 * Interface pour les boutons cliquables
 * Principe ISP : Séparation de la logique de clic
 */
export interface ClickableButtonProps extends BaseButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
}

/**
 * Interface pour les boutons avec variants visuels
 * Principe ISP : Séparation des aspects visuels
 */
export interface StyledButtonProps extends BaseButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * Interface pour les boutons avec état de chargement
 * Principe ISP : Fonctionnalité de loading séparée
 */
export interface LoadingButtonProps extends BaseButtonProps {
  loading?: boolean;
  loadingText?: string;
}

/**
 * Interface pour les boutons avec icônes
 * Principe ISP : Fonctionnalité d'icône séparée
 */
export interface IconButtonProps extends BaseButtonProps {
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  iconOnly?: boolean;
}

/**
 * Interface complète pour un bouton avec toutes les fonctionnalités
 * Composition des interfaces spécialisées
 */
export interface ButtonProps 
  extends ClickableButtonProps, 
          StyledButtonProps, 
          LoadingButtonProps, 
          IconButtonProps {
  // Propriétés additionnelles si nécessaires
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

/**
 * Interface pour les boutons de navigation (liens)
 * Principe ISP : Séparation des boutons de navigation
 */
export interface LinkButtonProps extends StyledButtonProps {
  href: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  external?: boolean;
}

/**
 * Interface pour les boutons de formulaire
 * Principe ISP : Spécialisation pour les formulaires
 */
export interface FormButtonProps extends ClickableButtonProps, StyledButtonProps, LoadingButtonProps {
  form?: string;
  formAction?: string;
  formMethod?: 'get' | 'post';
}