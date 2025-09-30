"use client";
import { ColorSelectionProps } from "@/components/Tests/core/interfaces/component.test.interface";
import React from "react";

export const ColorSelection: React.FC<ColorSelectionProps> = React.memo(
  ({ onColorChange, label, value }) => {
    const [isValidHex, setIsValidHex] = React.useState(true);
    const [inputValue, setInputValue] = React.useState(value);

    const validateHex = (value: string) => /^#([0-9A-F]{3}){1,2}$/i.test(value);

    const onTextColorChange = (text: string) => {
      setInputValue(text);
      console.log("text", text, "validation", validateHex(text));
      setIsValidHex(validateHex(text));
      if (validateHex(text)) {
        onColorChange(text);
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
            onChange={(e) => {
              onColorChange(e.target.value);
              setInputValue(e.target.value);
              setIsValidHex(true);
            }}
            className="w-16 h-16 rounded-2xl border-4 border-white shadow-lg cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-xl group-hover:border-gray-100"
          />
        </div>
        <div className="flex-1">
          <input
            type="text"
            value={inputValue.toUpperCase()}
            onChange={(e) => onTextColorChange(e.target.value)}
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
