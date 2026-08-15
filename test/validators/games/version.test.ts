import { describe, expect, it } from "bun:test";
import { VersionZodSchema } from "~/validators/games/version.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchVersionResource = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/version/1");

	if (!response.ok) {
		throw new Error("Version Resource - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("Version Resource", () => {
	it("Should match the zod schema - VersionZodSchema", async () => {
		const data = await fetchVersionResource();

		const parsed = VersionZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("VersionZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
