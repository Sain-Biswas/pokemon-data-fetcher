import { describe, expect, it } from "bun:test";
import { GenerationZodSchema } from "~/validators/games/generations.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchGenerationResource = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/generation/1");

	if (!response.ok) {
		throw new Error("Generation Resource - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("Generation Resource", () => {
	it("Should match the zod schema - GenerationZodSchema", async () => {
		const data = await fetchGenerationResource();

		const parsed = GenerationZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("GenerationZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
