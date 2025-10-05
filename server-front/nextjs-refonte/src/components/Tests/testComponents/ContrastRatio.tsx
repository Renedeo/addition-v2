
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

/**
 * A React functional component that calculates and displays the contrast ratio
 * between two colors (Foreground and Background) using a provided contrast service.
 * It also evaluates the accessibility of the contrast ratio based on WCAG guidelines.
 *
 * @component
 * @param {ContrastRatioProps} props - The props for the component.
 * @param {Color} props.Foreground - The foreground color to be compared.
 * @param {Color} props.Background - The background color to be compared.
 * @param {ContrastService} props.contrastService - A service for calculating contrast ratios.
 *
 * @returns {JSX.Element | null} The rendered contrast ratio component or null if the calculation fails.
 *
 * @remarks
 * - The component uses `useMemo` to optimize the calculation of the contrast ratio.
 * - It includes subcomponents for rendering preview text, accessibility status, and contrast cards.
 * - WCAG guidelines are displayed for reference.
 *
 * @example
 * ```tsx
 * <ContrastRatio
 *   Foreground={foregroundColor}
 *   Background={backgroundColor}
 *   contrastService={contrastServiceInstance}
 * />
 * ```
 *
 * @see https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
 */
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

    const getAccessibilityColor = (isAccessible: boolean) =>
      isAccessible ? "text-emerald-600" : "text-red-500";

    const getLevelColor = (level: string): string => {
      const colors: Record<string, string> = {
        aaa: "text-emerald-600 bg-emerald-50",
        aa: "text-blue-600 bg-blue-50",
        default: "text-red-500 bg-red-50",
      };
      return colors[level.toLowerCase()] || colors.default;
    };

    const formatRatio = (ratio: number) => ratio.toFixed(2) + ":1";

    const PreviewText: React.FC<{ size: "normal" | "large" }> = ({ size }) => (
      <div
        className="p-9 rounded-lg border-2 border-dashed border-gray-200 grow flex items-center justify-center text-center"
        style={{ backgroundColor: Background.stringValue() }}
      >
        <p
          className={`${
            size === "normal" ? "text-base" : "text-2xl font-bold"
          } transition-all duration-200`}
          style={{ color: Foreground.stringValue() }}
        >
          The quick brown fox jumps over the lazy dog
        </p>
      </div>
    );

    const IsAccessible: React.FC<{ isAccessible: boolean }> = ({
      isAccessible,
    }) => (
      <span
        className={`text-sm font-medium ${getAccessibilityColor(isAccessible)}`}
      >
        {isAccessible ? "✓ Accessible" : "✗ Not Accessible"}
      </span>
    );

    const ContrastCard: React.FC<{
      title: string;
      size: "normal" | "large";
      level: string;
      isAccessible: boolean;
    }> = ({ title, size, level, isAccessible }) => (
      <div className="p-4 flex flex-col rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">{title}</h3>
        <PreviewText size={size} />
        <div className="mt-3 flex items-center justify-evenly">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(
              level
            )}`}
          >
            {level}
          </span>
          <IsAccessible isAccessible={isAccessible} />
        </div>
      </div>
    );

    return (
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
        <div className="flex justify-between items-center mb-6">
          <LabelledColorDot color={Background.stringValue()} label="Contrast Ratio" />
          <div className="flex items-center gap-3">
            <ColorIndicator color={Foreground} />
            <ColorIndicator color={Background} />
          </div>
        </div>

        <div>
          <div className="text-center bg-gray-50 rounded-xl p-4">
            <p className="text-sm font-medium text-gray-500 mb-1">
              Contrast Ratio
            </p>
            <p className="text-3xl font-bold text-gray-900">
              {formatRatio(result.contrastRatio)}
            </p>
          </div>

          <div className="flex flex-col *:w-full sm:*:w-1/2 sm:flex-row gap-6">
            <ContrastCard
              title="Normal Text (16px)"
              size="normal"
              level={result.level.normalText}
              isAccessible={result.isAccessible.normalText}
            />
            <ContrastCard
              title="Large Text (24px) + Bold (18px)"
              size="large"
              level={result.level.largeText}
              isAccessible={result.isAccessible.largeText}
            />
          </div>

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
