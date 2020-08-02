
export abstract class baseProv
{
	constructor(options: any) { }
	
	public createContainer(containerId: string)
	{
		throw notImplementedError;
	}

	public getContainerById<T extends ttype>(
		containerId: string)
		: Record<string, T> | undefined
	{
		throw notImplementedError;
	}
	
	public getDocumentById<T extends ttype>(
		containerId: string,
		documentId: string)
		: T | undefined
	{
		throw notImplementedError;
	}
	
	public setDocument(container: string,
		documentId: string,
		item: ttype)
		: void
	{
		throw notImplementedError;
	}
	
	public saveChanges()
		: Promise<void>
	{
		throw notImplementedError;
	}
}

export type ttype =
	| object
	| string
	| number
	| boolean;

const notImplementedError = Error("Not implemented");
