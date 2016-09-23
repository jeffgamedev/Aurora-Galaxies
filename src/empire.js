/// An empire is a child of the universe contains colonies, leaders, fleets, and technologies
function Empire()
{
	var empire = {};
	empire._cash = 100;
	empire._fleets = new Array();
	empire._leaders = new Array();
	empire._colonies = new Array();
	empire._technologies = new Array();
	empire._research = null;
	empire._rulerName = "Player " + Math.floor((Math.random() * 99999)).toString();
	empire._userId = 0;
	empire._race = undefined;
	
	empire.Name = "Empire " + Math.floor((Math.random() * 99999)).toString();
	
	empire.GetFleets = function()
	{
		return empire._fleets;
	};
	
	empire.CreateColony = function(planet, ship)
	{
		if (!ship)
		{
			console.log("cannot create colony: no ship.");
			return null;
		}
		else if (!ship.CanColonize)
		{
			console.log("cannot create colony: ship is not a colony ship.");
			return null;
		}
		
		if (planet)
		{
			var colony = planet.CreateColony(empire);
			if (colony)
			{
				empire._colonies.push(colony);
				console.log("added colony " + colony.Name + " to empire " + empire.Name);
			}
			return colony;
		}
		else
		{
			console.log("Could not create colony: planet is null.");
			return null;
		}
	};
	
	empire.CreateShip = function(targetSolarSystem)
	{
		if (targetSolarSystem)
		{
			var ship = Ship(empire, targetSolarSystem);
			empire._fleets.push(ship);
			return ship;
		}
		return null;
	};
	
	empire.RandomlyPopulateGalaxy = function(galaxy)
	{
		if (galaxy)
		{
			for (var i = 0; i < galaxy.SolarSystems.length; i++)
			{
				if (Math.random() > 0.5)
				{
					for (var p = 0; p < Math.random() * galaxy.SolarSystems[i]._planets.length; p++)
					{
						galaxy.SolarSystems[i]._planets[p].CreateColony(empire);
					}
				}
			}
		}
	};
	
	return empire;
}