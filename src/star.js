/// A star is the center of a solar system
function Star()
{
	var starPNGs = ["star01.png","star02.png","star03.png","star04.png"];
	var galaxyStarPNGs = ["galaxy_star_01.png","galaxy_star_02.png","galaxy_star_03.png","galaxy_star_04.png"];
	var star = {};
	star._x = 400;
	star._y = 400;
	star._size = 2;
	star._type = Math.floor(Math.random()*4);
	star._name = "Sun " + Math.floor((Math.random() * 99999)).toString();
	
	var spriteName = starPNGs[star._type%starPNGs.length];
	var galaxySpriteName = galaxyStarPNGs[star._type%galaxyStarPNGs.length];
	star._sprite = Sprite(Resources.GetImage(spriteName), 128, 128);
	star._galaxySprite = Sprite(Resources.GetImage(galaxySpriteName));
	
	star.Render = function(targetCanvas, camera)
	{
		if (targetCanvas != null)
		{
			star._sprite.Render(targetCanvas, camera);
		}
	};
	
	star.RenderGalaxyView = function(targetCanvas, camera)
	{
		if (targetCanvas != null)
		{
			star._galaxySprite.Render(targetCanvas, camera);
		}
	};
	
	star.UpdateSolarSystemView = function()
	{
		star._sprite.SetPosition(Resources.ScreenWidth()/2,Resources.ScreenHeight()/2);
	};
	
	star.UpdateGalaxyView = function(x, y)
	{
		star._galaxySprite.SetPosition(x, y);
	};
	
	return star;
}
