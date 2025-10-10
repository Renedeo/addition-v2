"use client";
import React from "react";


/**
 * A React functional component that displays a card with a label, a color value, and a background color
 * based on the specified color theme.
 *
 * @component
 * @param {Object} props - The props object.
 * @param {string} props.label - The label to display on the card.
 * @param {string} props.value - The color value as a string representation.
 * @param {"blue" | "green" | "purple"} props.color - The color theme for the card, which determines the border and background color.
 *
 * @returns {JSX.Element} A styled card component with the specified label, color value, and theme.
 */
export const ColorValueCard: React.FC<{
  label: string;
  value: string;
  color: "blue" | "green" | "purple";
}> = ({ label, value, color }) => {
  const colorClasses = {
    blue: "border-blue-200 bg-blue-50",
    green: "border-green-200 bg-green-50",
    purple: "border-purple-200 bg-purple-50",
  };

  return (
    <div
      className={`${colorClasses[color]} border rounded-xl p-4 transition-all duration-200 hover:shadow-md `}
    >
      <p className="text-sm font-medium text-gray-600 mb-2">{label}</p>
      <p className="font-mono text-sm text-gray-900 break-all leading-relaxed">
        {value}
      </p>
    </div>
  );
};
