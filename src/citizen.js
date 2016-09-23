/// A Citizen represents 1 million people of a certain race in a colony
function Citizen(type)
{
	var citizenPNGs = ["citizen_01_a.png","citizen_01_b.png","citizen_01_c.png"];
	var citizen = {};
	citizen._race = 0;
	citizen.Name = "Citizen " + Math.floor((Math.random() * 99999)).toString();
	citizen.Type = type ? type : 0;
	
	citizen.MakeSprite = function()
	{
		citizen._sprite = Sprite(Resources.GetImage(citizenPNGs[citizen.Type]), 0, 0);
	};
	
	citizen.MakeSprite();
	
	citizen.MakeFarmer = function()
	{
		citizen.Type = 0;
		citizen.MakeSprite();
	};
	
	citizen.MakeWorker = function()
	{
		citizen.Type = 1;
		citizen.MakeSprite();
	};
	
	citizen.MakeScientist = function()
	{
		citizen.Type = 2;
		citizen.MakeSprite();
	};
	
	citizen.Render = function(targetCanvas, anchor)
	{
		citizen._sprite.Render(targetCanvas, anchor);
	};
	
	return citizen;
}
