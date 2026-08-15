import { describe, expect, it } from "bun:test";
import { VersionGroupZodSchema } from "~/validators/games/version-groups.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchVersionGroupResource = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/version-group/1");

	if (!response.ok) {
		throw new Error("Version Group Resource - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("Version Group Resource", () => {
	it("Should match the zod schema - VersionGroupZodSchema", async () => {
		const data = await fetchVersionGroupResource();

		const parsed = VersionGroupZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("VersionGroupZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
