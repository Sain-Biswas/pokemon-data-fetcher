import { defineConfig } from "oxlint";

export default defineConfig({
	categories: {
		correctness: "error",
		nursery: "off",
		pedantic: "warn",
		perf: "warn",
		restriction: "off",
		style: "error",
		suspicious: "error"
	},

	env: {
		es2024: true,
		node: true
	},

	globals: {
		Bun: "readonly"
	},

	ignorePatterns: ["dist/**", "build/**", "coverage/**", "node_modules/**", "*.config.js"],

	options: {
		typeAware: true,
		typeCheck: true
	},

	plugins: ["typescript", "unicorn", "oxc", "import", "node", "promise", "jsdoc"],

	rules: {
		"import/no-cycle": "error",
		"import/no-named-export": "off",
		"import/prefer-default-export": "off",
		"promise/catch-or-return": "error",
		"promise/no-callback-in-promise": "warn",
		"typescript/await-thenable": "error",
		"typescript/consistent-type-imports": "warn",
		"typescript/no-floating-promises": "error",
		"typescript/no-misused-promises": "error",
		"typescript/no-unnecessary-condition": "warn"
	}
});
