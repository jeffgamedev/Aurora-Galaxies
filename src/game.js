/* Aurora Galaxies (c) 2014 Mongoose Interactive */

Game = {}; // Create static Game object

Game.Initialize=function()
{
	/* Private Members  */
	/********************/
	/* Public Members   */
	/********************/
	Game.Version = 0.1;
	Game.Universe = Universe();
	Game.GalaxyDisplay = GalaxyDisplay();
	Game.SolarSystemDisplay = SolarSystemDisplay();
	Game.PlanetaryDisplay = PlanetaryDisplay();
	Game.IntroDisplay = IntroDisplay();
	Game.Interface = Interface();
	
	if (DataStorage.Supported)
	{
		var oldData = DataStorage.Load("key1");
		console.log(oldData);
		console.log("Data storage is supported!");
		DataStorage.Save("key1","test");
	}
	
	/* Private Methods  */
	/********************/
	
	/** Render : Resources Loading Render Method **/
	function Render()
	{
	}
	
	/** Resources Loading Update Method **/
	function LoadResourcesUpdate()
	{
		if (Resources.FinishedLoading())
		{
			SetupGame();
		}
	}
	
	function SetupGame()
	{
		Game.GalaxyDisplay.Setup();
		Game.SolarSystemDisplay.Setup();
		Game.PlanetaryDisplay.Setup();
		Game.Interface.Setup();
		Game.IntroDisplay.Setup();
		Game.IntroDisplay.Display();
	}
	
	Game.StartGame = function()
	{
		console.log("start game");
		var galaxy = Game.Universe.CreateGalaxy();
		var empire = Game.Universe.CreateEmpire();
		empire.RandomlyPopulateGalaxy(galaxy);
		Game.GalaxyDisplay.SetGalaxy(galaxy);
		Game.GalaxyDisplay.Display();
	};
	
	/********************/
	/* Game Initialize  */
	/********************/
	Resources.Initialize();
	Resources.LoadImage("gfx/galaxy_star_01.png");
	Resources.LoadImage("gfx/galaxy_star_02.png");
	Resources.LoadImage("gfx/galaxy_star_03.png");
	Resources.LoadImage("gfx/galaxy_star_04.png");
	Resources.LoadImage("gfx/selection.png");
	Resources.LoadImage("gfx/button01.png");
	Resources.LoadImage("gfx/shipbutton.png");
	Resources.LoadImage("gfx/movebutton.png");
	Resources.LoadImage("gfx/solarSystemButton01.png");
	Resources.LoadImage("gfx/galaxyButton01.png");
	Resources.LoadImage("gfx/mouse01.png");
	Resources.LoadImage("gfx/ship01.png");
	Resources.LoadImage("gfx/ship02.png");
	Resources.LoadImage("gfx/ship03.png");
	Resources.LoadImage("gfx/green0.png");
	Resources.LoadImage("gfx/planet_01.png");
	Resources.LoadImage("gfx/planet_02.png");
	Resources.LoadImage("gfx/planet_03.png");
	Resources.LoadImage("gfx/planet_04.png");
	Resources.LoadImage("gfx/planet_05.png");
	Resources.LoadImage("gfx/planet_06.png");
	Resources.LoadImage("gfx/building00.png");
	Resources.LoadImage("gfx/building01.png");
	Resources.LoadImage("gfx/building02.png");
	Resources.LoadImage("gfx/building03.png");
	Resources.LoadImage("gfx/building04.png");
	Resources.LoadImage("gfx/star01.png");
	Resources.LoadImage("gfx/star02.png");
	Resources.LoadImage("gfx/star03.png");
	Resources.LoadImage("gfx/star04.png");
	Resources.LoadImage("gfx/Stone_Floor.png");
	Resources.LoadImage("gfx/mountain01.png");
	Resources.LoadImage("gfx/window01.png");
	Resources.LoadImage("gfx/citizen_01_a.png");
	Resources.LoadImage("gfx/citizen_01_b.png");
	Resources.LoadImage("gfx/citizen_01_c.png");
	Resources.LoadImage("gfx/leader01.png");
	Resources.LoadImage("gfx/leader02.png");
	Resources.LoadImage("gfx/logo.jpg");
	Resources.LoadSound("sfx/beep01.wav");
	
	// setup for loading
	Resources.SetUpdateMethod(LoadResourcesUpdate);
	Resources.SetRenderMethod(Render);
	
	var music = new Audio("sfx/Aurora Galaxies - Proton Cauldron.ogg"); // buffers automatically when created
	music.loop = true;
	music.play();
	
};

function InterpolateNumber(val, destVal, divisor)
{
	return val + (destVal-val)/10;
}
