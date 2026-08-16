import { ZodError, z } from "zod";
import { APIResourceListZodSchema } from "~/validators/resource-lists/unnamed.zod";
import { fetch } from "bun";

interface UnnamedListFetcherProps {
	endpoint: string;
}

const fetchAndParse = async (endpoint: string) => {
	const response = await fetch(endpoint);

	const json: unknown = await response.json();

	return APIResourceListZodSchema.parseAsync(json);
};

// oxlint-disable-next-line typescript/consistent-return
export const unnamedListFetcher = async ({ endpoint }: Readonly<UnnamedListFetcherProps>): Promise<string[]> => {
	try {
		const { count } = await fetchAndParse(`https://pokeapi.co/api/v2${endpoint}`);

		const fullData = await fetchAndParse(`https://pokeapi.co/api/v2${endpoint}/?limit=${count + 10}&offset=0`);

		return fullData.results.map((item) => item.url);
	} catch (error) {
		if (error instanceof ZodError) {
			// oxlint-disable-next-line unicorn/no-null
			console.error("Failed to fetch list from", endpoint, JSON.stringify(z.treeifyError(error), null, 2));
		} else {
			console.error("Failed to fetch list from", endpoint, error);
		}

		process.exit(1);
	}
};
