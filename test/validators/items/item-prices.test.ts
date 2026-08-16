import { describe, expect, it } from "bun:test";
import { ItemPriceZodSchema } from "~/validators/items/item-prices.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchItemPriceResource = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/item-price/1");

	if (!response.ok) {
		throw new Error("Item Price Resource - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe.skip("Item Price Resource", () => {
	it("Should match the zod schema - ItemPriceZodSchema", async () => {
		const data = await fetchItemPriceResource();

		const parsed = ItemPriceZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("ItemPriceZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
