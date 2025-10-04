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

export const EnhanceColor: React.FC<EnhanceColorProps> = ({
  color,
  enhancementType,
  amount,
  onChange,
  lightnessService,
  saturationService,
}) => {
  const service = {
    lightness: lightnessService,
    saturation: saturationService,
  };
  const [sliderValue, setSliderValue] = useState<number>(amount);

  const handleEnhance = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseFloat(e.target.value);
    if (isNaN(newAmount)) return;

    const difference = newAmount - sliderValue;
    if (difference === 0) return;

    const result = service[enhancementType].enhanceColor(color, difference);

    setSliderValue(newAmount); // Met à jour la valeur précédente

    if (onChange) {
      onChange(result as IHEXColor);
    }
  };

  return (
    <div>
      <label htmlFor="enhance">{enhancementType}</label>
      <input
        type="range"
        name="enhance"
        min="0"
        max="100"
        value={sliderValue}
        onChange={handleEnhance}
      />
    </div>
  );
};
