# Analyse objective des approches de conversion de couleurs

## Problématique

Conception d'un système de conversion entre différents formats de couleur (RGB, HSL, HEX, LAB, etc.) avec évaluation objective des trade-offs.

## Analyse comparative des approches

### 1. Méthodes intégrées (Self-contained)

**Principe** : Chaque format implémente ses propres méthodes de conversion

**Description** : Cette approche encapsule la logique de conversion directement dans chaque classe de couleur. Chaque format "sait" comment se convertir vers les autres formats, rendant chaque objet autonome.

```typescript
interface ColorFormat {
  toRGB(): RGB;
  toHSL(): HSL;
  toHEX(): HEX;
}

class RGBColor implements ColorFormat {
  constructor(private r: number, private g: number, private b: number) {}
  
  toRGB(): RGB {
    return this; // Déjà au bon format
  }
  
  toHSL(): HSL {
    // Conversion RGB vers HSL
    const r = this.r / 255;
    const g = this.g / 255;
    const b = this.b / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;
    
    // Calcul de la luminosité
    const l = (max + min) / 2;
    
    if (diff === 0) {
      return new HSLColor(0, 0, l); // Gris
    }
    
    // Calcul de la saturation
    const s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min);
    
    // Calcul de la teinte
    let h: number;
    switch (max) {
      case r: h = (g - b) / diff + (g < b ? 6 : 0); break;
      case g: h = (b - r) / diff + 2; break;
      case b: h = (r - g) / diff + 4; break;
      default: h = 0;
    }
    h /= 6;
    
    return new HSLColor(h * 360, s * 100, l * 100);
  }
  
  toHEX(): HEX {
    const toHex = (n: number) => n.toString(16).padStart(2, '0');
    return new HEXColor(`#${toHex(this.r)}${toHex(this.g)}${toHex(this.b)}`);
  }
}

class HSLColor implements ColorFormat {
  constructor(private h: number, private s: number, private l: number) {}
  
  toHSL(): HSL {
    return this;
  }
  
  toRGB(): RGB {
    // Conversion HSL vers RGB (logique similaire mais inverse)
    const s = this.s / 100;
    const l = this.l / 100;
    
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((this.h / 60) % 2 - 1));
    const m = l - c / 2;
    
    let r: number, g: number, b: number;
    
    if (this.h < 60) {
      [r, g, b] = [c, x, 0];
    } else if (this.h < 120) {
      [r, g, b] = [x, c, 0];
    } else if (this.h < 180) {
      [r, g, b] = [0, c, x];
    } else if (this.h < 240) {
      [r, g, b] = [0, x, c];
    } else if (this.h < 300) {
      [r, g, b] = [x, 0, c];
    } else {
      [r, g, b] = [c, 0, x];
    }
    
    return new RGBColor(
      Math.round((r + m) * 255),
      Math.round((g + m) * 255),
      Math.round((b + m) * 255)
    );
  }
  
  toHEX(): HEX {
    return this.toRGB().toHEX();
  }
}
```

**Analyse objective :**
- **Complexité temporelle** : O(1) par conversion
- **Complexité spatiale** : O(n²) - duplication de logique
- **Maintenance** : ❌ Difficile - modifications répétées
- **Extensibilité** : ❌ Très difficile - impact sur tous les formats
- **Couplage** : ❌ Fort - chaque format connaît tous les autres
- **Tests** : ❌ n² cas de test à maintenir

### 2. Service centralisé (Central Converter)

**Principe** : Service unique gérant toutes les conversions

**Description** : Toute la logique de conversion est centralisée dans un service dédié. Les classes de couleur sont simples et ne contiennent que leurs données, laissant au service la responsabilité des transformations.

```typescript
class ColorConverter {
  convert(from: ColorFormat, to: FormatType): ColorFormat;
}

// Classes de couleur simplifiées
class RGBColor {
  constructor(public r: number, public g: number, public b: number) {}
  getType(): 'RGB' { return 'RGB'; }
}

class HSLColor {
  constructor(public h: number, public s: number, public l: number) {}
  getType(): 'HSL' { return 'HSL'; }
}

class HEXColor {
  constructor(public value: string) {}
  getType(): 'HEX' { return 'HEX'; }
}

// Service centralisé
class ColorConverterService {
  convert<T extends ColorFormat>(from: ColorFormat, toType: string): T {
    const fromType = from.getType();
    
    // Matrice de conversion
    if (fromType === 'RGB' && toType === 'HSL') {
      return this.rgbToHsl(from as RGBColor) as T;
    }
    if (fromType === 'RGB' && toType === 'HEX') {
      return this.rgbToHex(from as RGBColor) as T;
    }
    if (fromType === 'HSL' && toType === 'RGB') {
      return this.hslToRgb(from as HSLColor) as T;
    }
    if (fromType === 'HSL' && toType === 'HEX') {
      const rgb = this.hslToRgb(from as HSLColor);
      return this.rgbToHex(rgb) as T;
    }
    if (fromType === 'HEX' && toType === 'RGB') {
      return this.hexToRgb(from as HEXColor) as T;
    }
    if (fromType === 'HEX' && toType === 'HSL') {
      const rgb = this.hexToRgb(from as HEXColor);
      return this.rgbToHsl(rgb) as T;
    }
    
    throw new Error(`Conversion ${fromType} -> ${toType} not supported`);
  }
  
  private rgbToHsl(rgb: RGBColor): HSLColor {
    // Logique de conversion RGB vers HSL
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;
    
    // ... même logique que dans l'exemple précédent
    return new HSLColor(0, 0, 0); // Simplifié pour l'exemple
  }
  
  private rgbToHex(rgb: RGBColor): HEXColor {
    const toHex = (n: number) => n.toString(16).padStart(2, '0');
    return new HEXColor(`#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`);
  }
  
  private hslToRgb(hsl: HSLColor): RGBColor {
    // Conversion HSL vers RGB
    return new RGBColor(0, 0, 0); // Simplifié pour l'exemple
  }
  
  private hexToRgb(hex: HEXColor): RGBColor {
    const value = hex.value.replace('#', '');
    const r = parseInt(value.substr(0, 2), 16);
    const g = parseInt(value.substr(2, 2), 16);
    const b = parseInt(value.substr(4, 2), 16);
    return new RGBColor(r, g, b);
  }
}

// Utilisation
const converter = new ColorConverterService();
const rgb = new RGBColor(255, 128, 0);
const hsl = converter.convert<HSLColor>(rgb, 'HSL');
const hex = converter.convert<HEXColor>(rgb, 'HEX');
```

**Analyse objective :**
- **Complexité temporelle** : O(1) par conversion
- **Complexité spatiale** : O(n²) - mais centralisée
- **Maintenance** : ✅ Excellente - point unique de modification
- **Extensibilité** : ⚠️ Moyenne - modification du service requis
- **Couplage** : ✅ Faible - formats découplés
- **Tests** : ✅ Un seul endroit à tester

### 3. Pattern Visitor

**Principe** : Visiteurs spécialisés pour chaque type de conversion

**Description** : Le pattern Visitor sépare les algorithmes de conversion des structures de données. Chaque visiteur encapsule une logique de conversion spécifique, permettant d'ajouter de nouvelles opérations sans modifier les classes de couleur existantes.

```typescript
interface ColorVisitor<T> {
  visitRGB(rgb: RGB): T;
  visitHSL(hsl: HSL): T;
  visitHEX(hex: HEX): T;
}

interface ColorFormat {
  accept<T>(visitor: ColorVisitor<T>): T;
}

// Classes de couleur avec support visiteur
class RGBColor implements ColorFormat {
  constructor(public r: number, public g: number, public b: number) {}
  
  accept<T>(visitor: ColorVisitor<T>): T {
    return visitor.visitRGB(this);
  }
}

class HSLColor implements ColorFormat {
  constructor(public h: number, public s: number, public l: number) {}
  
  accept<T>(visitor: ColorVisitor<T>): T {
    return visitor.visitHSL(this);
  }
}

class HEXColor implements ColorFormat {
  constructor(public value: string) {}
  
  accept<T>(visitor: ColorVisitor<T>): T {
    return visitor.visitHEX(this);
  }
}

// Visiteur pour conversion vers HSL
class ToHSLVisitor implements ColorVisitor<HSLColor> {
  visitRGB(rgb: RGBColor): HSLColor {
    // Conversion RGB vers HSL
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;
    
    const l = (max + min) / 2;
    
    if (diff === 0) {
      return new HSLColor(0, 0, l * 100);
    }
    
    const s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min);
    
    let h: number;
    switch (max) {
      case r: h = (g - b) / diff + (g < b ? 6 : 0); break;
      case g: h = (b - r) / diff + 2; break;
      case b: h = (r - g) / diff + 4; break;
      default: h = 0;
    }
    h = (h / 6) * 360;
    
    return new HSLColor(h, s * 100, l * 100);
  }
  
  visitHSL(hsl: HSLColor): HSLColor {
    return hsl; // Déjà au bon format
  }
  
  visitHEX(hex: HEXColor): HSLColor {
    // Convertir d'abord en RGB puis en HSL
    const rgb = new ToRGBVisitor().visitHEX(hex);
    return this.visitRGB(rgb);
  }
}

// Visiteur pour conversion vers RGB
class ToRGBVisitor implements ColorVisitor<RGBColor> {
  visitRGB(rgb: RGBColor): RGBColor {
    return rgb;
  }
  
  visitHSL(hsl: HSLColor): RGBColor {
    const s = hsl.s / 100;
    const l = hsl.l / 100;
    
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((hsl.h / 60) % 2 - 1));
    const m = l - c / 2;
    
    let r: number, g: number, b: number;
    
    if (hsl.h < 60) {
      [r, g, b] = [c, x, 0];
    } else if (hsl.h < 120) {
      [r, g, b] = [x, c, 0];
    } else if (hsl.h < 180) {
      [r, g, b] = [0, c, x];
    } else if (hsl.h < 240) {
      [r, g, b] = [0, x, c];
    } else if (hsl.h < 300) {
      [r, g, b] = [x, 0, c];
    } else {
      [r, g, b] = [c, 0, x];
    }
    
    return new RGBColor(
      Math.round((r + m) * 255),
      Math.round((g + m) * 255),
      Math.round((b + m) * 255)
    );
  }
  
  visitHEX(hex: HEXColor): RGBColor {
    const value = hex.value.replace('#', '');
    const r = parseInt(value.substr(0, 2), 16);
    const g = parseInt(value.substr(2, 2), 16);
    const b = parseInt(value.substr(4, 2), 16);
    return new RGBColor(r, g, b);
  }
}

// Utilisation
const rgb = new RGBColor(255, 128, 0);
const hsl = rgb.accept(new ToHSLVisitor());
const backToRgb = hsl.accept(new ToRGBVisitor());
```

**Analyse objective :**

- **Complexité temporelle** : O(1) par conversion
- **Complexité spatiale** : O(n²) - n visiteurs × n méthodes
- **Maintenance** : ⚠️ Moyenne - modification des visiteurs requis
- **Extensibilité** : ❌ Difficile - impact sur tous les visiteurs
- **Couplage** : ⚠️ Moyen - couplage via interfaces visiteur
- **Tests** : ⚠️ n visiteurs × n formats à tester

### 4. Pattern Strategy

**Principe** : Stratégies interchangeables de conversion

**Description** : Le pattern Strategy encapsule les algorithmes de conversion dans des classes séparées et interchangeables. Chaque stratégie est responsable de convertir depuis un format source spécifique vers tous les autres formats possibles.

```typescript
interface ConversionStrategy {
  canConvert(from: ColorFormat): boolean;
  convertToRGB(color: ColorFormat): RGBColor;
  convertToHSL(color: ColorFormat): HSLColor;
  convertToHEX(color: ColorFormat): HEXColor;
}

// Stratégie pour les couleurs RGB
class RGBConversionStrategy implements ConversionStrategy {
  canConvert(from: ColorFormat): boolean {
    return from instanceof RGBColor;
  }
  
  convertToRGB(color: ColorFormat): RGBColor {
    if (!this.canConvert(color)) {
      throw new Error('Cannot convert: not an RGB color');
    }
    return color as RGBColor; // Déjà au bon format
  }
  
  convertToHSL(color: ColorFormat): HSLColor {
    const rgb = color as RGBColor;
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;
    
    const l = (max + min) / 2;
    
    if (diff === 0) {
      return new HSLColor(0, 0, l * 100);
    }
    
    const s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min);
    
    let h: number;
    switch (max) {
      case r: h = (g - b) / diff + (g < b ? 6 : 0); break;
      case g: h = (b - r) / diff + 2; break;
      case b: h = (r - g) / diff + 4; break;
      default: h = 0;
    }
    h = (h / 6) * 360;
    
    return new HSLColor(h, s * 100, l * 100);
  }
  
  convertToHEX(color: ColorFormat): HEXColor {
    const rgb = color as RGBColor;
    const toHex = (n: number) => n.toString(16).padStart(2, '0');
    return new HEXColor(`#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`);
  }
}

// Stratégie pour les couleurs HSL
class HSLConversionStrategy implements ConversionStrategy {
  canConvert(from: ColorFormat): boolean {
    return from instanceof HSLColor;
  }
  
  convertToRGB(color: ColorFormat): RGBColor {
    const hsl = color as HSLColor;
    const s = hsl.s / 100;
    const l = hsl.l / 100;
    
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((hsl.h / 60) % 2 - 1));
    const m = l - c / 2;
    
    let r: number, g: number, b: number;
    
    if (hsl.h < 60) {
      [r, g, b] = [c, x, 0];
    } else if (hsl.h < 120) {
      [r, g, b] = [x, c, 0];
    } else if (hsl.h < 180) {
      [r, g, b] = [0, c, x];
    } else if (hsl.h < 240) {
      [r, g, b] = [0, x, c];
    } else if (hsl.h < 300) {
      [r, g, b] = [x, 0, c];
    } else {
      [r, g, b] = [c, 0, x];
    }
    
    return new RGBColor(
      Math.round((r + m) * 255),
      Math.round((g + m) * 255),
      Math.round((b + m) * 255)
    );
  }
  
  convertToHSL(color: ColorFormat): HSLColor {
    return color as HSLColor;
  }
  
  convertToHEX(color: ColorFormat): HEXColor {
    const rgb = this.convertToRGB(color);
    return new RGBConversionStrategy().convertToHEX(rgb);
  }
}

// Context utilisant les stratégies
class ColorConverter {
  private strategies: ConversionStrategy[] = [
    new RGBConversionStrategy(),
    new HSLConversionStrategy(),
    // Ajouter d'autres stratégies au besoin
  ];
  
  convert<T extends ColorFormat>(from: ColorFormat, targetType: 'RGB' | 'HSL' | 'HEX'): T {
    const strategy = this.strategies.find(s => s.canConvert(from));
    
    if (!strategy) {
      throw new Error(`No strategy found for color type: ${from.constructor.name}`);
    }
    
    switch (targetType) {
      case 'RGB': return strategy.convertToRGB(from) as T;
      case 'HSL': return strategy.convertToHSL(from) as T;
      case 'HEX': return strategy.convertToHEX(from) as T;
      default: throw new Error(`Unsupported target type: ${targetType}`);
    }
  }
  
  // Permet d'ajouter de nouvelles stratégies dynamiquement
  addStrategy(strategy: ConversionStrategy): void {
    this.strategies.push(strategy);
  }
}

// Utilisation
const converter = new ColorConverter();
const rgb = new RGBColor(255, 128, 0);
const hsl = converter.convert<HSLColor>(rgb, 'HSL');
const hex = converter.convert<HEXColor>(rgb, 'HEX');
```

**Analyse objective :**

- **Complexité temporelle** : O(1) par conversion
- **Complexité spatiale** : O(n) - une stratégie par format source
- **Maintenance** : ✅ Bonne - stratégies indépendantes
- **Extensibilité** : ✅ Excellente - ajout de stratégies sans impact
- **Couplage** : ✅ Faible - stratégies découplées
- **Tests** : ✅ Tests par stratégie, isolés

### 5. Pattern Registry/Factory

**Principe** : Registry central avec factories spécialisées

**Description** : Cette approche utilise un registry central pour enregistrer des convertisseurs spécialisés. Chaque convertisseur est responsable d'une conversion spécifique (A vers B). Le système est extensible et permet l'ajout de nouveaux formats sans modification du code existant.

```typescript
type ColorType = 'RGB' | 'HSL' | 'HEX' | 'LAB' | 'LCH';

interface Converter<From, To> {
  convert(from: From): To;
}

class ConversionRegistry {
  private converters = new Map<string, Converter<any, any>>();
  
  register<From, To>(
    fromType: ColorType,
    toType: ColorType,
    converter: Converter<From, To>
  ): void {
    const key = `${fromType}->${toType}`;
    this.converters.set(key, converter);
  }
  
  convert<From, To>(
    from: From,
    fromType: ColorType,
    toType: ColorType
  ): To {
    if (fromType === toType) {
      return from as unknown as To;
    }
    
    const key = `${fromType}->${toType}`;
    const converter = this.converters.get(key);
    
    if (!converter) {
      // Essayer une conversion en deux étapes via RGB
      if (fromType !== 'RGB' && toType !== 'RGB') {
        const rgbConverter = this.converters.get(`${fromType}->RGB`);
        const targetConverter = this.converters.get(`RGB->${toType}`);
        
        if (rgbConverter && targetConverter) {
          const rgb = rgbConverter.convert(from);
          return targetConverter.convert(rgb);
        }
      }
      
      throw new Error(`No converter found for ${fromType} -> ${toType}`);
    }
    
    return converter.convert(from);
  }
  
  hasConverter(fromType: ColorType, toType: ColorType): boolean {
    return this.converters.has(`${fromType}->${toType}`);
  }
  
  getSupportedConversions(): Array<{from: ColorType, to: ColorType}> {
    return Array.from(this.converters.keys()).map(key => {
      const [from, to] = key.split('->');
      return { from: from as ColorType, to: to as ColorType };
    });
  }
}

// Convertisseurs spécifiques
class RGBToHSLConverter implements Converter<RGBColor, HSLColor> {
  convert(rgb: RGBColor): HSLColor {
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;
    
    const l = (max + min) / 2;
    
    if (diff === 0) {
      return new HSLColor(0, 0, l * 100);
    }
    
    const s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min);
    
    let h: number;
    switch (max) {
      case r: h = (g - b) / diff + (g < b ? 6 : 0); break;
      case g: h = (b - r) / diff + 2; break;
      case b: h = (r - g) / diff + 4; break;
      default: h = 0;
    }
    h = (h / 6) * 360;
    
    return new HSLColor(h, s * 100, l * 100);
  }
}

class HSLToRGBConverter implements Converter<HSLColor, RGBColor> {
  convert(hsl: HSLColor): RGBColor {
    const s = hsl.s / 100;
    const l = hsl.l / 100;
    
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((hsl.h / 60) % 2 - 1));
    const m = l - c / 2;
    
    let r: number, g: number, b: number;
    
    if (hsl.h < 60) {
      [r, g, b] = [c, x, 0];
    } else if (hsl.h < 120) {
      [r, g, b] = [x, c, 0];
    } else if (hsl.h < 180) {
      [r, g, b] = [0, c, x];
    } else if (hsl.h < 240) {
      [r, g, b] = [0, x, c];
    } else if (hsl.h < 300) {
      [r, g, b] = [x, 0, c];
    } else {
      [r, g, b] = [c, 0, x];
    }
    
    return new RGBColor(
      Math.round((r + m) * 255),
      Math.round((g + m) * 255),
      Math.round((b + m) * 255)
    );
  }
}

class RGBToHEXConverter implements Converter<RGBColor, HEXColor> {
  convert(rgb: RGBColor): HEXColor {
    const toHex = (n: number) => n.toString(16).padStart(2, '0');
    return new HEXColor(`#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`);
  }
}

// Factory pour initialiser le registry
class ColorConversionFactory {
  static createRegistry(): ConversionRegistry {
    const registry = new ConversionRegistry();
    
    // Enregistrement des convertisseurs de base
    registry.register('RGB', 'HSL', new RGBToHSLConverter());
    registry.register('HSL', 'RGB', new HSLToRGBConverter());
    registry.register('RGB', 'HEX', new RGBToHEXConverter());
    
    // Plus de convertisseurs peuvent être ajoutés facilement
    // registry.register('RGB', 'LAB', new RGBToLABConverter());
    // registry.register('LAB', 'RGB', new LABToRGBConverter());
    
    return registry;
  }
  
  static createExtendedRegistry(): ConversionRegistry {
    const registry = this.createRegistry();
    
    // Ajout de convertisseurs avancés
    // registry.register('HSL', 'LAB', new HSLToLABConverter());
    // registry.register('LAB', 'LCH', new LABToLCHConverter());
    
    return registry;
  }
}

// Utilisation
const registry = ColorConversionFactory.createRegistry();

const rgb = new RGBColor(255, 128, 0);
const hsl = registry.convert<RGBColor, HSLColor>(rgb, 'RGB', 'HSL');
const hex = registry.convert<RGBColor, HEXColor>(rgb, 'RGB', 'HEX');

// Ajout dynamique de nouveaux convertisseurs
class HEXToRGBConverter implements Converter<HEXColor, RGBColor> {
  convert(hex: HEXColor): RGBColor {
    const value = hex.value.replace('#', '');
    const r = parseInt(value.substr(0, 2), 16);
    const g = parseInt(value.substr(2, 2), 16);
    const b = parseInt(value.substr(4, 2), 16);
    return new RGBColor(r, g, b);
  }
}

registry.register('HEX', 'RGB', new HEXToRGBConverter());

// Vérification des conversions disponibles
console.log(registry.getSupportedConversions());
// Sortie: [{from: 'RGB', to: 'HSL'}, {from: 'HSL', to: 'RGB'}, ...]
```

**Analyse objective :**

- **Complexité temporelle** : O(1) par conversion (avec hashmap)
- **Complexité spatiale** : O(n²) - mais optimisable (lazy loading)
- **Maintenance** : ✅ Excellente - ajout sans modification existant
- **Extensibilité** : ✅ Excellente - plug-and-play
- **Couplage** : ✅ Minimal - découplage total via registry
- **Tests** : ✅ Tests par converter, isolés

### 6. Pattern Chain of Responsibility

**Principe** : Chaîne de convertisseurs avec fallback

**Description** : Cette approche organise les convertisseurs en chaîne. Chaque maillon de la chaîne tente de traiter la conversion, et si il ne peut pas, il passe la demande au maillon suivant. Cela permet une grande flexibilité et la possibilité d'avoir des convertisseurs de fallback.

```typescript
type ConversionRequest = {
  from: ColorFormat;
  fromType: ColorType;
  toType: ColorType;
};

type ConversionResult<T> = {
  success: boolean;
  result?: T;
  error?: string;
};

abstract class ConversionHandler {
  private nextHandler?: ConversionHandler;
  
  setNext(handler: ConversionHandler): ConversionHandler {
    this.nextHandler = handler;
    return handler;
  }
  
  handle<T>(request: ConversionRequest): ConversionResult<T> {
    const result = this.process<T>(request);
    
    if (result.success || !this.nextHandler) {
      return result;
    }
    
    return this.nextHandler.handle<T>(request);
  }
  
  protected abstract process<T>(request: ConversionRequest): ConversionResult<T>;
}

// Handler pour conversions directes RGB
class RGBConversionHandler extends ConversionHandler {
  protected process<T>(request: ConversionRequest): ConversionResult<T> {
    const { from, fromType, toType } = request;
    
    if (fromType !== 'RGB') {
      return { success: false, error: 'Not an RGB color' };
    }
    
    const rgb = from as RGBColor;
    
    try {
      switch (toType) {
        case 'RGB':
          return { success: true, result: rgb as unknown as T };
          
        case 'HSL':
          const hsl = this.rgbToHsl(rgb);
          return { success: true, result: hsl as unknown as T };
          
        case 'HEX':
          const hex = this.rgbToHex(rgb);
          return { success: true, result: hex as unknown as T };
          
        default:
          return { success: false, error: `RGB to ${toType} not supported` };
      }
    } catch (error) {
      return { success: false, error: `Conversion failed: ${error}` };
    }
  }
  
  private rgbToHsl(rgb: RGBColor): HSLColor {
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;
    
    const l = (max + min) / 2;
    
    if (diff === 0) {
      return new HSLColor(0, 0, l * 100);
    }
    
    const s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min);
    
    let h: number;
    switch (max) {
      case r: h = (g - b) / diff + (g < b ? 6 : 0); break;
      case g: h = (b - r) / diff + 2; break;
      case b: h = (r - g) / diff + 4; break;
      default: h = 0;
    }
    h = (h / 6) * 360;
    
    return new HSLColor(h, s * 100, l * 100);
  }
  
  private rgbToHex(rgb: RGBColor): HEXColor {
    const toHex = (n: number) => n.toString(16).padStart(2, '0');
    return new HEXColor(`#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`);
  }
}

// Handler pour conversions HSL
class HSLConversionHandler extends ConversionHandler {
  protected process<T>(request: ConversionRequest): ConversionResult<T> {
    const { from, fromType, toType } = request;
    
    if (fromType !== 'HSL') {
      return { success: false, error: 'Not an HSL color' };
    }
    
    const hsl = from as HSLColor;
    
    try {
      switch (toType) {
        case 'HSL':
          return { success: true, result: hsl as unknown as T };
          
        case 'RGB':
          const rgb = this.hslToRgb(hsl);
          return { success: true, result: rgb as unknown as T };
          
        case 'HEX':
          // Conversion via RGB
          const rgbIntermediate = this.hslToRgb(hsl);
          const rgbHandler = new RGBConversionHandler();
          const hexResult = rgbHandler.handle<HEXColor>({
            from: rgbIntermediate,
            fromType: 'RGB',
            toType: 'HEX'
          });
          return hexResult as ConversionResult<T>;
          
        default:
          return { success: false, error: `HSL to ${toType} not supported` };
      }
    } catch (error) {
      return { success: false, error: `Conversion failed: ${error}` };
    }
  }
  
  private hslToRgb(hsl: HSLColor): RGBColor {
    const s = hsl.s / 100;
    const l = hsl.l / 100;
    
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((hsl.h / 60) % 2 - 1));
    const m = l - c / 2;
    
    let r: number, g: number, b: number;
    
    if (hsl.h < 60) {
      [r, g, b] = [c, x, 0];
    } else if (hsl.h < 120) {
      [r, g, b] = [x, c, 0];
    } else if (hsl.h < 180) {
      [r, g, b] = [0, c, x];
    } else if (hsl.h < 240) {
      [r, g, b] = [0, x, c];
    } else if (hsl.h < 300) {
      [r, g, b] = [x, 0, c];
    } else {
      [r, g, b] = [c, 0, x];
    }
    
    return new RGBColor(
      Math.round((r + m) * 255),
      Math.round((g + m) * 255),
      Math.round((b + m) * 255)
    );
  }
}

// Handler de fallback pour conversions indirectes
class IndirectConversionHandler extends ConversionHandler {
  protected process<T>(request: ConversionRequest): ConversionResult<T> {
    const { from, fromType, toType } = request;
    
    // Tentative de conversion via RGB comme format intermédiaire
    if (fromType !== 'RGB' && toType !== 'RGB') {
      try {
        // Étape 1: Convertir vers RGB
        const rgbHandler = this.findHandlerForType(fromType);
        if (!rgbHandler) {
          return { success: false, error: `No handler for ${fromType}` };
        }
        
        const rgbResult = rgbHandler.handle<RGBColor>({
          from,
          fromType,
          toType: 'RGB'
        });
        
        if (!rgbResult.success || !rgbResult.result) {
          return { success: false, error: 'Failed to convert to RGB intermediate' };
        }
        
        // Étape 2: Convertir RGB vers le format cible
        const targetHandler = new RGBConversionHandler();
        return targetHandler.handle<T>({
          from: rgbResult.result,
          fromType: 'RGB',
          toType
        });
        
      } catch (error) {
        return { success: false, error: `Indirect conversion failed: ${error}` };
      }
    }
    
    return { success: false, error: 'No indirect conversion possible' };
  }
  
  private findHandlerForType(type: ColorType): ConversionHandler | null {
    switch (type) {
      case 'RGB': return new RGBConversionHandler();
      case 'HSL': return new HSLConversionHandler();
      // Ajouter d'autres handlers selon les besoins
      default: return null;
    }
  }
}

// Builder pour construire la chaîne
class ConversionChainBuilder {
  static buildStandardChain(): ConversionHandler {
    const rgbHandler = new RGBConversionHandler();
    const hslHandler = new HSLConversionHandler();
    const fallbackHandler = new IndirectConversionHandler();
    
    // Construction de la chaîne
    rgbHandler.setNext(hslHandler).setNext(fallbackHandler);
    
    return rgbHandler;
  }
  
  static buildCustomChain(handlers: ConversionHandler[]): ConversionHandler {
    if (handlers.length === 0) {
      throw new Error('At least one handler is required');
    }
    
    for (let i = 0; i < handlers.length - 1; i++) {
      handlers[i].setNext(handlers[i + 1]);
    }
    
    return handlers[0];
  }
}

// Service principal utilisant la chaîne
class ChainColorConverter {
  private chain: ConversionHandler;
  
  constructor(chain?: ConversionHandler) {
    this.chain = chain || ConversionChainBuilder.buildStandardChain();
  }
  
  convert<T>(
    from: ColorFormat,
    fromType: ColorType,
    toType: ColorType
  ): T {
    const result = this.chain.handle<T>({
      from,
      fromType,
      toType
    });
    
    if (!result.success) {
      throw new Error(result.error || 'Conversion failed');
    }
    
    return result.result!;
  }
  
  canConvert(fromType: ColorType, toType: ColorType): boolean {
    try {
      // Test avec une couleur fictive
      const testColor = this.createTestColor(fromType);
      const result = this.chain.handle({ from: testColor, fromType, toType });
      return result.success;
    } catch {
      return false;
    }
  }
  
  private createTestColor(type: ColorType): ColorFormat {
    switch (type) {
      case 'RGB': return new RGBColor(0, 0, 0);
      case 'HSL': return new HSLColor(0, 0, 0);
      case 'HEX': return new HEXColor('#000000');
      default: throw new Error(`Unknown color type: ${type}`);
    }
  }
}

// Utilisation
const converter = new ChainColorConverter();

const rgb = new RGBColor(255, 128, 0);
const hsl = converter.convert<HSLColor>(rgb, 'RGB', 'HSL');
const hex = converter.convert<HEXColor>(hsl, 'HSL', 'HEX');

// Vérification des capacités
console.log(converter.canConvert('RGB', 'HSL')); // true
console.log(converter.canConvert('LAB', 'LCH')); // false (non supporté)
```

**Analyse objective :**

- **Complexité temporelle** : O(n) dans le pire cas (parcours chaîne)
- **Complexité spatiale** : O(n) - une chaîne par type de conversion
- **Maintenance** : ✅ Bonne - ajout en fin de chaîne
- **Extensibilité** : ✅ Excellente - insertion dans la chaîne
- **Couplage** : ✅ Faible - handlers indépendants
- **Tests** : ⚠️ Tests de la chaîne complète requis

## Matrice de décision objective

| Critère | Self-contained | Central Service | Visitor | Strategy | Registry | Chain |
|---------|----------------|-----------------|---------|----------|----------|--------|
| **Performance** | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| **Maintenance** | ⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| **Extensibilité** | ⭐ | ⭐⭐ | ⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| **Complexité code** | ⭐⭐⭐ | ⭐⭐ | ⭐ | ⭐⭐ | ⭐⭐ | ⭐⭐ |
| **Testabilité** | ⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| **Découplage** | ⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |

## Recommandations par contexte

### Pour systèmes simples (< 5 formats)
**Central Service** - Simplicité et efficacité maximales

### Pour systèmes moyens (5-10 formats)
**Strategy Pattern** - Bon équilibre flexibilité/complexité

### Pour systèmes complexes (> 10 formats)
**Registry Pattern** - Extensibilité et maintenance optimales

### Pour systèmes avec requirements changeants
**Chain of Responsibility** - Flexibilité maximale au runtime

## Considérations techniques supplémentaires

### Optimisations possibles

- **Memoization** : Cache des conversions fréquentes
- **Lazy Loading** : Chargement à la demande des convertisseurs
- **Batch Processing** : Conversions par lot pour performance
- **Type Safety** : Validation à la compilation avec TypeScript

### Anti-patterns à éviter

- **God Object** : Service central trop massif
- **Circular Dependencies** : Références croisées entre formats
- **Magic Numbers** : Coefficients de conversion hardcodés
- **Premature Optimization** : Complexité inutile pour cas simples

## Conclusion objective

Le choix optimal dépend exclusivement de :

1. **Nombre de formats** à supporter
2. **Fréquence des modifications** du système
3. **Contraintes de performance** spécifiques
4. **Expertise de l'équipe** en design patterns
5. **Besoins de testabilité** et debugging

**Aucune approche n'est universellement supérieure** - le contexte détermine la solution optimale.
