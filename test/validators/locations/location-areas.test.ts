import { describe, expect, it } from "bun:test";
import { LocationAreaZodSchema } from "~/validators/locations/location-areas.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchLocationAreaResource = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/location-area/1");

	if (!response.ok) {
		throw new Error("Location Area Resource - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("Location Area Resource", () => {
	it("Should match the zod schema - LocationAreaZodSchema", async () => {
		const data = await fetchLocationAreaResource();

		const parsed = LocationAreaZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("LocationAreaZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
