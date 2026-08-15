import { defineConfig } from "oxfmt";

export default defineConfig({
	ignorePatterns: ["dist/**", "build/**", "coverage/**", "node_modules/**", "bun.lock", "bun.lockb"],
	printWidth: 120,
	tabWidth: 4,
	trailingComma: "none",
	useTabs: true
});
