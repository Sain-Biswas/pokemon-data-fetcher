import { describe, expect, it } from "bun:test";
import { EvolutionChainZodSchema } from "~/validators/evolution/evolution-chains.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchEvolutionChainsResource = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/evolution-chain/1");

	if (!response.ok) {
		throw new Error("Evolution Chain Resource - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("Evolution Chain Resource", () => {
	it("Should match the zod schema - EvolutionChainZodSchema", async () => {
		const data = await fetchEvolutionChainsResource();

		const parsed = EvolutionChainZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("EvolutionChainZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
