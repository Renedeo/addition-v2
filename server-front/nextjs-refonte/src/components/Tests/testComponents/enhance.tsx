import { LabelledColorDot } from "@/components/Tests/testComponents/LabelledColorDot";
import { IHEXColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { IEnhancedColorService } from "@/domain/Entity/ColorValue/core/interfaces/service/enhanced.interface";
import { HEXColor } from "@/domain/Entity/ColorValue/implementations/core/hex";

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
    
  const handleEnhance = () => {
    let enhancedColor = color;
    
    if (enhancementType === "lightness") {
      const result = lightnessService.enhanceColor(color, amount);
      enhancedColor = {...result, a: color.a} as HEXColor; // Preserve original alpha
    } else if (enhancementType === "saturation") {
      const result = saturationService.enhanceColor(color, amount);
      enhancedColor = {...result, a: color.a} as HEXColor; // Preserve original alpha
    }
    if (onChange) {
      onChange(enhancedColor);
    }
  };

  return (
    <div>
      <LabelledColorDot color={"#" + color.value} label="Original Color" />
      <label htmlFor="enhance">{enhancementType === "lightness" ? "Enhance Lightness" : "Enhance Saturation"}</label>
      <input
        type="range"
        name="enhance"
        min="0"
        max="100"
        value={amount}
        step={.1}
        onChange={handleEnhance}
      />
    </div>
  );
};
