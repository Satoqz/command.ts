/**
 *
 * @param input string to be splitted
 * @internal
 */
export function split(input: string): string[]
{
	const out: string[] = [];

	let current = "";

	let i = 0;

	let inParens = false;

	if (input.includes("```"))
	{
		for (const c of input)
		{
			if (c == " " || c == "\n")
			{
				out.push(current);
				current = "";
			}
			else
				current += c;
		}
		out.push(current);
	}
	else
	{
		for (const c of input)
		{
			if ((c == " " || c == "\n") && !inParens)
			{
				out.push(current);
				current = "";
			}
			else if (c == "\"" && input[i-1] != "\\")
				inParens = !inParens;
			else
				current += c;
			i++;
		}
		out.push(current);
	}
	return out;
}
