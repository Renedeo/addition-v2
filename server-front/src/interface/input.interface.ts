import { ChangeEvent, FocusEvent, KeyboardEvent, ReactNode } from 'react';

/**
 * Interface de base pour tous les inputs
 * Principe ISP : Propriétés communes minimales
 */
export interface BaseInputProps {
  id?: string;
  name?: string;
  className?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  'data-testid'?: string;
}

/**
 * Interface pour les inputs avec valeur
 * Principe ISP : Séparation de la gestion de valeur
 */
export interface ValueInputProps<T = string> extends BaseInputProps {
  value?: T;
  defaultValue?: T;
  onValueChange?: (value: T) => void;
}

/**
 * Interface pour les inputs texte
 * Principe ISP : Spécialisation pour le texte
 */
export interface TextInputProps extends ValueInputProps<string> {
  type?: 'text' | 'email' | 'password' | 'url' | 'tel';
  placeholder?: string;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  autoComplete?: string;
  autoFocus?: boolean;
}

/**
 * Interface pour les inputs numériques
 * Principe ISP : Spécialisation pour les nombres
 */
export interface NumberInputProps extends ValueInputProps<number> {
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
}

/**
 * Interface pour les événements d'input
 * Principe ISP : Séparation des événements
 */
export interface InputEventProps {
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Interface pour la validation d'input
 * Principe ISP : Séparation de la logique de validation
 */
export interface ValidationInputProps {
  error?: string | boolean;
  success?: boolean;
  validationMessage?: string;
  showValidation?: boolean;
}

/**
 * Interface pour les labels et descriptions
 * Principe ISP : Séparation des éléments descriptifs
 */
export interface LabeledInputProps {
  label?: string;
  description?: string;
  hint?: string;
  labelPosition?: 'top' | 'left' | 'inline';
}

/**
 * Interface pour les inputs avec icônes
 * Principe ISP : Fonctionnalité d'icône séparée
 */
export interface IconInputProps {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onLeftIconClick?: () => void;
  onRightIconClick?: () => void;
}

/**
 * Interface pour les inputs de taille
 * Principe ISP : Séparation des aspects visuels
 */
export interface SizedInputProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'outline' | 'underline';
}

/**
 * Interface complète pour un input texte
 * Composition des interfaces spécialisées
 */
export interface InputProps 
  extends TextInputProps,
          InputEventProps,
          ValidationInputProps,
          LabeledInputProps,
          IconInputProps,
          SizedInputProps {
  // Propriétés additionnelles
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

/**
 * Interface pour les textarea
 * Principe ISP : Spécialisation pour le texte multi-ligne
 */
export interface TextareaProps extends ValueInputProps<string>, ValidationInputProps, LabeledInputProps {
  rows?: number;
  cols?: number;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  placeholder?: string;
  maxLength?: number;
  minLength?: number;
}

/**
 * Interface pour les checkbox
 * Principe ISP : Spécialisation pour les cases à cocher
 */
export interface CheckboxProps extends ValueInputProps<boolean>, ValidationInputProps, LabeledInputProps {
  indeterminate?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Interface pour les radio buttons
 * Principe ISP : Spécialisation pour les boutons radio
 */
export interface RadioProps extends BaseInputProps, ValidationInputProps {
  value: string;
  checked?: boolean;
  name: string;
  label?: string;
  onValueChange?: (value: string) => void;
}

/**
 * Interface pour les select
 * Principe ISP : Spécialisation pour les listes déroulantes
 */
export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  group?: string;
}

export interface SelectProps extends ValueInputProps<string | number>, ValidationInputProps, LabeledInputProps {
  options: SelectOption[];
  placeholder?: string;
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  loading?: boolean;
  onSearch?: (query: string) => void;
}