import { registeredCommandOptions } from "../index";

export default class RegisteredCommand {

	constructor(options: registeredCommandOptions) {

		this.execute = options.execute;
		this.group = options.group;
		this.name = options.name;
		this.prefixless = options.prefixless;
		this.onlyPrefixless = options.onlyPrefixless;
		
	}

	public execute: Function;
	public group: string;
	public name: string;
	public source: string;
	public prefixless: boolean;
	public onlyPrefixless: boolean;

}