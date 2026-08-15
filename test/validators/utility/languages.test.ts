import { describe, expect, it } from "bun:test";
import { LanguageZodSchema } from "~/validators/utility/languages.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchLanguageResource = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/language/9");

	if (!response.ok) {
		throw new Error("Language Resource - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("Language Resource", () => {
	it("Should match the zod schema - LanguageZodSchema", async () => {
		const data = await fetchLanguageResource(),
			parsed = LanguageZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("LanguageZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
