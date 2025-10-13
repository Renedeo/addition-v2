import React, { useCallback } from "react";
import { IHEXColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { IEnhancedColorService } from "@/domain/Entity/ColorValue/core/interfaces/service/enhanced.interface";

/**
 * Props pour le composant EnhanceColor
 */
interface EnhanceColorProps {
  /** Couleur de base à améliorer */
  color: IHEXColor;
  /** Valeur initiale du curseur (luminosité ou saturation) */
  initialValue: number;
  /** Service d'amélioration (luminosité ou saturation) */
  enhanceServices: IEnhancedColorService;
  /** Callback appelé avec la couleur améliorée */
  onColorEnhanced: (enhancedColor: IHEXColor) => void;
  /** Label pour le slider */
  label?: string;
}

/**
 * EnhanceColor is a React functional component that provides a UI for enhancing a color value
 * using a range input slider. It utilizes the `IEnhancedColorService` to compute the enhanced
 * color based on the provided input.
 *
 * @component
 * @param {EnhanceColorProps} props - The properties for the EnhanceColor component.
 * @param {IColor} props.color - The initial color to be enhanced.
 * @param {number} props.initialValue - The initial value for the range slider.
 * @param {IEnhancedColorService} props.enhanceServices - The service used to enhance the color.
 * @param {(color: IHEXColor) => void} props.onColorEnhanced - Callback function invoked with the enhanced color.
 *
 * @returns {JSX.Element} A React component that renders a range slider and displays the current color.
 *
 * @example
 * ```tsx
 * const handleColorEnhanced = (enhancedColor: IHEXColor) => {
 *   // enhancedColor contient la couleur améliorée
 * };
 *
 * <EnhanceColor
 *   color={initialColor}
 *   initialValue={50}
 *   enhanceServices={enhancedColorService}
 *   onColorEnhanced={handleColorEnhanced}
 * />
 * ```
 */
export const EnhanceColor: React.FC<EnhanceColorProps> = React.memo(
  ({
    color,
    initialValue,
    enhanceServices,
    onColorEnhanced,
    label = "Enhance",
  }) => {
    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(event.target.value);
        const newColor = enhanceServices.enhanceColor(color, newValue - initialValue);
        onColorEnhanced(newColor as IHEXColor);
      },
      [color, enhanceServices, initialValue, onColorEnhanced]
    );

    return (
      <div>
        <label>{label}</label>
        <input
          type="range"
          min="0"
          max="100"
          defaultValue={initialValue}
          onChange={handleChange}
          />
          </div>
    );
  }
);

EnhanceColor.displayName = "EnhanceColor";
