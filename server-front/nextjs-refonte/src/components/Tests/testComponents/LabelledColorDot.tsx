"use client";
import React from "react";



export const LabelledColorDot: React.FC<{ color: string; label: string; }> = ({
  color, label,
}): React.JSX.Element => (
  <div className="flex items-center gap-2.5">
    <div
      className={`w-2 h-2 rounded-full mr-3`}
      style={{ backgroundColor: color }}
    ></div>
    <h2 className="text-xl font-semibold text-gray-800">{label}</h2>
  </div>
);
