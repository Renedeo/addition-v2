"use client";
import { HSLColor, HEXColor, RGBColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";

export function formatHSL(color: HSLColor | undefined): string {
  return color
    ? `hsl(${Math.round(color.value.h)}, ${Math.round(
      color.value.s
    )}%, ${Math.round(color.value.l)}%${color.a !== undefined ? `, ${Math.round(color.a * 100) / 100}` : ""})`
    : "Invalid HSL color";
}
export function formatHEX(color: HEXColor | undefined): string {
  return color
    ? `#${color.value.hex}${color.a !== undefined ? `, ${color.a}` : ""}`
    : "Invalid HEX color";
}
export function toHEX(color: string): HEXColor {
  if (/^#([0-9A-F]{3}){1,2}$/i.test(color)) {
    return { format: "HEX", value: { hex: color }, a: 1 } as HEXColor;
  }
  throw new Error("Invalid HEX color format");
}// Utility functions
export function formatRGB(color: RGBColor | undefined): string {
  return color
    ? `rgb(${color.value.r}, ${color.value.g}, ${color.value.b}${color.a !== undefined ? `, ${Math.round(color.a * 100) / 100}` : ""})`
    : "Invalid RGB color";
}

