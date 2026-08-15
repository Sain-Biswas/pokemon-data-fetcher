import { describe, expect, it } from "bun:test";
import { APIResourceListZodSchema } from "~/validators/resource-lists/unnamed.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchEvolutionChainResourceList = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/evolution-chain");

	if (!response.ok) {
		throw new Error("API Resource List - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("API Resource List", () => {
	it("Should match the zod schema - APIResourceListZodSchema", async () => {
		const data = await fetchEvolutionChainResourceList(),
			parsed = APIResourceListZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("APIResourceListZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
