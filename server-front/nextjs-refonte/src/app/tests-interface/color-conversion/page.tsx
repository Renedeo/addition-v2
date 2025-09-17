"use client";
import { FormatConst } from "@/domain/Entity/ColorValue/core/constants/colorRepresentation.const";
import {
    ColorFormat,
    HEXColor,
    HSLColor,
    RGBColor,
} from "@/domain/Entity/ColorValue/core/types/colorRepresention.types";
import { ColorConversionFactory } from "@/domain/Entity/ColorValue/implementations/factory/ColorConversion.factory";
import { ConverterRegistry } from "@/domain/Entity/ColorValue/implementations/registry/converter.registry";
import React from "react";

export default function Page() {
    const [selectedColor, setSelectedColor] = React.useState("#ffffff");
    const registry: ConverterRegistry = ColorConversionFactory.createDefaultRegistry();

    const handleColorChange = (color: string) => {
        setSelectedColor(color);
    };
    return (
        <div className="p-5 font-sans bg-gray-50 min-h-screen">
            <p className="text-2xl font-bold text-gray-800 mb-4">Color Conversion Test</p>
            <p className="text-gray-600 mb-6">Test the color conversion functionality here.</p>
            <div className="mt-2 flex flex-col md:flex-row items-start gap-6">
                <ColorSelection onColorChange={handleColorChange} />
                <ColorInformation
                    RGBValue={registry.convert<HEXColor, RGBColor>(toHEX(selectedColor), FormatConst.HEX, FormatConst.RGB)}
                    HexValue={registry.convert<HEXColor, HEXColor>(toHEX(selectedColor), FormatConst.HEX, FormatConst.HEX)}
                    HSLValue={registry.convert<HEXColor, HSLColor>(toHEX(selectedColor), FormatConst.HEX, FormatConst.HSL)}
                />
            </div>
        </div>
    );
}

interface ColorSelectionProps {
    onColorChange: (color: string) => void;
}

const ColorSelection: React.FC<ColorSelectionProps> = ({ onColorChange }) => {
    return (
        <div className="flex flex-col items-center">
            <label className="text-gray-700 font-medium mb-2">Select a Color:</label>
            <input
                type="color"
                onChange={(e) => onColorChange(e.target.value)}
                className="w-16 h-16 p-0 border-2 border-gray-300 rounded cursor-pointer shadow-sm"
            />
        </div>
    );
};

interface ConvertorProps {
    fromType: ColorFormat;
    toType: ColorFormat;
    onConvert: (convertedValue: string) => void;
}

const Convertor: React.FC<ConvertorProps> = ({
    fromType,
    toType,
    onConvert,
}) => {
    return <div>Convertor Component Placeholder</div>;
};

interface ColorInformationProps {
    RGBValue: RGBColor | undefined;
    HexValue: HEXColor | undefined;
    HSLValue: HSLColor | undefined;
}
const ColorInformation: React.FC<ColorInformationProps> = ({
    RGBValue,
    HexValue,
    HSLValue,
}) => {
    return (
        <div className="mt-4 p-4 border rounded w-fit bg-white shadow-md backdrop-blur-md bg-opacity-50 border-gray-300 border-opacity-30">
            <p className="text-lg font-semibold text-gray-800 mb-2">Color Information:</p>
            <div className="text-gray-700">
                <span className="block mb-1">
                    <strong>{FormatConst.RGB}:</strong> {formatRGB(RGBValue)}
                </span>
                <span className="block mb-1">
                    <strong>{FormatConst.HEX}:</strong> {formatHEX(HexValue)}
                </span>
                <span className="block">
                    <strong>{FormatConst.HSL}:</strong> {formatHSL(HSLValue)}
                </span>
            </div>
        </div>
    );
};

function formatRGB(color: RGBColor | undefined): string {
    return color ? `rgb(${color.r}, ${color.g}, ${color.b}${
        color.a !== undefined ? `, ${color.a}` : ""
    })` : "Invalid RGB color";
}
function formatHSL(color: HSLColor | undefined): string {
    return color ? `hsl(${Math.round(color.h)}, ${Math.round(color.s)}%, ${Math.round(color.l)}%${
        color.a !== undefined ? `, ${Math.round(color.a * 100) / 100}` : ""
    })` : "Invalid HSL color";
}
function formatHEX(color: HEXColor | undefined): string {
    return color ? `${color.hex}${color.a !== undefined ? `, ${color.a}` : ""}` : "Invalid HEX color";
}

function toHEX(color: string): HEXColor {
    // Simple validation for hex color format
    if (/^#([0-9A-F]{3}){1,2}$/i.test(color)) {
        return { hex: color, a: undefined };
    }
    throw new Error("Invalid HEX color format");
}