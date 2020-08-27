/**
 * @internal
 * @description Used to avoid registering the class constructor as a command
 * @param f Function to be checked
 */
export function isConstructor(f: Function)
{
	try
	{
	  Reflect.construct(String, [], f);
	}
	catch (e)
	{
	  return false;
	}
	return true;
}