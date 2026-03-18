import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import vitest from "@vitest/eslint-plugin";

// export default tseslint.config(eslint.configs.recommended, tseslint.configs.recommended);
export default defineConfig({
  ignores: ["**/*.js"],
  extends: [
    eslint.configs.recommended,
    tseslint.configs.recommended,
    {
      files: ["**/*.test.ts", "**/*.spec.ts"],
      plugins: {
        vitest,
      },
      rules: {
        ...vitest.configs.recommended.rules,
        "@typescript-eslint/unbound-method": "off",
      },
    },
  ],
  languageOptions: {
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
