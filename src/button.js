function Button(x, y)
{
	var PRESSED_ANIMATION = [1];
	var UNPRESSED_ANIMATION = [0];
	
	var button = {};
	button._x = (x) ? x : 0;
	button._y = (y) ? y : 0;
	button._width = 80;
	button._height = 36;
	button._pressed = false;
	
	button.Visible = true;
	button.OnPress = undefined;
	
	button.SetSprite = function(spriteName)
	{
		var image = Resources.GetImage(spriteName);
		button._sprite = Sprite(image, button._x, button._y, button._width, button._height, 2);
		return button._sprite;
	};
	
	button.SetSize = function(width, height)
	{
		button._width = (width) ? width : button._width;
		button._height = (height) ? height : button._height;
	};
	
	button.Render = function(targetCanvas, camera)
	{
		if (button.Visible && button._sprite)
		{
			button._sprite.Render(targetCanvas, camera);
		}
	};
	
	button._isTouchingMouse = function(uiAnchor)
	{
		var xx = button._x-button._width/2 + ((uiAnchor) ? uiAnchor.X : 0);
		var yy = button._y-button._height/2 + ((uiAnchor) ? uiAnchor.Y : 0);
		var mouseX = Resources.Input.MouseX;
		var mouseY = Resources.Input.MouseY;
		if (mouseX > xx && mouseX < xx+button._width && mouseY > yy && mouseY < yy+button._height)
		{
			return true;
		}
		return false;
	};
	
	button.Update = function(uiAnchor)
	{
		if (button.Visible)
		{
			if (Resources.Input.LeftClick > 0)
			{
				if (!button._pressed && button._isTouchingMouse(uiAnchor) && Date.now()-Resources.Input.LeftClick <= 100)
				{
					Resources.Input.LeftClick = 0;
					button._pressed = true;
					button._sprite.SetAnimation(PRESSED_ANIMATION);
					if (button.OnPress != undefined)
					{
						button.OnPress();
					}
					Resources.PlaySound(0);
				}
			}
			else if (button._pressed)
			{
				button._sprite.SetAnimation(UNPRESSED_ANIMATION);
				button._pressed = false;
			}
			button._sprite.Update();
		}
	};
	
	button.SetSprite("button01.png");
	
	return button;
}
