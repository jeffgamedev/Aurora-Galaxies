/// A solar system is a child of a galaxy and contains planets
function SolarSystem(x, y)
{
	var solarSystem = {};
	
	solarSystem.Name = Names.GetUniqueName();
	
	solarSystem._star = new Star();
	solarSystem._planets = new Array();
	solarSystem._coordinate = [x, y];
	solarSystem.IsIdentified = true;
	solarSystem.Selected = false;
	
	if (Math.random()*2 > 1)
	{
		solarSystem.Leader = Leader();
	}
	else
	{
		solarSystem.Leader = undefined;
	}
	
	
	solarSystem.CurrentPlanet = undefined;
		
	var camera = {};
	camera.X = 0;
	camera.Y = 0;

	
	solarSystem.HasColony = function()
	{
		for (var i = 0; i < solarSystem._planets.length; i++)
		{
			if (solarSystem._planets[i].Colony)
			{
				return true;
			}
		}
		return false;
	};
	
	solarSystem.HasAvailablePlanet = function()
	{
		for (var i = 0; i < solarSystem._planets.length; i++)
		{
			if (!solarSystem._planets[i].Colony)
			{
				return true;
			}
		}
		return false;
	};
	
	solarSystem.SetupNameSprite = function()
	{
		if (solarSystem._nameSprite == undefined)
		{
			solarSystem._nameSprite = TextSprite(solarSystem.Name, solarSystem._coordinate[0], solarSystem._coordinate[1]);
			solarSystem._nameSprite.OffsetX = 10;
			solarSystem._nameSprite.OffsetY = 50;
			if (solarSystem.HasColony())
			{
				solarSystem._nameSprite.SetColor("0f0");
			}
		}
	};
	
	solarSystem.UpdatePlanetInfo = function()
	{
		for (var i = 0; i < solarSystem._planets.length; i++)
		{
			solarSystem._planets[i].UpdateInfoText();
		}
	};

	solarSystem.CreatePlanet = function()
	{
		var planet = Planet(solarSystem, solarSystem.Name + " " + Names.Romanize(solarSystem._planets.length+1));
		solarSystem._planets.push(planet);
		return planet;
	};
	
	solarSystem.GetCoordinate = function()
	{
		return solarSystem._coordinate;
	};
	
	solarSystem.IsTouchingMouse = function(uiAnchor)
	{
		var width = 36;
		var height = 36;
		var xx = solarSystem._coordinate[0]-width/2 + uiAnchor.X;
		var yy = solarSystem._coordinate[1]-height/2 + uiAnchor.Y;
		var mouseX = Resources.Input.MouseX;
		var mouseY = Resources.Input.MouseY;
		if (mouseX > xx && mouseX < xx+width && mouseY > yy && mouseY < yy+height)
		{
			return true;
		}
		return false;
	};
	
	solarSystem._rotatePlanet = function(planet, i)
	{
		var t = Date.now()/50000;
		var r = t+((i/solarSystem._planets.length) * Math.PI*2)%(Math.PI*2);
		var px = Resources.ScreenWidth()/2 + Math.cos(r) * Resources.ScreenWidth() * 0.35;
		var py = Resources.ScreenHeight()/2 + Math.sin(r) * Resources.ScreenHeight() * 0.35;
		planet._sprite.SetPosition(px, py);
	};
	
	solarSystem.UpdateSolarSystemView = function()
	{
		solarSystem._star.UpdateSolarSystemView();

		for (var i = 0; i < solarSystem._planets.length; i++)
		{
			var planet = solarSystem._planets[i];
			solarSystem._rotatePlanet(planet, i);
			if (Resources.Input.LeftClick > 0 && solarSystem.CurrentPlanet != planet)
			{
				if (planet.IsTouchingMouse(camera))
				{
					Resources.Input.LeftClick = 0;
					Resources.PlaySound(0);
					solarSystem.CurrentPlanet = planet;
					Game.PlanetaryDisplay.SetPlanet(planet);
					Game.PlanetaryDisplay.Display();
				}
			}
		}
		
	};
	
	solarSystem.UpdateGalaxyView = function()
	{
		solarSystem._star.UpdateGalaxyView(solarSystem._coordinate[0], solarSystem._coordinate[1]);
	};
	
	solarSystem.RenderGalaxyView = function(targetCanvas, camera)
	{
		if (targetCanvas != null)
		{
			solarSystem._star.RenderGalaxyView(targetCanvas,camera);
			if (solarSystem._nameSprite != undefined && solarSystem.IsIdentified)
			{
				solarSystem._nameSprite.Render(targetCanvas, camera);
			}
		}
	};

	solarSystem.RenderSolarSystemView = function(targetCanvas)
	{
		if (targetCanvas != null)
		{
			solarSystem._star.Render(targetCanvas);
			for (var i = 0; i < solarSystem._planets.length; i++)
			{
				solarSystem._planets[i].Render(targetCanvas);
			}
		}
	};
	
	for (var i = 0; i < Math.random() * 8; i++)
	{
		solarSystem.CreatePlanet(); // test data
	}
	
	solarSystem.UpdateGalaxyView();
	
	return solarSystem;
}