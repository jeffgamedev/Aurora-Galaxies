function SolarSystemDisplay()
{
	var solarSystemDisplay = {};
	
	
	solarSystemDisplay._currentSolarSystem = null;
	solarSystemDisplay._lowerAnchor = UIAnchor(5);
	solarSystemDisplay._rightAnchor = UIAnchor(6);
	solarSystemDisplay._camera = {};
	solarSystemDisplay._camera.X = 0;
	solarSystemDisplay._camera.Y = 0;
	solarSystemDisplay._leaderTitleText = TextSprite("",-50,10);
	solarSystemDisplay._leaderText = TextSprite("",-45,30);

	solarSystemDisplay._renderBackground = function()
	{
		// render the background canvas once
		Resources.BackCanvas.rect(0,0,Resources.ScreenWidth(),Resources.ScreenHeight());
		Resources.BackCanvas.fillStyle="black";
		Resources.BackCanvas.fill();
	};
	
	solarSystemDisplay._update = function()
	{
		if (solarSystemDisplay._currentSolarSystem)
		{
			solarSystemDisplay._currentSolarSystem.UpdateSolarSystemView();
		}
		Game.Interface.Update();
		solarSystemDisplay._lowerAnchor.Update();
		solarSystemDisplay._rightAnchor.Update();
	};
	
	solarSystemDisplay._renderSolarSystem = function()
	{
		// use front canvas
		if (solarSystemDisplay._currentSolarSystem != null) // if we have a galaxy to display
		{
			solarSystemDisplay._currentSolarSystem.RenderSolarSystemView(Resources.FrontCanvas);
			if (solarSystemDisplay._currentSolarSystem.Leader)
			{
				solarSystemDisplay._currentSolarSystem.Leader.Render(Resources.FrontCanvas, solarSystemDisplay._rightAnchor);
			}
		}
	};
	
	solarSystemDisplay._renderInterface = function()
	{
		// use interface canvas
		Resources.InterfaceCanvas.clearRect(0, 0, Resources.ScreenWidth(),Resources.ScreenHeight());
		solarSystemDisplay._lowerAnchor.Render(Resources.InterfaceCanvas);
		solarSystemDisplay._rightAnchor.Render(Resources.InterfaceCanvas);
		Game.Interface.Render();
	};
	
	solarSystemDisplay._render = function()
	{	
		if (Resources.ResizeWindow() == true)
		{
			solarSystemDisplay._lowerAnchor.HandleScreenSizeChanged();
			solarSystemDisplay._rightAnchor.HandleScreenSizeChanged();
			solarSystemDisplay._renderBackground();
		}
		Resources.FrontCanvas.clearRect(0,0,Resources.ScreenWidth(),Resources.ScreenHeight());
		solarSystemDisplay._renderSolarSystem();
		solarSystemDisplay._renderInterface();
	};
	
	solarSystemDisplay.Display = function()
	{
		// resize the canvases to the window
		if (solarSystemDisplay._currentSolarSystem)
		{
			solarSystemDisplay._currentSolarSystem.CurrentPlanet = undefined;
			solarSystemDisplay._currentSolarSystem.UpdatePlanetInfo();
			Game.Interface.SetTitle(solarSystemDisplay._currentSolarSystem.Name);
		}
		Resources.ResizeWindow();
		solarSystemDisplay._rightAnchor.HandleScreenSizeChanged();
		solarSystemDisplay._lowerAnchor.HandleScreenSizeChanged();
		// set the update & render methods
		Resources.SetUpdateMethod(solarSystemDisplay._update);
		Resources.SetRenderMethod(solarSystemDisplay._render);
		
		Game.Interface.RectSprite.FitScreen();
		Game.Interface.RectSprite.Alpha = 1;
		
		solarSystemDisplay._renderBackground();
	};
	
	solarSystemDisplay.ButtonPressHandlers = {};
	
	solarSystemDisplay.ButtonPressHandlers.ReturnToGalaxyDisplay = function()
	{
		Game.GalaxyDisplay.Display();
	};

	solarSystemDisplay.Setup = function()
	{
		var returnToGalaxyDisplayButton = Button(20, -20);
		returnToGalaxyDisplayButton.SetSize(96, 96);
		returnToGalaxyDisplayButton.SetSprite("galaxyButton01.png");
		solarSystemDisplay._lowerAnchor.AddChild(returnToGalaxyDisplayButton);
		solarSystemDisplay._rightAnchor.AddChild(solarSystemDisplay._leaderText);
		solarSystemDisplay._rightAnchor.AddChild(solarSystemDisplay._leaderTitleText);
		returnToGalaxyDisplayButton.OnPress = solarSystemDisplay.ButtonPressHandlers.ReturnToGalaxyDisplay;
	};
	
	solarSystemDisplay.SetSolarSystem = function(solarSystem)
	{
		if (solarSystem != null)
		{
			solarSystemDisplay._currentSolarSystem = solarSystem;
			if (solarSystem.Leader)
			{
				solarSystemDisplay._leaderTitleText.SetText(solarSystem.Leader.Title);
				solarSystemDisplay._leaderText.SetText(solarSystem.Leader.Name);
			}
			else
			{
				solarSystemDisplay._leaderTitleText.SetText("");
				solarSystemDisplay._leaderText.SetText("");
			}
		}
	};
	
	return solarSystemDisplay;
}