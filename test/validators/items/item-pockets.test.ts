import { describe, expect, it } from "bun:test";
import { ItemPocketZodSchema } from "~/validators/items/item-pockets.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchItemPocketResource = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/item-pocket/1");

	if (!response.ok) {
		throw new Error("Item Pocket Resource - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("Item Pocket Resource", () => {
	it("Should match the zod schema - ItemPocketZodSchema", async () => {
		const data = await fetchItemPocketResource();

		const parsed = ItemPocketZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("ItemPocketZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
