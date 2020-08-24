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