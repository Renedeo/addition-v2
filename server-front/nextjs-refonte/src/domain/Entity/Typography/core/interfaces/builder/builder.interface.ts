import type { IFontFamily, IFont } from "@domain/Entity/Typography/core/types/fontFamily.type";
import type { FontSizeUnit, FontWeight, FontStyle } from "@domain/Entity/Typography/core/types/fontFamily.type";

/**
 * Contrat pour un builder fluide qui construit IFontFamily et IFont.
 */
export interface IFontFamilyBuilder {
  name(name: string): this;
  generic(genericFamily: IFontFamily["genericFamily"]): this;
  google(isGoogle?: boolean): this;
  variants(variants: Array<string | number>): this;
  subsets(subsets: string[]): this;
  display(display: IFontFamily["display"]): this;
  googleFontUrl(url: string): this;
  build(): IFontFamily;
}

export interface ITypographyBuilder {
  family(family: IFontFamily): this;
  size(value: number, unit?: FontSizeUnit): this;
  weight(weight: FontWeight): this;
  style(style: FontStyle): this;
  lineHeight(value: number | string): this;
  letterSpacing(value: number | string): this;
  build(): IFont;
  toCssShorthand(): string;
}

export default IFontFamilyBuilder;
