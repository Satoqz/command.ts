/**
 *
 * @param input string to be splitted
 * @internal
 */
export function split(input: string): string[]
{

	if (input.includes("`"))
		return input.split(" ");

	const out: string[] = [];

	let inParens = false;
	let current = "";
	let i = 0;

	for (const c of input)
	{
		if (c == "\"")
		{
			if (!inParens)
			{
				if ((input[i-1] == undefined || input[i-1] == " "))
					inParens = true;
				else
					current += c;
			}
			else if (inParens)
			{
				if (input[i+1] == undefined || input[i+1] == " ")
					inParens = false;
				else
					current += c;
			}
		}
		else if (c == " " && !inParens)
		{
			out.push(current);
			current = "";
		}
		else
			current += c;

		i++;
	}
	out.push(current);

	return out;
}
