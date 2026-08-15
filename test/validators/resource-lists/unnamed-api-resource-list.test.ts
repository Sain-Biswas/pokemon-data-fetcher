import { describe, expect, it } from "bun:test";
import { UnnamedAPIResourceListZodSchema } from "~/validators/resource-lists/unnamed-api-resource-list.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchEvolutionChainResourceList = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/evolution-chain");

	if (!response.ok) {
		throw new Error("Unnamed API Resource List - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("Unnamed API Resource List", () => {
	it("Should match the zod schema - UnnamedAPIResourceListZodSchema", async () => {
		const data = await fetchEvolutionChainResourceList(),
			parsed = UnnamedAPIResourceListZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("UnnamedAPIResourceListZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
