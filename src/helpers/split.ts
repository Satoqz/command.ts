export function split(input: string)
{
	let output = input.match(/\w+|"[^"]+"/g), i: number | undefined = output?.length;
	if(i) {
		while(i--)
		{
			output![i] = output![i].replace(/"/g, "");
		}
		return output as string[];
	}
	return [];
}