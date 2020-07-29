import { registeredCommandOptions } from "../index";

export default class RegisteredCommand {

	constructor(options: registeredCommandOptions) {

		this.execute = options.execute;
		this.group = options.group;
		this.name = options.name;
		this.prefixless = options.prefixless;
		this.onlyPrefixless = options.onlyPrefixless;
		this.aliases = options.aliases;
		
	}

	public execute: Function;
	public group: string;
	public name: string;
	public aliases: string[];
	public prefixless: boolean;
	public onlyPrefixless: boolean;

}