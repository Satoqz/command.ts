import { writeFile, readFileSync } from "fs";
import { inMemProv } from "./inMemProv";

export class fileProv extends inMemProv
{
	constructor(options: string)
	{
		super(undefined);
		this.filePath = options;
		this.loadFile();
	}

	private filePath: string;

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
