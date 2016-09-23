function Interface()
{
	var gameInterface = {};
	
	gameInterface.Mouse = undefined;
	
	gameInterface.RectSprite = RectSprite(0, 0, 100, 100);
	gameInterface.TitleText = TextSprite("Space", 120, 20);
	
	gameInterface.Setup = function()
	{
		gameInterface.Mouse = Mouse();
	};

	gameInterface.Render = function()
	{
		gameInterface.Mouse.Render(Resources.InterfaceCanvas);
		gameInterface.TitleText.Render(Resources.InterfaceCanvas);
		gameInterface.RectSprite.Render(Resources.InterfaceCanvas);
	};
	
	gameInterface.SetTitle = function(title)
	{
		gameInterface.TitleText = TextSprite(title, 100, 20);
	};
	
	gameInterface.Update = function()
	{
		gameInterface.Mouse.Update();
		gameInterface.RectSprite.FitScreen();
		gameInterface.RectSprite.FadeOut();
	};
	
	return gameInterface;
}