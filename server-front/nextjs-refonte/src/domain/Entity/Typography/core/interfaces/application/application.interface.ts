import type { ICssGenerator } from "@domain/Entity/Typography/core/interfaces/generator/css-generator.interface";
import type { IWeightNormalizer } from "@domain/Entity/Typography/core/interfaces/normalizer/weight-normalizer.interface";
import type { IFontRegistrar } from "@domain/Entity/Typography/core/interfaces/registry/registrar.interface";
import type { IFontLoader } from "@domain/Entity/Typography/core/interfaces/loader/loader.interface";
import type { RegisteredRecord } from "@domain/Entity/Typography/core/interfaces/registry/registry.interface";
import type { FontFactoryOptions } from "@domain/Entity/Typography/core/interfaces/factory/factory.interface";

/**
 * Service d'application typographique qui compose les micro-interfaces.
 */
export interface ITypographyApplicationService {
  css: ICssGenerator;
  normalizer: IWeightNormalizer;
  registrar: IFontRegistrar;
  loader?: IFontLoader;

  registerAndLoad(options: FontFactoryOptions, overwrite?: boolean): RegisteredRecord | undefined;
}

export default ITypographyApplicationService;
