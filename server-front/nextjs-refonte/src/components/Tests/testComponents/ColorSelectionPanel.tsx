"use client";
import React from "react";
import { IHEXColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { LabelledColorDot } from "@/components/Tests/testComponents/LabelledColorDot";
import { ColorSelection } from "@/components/Tests/testComponents/ColorSelection";
import { EnhanceColor } from "@/components/Tests/testComponents/enhance";
import { ColorServicesHookResult, ColorAnalysisHookResult } from "@/hooks/types";
import { HEXColor } from "@/domain/Entity/ColorValue/implementations/core";
/**
 * Props pour le composant ColorSelectionPanel
 */
export interface ColorSelectionPanelProps {
  primaryColor: IHEXColor;
  backgroundColor: IHEXColor;
  setPrimaryColor: (color: IHEXColor) => void;
  setBackgroundColor: (color: IHEXColor) => void;
  services: ColorServicesHookResult;
  colorAnalysis: ColorAnalysisHookResult;
}

/**
 * Panel de sélection des couleurs et d'amélioration.
 * 
 * Ce composant contient les sélecteurs de couleur principale et de fond,
 * ainsi que les outils d'amélioration de saturation et de luminosité.
 * 
 * @component
 * @param {ColorSelectionPanelProps} props - Les props du composant
 * @returns {JSX.Element} Le composant ColorSelectionPanel
 * 
 * @example
 * ```tsx
 * <ColorSelectionPanel
 *   primaryColor={primaryColor}
 *   backgroundColor={backgroundColor}
 *   setPrimaryColor={setPrimaryColor}
 *   setBackgroundColor={setBackgroundColor}
 *   services={services}
 *   colorAnalysis={colorAnalysis}
 * />
 * ```
 */
export const ColorSelectionPanel: React.FC<ColorSelectionPanelProps> = React.memo(
  ({
    primaryColor,
    backgroundColor,
    setPrimaryColor,
    setBackgroundColor,
    services,
    colorAnalysis,
  }) => {
    const [colorSelectionValue, setColorSelectionValue] = React.useState<{
      primaryInputValue: string;
      backgroundInputValue: string;
    }>({
      primaryInputValue: primaryColor.stringValue(),
      backgroundInputValue: backgroundColor.stringValue(),
    });

    const handleColorChange = (color:string, setter:(color: IHEXColor) => void, type: "primaryInputValue" | "backgroundInputValue") => {
      setColorSelectionValue((prev) => ({
          ...prev,
          [type]: color
      }));
      console.log("ColorSelectionPanel: handleColorChange called with", { color, type });
        try{
            const newColor = new HEXColor(color);
            setter(newColor);

        }catch{
            return;
        }
    }

    const handlePrimaryColorChange = (color:string) => handleColorChange(color, setPrimaryColor, "primaryInputValue");
    const handleBackgroundColorChange = (color:string) => handleColorChange(color, setBackgroundColor, "secondaryInputValue");
    return (
      <div className="flex flex-col gap-6 w-full sm:w-auto">
        {/* Color Selection Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 sticky top-6 w-full sm:*:w-auto">
          <LabelledColorDot color={primaryColor.stringValue()} label="Color Selection" />
          <div className="flex justify-evenly w-full sm:w-fit sm:flex-col gap-6 sm:gap-4 mt-4">
            <ColorSelection
              onColorChange={handlePrimaryColorChange}
              label="Primary Color"
              value={colorSelectionValue.primaryInputValue}
            />
            <ColorSelection
              onColorChange={handleBackgroundColorChange}
              label="Background Color"
              value={colorSelectionValue.backgroundInputValue}
            />
          </div>
        </div>

        {/* Color Enhancement Section */}
        <div>
          <LabelledColorDot color={primaryColor.stringValue()} label="Enhance" />

          {services && (
            <>
              <EnhanceColor
                color={primaryColor}
                enhancementType="saturation"
                amount={colorAnalysis?.saturationInfo.saturation || 0}
                lightnessService={services.enhanceLightnessService}
                saturationService={services.enhanceSaturationService}
                onChange={handlePrimaryColorChange}
              />
              <EnhanceColor
                color={primaryColor}
                enhancementType="lightness"
                amount={colorAnalysis?.luminanceInfo.lightness || 0}
                lightnessService={services.enhanceLightnessService}
                saturationService={services.enhanceSaturationService}
                onChange={handlePrimaryColorChange}
              />
            </>
          )}
        </div>
      </div>
    );
  }
);

ColorSelectionPanel.displayName = "ColorSelectionPanel";