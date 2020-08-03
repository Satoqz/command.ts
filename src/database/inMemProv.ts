import { baseProv, ttype } from "./baseProv";

export class inMemProv extends baseProv
{
	constructor(options?: void)
	{
		super(options);
	}

	protected database: Record<string, Record<string, ttype>> = {  };

	//#region Get and Set
	public getContainerById<T extends ttype>(
		tableName: string)
	{
		const item = this.database[tableName];
		if (item) return item as Record<string, T>;
		else return undefined;
	}

	public getDocumentById<T extends ttype>(
		tableName: string,
		documentId: string)
	{
		const item = this.database[tableName][documentId];
		if (item) return item as T;
		else return undefined;
	}

	public createContainer(containerId: string)
	{
		if (!this.database[containerId])
			this.database[containerId] = { };
	}

	public setDocument(
		container: string,
		documentId: string,
		item: object)
	{
		console.log(this.database[container]);
		this.database[container]![documentId]! = item;
	}
	//#endregion
}