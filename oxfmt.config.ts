import { defineConfig } from "oxfmt"

export default defineConfig({
    arrowParens: "always",
    bracketSpacing: true,
    endOfLine: "lf",
    ignorePatterns: ["dist/**", "build/**", "coverage/**", "node_modules/**", "bun.lock", "bun.lockb"],
    insertFinalNewline: true,
    printWidth: 120,
    semi: false,
    singleQuote: false,
    sortImports: true,
    sortPackageJson: true,
    tabWidth: 4,
    trailingComma: "all",
    useTabs: false,
})
