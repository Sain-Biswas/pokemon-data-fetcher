import { describe, expect, it } from "bun:test";
import { PokeathlonStatZodSchema } from "~/validators/pokemon/pokeathlon-stats.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchPokeathlonStatResource = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/pokeathlon-stat/1");

	if (!response.ok) {
		throw new Error("Pokeathlon Stat Resource - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("Pokeathlon Stat Resource", () => {
	it("Should match the zod schema - PokeathlonStatZodSchema", async () => {
		const data = await fetchPokeathlonStatResource();

		const parsed = PokeathlonStatZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("PokeathlonStatZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
