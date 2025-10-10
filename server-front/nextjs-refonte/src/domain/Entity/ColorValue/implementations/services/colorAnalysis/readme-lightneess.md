*La luminosité perçue d'une couleur est influencée par plusieurs facteurs, tant physiques que perceptuels, qui vont au-delà des simples valeurs numériques comme la luminance ou la composante L* dans les modèles colorimétriques. Voici les principaux éléments qui affectent la perception de la luminosité :

## 1. Couleur environnante (Contraste simultané)
La luminosité d'une couleur est fortement affectée par les couleurs qui l'entourent. Ce phénomène, appelé contraste simultané, fait qu'une même couleur paraît plus claire sur un fond foncé et plus sombre sur un fond clair. Par exemple, un gris moyen semblera presque blanc sur un fond noir, mais presque noir sur un fond blanc, bien que sa luminance réelle n'ait pas changé.

## 2. Saturation (chromaticité)
Les couleurs très saturées (vives) peuvent paraître plus lumineuses que des couleurs désaturées (pâles ou grises) de même luminance. Ce phénomène est connu sous le nom de phénomène de Helmholtz-Kohlrausch : une couleur saturée semble plus brillante qu'un gris de même intensité lumineuse. Cela signifie que deux couleurs ayant la même luminance physique peuvent être perçues comme ayant des luminosités différentes selon leur saturation.

## 3. Teinte (Hue)
La perception de la luminosité varie selon la teinte. Par exemple, les teintes jaunes sont perçues comme plus lumineuses que les teintes bleues, même si elles ont la même valeur de luminance physique. Cela s'explique par la sensibilité différentielle de l'œil humain aux longueurs d'onde : le système visuel est plus sensible au vert et au jaune qu'au bleu ou au rouge foncé.

## 4. Éclairage ambiant
L'intensité et la température de la lumière ambiante influencent fortement la perception de la luminosité. Une couleur peut sembler claire sous un éclairage fort et chaud (type lumière du jour), mais paraître sombre et terne dans un éclairage faible ou froid. Cela affecte aussi la fidélité des couleurs perçues.

## 5. Adaptation oculaire
L'œil humain s'adapte à l'intensité lumineuse globale de l'environnement (adaptation photopique, scotopique ou mésopique). Dans un environnement sombre, les couleurs paraissent plus vives et lumineuses qu'en lumière vive, où elles peuvent sembler atténuées.

## 6. Modèle de perception : L* (échelle CIE)
Le modèle CIE L*a*b* intègre une échelle de luminosité perceptuelle (L*), non linéaire, qui tient compte de la réponse logarithmique de l'œil. Une différence de 1 point en L* est généralement perceptible, mais cette sensibilité varie selon la zone de luminosité (plus sensible aux tons moyens qu'aux extrêmes).

## 7. Contexte spatial et texture
Des motifs, textures ou gradients peuvent modifier la perception de la luminosité. Par exemple, une surface texturée peut diffuser la lumière différemment, donnant une impression de luminosité variable même si la couleur est uniforme.

En résumé, la luminosité perçue n'est pas uniquement déterminée par la luminance physique, mais résulte d'une interaction complexe entre la couleur elle-même, son environnement, l'éclairage et les mécanismes biologiques de la vision. Pour des applications comme le design graphique, l'accessibilité web ou la production industrielle, il est donc essentiel de considérer ces facteurs perceptuels, et non seulement les valeurs techniques.

---

# Comment calculer la luminosité perçue

Il est important de clarifier un point de terminologie : la "luminescence" est un phénomène physique lié à l'émission de lumière par une source (comme une LED ou une substance fluorescente), mesurée en candelas par mètre carré (cd/m²). Ce n'est pas ce que vous cherchez probablement ici.

Ce que vous voulez analyser, c'est la **luminosité perçue** d'une couleur — c'est-à-dire comment l'œil humain perçoit la clarté ou le caractère lumineux d'une couleur, en tenant compte de facteurs comme la teinte, la saturation, le fond, et l'éclairage.

Voici comment estimer et calculer la luminosité perçue d'une couleur, en tenant compte des conditions perceptuelles.

## 1. Calcul de la luminance relative (base objective)

Commencez par calculer la luminance relative (Y) à partir des composantes RVB (RGB) de la couleur. C'est la base objective.

**Étapes :**

1. **Convertir les valeurs RVB (0–255) en valeurs normalisées (0–1) :**
    ```
    R' = R/255,  G' = G/255,  B' = B/255
    ```

2. **Appliquer la correction gamma (linéarisation) :**
    Pour chaque composante C' ∈ {R', G', B'} :
    ```
    C = {
      C'/12.92                          si C' ≤ 0.04045
      ((C' + 0.055)/1.055)^2.4         sinon
    }
    ```

3. **Calculer la luminance relative (Y) :**
    ```
    Y = 0.2126 × R + 0.7152 × G + 0.0722 × B
    ```
    → Cette valeur Y va de 0 (noir) à 1 (blanc) et représente la luminance physique.

## 2. Conversion en L* (luminosité perceptuelle)

La luminosité perçue est mieux représentée par L* dans l'espace colorimétrique CIELAB, qui suit une réponse non linéaire proche de celle de l'œil humain.

```
L* = {
  903.3 × Y                     si Y ≤ 216/24389 ≈ 0.008856
  116 × Y^(1/3) - 16           sinon
}
```
→ Y représente la luminance relative calculée précédemment.

→ L* va de 0 (noir perçu) à 100 (blanc perçu).
C'est une bonne estimation de la luminosité perçue dans des conditions standard.
→ Notez que L* ne tient pas compte des effets de contraste, de saturation ou de teinte.

## 3. Influence des facteurs perceptuels (ajustements qualitatifs)

Le calcul de L* donne une base solide, mais la luminosité perçue réelle dépend aussi de :

### Contraste avec l'arrière-plan
Utilisez le rapport de contraste (WCAG) :
```
Rapport = (Y1 + 0.05)/(Y2 + 0.05)
```
où Y1 et Y2 sont les luminances relatives du texte et du fond (la plus claire sur la plus foncée).
Un rapport ≥ 7 est recommandé pour un texte lisible.

### Effet de saturation (phénomène Helmholtz-Kohlrausch)
Les couleurs saturées paraissent plus lumineuses que les gris de même luminance.
Il n'existe pas de formule simple pour quantifier cela, mais des modèles avancés (comme CIECAM02) intègrent cet effet.
En pratique : une couleur vive (rouge, jaune) peut sembler 20-30% plus lumineuse qu'un gris de même L*.

### Ajustements selon la teinte
- **Jaune** : +10-15% de luminosité perçue
- **Cyan/Vert** : luminosité proche de L*
- **Rouge/Magenta** : luminosité proche de L*
- **Bleu** : -10-20% de luminosité perçue

Ces ajustements sont empiriques et dépendent du contexte d'utilisation.*