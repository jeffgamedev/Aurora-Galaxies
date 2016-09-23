function UIAnchor(anchor)
{
	var uiAnchor = {};
	uiAnchor._anchor = ((anchor) ? anchor : 0 ) % 10; // 0: Top,  1: Bottom,  2: Left,  3: Right,  4: Middle
	uiAnchor._children = new Array();
	uiAnchor._pixelBuffer = 20;
	uiAnchor.X = 0;
	uiAnchor.Y = 0;
	
	uiAnchor.AddChild = function(child)
	{
		uiAnchor._children.push(child);
	};
	
	uiAnchor.Clear = function()
	{
		uiAnchor._children.length = 0;
	};
	
	uiAnchor.Render = function(canvas)
	{
		for (var i = 0; i < uiAnchor._children.length; i++)
		{
			uiAnchor._children[i].Render(canvas, uiAnchor);			
		}
	};
	
	uiAnchor.Update = function()
	{
		for (var i = 0; i < uiAnchor._children.length; i++)
		{
			if (uiAnchor._children[i].Update)
			{
				uiAnchor._children[i].Update(uiAnchor);
			}
		}
	};
	
	uiAnchor.HandleScreenSizeChanged = function()
	{
		var screenWidth = Resources.ScreenWidth();
		var screenHeight = Resources.ScreenHeight();
		
		if (uiAnchor._anchor == 0) // TOP
		{
			uiAnchor.X = Math.floor(screenWidth/2);
			uiAnchor.Y = 0 + uiAnchor._pixelBuffer;
		}
		else if (uiAnchor._anchor == 1) // BOTTOM
		{
			uiAnchor.X = Math.floor(screenWidth/2);
			uiAnchor.Y = screenHeight - uiAnchor._pixelBuffer;
		}
		else if (uiAnchor._anchor == 2) // LEFT
		{
			uiAnchor.X = 0 + uiAnchor._pixelBuffer;
			uiAnchor.Y = Math.floor(screenHeight/2);
		}
		else if (uiAnchor._anchor == 3) // RIGHT
		{
			uiAnchor.X = screenWidth - uiAnchor._pixelBuffer;
			uiAnchor.Y = Math.floor(screenHeight/2);
		}
		else if (uiAnchor._anchor == 4) // MIDDLE
		{
			uiAnchor.X = Math.floor(screenWidth/2);
			uiAnchor.Y = Math.floor(screenHeight/2);
		}
		else if (uiAnchor._anchor == 5) // BOTTOM LEFT
		{
			uiAnchor.X = 0 + uiAnchor._pixelBuffer*2;
			uiAnchor.Y = Math.floor(screenHeight) - uiAnchor._pixelBuffer*2;
		}
		else if (uiAnchor._anchor == 6) // BOTTOM RIGHT
		{
			uiAnchor.X = screenWidth - uiAnchor._pixelBuffer;
			uiAnchor.Y = Math.floor(screenHeight) - uiAnchor._pixelBuffer*2;
		}
	};
	
	return uiAnchor;
}
