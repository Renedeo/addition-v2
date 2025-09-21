"use client";
import React from "react";

export const AnalysisCard: React.FC<{
  title: string;
  level: string;
  description: string;
  icon: string;
}> = ({ title, level, description, icon }) => (
  <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200 transition-all duration-200 hover:shadow-md">
    <div className="flex items-center mb-3">
      <span className="text-xl mr-3">{icon}</span>

      <h3 className="font-semibold text-gray-800">{title}</h3>
    </div>
    <div className="space-y-2">
      <div className="flex items-center">
        <span className="text-sm font-medium text-gray-500 w-20">Level:</span>
        <span className="p-3 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">
          {level}
        </span>
      </div>
      <div>
        <span className="text-sm font-medium text-gray-500">Description:</span>
        <p className="text-sm text-gray-600 mt-1 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  </div>
);
