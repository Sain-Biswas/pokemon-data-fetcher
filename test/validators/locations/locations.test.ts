import { describe, expect, it } from "bun:test";
import { LocationZodSchema } from "~/validators/locations/locations.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchLocationResource = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/location/1");

	if (!response.ok) {
		throw new Error("Location Resource - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("Location Resource", () => {
	it("Should match the zod schema - LocationZodSchema", async () => {
		const data = await fetchLocationResource();

		const parsed = LocationZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("LocationZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
