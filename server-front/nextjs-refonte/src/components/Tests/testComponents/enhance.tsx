import { IHEXColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { IEnhancedColorService } from "@/domain/Entity/ColorValue/core/interfaces/service/enhanced.interface";
import { useState } from "react";

interface EnhanceColorProps {
  color: IHEXColor;
  enhancementType: "lightness" | "saturation";
  amount: number; // Amount to enhance (e.g., percentage)
  onChange: (enhancedColor: IHEXColor) => void;
  lightnessService: IEnhancedColorService;
  saturationService: IEnhancedColorService;
}

/**
 * EnhanceColor is a React functional component that provides a slider to adjust
 * the enhancement of a color based on a specified enhancement type (e.g., lightness or saturation).
 *
 * @param {EnhanceColorProps} props - The properties for the EnhanceColor component.
 * @param {IHEXColor} props.color - The initial color to be enhanced, represented as a HEX color.
 * @param {"lightness" | "saturation"} props.enhancementType - The type of enhancement to apply (lightness or saturation).
 * @param {number} props.amount - The initial enhancement amount, used to set the slider's value.
 * @param {(enhancedColor: IHEXColor) => void} [props.onChange] - Optional callback function triggered when the color is enhanced.
 * @param {LightnessService} props.lightnessService - Service object providing the logic to enhance lightness.
 * @param {SaturationService} props.saturationService - Service object providing the logic to enhance saturation.
 *
 * @returns {JSX.Element} A slider input for adjusting the enhancement of the color.
 *
 * @example
 * ```tsx
 * <EnhanceColor
 *   color="#ff0000"
 *   enhancementType="lightness"
 *   amount={50}
 *   onChange={(enhancedColor) => console.log(enhancedColor)}
 *   lightnessService={lightnessServiceInstance}
 *   saturationService={saturationServiceInstance}
 * />
 * ```
 */
export const EnhanceColor: React.FC<EnhanceColorProps> = ({
  color,
  enhancementType,
  amount,
  onChange,
  lightnessService,
  saturationService,
}) => {
  const [sliderValue, setSliderValue] = useState<number>(amount);

  const services = {
    lightness: lightnessService,
    saturation: saturationService,
  };

  const handleEnhance = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseFloat(e.target.value);
    if (isNaN(newAmount)) return;

    const difference = newAmount - sliderValue;
    if (difference === 0) return;

    const enhancedColor = services[enhancementType].enhanceColor(color, difference);

    setSliderValue(newAmount);

    if (onChange) {
      onChange(enhancedColor as IHEXColor);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="pt-5" htmlFor="enhance">
        {enhancementType}
      </label>
      <input
        type="range"
        id="enhance"
        name="enhance"
        min="0"
        max="100"
        value={sliderValue}
        onChange={handleEnhance}
      />
    </div>
  );
};
