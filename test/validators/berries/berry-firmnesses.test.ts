import { describe, expect, it } from "bun:test";
import { BerryFirmnessZodSchema } from "~/validators/berries/berry-firmnesses.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchBerryFirmnessResource = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/berry-firmness/1");

	if (!response.ok) {
		throw new Error("Berry Firmness Resource - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("Berry Firmness Resource", () => {
	it("Should match the zod schema - BerryFirmnessZodSchema", async () => {
		const data = await fetchBerryFirmnessResource();

		const parsed = BerryFirmnessZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("BerryFirmnessZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
