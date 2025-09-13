/**
 * 🔍 Color Validation - Barrel Exports
 * 
 * @module validation
 * @version 1.0.0
 */

export { ColorValidatorImpl, colorValidator } from './base';
export { 
  ColorDomainValidatorImpl, 
  colorDomainValidator, 
  isValidColor, 
  assertValidColor 
} from './domain';