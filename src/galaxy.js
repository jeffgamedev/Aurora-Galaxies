/// A galaxy is a child of the universe and contains solar systems
function Galaxy()
{
	var galaxy = {};
	
	galaxy.SolarSystems = new Array();
	
	galaxy.Name = Names.GetUniqueName() + " " + Names.GetGalaxySurname();
	galaxy.SelectedSolarSystem = undefined;
	
	galaxy.CreateSolarSystem = function(x, y)
	{
		var solarSystem = SolarSystem(x, y);
		galaxy.SolarSystems.push(solarSystem);
		return solarSystem;
	};
	
	galaxy.UpdateSolarSystemsDisplay = function(camera)
	{
		if (Resources.Input.LeftClick > 0) // if there was a click
		{
			for (var i = 0; i < galaxy.SolarSystems.length; i++) // go through each s.s.
			{
				var solarSystem = galaxy.SolarSystems[i];
				// if it is touching the mouse & it is not the currently selected s.s.
				if (galaxy.SelectedSolarSystem != solarSystem && solarSystem.IsTouchingMouse(camera))
				{
					Resources.Input.LeftClick = 0;
					galaxy.SelectedSolarSystem = solarSystem; // select it
				}
			}
		}
	};
	
	galaxy.RenderSolarSystems = function(targetCanvas, camera)
	{
		if (targetCanvas != null)
		{
			for (var i = 0; i < galaxy.SolarSystems.length; i++)
			{
				galaxy.SolarSystems[i].RenderGalaxyView(targetCanvas, camera);
			}
		}
	};
	
	for (var x = 300; x < 2000; x += 100 )
	{
		for (var y = 300; y < 2000; y += 100 )
		{
			if (Math.random() * 100 < 20)
			{
				galaxy.CreateSolarSystem(x + (-25 + Math.random() * 50), y+(-25+ Math.random() * 50)); // test data
			}
		}
	}
	
	return galaxy;
}
