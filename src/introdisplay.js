function IntroDisplay()
{
	var introDisplay = {};
	introDisplay._currentPlanet = null;
	introDisplay._anchor = UIAnchor(4);
	introDisplay._rect = RectSprite(0, 0, 100, 100);
	introDisplay._time = 0;

	introDisplay._renderBackground = function()
	{
		// render the background canvas once
		Resources.BackCanvas.rect(0, 0, Resources.ScreenWidth(), Resources.ScreenHeight());
		Resources.BackCanvas.fillStyle = "black";
		Resources.BackCanvas.fill();
	};

	introDisplay._update = function() 
	{
		introDisplay._anchor.Update();
		//Game.Interface.Update();
		introDisplay._time++;
		if (introDisplay._time < 50)
		{
			introDisplay._rect.FadeOut();
		}
		else if (introDisplay._time < 70)
		{
			introDisplay._rect.FadeIn();	
		}
		else
		{
			Game.StartGame();
		}
	};

	introDisplay._renderInterface = function()
	{
		// use interface canvas
		Resources.InterfaceCanvas.clearRect(0, 0, Resources.ScreenWidth(), Resources.ScreenHeight());
	};

	introDisplay._render = function()
	{
		if (Resources.ResizeWindow() == true)
		{
			introDisplay._anchor.HandleScreenSizeChanged();
			introDisplay._rect.FitScreen();
		}
		Resources.FrontCanvas.clearRect(0, 0, Resources.ScreenWidth(), Resources.ScreenHeight());
		introDisplay._logoSprite.Render(Resources.FrontCanvas, introDisplay._anchor);
		introDisplay._rect.Render(Resources.FrontCanvas);
		// render logo
	};

	introDisplay.Display = function()
	{
		// resize the canvases to the window
		Game.Interface.SetTitle("");
		Resources.ResizeWindow();
		introDisplay._anchor.HandleScreenSizeChanged();
		// set the update & render methods
		introDisplay._time = 0;
		Resources.SetUpdateMethod(introDisplay._update);
		Resources.SetRenderMethod(introDisplay._render);

		Game.Interface.RectSprite.FitScreen();
		Game.Interface.RectSprite.Alpha = 1;
		
		introDisplay._rect.FitScreen();

		introDisplay._renderBackground();
	};

	introDisplay.Setup = function()
	{
		introDisplay._logoSprite = Sprite(Resources.GetImage("logo.jpg"), 0 ,0);
	};

	return introDisplay;
}