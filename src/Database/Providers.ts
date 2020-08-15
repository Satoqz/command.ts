import { BaseProv } from "./BaseProv";
import { FileProv } from "./FileProv";
import { InMemProv } from "./InMemProv";

export namespace Providers
{
	export class Base extends BaseProv
	{}
	export class File extends FileProv
	{}
	export class Memory extends InMemProv
	{}
}