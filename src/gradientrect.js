function GradientRect(rx, ry, width, height)
{
	var gradientRect = document.createElement('canvas');
	var rectCtx = gradientRect.getContext('2d');
	gradientRect.width = (width) ? width : 100;
	gradientRect.height = (height) ? height : 100;
	gradientRect.X = (rx) ? rx : 0;
	gradientRect.Y = (ry) ? ry : 0;
	
	gradientRect.Alpha = 1;
	gradientRect.Type = 3;
	
	gradientRect.FitScreen = function()
	{
		gradientRect.X = 0;
		gradientRect.Y = 0;
		gradientRect.width = Resources.ScreenWidth();
		gradientRect.height = Resources.ScreenHeight();
		gradientRect.FillGradient();
	};
	
	gradientRect.FillGradient = function()
	{
		var size = Math.floor(gradientRect.height/3);
		rectCtx.globalAlpha = Math.round(gradientRect.Alpha*10)/10;
		grd = rectCtx.createLinearGradient(0.000, 0.000, 0.000, size);    
		// Add colors
		if (gradientRect.Type == 0)
		{
			grd.addColorStop(1.000, 'rgba(0, 0, 0, 1.000)');
			grd.addColorStop(0.000, 'rgba(200, 198, 53, 1.000)');
		}
		else if (gradientRect.Type == 1)
		{
			grd.addColorStop(1.000, 'rgba(0, 0, 0, 1.000)');
			grd.addColorStop(0.000, 'rgba(100, 100, 255, 1.000)');
		}
		else if (gradientRect.Type == 2)
		{
			grd.addColorStop(1.000, 'rgba(0, 0, 0, 1.000)');
			grd.addColorStop(0.000, 'rgba(0, 198, 53, 1.000)');
		}
		else if (gradientRect.Type == 3)
		{
			grd.addColorStop(1.000, 'rgba(0, 0, 0, 1.000)');
			grd.addColorStop(0.000, 'rgba(255, 0, 53, 1.000)');
		}
		// Fill with gradient
		rectCtx.fillStyle = grd;
		rectCtx.fillRect(0, 0, gradientRect.width, gradientRect.height);
	};
	
	gradientRect.FitHorizontal = function()
	{
		if (rectSprite.width != Resources.ScreenWidth())
		{
			gradientRect.X = -Resources.ScreenWidth()/2;
			gradientRect.width = Resources.ScreenWidth();
			rectCtx.rect(0, 0, gradientRect.width, gradientRect.height);
			rectCtx.fillStyle = rectCtx.createPattern(img, 'repeat');
			rectCtx.fill();
		}
	};
	
	gradientRect.SetHeight = function(height)
	{
		if (height)
		{
			gradientRect.height = height;
		}
	};
	
	gradientRect.FadeOut = function()
	{
		if (gradientRect.Alpha > 0)
		{
			gradientRect.Alpha -= 0.1;
			if (gradientRect.Alpha < 0)
			{
				gradientRect.Alpha = 0;
			}
		}
	};
	
	gradientRect.FadeIn = function()
	{
		if (gradientRect.Alpha < 1.0)
		{
			gradientRect.Alpha += 0.1;
		}
	};
	
	gradientRect.Render = function(canvas, camera)
	{
		if (gradientRect.Alpha > 0)
		{
			var x = gradientRect.X;
			var y = gradientRect.Y;
			if (camera)
			{
				x += camera.X;
				y += camera.Y;
			}
			canvas.drawImage(gradientRect, Math.floor(x), Math.floor(y));
		}
	};

	gradientRect.FillGradient();
	
	return gradientRect;
}
