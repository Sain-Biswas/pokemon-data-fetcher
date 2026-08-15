import { describe, expect, it } from "bun:test";
import { CurrencyZodSchema } from "~/validators/currencies/currencies.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchCurrencyResource = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/currency/1");

	if (!response.ok) {
		throw new Error("Currency Resource - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("Currency Resource", () => {
	it("Should match the zod schema - CurrencyZodSchema", async () => {
		const data = await fetchCurrencyResource();

		const parsed = CurrencyZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("CurrencyZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
