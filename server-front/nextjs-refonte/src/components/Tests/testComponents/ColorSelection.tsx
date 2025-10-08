"use client";
import {
  IColor,
} from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import React from "react";

export interface ColorSelectionProps {
  onColorChange: (color: string) => void;
  label: string;
  value: string;
}

export const ColorSelection: React.FC<ColorSelectionProps> = React.memo(
  ({ onColorChange, label, value }) => {
    const [isValidHex, setIsValidHex] = React.useState(true);
    console.log(value)

    const handleColorChange = (color: string) => {
      onColorChange(color);
      if (/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/.test(color)) {
        setIsValidHex(true);
      } else {
        setIsValidHex(false);
      }
    };

    const ValidationMessage: React.FC = () => (
      <p className="text-xs text-red-500 mt-1">
        Please enter a valid hex color code (e.g., #FFFFFF).
      </p>
    );

    return (
      <div className="sticky top-0 z-10 backdrop-blur-md bg-white/10 max-w-[200px]">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {label}
        </label>
        <div className="relative flex items-center space-x-4 mb-2 justify-center">
          <InputField
            type="color"
            initialValue={value}
            onColorChange={handleColorChange}
            className="w-16 h-16 rounded-2xl border-4 border-white shadow-lg cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-xl group-hover:border-gray-100"
          />
        </div>
        <div className="flex-1">
          <InputField
            type="text"
            initialValue={value}
            onColorChange={handleColorChange}
            className={
              "w-full px-3 py-2 font-mono text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" +
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

interface InputFieldProps {
  type: "color" | "text";
  initialValue: string;
  onColorChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = React.memo(
  ({ type, initialValue, onColorChange, className, placeholder }) => {

    return (
      <input
        type={type}
        value={initialValue}
        onChange={({ target }) => {onColorChange(target.value)}}
        className={`backdrop-blur-md bg-white/30 ${className}`}
        placeholder={placeholder}
      />
    );
  }
);

InputField.displayName = "InputField";

ColorSelection.displayName = "ColorSelection";
