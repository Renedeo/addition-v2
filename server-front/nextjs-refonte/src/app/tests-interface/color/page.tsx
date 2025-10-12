"use client";

import React from "react";
import { HEXColor } from "@/domain/Entity/ColorValue/implementations/core/hex";
import { useColorServices } from "@/hooks/useColorServices";
import { useColorAnalysis } from "@/hooks/useColorAnalysis";
import { Header } from "@/components/Tests/testComponents/Header";
import { ColorSelectionPanel } from "@/components/Tests/testComponents/ColorSelectionPanel";
import { ColorInformationPanel } from "@/components/Tests/testComponents/ColorInformationPanel";
import { useDebouncedValue } from "@/shared/hooks/common.hooks";
import { PaletteGenerator } from "@/components/Tests/testComponents/PaletteGenerator";

const INITIAL_PRIMARY_COLOR = new HEXColor("#932525");
const INITIAL_BACKGROUND_COLOR = new HEXColor("#ffffff");

/**
 * The `Page` component serves as the main interface for the color testing application.
 * It provides a user interface for selecting and analyzing colors, as well as generating
 * color palettes based on the selected primary and background colors.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered page component.
 *
 * @remarks
 * - This component uses several custom hooks and components to manage color selection,
 *   analysis, and palette generation.
 * - The `useDebouncedValue` hook is used to debounce updates to the primary and background colors.
 * - The `useColorServices` hook provides access to color-related services.
 * - The `useColorAnalysis` hook performs analysis on the selected primary color.
 *
 * @dependencies
 * - `Header`: Displays the header of the application.
 * - `ColorSelectionPanel`: Allows users to select primary and background colors.
 * - `ColorInformationPanel`: Displays information about the selected colors and analysis results.
 * - `PaletteGenerator`: Generates a color palette based on the primary color.
 *
 * @example
 * ```tsx
 * import Page from "@/app/tests-interface/color/page";
 *
 * export default function App() {
 *   return <Page />;
 * }
 * ```
 */
export default function Page() {
  const [primaryColor, setPrimaryColor] = useDebouncedValue(INITIAL_PRIMARY_COLOR, 200);
  const [backgroundColor, setBackgroundColor] = useDebouncedValue(INITIAL_BACKGROUND_COLOR, 200);

  const services = useColorServices();
  const colorAnalysis = useColorAnalysis(primaryColor, services);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 sm:p-6 flex justify-center">
      <div className="max-w-7xl mx-auto">
        <Header />
        <div className="flex flex-col items-center sm:flex-row justify-center gap-6 relative">
          <ColorSelectionPanel
            primaryColor={primaryColor}
            backgroundColor={backgroundColor}
            setPrimaryColor={(color) => setPrimaryColor(color as HEXColor)}
            setBackgroundColor={(color) => setBackgroundColor(color as HEXColor)}
            services={services}
            colorAnalysis={colorAnalysis}
          />
          <ColorInformationPanel
            primaryColor={primaryColor}
            backgroundColor={backgroundColor}
            colorAnalysis={colorAnalysis}
            services={services}
          />
          {services && (
            <PaletteGenerator primaryColor={primaryColor} colorFormatter={services.colorFormatter} />
          )}
        </div>
      </div>
    </div>
  );
}


