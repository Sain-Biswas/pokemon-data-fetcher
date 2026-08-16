import { describe, expect, it } from "bun:test";
import { GrowthRateZodSchema } from "~/validators/pokemon/growth-rates.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchGrowthRateResource = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/growth-rate/1");

	if (!response.ok) {
		throw new Error("Growth Rate Resource - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("Growth Rate Resource", () => {
	it("Should match the zod schema - GrowthRateZodSchema", async () => {
		const data = await fetchGrowthRateResource();

		const parsed = GrowthRateZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("GrowthRateZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
