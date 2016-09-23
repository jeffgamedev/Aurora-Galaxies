/// there is only one universe... or is there? Contains galaxies and empires.  
function Universe()
{
	var universe = {};
	universe._galaxies = new Array();
	universe._empires = new Array();
	
	universe.Name = "Universe " + Math.floor((Math.random() * 99999)).toString();
	
	universe.CreateGalaxy = function()
	{
		var galaxy = new Galaxy();
		universe._galaxies.push(galaxy);
		console.log("Created new Galaxy: " + galaxy.Name);
		return galaxy;
	};
	
	universe.CreateEmpire = function()
	{
		var empire = new Empire();
		universe._empires.push(empire);
		console.log("Created new Empire: " + empire.Name);
		return empire;
	};
	
	universe.GetShips = function()
	{
		var ships = new Array();
		for (var e = 0; e < universe._empires.length; e++)
		{
			ships = ships.concat(universe._empires[e].GetFleets());
		}
		return ships;
	};
	
	return universe;
}