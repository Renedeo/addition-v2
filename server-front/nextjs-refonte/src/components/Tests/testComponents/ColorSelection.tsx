"use client";
import { IHEXColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { HEXColor } from "@/domain/Entity/ColorValue/implementations/core/hex";
import React from "react";

export interface ColorSelectionProps {
  onColorChange: (color: IHEXColor) => void;
  label: string;
  value: string;
}

export const ColorSelection: React.FC<ColorSelectionProps> = React.memo(
  ({ onColorChange, label, value }) => {
    const [isValidHex, setIsValidHex] = React.useState(true);
    const [inputValue, setInputValue] = React.useState(value);

    const handleColorChange = (color: string) => {
      try {
        const newColor = new HEXColor(color);
        onColorChange(newColor);
        setIsValidHex(true);
      } catch {
        setIsValidHex(false);
      }
    }

    const handleTextColorChange = (text: string) => {
      try {
        const newColor = new HEXColor(text);
        console.log(newColor.toString())
        // setInputValue(text);
        // onColorChange(newColor);
        // setIsValidHex(true);
      } catch {
        setInputValue(text);
        setIsValidHex(false);
      }
    };

    const ValidationMessage: React.FC = () => (
      <p className="text-xs text-red-500 mt-1">
        Please enter a valid hex color code (e.g., #FFFFFF).
      </p>
    );

    return (
      <div className="sticky top-0 z-10 bg-white">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {label}
        </label>
        <div className="relative flex items-center space-x-4 mb-2 justify-center">
          <input
            type="color"
            value={value}
            onChange= {(e) =>{ 
              handleColorChange(e.target.value)
            }}
            className="w-16 h-16 rounded-2xl border-4 border-white shadow-lg cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-xl group-hover:border-gray-100"
          />
        </div>
        <div className="flex-1">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => handleTextColorChange(e.target.value)}
            className={
              "w-full px-3 py-2 font-mono text-sm border  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" +
              (isValidHex ? " border-blue-500" : " border-red-500")
            }
            placeholder="#000000"
          />
          {!isValidHex && <ValidationMessage />}
        </div>
      </div>
    );
  }
);

ColorSelection.displayName = "ColorSelection";
