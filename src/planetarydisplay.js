function PlanetaryDisplay()
{
	var planetaryDisplay = {};
	planetaryDisplay._currentPlanet = null;
	planetaryDisplay._lowerAnchor = UIAnchor(1);
	planetaryDisplay._leftAnchor = UIAnchor(5);
	planetaryDisplay._middleAnchor = UIAnchor(4);
	planetaryDisplay._rightAnchor = UIAnchor(6);
	planetaryDisplay._leaderTitleText = TextSprite("",-50,10);
	planetaryDisplay._leaderText = TextSprite("",-45,30);
	

	var cam = {};
	cam.X = 0;
	cam.Y = 0;

	planetaryDisplay._renderBackground = function()
	{
		// render the background canvas once
		Resources.BackCanvas.rect(0, 0, Resources.ScreenWidth(), Resources.ScreenHeight());
		Resources.BackCanvas.fillStyle = "black";
		Resources.BackCanvas.fill();
	};

	planetaryDisplay._update = function()
	{
		Game.Interface.Update();
		planetaryDisplay._rightAnchor.Update();
		planetaryDisplay._lowerAnchor.Update();
		planetaryDisplay._middleAnchor.Update();
		planetaryDisplay._leftAnchor.Update();
	};

	planetaryDisplay._renderPlanet = function()
	{
		// use front canvas
		planetaryDisplay._sky.Render(Resources.FrontCanvas);
		if (planetaryDisplay._currentPlanet != null)// if we have a galaxy to display
		{
			planetaryDisplay._currentPlanet.RenderPlanetaryView(Resources.FrontCanvas, planetaryDisplay._lowerAnchor);
		}
	};
	
	planetaryDisplay._renderColony = function()
	{
		if (planetaryDisplay._currentPlanet.Colony)
		{
			planetaryDisplay._citizenWindow.Render(Resources.FrontCanvas, planetaryDisplay._middleAnchor);
			planetaryDisplay._currentPlanet.Colony.RenderCitizens(Resources.FrontCanvas, planetaryDisplay._middleAnchor);
			planetaryDisplay._currentPlanet.Colony.RenderPlanetaryTech(Resources.FrontCanvas, planetaryDisplay._lowerAnchor);
		}
		if (Game.SolarSystemDisplay._currentSolarSystem && Game.SolarSystemDisplay._currentSolarSystem.Leader)
		{
			Game.SolarSystemDisplay._currentSolarSystem.Leader.Render(Resources.FrontCanvas, planetaryDisplay._rightAnchor);
		}
	};

	planetaryDisplay._renderInterface = function()
	{
		// use interface canvas
		Resources.InterfaceCanvas.clearRect(0, 0, Resources.ScreenWidth(), Resources.ScreenHeight());
		planetaryDisplay._leftAnchor.Render(Resources.InterfaceCanvas);
		planetaryDisplay._rightAnchor.Render(Resources.InterfaceCanvas);
		if (planetaryDisplay._currentPlanet.Colony && planetaryDisplay._currentPlanet.Colony.SelectedCitizen)
		{
			planetaryDisplay._currentPlanet.Colony.SelectedCitizen.Render(Resources.InterfaceCanvas, Game.Interface.Mouse);
		}
		Game.Interface.Render();
	};

	planetaryDisplay._render = function()
	{
		if (Resources.ResizeWindow() == true)
		{
			planetaryDisplay._rightAnchor.HandleScreenSizeChanged();
			planetaryDisplay._lowerAnchor.HandleScreenSizeChanged();
			planetaryDisplay._leftAnchor.HandleScreenSizeChanged();
			planetaryDisplay._middleAnchor.HandleScreenSizeChanged();
			planetaryDisplay._renderBackground();
			
			if (planetaryDisplay._currentPlanet)
			{
				planetaryDisplay._sky.FitScreen();
			};
		}
		Resources.FrontCanvas.clearRect(0, 0, Resources.ScreenWidth(), Resources.ScreenHeight());
		planetaryDisplay._renderPlanet();
		planetaryDisplay._renderColony();
		planetaryDisplay._renderInterface();
	};

	planetaryDisplay.Display = function()
	{
		// resize the canvases to the window
		if (planetaryDisplay._currentPlanet)
		{
			if (Game.SolarSystemDisplay._currentSolarSystem)
			{
				planetaryDisplay._sky.Type = Game.SolarSystemDisplay._currentSolarSystem._star._type;
			}
			Game.Interface.SetTitle(planetaryDisplay._currentPlanet.Name);
		}
		Resources.ResizeWindow();
		planetaryDisplay._sky.FitScreen();
		planetaryDisplay._rightAnchor.HandleScreenSizeChanged();
		planetaryDisplay._lowerAnchor.HandleScreenSizeChanged();
		planetaryDisplay._middleAnchor.HandleScreenSizeChanged();
		planetaryDisplay._leftAnchor.HandleScreenSizeChanged();
		// set the update & render methods
		Resources.SetUpdateMethod(planetaryDisplay._update);
		Resources.SetRenderMethod(planetaryDisplay._render);

		Game.Interface.RectSprite.FitScreen();
		Game.Interface.RectSprite.Alpha = 1;

		planetaryDisplay._renderBackground();
	};

	planetaryDisplay.ButtonPressHandlers = {};

	planetaryDisplay.ButtonPressHandlers.ReturnToSolarSystemDisplay = function()
	{
		Game.SolarSystemDisplay.Display();
	};
	
	planetaryDisplay.ButtonHandlers = {};
	
	planetaryDisplay.ButtonHandlers.FarmerButton = function()
	{
		if (planetaryDisplay._currentPlanet.Colony)
		{
			if (planetaryDisplay._currentPlanet.Colony.SelectedCitizen)
			{
				planetaryDisplay._currentPlanet.Colony.MoveCitizen(0);
			}
			else
			{
				planetaryDisplay._currentPlanet.Colony.SelectCitizen(0);
			}
		}
	};

	planetaryDisplay.ButtonHandlers.WorkerButton = function()
	{
		if (planetaryDisplay._currentPlanet.Colony)
		{
			if (planetaryDisplay._currentPlanet.Colony.SelectedCitizen)
			{
				planetaryDisplay._currentPlanet.Colony.MoveCitizen(1);
			}
			else
			{
				planetaryDisplay._currentPlanet.Colony.SelectCitizen(1);
			}
		}
	};
	
	planetaryDisplay.ButtonHandlers.ScientistButton = function()
	{
		if (planetaryDisplay._currentPlanet.Colony)
		{
			if (planetaryDisplay._currentPlanet.Colony.SelectedCitizen)
			{
				planetaryDisplay._currentPlanet.Colony.MoveCitizen(2);
			}
			else
			{
				planetaryDisplay._currentPlanet.Colony.SelectCitizen(2);
			}
		}
	};

	planetaryDisplay.Setup = function()
	{
		var returnToSolarSystemDisplayButton = Button(20, -20);
		planetaryDisplay._sky = GradientRect(0, 0, 500, 500);
		planetaryDisplay._leftAnchor.AddChild(returnToSolarSystemDisplayButton);
		returnToSolarSystemDisplayButton.OnPress = planetaryDisplay.ButtonPressHandlers.ReturnToSolarSystemDisplay;
		planetaryDisplay._citizenWindow = Sprite(Resources.GetImage("window01.png"), 0, -100);
		
		returnToSolarSystemDisplayButton.SetSize(96, 96);
		returnToSolarSystemDisplayButton.SetSprite("solarSystemButton01.png");
		
		var workerButton = Button(0, -102);
		workerButton.SetSize(360, 50);
		workerButton.OnPress = planetaryDisplay.ButtonHandlers.WorkerButton;
		planetaryDisplay._middleAnchor.AddChild(workerButton);
		
		var farmerButton = Button(0, -155);
		farmerButton.SetSize(360, 50);
		farmerButton.OnPress = planetaryDisplay.ButtonHandlers.FarmerButton;
		planetaryDisplay._middleAnchor.AddChild(farmerButton);
		
		var scienceButton = Button(0, -48);
		scienceButton.SetSize(360, 50);
		scienceButton.OnPress = planetaryDisplay.ButtonHandlers.ScientistButton;
		planetaryDisplay._middleAnchor.AddChild(scienceButton);
		
		planetaryDisplay._rightAnchor.AddChild(planetaryDisplay._leaderText);
		planetaryDisplay._rightAnchor.AddChild(planetaryDisplay._leaderTitleText);
	};

	planetaryDisplay.SetPlanet = function(planet)
	{
		if (planet != null)
		{
			planetaryDisplay._currentPlanet = planet;
			if (planetaryDisplay._currentPlanet.Colony && planetaryDisplay._currentPlanet.Colony.SelectedCitizen)
			{
				planetaryDisplay._currentPlanet.Colony.SelectedCitizen = undefined;
			}
			
			if (Game.SolarSystemDisplay._currentSolarSystem && Game.SolarSystemDisplay._currentSolarSystem.Leader)
			{
				var leader = Game.SolarSystemDisplay._currentSolarSystem.Leader;
				planetaryDisplay._leaderTitleText.SetText(leader.Title);
				planetaryDisplay._leaderText.SetText(leader.Name);
			}
			else
			{
				planetaryDisplay._leaderTitleText.SetText("");
				planetaryDisplay._leaderText.SetText("");
			}
		}
	};

	return planetaryDisplay;
}
