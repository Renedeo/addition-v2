# 🏗️ Architecture des Interfaces - Principe ISP

## 📋 **Principe de Ségrégation d'Interface (ISP)**

Cette architecture respecte le principe **Interface Segregation Principle** qui stipule qu'**aucune classe ne devrait être forcée de dépendre d'interfaces qu'elle n'utilise pas**.

## 📁 **Structure des Interfaces**

### 🔘 **button.interface.ts**
Interfaces pour tous les composants boutons, séparées par responsabilité :

- `BaseButtonProps` : Propriétés communes minimales
- `ClickableButtonProps` : Gestion des clics
- `StyledButtonProps` : Variants visuels
- `LoadingButtonProps` : État de chargement
- `IconButtonProps` : Boutons avec icônes
- `ButtonProps` : Interface complète (composition)
- `LinkButtonProps` : Boutons de navigation
- `FormButtonProps` : Boutons de formulaire

### 📝 **input.interface.ts**
Interfaces pour tous les composants de saisie :

- `BaseInputProps` : Base commune
- `ValueInputProps<T>` : Gestion de valeur typée
- `TextInputProps` : Inputs texte
- `NumberInputProps` : Inputs numériques
- `InputEventProps` : Événements
- `ValidationInputProps` : Validation
- `LabeledInputProps` : Labels et descriptions
- `IconInputProps` : Icônes
- `SizedInputProps` : Tailles et variants
- `CheckboxProps`, `RadioProps`, `SelectProps` : Spécialisations

### 🌐 **request.interface.ts**
Interfaces pour les requêtes API :

- `BaseRequest` : Base commune
- `RequestHeaders` : En-têtes HTTP
- `RequestWithBody<T>` : Requêtes avec payload
- `RequestWithQuery` : Query parameters
- `PaginationRequest` : Pagination
- `FilterRequest` : Filtrage
- `AuthRequest` : Authentification
- `BatchRequest<T>` : Opérations en lot
- `CacheableRequest` : Cache
- `RetryableRequest` : Retry logic

### 🎨 **theme.interface.ts**
Interfaces pour la gestion des thèmes :

- `ColorPalette` : Couleurs de base
- `ExtendedColorPalette` : Palette complète avec nuances
- `Typography` : Styles de texte
- `Spacing` : Espacement
- `BorderRadius` : Bordures
- `BoxShadow` : Ombres
- `Theme` : Thème complet
- `ThemeContextValue` : Contexte React
- `DesignTokens` : Tokens de design système

## ✅ **Avantages de cette Architecture**

### 🎯 **Respect de l'ISP**
- Interfaces petites et focalisées
- Pas de dépendances inutiles
- Composition plutôt qu'héritage

### 🔧 **Flexibilité**
```typescript
// Utilisation spécifique
const LoadingButton: React.FC<LoadingButtonProps> = ({ loading, children }) => {
  // Ne dépend que des props nécessaires
};

// Composition complète
const FullButton: React.FC<ButtonProps> = (props) => {
  // Toutes les fonctionnalités disponibles
};
```

### 🧩 **Composition**
```typescript
// Mélange de fonctionnalités selon les besoins
interface CustomButtonProps extends StyledButtonProps, LoadingButtonProps {
  customProp?: string;
}
```

### 🔍 **Type Safety**
```typescript
// Types stricts et explicites
const handleSubmit = (request: CreateUserRequest) => {
  // TypeScript garantit la structure
};
```

## 🚀 **Utilisation**

### **Import centralisé :**
```typescript
import { ButtonProps, InputProps, Theme } from '@/interface';
```

### **Import spécifique :**
```typescript
import { LoadingButtonProps } from '@/interface/button.interface';
import { AuthRequest } from '@/interface/request.interface';
```

### **Composition personnalisée :**
```typescript
interface MyComponentProps extends StyledButtonProps, ValidationInputProps {
  customFeature?: boolean;
}
```

## 📊 **Métriques de Qualité**

- ✅ **Cohésion** : Chaque interface a une responsabilité unique
- ✅ **Couplage** : Faible couplage entre interfaces
- ✅ **Réutilisabilité** : Interfaces composables
- ✅ **Maintenabilité** : Structure claire et documentée
- ✅ **Extensibilité** : Facile d'ajouter de nouvelles interfaces

Cette architecture garantit un code **maintenable**, **testable** et **évolutif** ! 🎉