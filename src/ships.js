function Ship(empire, currentSolarSystem)
{
	var shipPNGs = ["ship01.png","ship02.png","ship03.png"];
	var ship = {};
	ship._sprite = Sprite(shipPNGs[Math.floor(Math.random()*shipPNGs.length)]);
	ship.Empire = empire;
	ship.CanColonize = true;
	ship.Name = "Ship " + Math.floor((Math.random() * 99999)).toString();
	ship.Armor = 0;
	ship.Health = 1;
	
	ship._currentSolarSystem = currentSolarSystem;
	ship._targetSolarSystem = undefined;

	ship.Update = function()
	{
		if (ship._currentSolarSystem)
		{
			ship._sprite.SetPosition(ship._currentSolarSystem._coordinate[0] + 36, ship._currentSolarSystem._coordinate[1] - 16);
		}
		if (ship._targetSolarSystem)
		{
			ship._currentSolarSystem = ship._targetSolarSystem;
			ship._targetSolarSystem = undefined;
		}
	};
	
	ship.CanColonizeCurrentSolarSystem = function()
	{
		return ship.CanColonize && ship._currentSolarSystem && ship._currentSolarSystem.HasAvailablePlanet();
	};
	
	ship.SetTarget = function(targetSolarSystem)
	{
		ship._targetSolarSystem = targetSolarSystem;
	};
	
	ship.Render = ship._sprite.Render;
	
	return ship;
}

function MilitaryShip()
{
	var ship = Ship();
	ship._sprite = Sprite("ship01.png");
	ship.Name = "Military" + ship.Name;
	ship.Weapons = new Array();
	
	ship.Render = ship._sprite.Render;
	
	ship.Attack = function()
	{
	};
	
	return ship;
}

function ColonyShip()
{
	var ship = Ship();
	ship._sprite = Sprite("ship03.png");
	
	ship.Render = ship._sprite.Render;
	
	ship.Name = "Colony" + ship.Name;
	ship.CanColonize = true;
	
	return ship;
}
