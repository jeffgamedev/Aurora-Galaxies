function GalaxyDisplay()
{
	var galaxyDisplay = {};
	
	galaxyDisplay._currentGalaxy = null;
	galaxyDisplay._lowerAnchor = UIAnchor(1);
	galaxyDisplay._rightAnchor = UIAnchor(3);
	galaxyDisplay._scrollBounds = [0, 0, 0, 0];
	galaxyDisplay._camera = {};
	galaxyDisplay._camera.X = 0;
	galaxyDisplay._camera.Y = 0;
	galaxyDisplay._scrollSpeedX = 0;
	galaxyDisplay._scrollSpeedY = 0;
	galaxyDisplay._solarSystemSelectionSprite = undefined;
	galaxyDisplay._selectedFleet = undefined;
	galaxyDisplay._autoScrolling = false;
	galaxyDisplay._adjacentShips = new Array();
	galaxyDisplay._selectedShips = new Array();
	galaxyDisplay._ships = new Array();
	galaxyDisplay._selectingDestination = false;

	galaxyDisplay._renderBackground = function()
	{
		// render the background canvas once
		Resources.BackCanvas.rect(0,0,Resources.ScreenWidth(),Resources.ScreenHeight());
		Resources.BackCanvas.fillStyle="black";
		Resources.BackCanvas.fill();
	};
	
	galaxyDisplay._setGalaxyViewBounds = function(galaxy)
	{
		if (galaxy != null)
		{
			for (var i = 0; i < galaxy.SolarSystems.length; i++)
			{
				var position = galaxy.SolarSystems[i].GetCoordinate();
				if (position[0] < galaxyDisplay._scrollBounds[0])
				{
					galaxyDisplay._scrollBounds[0] = position[0];
				}
				if (position[1] < galaxyDisplay._scrollBounds[1])
				{
					galaxyDisplay._scrollBounds[1] = position[1];
				}
				if (position[0] > galaxyDisplay._scrollBounds[2])
				{
					galaxyDisplay._scrollBounds[2] = position[0];
				}
				if (position[1] > galaxyDisplay._scrollBounds[3])
				{
					galaxyDisplay._scrollBounds[3] = position[1];
				}
			}
		}
	};
	
	galaxyDisplay._update = function()
	{
		Game.Interface.Update();
		galaxyDisplay._lowerAnchor.Update();
		galaxyDisplay._rightAnchor.Update();
		galaxyDisplay._updateSolarSystems();
		galaxyDisplay._scrollGalaxyView();
	};
	
	galaxyDisplay._getAdjacentShips = function()
	{
		if (galaxyDisplay._currentGalaxy && galaxyDisplay._currentGalaxy.SelectedSolarSystem)
		{
			galaxyDisplay._adjacentShips.length = 0;
			for (var i = 0; i < galaxyDisplay._ships.length; i++)
			{
				if (galaxyDisplay._ships[i]._currentSolarSystem == galaxyDisplay._currentGalaxy.SelectedSolarSystem)
				{
					galaxyDisplay._adjacentShips.push(galaxyDisplay._ships[i]);
				}
			}
		}
	};
	
	galaxyDisplay._setSelectedShipsDestination = function(solarSystem)
	{
		for (var i = 0; i < galaxyDisplay._selectedShips.length; i++)
		{
			galaxyDisplay._selectedShips[i].SetTarget(solarSystem);
		}
	};
	
	galaxyDisplay._updateSolarSystems = function()
	{
		if (galaxyDisplay._currentGalaxy)
		{
			var ss = galaxyDisplay._currentGalaxy.SelectedSolarSystem;
			galaxyDisplay._currentGalaxy.UpdateSolarSystemsDisplay(galaxyDisplay._camera);
			if (ss != galaxyDisplay._currentGalaxy.SelectedSolarSystem)
			{
				if (galaxyDisplay._selectingDestination && galaxyDisplay._selectedShips.length > 0)
				{
					galaxyDisplay._setSelectedShipsDestination(galaxyDisplay._currentGalaxy.SelectedSolarSystem);
					galaxyDisplay._selectingDestination = false;
				}
				// Selected a galaxy.
				galaxyDisplay._displaySolarSystemButton.Visible = true;
				galaxyDisplay._selectedShips = [];
				galaxyDisplay._getAdjacentShips();
				galaxyDisplay._autoScrolling = true;
			}
		}
		
		if (galaxyDisplay._displaySolarSystemButton)
		{
			galaxyDisplay._moveFleetsButton.Visible = galaxyDisplay._selectedShips.length > 0;
			galaxyDisplay._selectFleetsButton.Visible = galaxyDisplay._adjacentShips.length > 0 && galaxyDisplay._selectedShips.length == 0;
			if (galaxyDisplay._currentGalaxy.SelectedSolarSystem)
			{
				galaxyDisplay._displaySolarSystemButton.Visible = true;
			}
			else
			{
				galaxyDisplay._displaySolarSystemButton.Visible = false;
			}
		};
	};
	
	galaxyDisplay._scrollGalaxyView = function()
	{
		galaxyDisplay._scrollSpeedX = Math.round(InterpolateNumber(galaxyDisplay._scrollSpeedX, 0, 4));
		galaxyDisplay._scrollSpeedY = Math.round(InterpolateNumber(galaxyDisplay._scrollSpeedY, 0, 4));
		if (Resources.Input.LeftClick > 0)
		{
			galaxyDisplay._autoScrolling = false;
			galaxyDisplay._scrollSpeedX = Game.Interface.Mouse.DeltaX;
			galaxyDisplay._scrollSpeedY = Game.Interface.Mouse.DeltaY;
			galaxyDisplay._camera.X += galaxyDisplay._scrollSpeedX;
			galaxyDisplay._camera.Y += galaxyDisplay._scrollSpeedY;
		}
		else if (galaxyDisplay._autoScrolling && galaxyDisplay._currentGalaxy && galaxyDisplay._currentGalaxy.SelectedSolarSystem)
		{
			var tx = -galaxyDisplay._currentGalaxy.SelectedSolarSystem._coordinate[0] + Resources.ScreenWidth()/2;
			var ty = -galaxyDisplay._currentGalaxy.SelectedSolarSystem._coordinate[1] + Resources.ScreenHeight()/2;
			galaxyDisplay._camera.X += Math.floor((tx-galaxyDisplay._camera.X)/10);
			galaxyDisplay._camera.Y += Math.floor((ty-galaxyDisplay._camera.Y)/10);
		}
		else
		{
			if (Math.abs(galaxyDisplay._scrollSpeedX) < 10)
			{
				galaxyDisplay._scrollSpeedX = 0;
			}
			if (Math.abs(galaxyDisplay._scrollSpeedY) < 10)
			{
				galaxyDisplay._scrollSpeedY = 0;
			}
			galaxyDisplay._camera.X += galaxyDisplay._scrollSpeedX;
			galaxyDisplay._camera.Y += galaxyDisplay._scrollSpeedY;
			if (galaxyDisplay._camera.X > -galaxyDisplay._scrollBounds[0])
			{
				galaxyDisplay._camera.X = Math.round(InterpolateNumber(galaxyDisplay._camera.X, -galaxyDisplay._scrollBounds[0], 10));
			}
			else
			{
				var dest = -(galaxyDisplay._scrollBounds[2]+100-Resources.ScreenWidth());
				if (galaxyDisplay._camera.X < dest)
				{
					galaxyDisplay._camera.X = Math.round(InterpolateNumber(galaxyDisplay._camera.X, dest, 10));
				}
			}
			
			if (galaxyDisplay._camera.Y > -galaxyDisplay._scrollBounds[1])
			{
				galaxyDisplay._camera.Y = InterpolateNumber(galaxyDisplay._camera.Y, -galaxyDisplay._scrollBounds[1], 10);
			}
			else
			{
				var dest = -(galaxyDisplay._scrollBounds[3]+100-Resources.ScreenHeight());
				if (galaxyDisplay._camera.Y < dest)
				{
					galaxyDisplay._camera.Y = InterpolateNumber(galaxyDisplay._camera.Y, dest, 10);
				}
			}
		}
	};
	
	galaxyDisplay._renderSelectionSprite = function()
	{
		if (galaxyDisplay._currentGalaxy)
		{
			if (galaxyDisplay._selectedShips.length > 0)
			{
				var x = galaxyDisplay._selectedShips[0]._sprite._x;
				var y = galaxyDisplay._selectedShips[0]._sprite._y;
				galaxyDisplay._solarSystemSelectionSprite.SetPosition(x, y);
				galaxyDisplay._solarSystemSelectionSprite.Render(Resources.FrontCanvas, galaxyDisplay._camera);
			}
			else if (galaxyDisplay._currentGalaxy.SelectedSolarSystem)
			{
				
				var x = galaxyDisplay._currentGalaxy.SelectedSolarSystem._coordinate[0];
				var y = galaxyDisplay._currentGalaxy.SelectedSolarSystem._coordinate[1];
				galaxyDisplay._solarSystemSelectionSprite.SetPosition(x, y);
				galaxyDisplay._solarSystemSelectionSprite.Render(Resources.FrontCanvas, galaxyDisplay._camera);
			}
		}
	};
	
	/// renders all of the solar systems of the current galaxy
	galaxyDisplay._renderSolarSystems = function()
	{
		// use front canvas
		if (galaxyDisplay._currentGalaxy != null) // if we have a galaxy to display
		{
			galaxyDisplay._currentGalaxy.RenderSolarSystems(Resources.FrontCanvas, galaxyDisplay._camera);
		}
	};
	
	galaxyDisplay._renderShips = function()
	{
		for (var i = 0; i < galaxyDisplay._ships.length; i++)
		{
			galaxyDisplay._ships[i].Update();
			galaxyDisplay._ships[i].Render(Resources.FrontCanvas, galaxyDisplay._camera);			
		}
	};
	
	/// renders the interface graphics
	galaxyDisplay._renderInterface = function()
	{
		// use interface canvas
		Resources.InterfaceCanvas.clearRect(0, 0, Resources.ScreenWidth(),Resources.ScreenHeight());
		galaxyDisplay._lowerAnchor.Render(Resources.InterfaceCanvas);
		galaxyDisplay._rightAnchor.Render(Resources.InterfaceCanvas);
		Game.Interface.Render();
	};
	
	/// renders the entire galaxy display
	galaxyDisplay._render = function()
	{	
		if (Resources.ResizeWindow() == true)
		{
			galaxyDisplay._lowerAnchor.HandleScreenSizeChanged();
			galaxyDisplay._rightAnchor.HandleScreenSizeChanged();
			galaxyDisplay._renderBackground();
		}
		Resources.FrontCanvas.clearRect(0,0,Resources.ScreenWidth(),Resources.ScreenHeight());
		galaxyDisplay._renderSelectionSprite();
		galaxyDisplay._renderSolarSystems();
		galaxyDisplay._renderShips();
		galaxyDisplay._renderInterface();
	};
	
	/// Tells the game to start displaying the galaxy view
	galaxyDisplay.Display = function()
	{
		Game.Interface.RectSprite.Alpha = 1;
		if (galaxyDisplay._currentGalaxy)
		{
			Game.Interface.SetTitle(galaxyDisplay._currentGalaxy.Name);
			galaxyDisplay._currentGalaxy.SelectedSolarSystem = undefined;
			galaxyDisplay._setGalaxyViewBounds(galaxyDisplay._currentGalaxy);
		}
		// resize the canvases to the window
		Resources.ResizeWindow();
		galaxyDisplay._rightAnchor.HandleScreenSizeChanged();
		galaxyDisplay._lowerAnchor.HandleScreenSizeChanged();
		// set the update & render methods
		Resources.SetUpdateMethod(galaxyDisplay._update);
		Resources.SetRenderMethod(galaxyDisplay._render);
		galaxyDisplay._renderBackground();
		galaxyDisplay._ships = Game.Universe.GetShips();
		galaxyDisplay._selectFleetsButton.Visible = false;
		galaxyDisplay._selectedShips.length = 0;
		galaxyDisplay._adjacentShips.length = 0;
	};
	
	/// Button Handlers object holds methods dedicated to buttons
	galaxyDisplay.ButtonPressHandlers = {};
	
	/// Switches to the solar system view with the provided solar system
	galaxyDisplay.ButtonPressHandlers.SwitchToSolarSystem = function(solarSystem)
	{
		if (galaxyDisplay._currentGalaxy.SelectedSolarSystem)
		{
			Game.SolarSystemDisplay.SetSolarSystem(galaxyDisplay._currentGalaxy.SelectedSolarSystem);
			Game.SolarSystemDisplay.Display();
		}
	};
	
	galaxyDisplay.ButtonPressHandlers.SelectAdjacentFleets = function()
	{
		galaxyDisplay._selectedShips = galaxyDisplay._adjacentShips.slice(0);
	};
	
	galaxyDisplay.ButtonPressHandlers.MoveFleet = function()
	{
		galaxyDisplay._selectingDestination = true;
	};
	
	galaxyDisplay.Setup = function()
	{
		galaxyDisplay._solarSystemSelectionSprite = Sprite(Resources.GetImage("selection.png"), 100, 100);
		
		galaxyDisplay._displaySolarSystemButton = Button(0, -30);
		galaxyDisplay._displaySolarSystemButton.OnPress = galaxyDisplay.ButtonPressHandlers.SwitchToSolarSystem;
		galaxyDisplay._displaySolarSystemButton.SetSize(96, 96);
		galaxyDisplay._displaySolarSystemButton.SetSprite("solarSystemButton01.png");
		galaxyDisplay._displaySolarSystemButton.Visible = false;
		galaxyDisplay._lowerAnchor.AddChild(galaxyDisplay._displaySolarSystemButton);
		
		galaxyDisplay._selectFleetsButton = Button(100, -30);
		galaxyDisplay._selectFleetsButton.OnPress = galaxyDisplay.ButtonPressHandlers.SelectAdjacentFleets;
		galaxyDisplay._selectFleetsButton.SetSize(96, 96);
		galaxyDisplay._selectFleetsButton.SetSprite("shipbutton.png");
		galaxyDisplay._selectFleetsButton.Visible = false;
		galaxyDisplay._lowerAnchor.AddChild(galaxyDisplay._selectFleetsButton);
		
		galaxyDisplay._moveFleetsButton = Button(100, -30);
		galaxyDisplay._moveFleetsButton.OnPress = galaxyDisplay.ButtonPressHandlers.MoveFleet;
		galaxyDisplay._moveFleetsButton.SetSize(96, 96);
		galaxyDisplay._moveFleetsButton.SetSprite("movebutton.png");
		galaxyDisplay._moveFleetsButton.Visible = false;
		galaxyDisplay._lowerAnchor.AddChild(galaxyDisplay._moveFleetsButton);
		
	};
	
	galaxyDisplay.SetGalaxy = function(galaxy)
	{
		if (galaxy != null)
		{
			galaxyDisplay._currentGalaxy = galaxy;
			galaxyDisplay._setGalaxyViewBounds(galaxy);
			for (var i = 0; i < galaxyDisplay._currentGalaxy.SolarSystems.length; i++)
			{
				galaxyDisplay._currentGalaxy.SolarSystems[i].SetupNameSprite();
			}
		}
	};
	
	return galaxyDisplay;
}