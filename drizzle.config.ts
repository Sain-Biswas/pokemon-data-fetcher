import { defineConfig } from "drizzle-kit";

export default defineConfig({
	dbCredentials: {
		url: process.env["DATABASE_FILE_NAME"]!
	},
	dialect: "sqlite",
	out: "./drizzle",
	schema: "src/database/schema.database.ts"
});
