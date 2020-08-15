import { join } from "path";
import { readdirSync, readFileSync } from "fs";

export function importAll(dir: string)
{
	const found = readdirSync(dir);

	const dirs: string[] = [];
	const files: string[] = [];

	found.forEach((item: string) =>
	{
		try
		{
			readFileSync(join(dir, item));
			files.push(item);
		}
		catch
		{
			dirs.push(item);
		}
	});

	files.forEach((item: string) =>
	{
		if (item.endsWith(".ts") || item.endsWith(".js"))
			require(join(dir, item));
	});

	dirs.forEach((item: string) => importAll(join(dir, item)));
}