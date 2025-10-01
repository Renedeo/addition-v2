/**
 * 0 %	Couleur complètement désaturée → gris neutre
1 % – 30 %	Faible saturation : teintes pastel, douces, proches du gris
31 % – 60 %	Saturation moyenne : couleurs équilibrées, naturelles
61 % – 85 %	Haute saturation : couleurs vives, intenses, dynamiques
86 % – 100 %	Saturation maximale : couleurs pures, très intenses, parfois artificielles
 */
export const SaturationInfo = [
    {
        level: "desaturated",
        min: 0,
        max: 0,
        description: "Color completely desaturated, appears as a shade of gray."
    },
    {
        level: "low",
        min: 0,
        max: 30,
        description: "Low Saturation, pastel shades, close to gray."
    },
    {
        level: "balanced",
        min: 30,
        max: 60,
        description: "Medium Saturation, balanced and natural colors."
    },
    {
        level: "high",
        min: 60,
        max: 85,
        description: "High Saturation, vivid, intense and dynamic colors."
    },
    {
        level: "pure",
        min: 85,
        max: 100,
        description: "Maximum Saturation, pure, very intense colors, sometimes artificial."
    }
];

