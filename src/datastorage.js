var DataStorage = {};

DataStorage.Supported = (typeof(Storage)!== "undefined");

DataStorage.Save = function (key, data)
{
	if (DataStorage.Supported)
	{
		localStorage.setItem(key, data);
	}
};

DataStorage.Load = function(key)
{
	return (DataStorage.Supported) ? localStorage.getItem(key) : null;
};