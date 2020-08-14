import { baseProv } from "./baseProv";
import { fileProv } from "./fileProv";
import { inMemProv } from "./inMemProv";

export namespace providers
{
	export class base extends baseProv
	{}
	export class file extends fileProv
	{}
	export class memory extends inMemProv
	{}
}