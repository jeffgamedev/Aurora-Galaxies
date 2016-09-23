/// A planet is a child of a solar system and can be populated with one colony at a time 
function Planet(solarSystem, name)
{
	var planetPNGs = ["planet_01.png","planet_02.png","planet_03.png","planet_04.png","planet_05.png","planet_06.png"];
	var planet = {};
	planet._solarSystem = solarSystem;
	planet._type = Math.floor(Math.random()*6);
	planet._populationCapacity = Math.floor(1.0 + (Math.random() * 12));
	
	planet._sprite = Sprite(Resources.GetImage(planetPNGs[planet._type]), 100, 100);
	planet._groundSprite = RectGraphic("Stone_Floor.png", 0, -180, 500, 200);
	planet._mountain = RectGraphic("mountain01.png", 100, -210, 640, 50);
	planet._infoText = new Array();
	
	planet.Name = (name) ? name : "???";
	planet.Colony = null;
	
	planet.CreateColony = function(empire)
	{
		if (planet.Colony == null)
		{
			planet.Colony = new Colony(planet, empire, planet._populationCapacity);
			return planet.Colony;
		}
		console.log("Could not create colony: planet already has colony.");
		return null;
	};
	
	planet._setupNameSprite = function()
	{
		planet._nameSprite = TextSprite(planet.Name, planet._sprite._x, planet._sprite._y);
		planet._nameSprite.OffsetX = 50;
		planet._nameSprite.OffsetY = 50;
	};

	planet.UpdateInfoText = function()
	{
		if (planet._infoText.length > 0)
		{
			if (planet.Colony)
			{
				planet._infoText[0].SetText(planet.Colony.GetPopulationString());
				planet._infoText[1].SetText(planet.Colony.GetFocus() + " Society");
				planet._infoText[2].SetText("Income: " +planet.Colony.GetCapitalString());
				if (planet._nameSprite)
				{
					planet._nameSprite.SetColor("0f0");
				}
			}
			else
			{
				planet._infoText[0].SetText("");
			}
		}
	};

	planet._setupInfoTextSprites = function()
	{
		planet._infoText.push(TextSprite("data01", planet._sprite._x + 80, planet._sprite._y - 60));
		planet._infoText.push(TextSprite("data02", planet._sprite._x + 80, planet._sprite._y - 40));
		planet._infoText.push(TextSprite("data03", planet._sprite._x + 80, planet._sprite._y - 20));
		planet.UpdateInfoText ();
	};

	planet._renderColonyText = function(targetCanvas)
	{
		if (planet.Colony)
		{
			if (planet._infoText.length == 0)
			{
				planet._setupInfoTextSprites();
			}
			for (var i = 0; i < planet._infoText.length; i++)
			{
				var textSprite = planet._infoText[i];
				textSprite.X = planet._sprite._x + 50 + textSprite.width/2;
				textSprite.Y = planet._sprite._y - 40 + (i * 22);
				textSprite.Render(targetCanvas);
			}
		}
	};
	
	planet.Render = function(targetCanvas)
	{
		if (!planet._nameSprite)
		{
			planet._setupNameSprite();
		}
		planet._sprite.Render(targetCanvas);
		planet._nameSprite.X = planet._sprite._x + 20 - planet._nameSprite.width/2;
		planet._nameSprite.Y = planet._sprite._y + 10;
		planet._nameSprite.Render(targetCanvas);
		planet._renderColonyText(targetCanvas);
	};

	planet.RenderPlanetaryView = function(targetCanvas, anchor)
	{
		planet._groundSprite.FitHorizontal();
		planet._mountain.FitHorizontal();
		planet._mountain.Render(targetCanvas, anchor);
		planet._groundSprite.Render(targetCanvas, anchor);
	};
	
	planet.IsTouchingMouse = function(uiAnchor)
	{
		var width = 80;
		var height = 80;
		var xx = planet._sprite._x-width/2 + uiAnchor.X;
		var yy = planet._sprite._y-height/2 + uiAnchor.Y;
		var mouseX = Resources.Input.MouseX;
		var mouseY = Resources.Input.MouseY;
		if (mouseX > xx && mouseX < xx+width && mouseY > yy && mouseY < yy+height)
		{
			return true;
		}
		return false;
	};
	
	return planet;
}