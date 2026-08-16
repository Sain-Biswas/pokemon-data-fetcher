import { describe, expect, it } from "bun:test";
import { StatZodSchema } from "~/validators/pokemon/stats.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchStatsResource = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/stat/1");

	if (!response.ok) {
		throw new Error("Stats Resource - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("Stats Resource", () => {
	it("Should match the zod schema - StatZodSchema", async () => {
		const data = await fetchStatsResource();

		const parsed = StatZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("StatZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
