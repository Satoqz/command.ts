
/**
 * Under the hood this function will delete an already imported/required file from the cache and reimport it.<br>
 * It is ensured that registered commands that are part of a reloaded file file replace the old commands.<br>
 * If the file you are trying to reload is not found, a friendly promise rejection with an error message will be sent back.
 * @param path Path to be reloaded. Optimally, you should be using `path.join`
 */
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
