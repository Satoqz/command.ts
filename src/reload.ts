
export function reload(path: string): Promise<{message: string}>
{
	return new Promise((resolve, reject) =>
	{
		try
		{
			delete require.cache[require.resolve(path)];
			
			require(path);
			resolve();
		}
		catch
		{
			reject({"message":(`${path} does not exist or is not a valid source file`)});
		}
	});
}
