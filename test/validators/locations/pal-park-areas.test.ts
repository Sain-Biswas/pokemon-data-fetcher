import { describe, expect, it } from "bun:test";
import { PalParkAreaZodSchema } from "~/validators/locations/pal-park-areas.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchPalParkAreaResource = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/pal-park-area/1");

	if (!response.ok) {
		throw new Error("Pal Park Area Resource - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("Pal Park Area Resource", () => {
	it("Should match the zod schema - PalParkAreaZodSchema", async () => {
		const data = await fetchPalParkAreaResource();

		const parsed = PalParkAreaZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("PalParkAreaZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
