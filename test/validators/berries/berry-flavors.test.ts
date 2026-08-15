import { describe, expect, it } from "bun:test";
import { BerryFlavorZodSchema } from "~/validators/berries/berry-flavors.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchBerryFlavorResource = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/berry-flavor/1");

	if (!response.ok) {
		throw new Error("Berry Flavor Resource - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("Berry Flavor Resource", () => {
	it("Should match the zod schema - BerryFlavorZodSchema", async () => {
		const data = await fetchBerryFlavorResource();

		const parsed = BerryFlavorZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("BerryFlavorZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
