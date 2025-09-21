"use client";
import { ColorSelectionProps } from "@/components/Tests/core/interfaces/component.test.interface";
import React from "react";

export const ColorSelection: React.FC<ColorSelectionProps> = React.memo(
  ({ onColorChange, label, value }) => {
    return (
      <div className="group">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {label}
        </label>
        <div className="relative flex items-center space-x-4 mb-2 justify-center">
          <input
            type="color"
            value={value}
            onChange={(e) => onColorChange(e.target.value)}
            className="w-16 h-16 rounded-2xl border-4 border-white shadow-lg cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-xl group-hover:border-gray-100" />
        </div>
        <div className="flex-1">
          <input
            type="text"
            value={value.toUpperCase()}
            onChange={(e) => onColorChange(e.target.value)}
            className="w-full px-3 py-2 font-mono text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="#000000" />
        </div>
      </div>
    );
  }
);

ColorSelection.displayName = "ColorSelection";