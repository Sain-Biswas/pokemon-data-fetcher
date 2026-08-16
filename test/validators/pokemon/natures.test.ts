import { describe, expect, it } from "bun:test";
import { NatureZodSchema } from "~/validators/pokemon/natures.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchNatureResource = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/nature/1");

	if (!response.ok) {
		throw new Error("Nature Resource - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("Nature Resource", () => {
	it("Should match the zod schema - NatureZodSchema", async () => {
		const data = await fetchNatureResource();

		const parsed = NatureZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("NatureZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
