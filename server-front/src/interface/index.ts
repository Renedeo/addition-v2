/**
 * Export central de toutes les interfaces
 * Principe ISP : Organisation modulaire des exports
 */

// Button interfaces
export type {
  BaseButtonProps,
  ClickableButtonProps,
  StyledButtonProps,
  LoadingButtonProps,
  IconButtonProps,
  ButtonProps,
  LinkButtonProps,
  FormButtonProps
} from './button.interface';

// Input interfaces
export type {
  BaseInputProps,
  ValueInputProps,
  TextInputProps,
  NumberInputProps,
  InputEventProps,
  ValidationInputProps,
  LabeledInputProps,
  IconInputProps,
  SizedInputProps,
  InputProps,
  TextareaProps,
  CheckboxProps,
  RadioProps,
  SelectOption,
  SelectProps
} from './input.interface';

// Request interfaces
export type {
  BaseRequest,
  RequestHeaders,
  HttpMethod,
  RequestWithBody,
  RequestWithQuery,
  RequestWithParams,
  PaginationRequest,
  FilterRequest,
  FileUploadRequest,
  AuthRequest,
  CreateUserRequest,
  UpdateUserRequest,
  ListRequest,
  SearchRequest,
  BatchRequest,
  CacheableRequest,
  RetryableRequest
} from './request.interface';

// Theme interfaces
export type {
  ColorPalette,
  ExtendedColorPalette,
  Typography,
  Spacing,
  BorderRadius,
  BoxShadow,
  Breakpoints,
  ZIndex,
  Transitions,
  Theme,
  ThemeConfig,
  ThemeContextValue,
  DesignTokens,
  ComponentTheme,
  ThemeCustomization
} from './theme.interface';