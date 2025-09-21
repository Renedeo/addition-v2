"use client";
import React from "react";



export const ColorIndicator: React.FC<{ color: string; }> = ({ color }) => {
  return (
    <div
      className="ml-auto w-8 h-8 rounded-full shadow-sm border-2 border-white"
      style={{ backgroundColor: color }}
    ></div>
  );
};
