import { describe, expect, it } from "bun:test";
import { ItemCategoryZodSchema } from "~/validators/items/item-categories.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchItemCategoryResource = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/item-category/1");

	if (!response.ok) {
		throw new Error("Item Category Resource - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("Item Category Resource", () => {
	it("Should match the zod schema - ItemCategoryZodSchema", async () => {
		const data = await fetchItemCategoryResource();

		const parsed = ItemCategoryZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("ItemCategoryZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
