import { writeFile, readFileSync } from "fs";

export abstract class providerBase
{
	constructor(options: any) { }
	
	public getContainerById<T extends object>(
		containerId: string)
		: Record<string, T> | undefined
	{
		throw notImplementedError;
	}
	
	public getDocumentById<T extends object>(
		containerId: string,
		documentId: string)
		: T | undefined
	{
		throw notImplementedError;
	}
	
	public setDocument(container: string,
		documentId: string,
		item: object)
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

export class fileProv extends providerBase
{
	constructor(options: string)
	{
		super(options);
		this.filePath = options;
		this.loadFile();
	}

	private filePath: string;
	private database: Record<string, Record<string, object>> = {  };
	
	//#region Get and Set
	public getContainerById<T extends object>(tableName: string)
	{
		let item = this.database[tableName];
		if (item) return item as Record<string, T>;
		else return undefined;
	}

	public getDocumentById<T extends object>(tableName: string, documentId: string)
	{
		let item = this.database[tableName][documentId];
		if (item) return item as T;
		else return undefined;
	}

	public createContainer(containerId: string)
	{
		if (!this.database[containerId])
			this.database[containerId] = {  };
	}

	public setDocument(container: string, documentId: string, item: object)
	{
		console.log(this.database[container]);
		this.database[container]![documentId]! = item;
	}
	//#endregion

	public saveChanges(): Promise<void>
	{
		let hasError: NodeJS.ErrnoException | null = null;
		writeFile(this.filePath, JSON.stringify(this.database), err => hasError = err);
		if (hasError == null)
			return Promise.resolve();
		else 
			return Promise.reject(hasError);
	}

	public loadFile()
	{
		this.database = JSON.parse(readFileSync(this.filePath, "utf-8"));
	}
}

const notImplementedError = Error("Not implemented");
