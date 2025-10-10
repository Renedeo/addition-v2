To compute the color contrast ratio between two colors (e.g., text and background), follow the standardized method defined by the Web Content Accessibility Guidelines (WCAG). The contrast ratio measures the difference in relative luminance between the two colors to ensure text is readable for people with visual impairments.

### Steps to Compute Contrast Ratio

#### 🔹 Step 1: Get the RGB Values
Obtain the Red (R), Green (G), and Blue (B) values of both colors (text and background), each on a scale from 0 to 255.

**Example:**
- Text color: `#000000` (black) → R=0, G=0, B=0
- Background: `#FFFFFF` (white) → R=255, G=255, B=255

#### 🔹 Step 2: Normalize RGB Values to 0–1
Divide each R, G, B value by 255.

\[
R' = \frac{R}{255},\quad G' = \frac{G}{255},\quad B' = \frac{B}{255}
\]

#### 🔹 Step 3: Convert to Linear Light (Remove Gamma Correction)
Apply the sRGB gamma correction to convert to linear values:

For each component (\(R'\), \(G'\), \(B'\)):

\[
C = 
\begin{cases} 
\frac{C'}{12.92} & \text{if } C' \leq 0.04045 \\ 
\left( \frac{C' + 0.055}{1.055} \right)^{2.4} & \text{otherwise} 
\end{cases}
\]

#### 🔹 Step 4: Calculate Relative Luminance (\(Y\))
Use the formula:

\[
Y = 0.2126 \times R + 0.7152 \times G + 0.0722 \times B
\]

This gives a value between 0 (black) and 1 (white).

Repeat for both colors to get \(Y_1\) and \(Y_2\).

#### 🔹 Step 5: Compute the Contrast Ratio
Let \(L_1\) be the higher luminance (lighter color), and \(L_2\) the lower luminance (darker color).

\[
\text{Contrast Ratio} = \frac{L_1 + 0.05}{L_2 + 0.05}
\]

The result is a number between 1 (no contrast) and 21 (maximum contrast).

### ✅ Example: Black Text on White Background
- Black: \(Y_2 = 0\)
- White: \(Y_1 = 1\)

\[
\text{Ratio} = \frac{1 + 0.05}{0 + 0.05} = \frac{1.05}{0.05} = 21
\]

**Contrast ratio = 21** (excellent readability).

---

### 📏 WCAG Guidelines (Minimum Contrast Requirements)

| **Text Type**               | **AA Level** | **AAA Level** |
|------------------------------|--------------|---------------|
| Normal text                 | 4.5          | 7             |
| Large text (≥18pt or ≥14pt bold) | 3            | 4.5           |
| User interface components   | 3            | —             |