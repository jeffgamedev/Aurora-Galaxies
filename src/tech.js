function Tech()
{
	var planetaryTechPNGs = ["building00.png","building01.png","building02.png","building03.png","building04.png"];
	var tech = {};
	tech._sprite = Sprite(planetaryTechPNGs[Math.floor(Math.random()*planetaryTechPNGs.length)]);

	tech.Render= tech._sprite.Render;
	
	tech.SetPosition = tech._sprite.SetPosition;
	return tech;
}
