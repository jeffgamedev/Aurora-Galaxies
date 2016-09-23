/// A Colony is a population belonging to an empire and must exist on a planet
function Colony(planet, empire, baseCapacity)
{
	var colony = {};
	colony._planet = planet;
	colony._empire = empire;
	colony._farmers = new Array();
	colony._workers = new Array();
	colony._scientists = new Array();
	colony._technologies = new Array();
	colony._currentProduction = null;
	colony._currentProductionPoints = 0;
	colony._baseCapacity = (baseCapacity) ? baseCapacity : 1;

	colony.SelectedCitizen = undefined; 
	
	colony.Name = "Colony " + Math.floor((Math.random() * 99999)).toString();
	
	colony.GetTotalCitizens = function()
	{
		return colony._scientists.length + colony._farmers.length + colony._workers.length; 
	};
	
	colony.AddTech = function()
	{
		colony._technologies.push(Tech());
	};
	
	colony.GetCapacity = function()
	{
		return colony._baseCapacity;
	};
	
	colony.CreateCitizen = function(type)
	{
		if (type == undefined)
		{
			type = 0;
		}
		var totalCitizens = colony.GetTotalCitizens();
		if (totalCitizens < colony.GetCapacity())
		{
			var citizen = new Citizen(type);
			switch (type)
			{
				case 1:
					colony._workers.push(citizen);
					break;
				case 2:
					colony._scientists.push(citizen);
					break;
				default:
					colony._farmers.push(citizen);
					break;
				
			}
			return citizen;	
		}
		console.log("Could not create citizen, colony has met capacity: " + totalCitizens + " / " + colony.GetCapacity());
		return null;
	};
	
	colony.CreateShip = function()
	{
		if (colony._empire && colony._planet && colony._planet._solarSystem)
		{
			colony._empire.CreateShip(colony._planet._solarSystem);
		}
	};
	
	colony.GetPopulationString = function()
	{
		var totalCitizens = colony.GetTotalCitizens();
		var capacity = colony.GetCapacity();
		var percentage = Math.floor(((totalCitizens/capacity) * 10000) / 100);
		return "Pop: " + totalCitizens + "/" + Math.floor(capacity) + " (" + percentage+"%)";
	};
	
	colony.GetCapital = function()
	{
		//TODO: Income/deficit
		return 0;
	};
	
	colony.GetCapitalString = function()
	{
		var income = colony.GetCapital();
		if (income < 0)
		{
			return "(" + income + ")";
		}
		return income.toString();
	};
	
	colony.GetFocus = function()
	{
		// TODO: create all nine cases of societal combinations
		if (colony._farmers.length > colony._workers.length && colony._farmers.length > colony._scientists.length)
		{
			return "Agriculture";
		}
		else if (colony._workers.length > colony._farmers.length && colony._workers.length > colony._scientists.length)
		{
			return "Industrial";
		}
		else if (colony._scientists.length > colony._farmers.length && colony._scientists.length > colony._workers.length)
		{
			return "Research";
		}
		return "Balanced";
	};
	
	colony.SelectCitizen = function(type)
	{
		if (!colony.SelectedCitizen)
		{
			if (type == 0 && colony._farmers.length > 0)
			{
				colony.SelectedCitizen = colony._farmers[colony._farmers.length-1];
			}
			if (type == 1 && colony._workers.length > 0)
			{
				colony.SelectedCitizen = colony._workers[colony._workers.length-1];
			}
			if (type == 2 && colony._scientists.length > 0)
			{
				colony.SelectedCitizen = colony._scientists[colony._scientists.length-1];
			}
		}
	};
	
	colony.MoveCitizen = function(newType)
	{
		if (colony.SelectedCitizen)
		{
			switch (colony.SelectedCitizen.Type)
			{
				case 0:
					var index = colony._farmers.indexOf(colony.SelectedCitizen);
					if (index >= 0)
					{
						colony._farmers.splice(index, 1);
					}
					break;
				case 1:
					var index = colony._workers.indexOf(colony.SelectedCitizen);
					if (index >= 0)
					{
						colony._workers.splice(index, 1);
					}
				case 2:
					var index = colony._scientists.indexOf(colony.SelectedCitizen);
					if (index >= 0)
					{
						colony._scientists.splice(index, 1);
					}
					break;
			} 
			
			switch (newType)
			{
				case 1:
					colony.SelectedCitizen.MakeWorker();
					colony._workers.push(colony.SelectedCitizen);
					break;
				case 2:
					colony.SelectedCitizen.MakeScientist();
					colony._scientists.push(colony.SelectedCitizen);
					break;
				default:
					colony.SelectedCitizen.MakeFarmer();
					colony._farmers.push(colony.SelectedCitizen);
					break;
			}
			colony.SelectedCitizen = undefined;
		}
	};
	
	colony.RenderPlanetaryTech = function(targetCanvas, anchor)
	{
		var w = Resources.ScreenWidth()-50;
		for (var i = 0; i < colony._technologies.length; i++)
		{
			colony._technologies[i].SetPosition(120 + (-w/2) + (i) * (w/colony._technologies.length), -150);
			colony._technologies[i].Render(targetCanvas, anchor);
		}
	};
	
	colony.RenderCitizens = function(targetCanvas, anchor)
	{
		var cam = {};
		var citizenOffsetX = 160;
		var citizenSpacingX = 36;
		
		cam.Y = anchor.Y - 160;
		var farmers = colony._farmers.length;
		var workers = colony._workers.length;
		var scientists = colony._scientists.length;
		
		if (colony.SelectedCitizen)
		{
			if (colony.SelectedCitizen.Type == 0)
			{
				farmers--;
			}
			else if (colony.SelectedCitizen.Type == 1)
			{
				workers--;
			}
			else
			{
				scientists--;
			}
		}
		
		for (var i = 0; i < farmers; i++)
		{
			cam.X = anchor.X + (i * citizenSpacingX) - citizenOffsetX;
			colony._farmers[i].Render(targetCanvas, cam);
		}
		cam.Y = anchor.Y - 105;
		for (var i = 0; i < workers; i++)
		{
			cam.X = anchor.X + (i * citizenSpacingX) - citizenOffsetX;
			colony._workers[i].Render(targetCanvas, cam);
		}
		cam.Y = anchor.Y - 50;
		for (var i = 0; i < scientists; i++)
		{
			cam.X = anchor.X + (i * citizenSpacingX) - citizenOffsetX;
			colony._scientists[i].Render(targetCanvas, cam);
		}
	};

	for (i = 0; i < Math.random() * colony.GetCapacity(); i++)
	{
		colony.CreateCitizen(Math.floor(Math.random()*3));
	}
	
	var r =  Math.random() * 6;
	for (i = 0; i <= r; i++)
	{
		colony.AddTech();		
	}
	
	colony.CreateShip();
	
	return colony;
}