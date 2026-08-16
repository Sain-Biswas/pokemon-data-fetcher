import { describe, expect, it } from "bun:test";
import { ItemFlingEffectZodSchema } from "~/validators/items/item-fling-effects.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchItemFlingEffectResource = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/item-fling-effect/1");

	if (!response.ok) {
		throw new Error("Item Fling Effect Resource - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("Item Fling Effect Resource", () => {
	it("Should match the zod schema - ItemFlingEffectZodSchema", async () => {
		const data = await fetchItemFlingEffectResource();

		const parsed = ItemFlingEffectZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("ItemFlingEffectZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
