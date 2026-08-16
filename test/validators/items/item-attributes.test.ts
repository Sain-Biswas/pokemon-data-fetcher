import { describe, expect, it } from "bun:test";
import { ItemAttributeZodSchema } from "~/validators/items/item-attributes.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchItemAttributeResource = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/item-attribute/1");

	if (!response.ok) {
		throw new Error("Item Attribute Resource - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("Item Attribute Resource", () => {
	it("Should match the zod schema - ItemAttributeZodSchema", async () => {
		const data = await fetchItemAttributeResource();

		const parsed = ItemAttributeZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("ItemAttributeZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
