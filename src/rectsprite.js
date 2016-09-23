function RectSprite(rx, ry, width, height)
{
	var rectSprite = document.createElement('canvas');
	var rectCtx = rectSprite.getContext('2d');
	rectSprite.width = (width) ? width : 100;
	rectSprite.height = (height) ? height : 100;
	rectSprite.X = (rx) ? rx : 0;
	rectSprite.Y = (ry) ? ry : 0;
	rectSprite.Alpha = 1;
	
	rectSprite.FitScreen = function()
	{
		rectSprite.X = 0;
		rectSprite.Y = 0;
		rectSprite.width = Resources.ScreenWidth();
		rectSprite.height = Resources.ScreenHeight();
	};
	
	rectSprite.FitHorizontal = function()
	{
		rectSprite.X = 0;
		rectSprite.width = Resources.ScreenWidth();
	};
	
	rectSprite.SetHeight = function(newHeight)
	{
		if (newHeight)
		{
			rectSprite.height = newHeight;
		}
	};
	
	rectSprite.FadeOut = function()
	{
		if (rectSprite.Alpha > 0)
		{
			rectSprite.Alpha -= 0.1;
			if (rectSprite.Alpha < 0)
			{
				rectSprite.Alpha = 0;
			}
		}
	};
	
	rectSprite.FadeIn = function()
	{
		if (rectSprite.Alpha < 1.0)
		{
			rectSprite.Alpha += 0.1;
		}
	};
	
	rectSprite.Render = function(canvas, camera)
	{
		if (rectSprite.Alpha > 0)
		{
			var xx = rectSprite.X + ((camera) ? camera.X : 0);
			var yy = rectSprite.Y + ((camera) ? camera.Y : 0);
			rectSprite.RenderFadingRect(canvas, xx, yy);
		}
	};
	
	rectSprite.RenderFadingRect = function(canvas, x, y)
	{
		rectCtx.globalAlpha = Math.round(rectSprite.Alpha*10)/10;
		rectCtx.clearRect(x, y, rectSprite.width, rectSprite.height);
		rectCtx.fillRect(x, y, rectSprite.width, rectSprite.height);
		canvas.drawImage(rectSprite, Math.floor(x), Math.floor(y));
	};
	
	return rectSprite;
}

function RectGraphic(spriteName, rx, ry, width, height)
{
	var rectSprite = document.createElement('canvas');
	var rectCtx = rectSprite.getContext('2d');
	var img = Resources.GetImage(spriteName);
	rectSprite.width = width;
	rectSprite.height = height;
	rectCtx.rect(0, 0, rectSprite.width, rectSprite.height);
	rectCtx.fillStyle = rectCtx.createPattern(img, 'repeat');
	rectCtx.fill();
	rectSprite.X = rx;
	rectSprite.Y = ry;
	rectSprite.Alpha = 1;
	
	rectSprite.FitScreen = function()
	{
		if (rectSprite.width != Resources.ScreenWidth() || rectSprite.height != Resources.ScreenHeight())
		{
			rectSprite.X = -Resources.ScreenWidth()/2;
			rectSprite.Y = -Resources.ScreenHeight()/2;
			rectSprite.width = Resources.ScreenWidth();
			rectSprite.height = Resources.ScreenHeight();
			rectCtx.rect(0, 0, rectSprite.width, rectSprite.height);
			rectCtx.fillStyle = rectCtx.createPattern(img, 'repeat');
			rectCtx.fill();
		}
	};
	
	rectSprite.FitHorizontal = function()
	{
		if (rectSprite.width != Resources.ScreenWidth())
		{
			rectSprite.X = -Resources.ScreenWidth()/2;
			rectSprite.width = Resources.ScreenWidth()+1;
			rectCtx.rect(0, 0, rectSprite.width, rectSprite.height);
			rectCtx.fillStyle = rectCtx.createPattern(img, 'repeat');
			rectCtx.fill();
		}
	};
	
	rectSprite.SetHeight = function(height)
	{
		rectSprite.height = height;
	};
	
	rectSprite.FadeOut = function()
	{
		if (rectSprite.Alpha > 0)
		{
			rectSprite.Alpha -= 0.1;
			if (rectSprite.Alpha < 0)
			{
				rectSprite.Alpha = 0;
			}
		}
	};
	
	rectSprite.FadeIn = function()
	{
		if (rectSprite.Alpha < 1.0)
		{
			rectSprite.Alpha += 0.1;
		}
	};
	
	rectSprite.Render = function(canvas, camera)
	{
		if (rectSprite.Alpha > 0)
		{
			var xx = rectSprite.X + ((camera) ? camera.X : 0);
			var yy = rectSprite.Y + ((camera) ? camera.Y : 0);
			rectSprite.RenderFadingRect(canvas, xx, yy);
		}
	};
	
	rectSprite.RenderFadingRect = function(canvas, x, y)
	{
		rectCtx.globalAlpha = Math.round(rectSprite.Alpha*10)/10;
		rectCtx.clearRect(x, y, rectSprite.width, rectSprite.height);
		rectCtx.fillRect(x, y, rectSprite.width, rectSprite.height);
		canvas.drawImage(rectSprite, Math.floor(x), Math.floor(y));
	};
	
	return rectSprite;
}