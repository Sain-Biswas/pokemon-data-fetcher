import { describe, expect, it } from "bun:test";
import { ContestTypeZodSchema } from "~/validators/contests/contest-types.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchContestTypeResource = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/contest-type/1");

	if (!response.ok) {
		throw new Error("Contest Types Resource - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("Contest Type Resource", () => {
	it("Should match the zod schema - ContestTypeZodSchema", async () => {
		const data = await fetchContestTypeResource();

		const parsed = ContestTypeZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("ContestTypeZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
