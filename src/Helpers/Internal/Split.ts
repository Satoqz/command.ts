/**
 *
 * @param input string to be splitted
 * @internal
 */
export function split(input: string): string[]
{
	const out: string[] = [];

	let inParentheses = false;
	let inCodeblock = false;
	let current: string[] = [];

	const simple = input.split(/\s+/);

	for (let item of simple)
	{
		if (item.startsWith("\"") && !inCodeblock && !inParentheses)
		{
			item = item.slice(1);
			inParentheses = true;
		}
		if (item.endsWith("\"") && !inCodeblock && inParentheses)
		{
			item = item.slice(0, item.length - 1);
			inParentheses = false;
		}
		if (!inCodeblock && item.startsWith("```"))
		{
			item = item.slice(3);
			inCodeblock = true;
		}
		if (inCodeblock && item.endsWith("```"))
		{
			item = item.slice(0, item.length - 3);
			inCodeblock = false;
		}

		current.push(item);

		if (!inParentheses && !inCodeblock)
		{
			out.push(current.join(" ").trim());
			current = [];
		}
	};
	if (current.length)
		out.push(current.filter(i => i != "").join(" ").trim());

	return out;
}
