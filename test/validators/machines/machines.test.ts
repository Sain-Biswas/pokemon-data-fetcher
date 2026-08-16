import { describe, expect, it } from "bun:test";
import { MachineZodSchema } from "~/validators/machines/machines.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchMachineResource = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/machine/1");

	if (!response.ok) {
		throw new Error("Machine Resource - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("Machine Resource", () => {
	it("Should match the zod schema - MachineZodSchema", async () => {
		const data = await fetchMachineResource();

		const parsed = MachineZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("MachineZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
