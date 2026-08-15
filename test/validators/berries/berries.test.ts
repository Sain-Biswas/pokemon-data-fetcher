import { describe, expect, it } from "bun:test";
import { BerryZodSchema } from "~/validators/berries/berries.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchBerryResource = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/berry/1");

	if (!response.ok) {
		throw new Error("Berry Resource - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("Berry Resource", () => {
	it("Should match the zod schema - BerryZodSchema", async () => {
		const data = await fetchBerryResource();

		const parsed = BerryZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("BerryZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
