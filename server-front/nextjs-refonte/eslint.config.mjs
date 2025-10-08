import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import boundaries from "eslint-plugin-boundaries";
import { defineConfig } from "eslint/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = defineConfig([
  // Uncomment and configure if needed
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript", "prettier"],
  }),
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    plugins: {
      boundaries: boundaries,
    },
    settings: {
      "boundaries/elements": [
        {
          type: "domain-core",
          pattern: "src/domain/**/!(implementations)/core/**",
          message: "Core elements should be defined in src/domain/**/core/**",
        },
        {
          type: "domain-implementation",
          pattern: "src/domain/**/implementations/**",
          message:
            "Implementation elements should be defined in src/domain/**/implementations/**",
        },
        {
          type: "shared",
          pattern: "src/shared/**",
          message: "Shared elements should be defined in src/shared/**",
        },
        {
          type: "app",
          pattern: "src/app/**",
          message: "App elements should be defined in src/app/**",
        },
        {
          type: "components",
          pattern: "src/components/**",
          message: "Components should be defined in src/components/**",
        },
      ],
    },
    rules: {

      "boundaries/element-types": [
        "error", // Use "error" instead of numeric level for better readability
        {
          default: "disallow",
          rules: [
            {
              from: "domain-core",
              allow: ["domain-core", "shared"],
              message:
                "Domain-core elements can only depend on domain-core and shared elements.",
            },
            {
              from: "domain-implementation",
              allow: ["domain-core", "shared"],
              message:
                "Domain-implementation elements cannot depend on any other elements.",
            },
            {
              from: "shared",
              allow: ["shared"],
              message: "Shared elements can only depend on other shared elements.",
            },
            {
              from: "app",
              allow: ["app", "components", "shared", "domain-core", "domain-implementation"],
              message:
                "App elements can only depend on app, components, shared, domain-core, and domain-implementation elements.",
            },
            {
              from: "components",
              allow: ["components", "shared", "domain-core", "domain-implementation"],
              message:
                "Components can only depend on components, shared, and domain-core elements.",
            },
          ],
        },
      ],
    },
  },
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
]);

export default eslintConfig;
