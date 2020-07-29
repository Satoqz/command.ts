export default function reload(path: string) {

	delete require.cache[require.resolve(path)];

	require(path);
}