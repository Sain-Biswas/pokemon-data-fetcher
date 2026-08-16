import { ZodError, z } from "zod";
import { NamedAPIResourceListZodSchema } from "~/validators/resource-lists/named.zod";
import { fetch } from "bun";

interface NamedListFetcherProps {
	endpoint: string;
}

const fetchAndParse = async (endpoint: string) => {
	const response = await fetch(endpoint);

	const json: unknown = await response.json();

	return NamedAPIResourceListZodSchema.parseAsync(json);
};

// oxlint-disable-next-line typescript/consistent-return
export const namedListFetcher = async ({ endpoint }: Readonly<NamedListFetcherProps>): Promise<string[]> => {
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
