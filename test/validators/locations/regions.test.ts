import { describe, expect, it } from "bun:test";
import { RegionZodSchema } from "~/validators/locations/regions.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchRegionResource = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/region/1");

	if (!response.ok) {
		throw new Error("Region Resource - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("Region Resource", () => {
	it("Should match the zod schema - RegionZodSchema", async () => {
		const data = await fetchRegionResource();

		const parsed = RegionZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("RegionZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
