"use client";
import { ColorIndicator } from "@/components/Tests/testComponents/ColorIndicator";
import { LabelledColorDot } from "@/components/Tests/testComponents/LabelledColorDot";
import { IHEXColor, IColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { IColorComparisonService, IColorContrastResult } from "@/domain/Entity/ColorValue/core/interfaces/service/analysis.interface";
import React, { useMemo } from "react";

export interface ContrastRatioProps {
  Foreground: IHEXColor;
  Background: IHEXColor;
  contrastService: IColorComparisonService<IColor, IColor, IColorContrastResult>;
}


export const ContrastRatio: React.FC<ContrastRatioProps> = React.memo(
  ({ Foreground, Background, contrastService }) => {

    const result = useMemo(() => {
      try {
        return contrastService.compareColors(Foreground, Background);
      } catch {
        return null;
      }
    }, [Foreground, Background, contrastService]);

    if (!result) return null;

    const getAccessibilityColor = (isAccessible: boolean) => isAccessible ? "text-emerald-600" : "text-red-500";

    const getLevelColor = (level: string) => {
      switch (level.toLowerCase()) {
        case "aaa":
          return "text-emerald-600 bg-emerald-50";
        case "aa":
          return "text-blue-600 bg-blue-50";
        default:
          return "text-red-500 bg-red-50";
      }
    };

    const formatRatio = (ratio: number) => ratio.toFixed(2) + ":1";

    const PreviewText: React.FC<{ size: "normal" | "large"; }> = ({ size }) => {
      const fontSize = size === "normal" ? "text-base" : "text-2xl font-bold";
      return (
        <div
          className="p-9 rounded-lg border-2 border-dashed border-gray-200 grow flex items-center justify-center text-center"
          style={{ backgroundColor: "#" + Background.value.hex }}
        >
          <p
            className={`${fontSize} transition-all duration-200`}
            style={{
              color: "#" + Foreground.value.hex,
            }}
            >
            The quick brown fox jumps over the lazy dog
          </p>
        </div>
      );
    };
    
    const IsAccessible: React.FC<{ isAccessible: boolean; }> = ({
      isAccessible,
    }) => (
      <span
      className={`text-sm font-medium ${getAccessibilityColor(isAccessible)}`}
      >
        {isAccessible ? "✓ Accessible" : "✗ Not Accessible"}
      </span>
    );
    
    const Ratio: React.FC = () => (
      <div className="text-center bg-gray-50 rounded-xl p-4">
        <p className="text-sm font-medium text-gray-500 mb-1">Contrast Ratio</p>
        <p className="text-3xl font-bold text-gray-900">
          {formatRatio(result.contrastRatio)}
        </p>
      </div>
    );
    
    return (
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
        <div className="flex justify-between items-center mb-6">
          <LabelledColorDot
            color={"#" + Background.value.hex}
            label="Contrast Ratio" />
          <div className="flex items-center gap-3">
            <ColorIndicator color={"#" + Foreground.value.hex} />
            <ColorIndicator color={"#" + Background.value.hex} />
          </div>
        </div>

        <div>
          {/* Color Ratio */}
          <Ratio />
          {/* Text Previews */}
          <div className="flex flex-col *:w-full sm:*:w-1/2 sm:flex-row gap-6">
            <div className="p-4 flex flex-col rounded-lg ">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Normal Text (16px)
              </h3>

              <PreviewText size="normal" />
              <div className="mt-3 flex items-center justify-evenly">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium${getLevelColor(
                    result.level.normalText
                  )}`}
                  >
                  {result.level.normalText}
                </span>

                <IsAccessible isAccessible={result.isAccessible.normalText} />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Large Text (24px) + Bold (18px)
              </h3>

              <PreviewText size="large" />
              <div className="mt-3 flex items-center justify-evenly">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(
                    result.level.largeText
                  )}`}
                >
                  {result.level.largeText}
                </span>

                <IsAccessible isAccessible={result.isAccessible.largeText} />
              </div>
            </div>
          </div>

          {/* WCAG Guidelines */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">
              WCAG Guidelines
            </h4>
            <div className="text-xs text-blue-700 space-y-1">
              <p>
                • <strong>AA:</strong> Minimum standard (4.5:1 normal, 3:1
                large)
              </p>
              <p>
                • <strong>AAA:</strong> Enhanced standard (7:1 normal, 4.5:1
                large)
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ContrastRatio.displayName = "ContrastRatio";