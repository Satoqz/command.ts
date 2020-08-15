/**
 *
 * @param input string to be splitted
 * @internal
 */
export function split(input: string): string[]
{
	const matches = /".+?"/.exec(input);
	input = input.replace(/".+?"/, "").replace(/^\s+|\s+$/g, "");
	const astr = input.split(" ");
	if (matches)
	{
		for (let i = 0; i < matches.length; i++)
		{
			astr.push(matches[i].replace(/"/g, ""));
		}
	}
	return astr;
}
