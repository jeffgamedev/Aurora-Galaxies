function Mouse()
{
	var mouse = {};
	mouse._sprite = Sprite(Resources.GetImage("mouse01.png"), 0, 0, 38, 38, 1);
	mouse._sprite._offsetX = -6;
	mouse._sprite._offsetY = -8;
	mouse.X = 0;
	mouse.Y = 0;
	mouse.DeltaX = 0;
	mouse.DeltaY = 0;
	mouse.Render = mouse._sprite.Render;
	
	mouse.Update = function()
	{
		mouse.DeltaX = Resources.Input.MouseX - mouse.X;
		mouse.DeltaY = Resources.Input.MouseY - mouse.Y;
		mouse.X = Resources.Input.MouseX;
		mouse.Y = Resources.Input.MouseY;
		mouse._sprite.SetPosition(mouse.X, mouse.Y);
	};
	return mouse;
}