import { BaseProv } from "./BaseProv";
import { FileProv } from "./FileProv";
import { InMemProv } from "./InMemProv";

export namespace Providers
{
	export class base extends BaseProv
	{}
	export class file extends FileProv
	{}
	export class memory extends InMemProv
	{}
}