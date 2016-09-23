function Sprite(image, startX, startY, frameWidth, frameHeight, framesPerRow)
{
	if (typeof image == "string")
	{
		image = Resources.GetImage(image);
	}
	var spriteObject = {};
	spriteObject._frame = 0;
	spriteObject._animationFrame = 0;
	spriteObject._animationSpeed = 0.5;
	spriteObject._currentAnimation = [0];
	spriteObject._image = image; // TODO: if image is null, reference default image
	spriteObject._x = (startX) ? startX : 0;
	spriteObject._y = (startY) ? startY : 0;
	spriteObject._frameWidth = (frameWidth) ? frameWidth : image.width;
	spriteObject._frameHeight = (frameHeight) ? frameHeight : image.height;
	spriteObject._framesPerRow = (framesPerRow) ? framesPerRow : 1;
	spriteObject._offsetX = -Math.floor(spriteObject._frameWidth/2);
	spriteObject._offsetY = -Math.floor(spriteObject._frameHeight/2);

	spriteObject.Visible = true;
	
	spriteObject.Render = function (canvas, camera)
	{
		if (spriteObject._image && spriteObject.Visible)
		{
			var x = spriteObject._x + spriteObject._offsetX + ((camera) ? camera.X : 0 );
			var y = spriteObject._y + spriteObject._offsetY + ((camera) ? camera.Y : 0 );
			var frameX = spriteObject._frame%spriteObject._framesPerRow;
			var frameY = Math.floor(spriteObject._frame/spriteObject._framesPerRow);
			canvas.drawImage(spriteObject._image, frameX*spriteObject._frameWidth, frameY*spriteObject._frameHeight,
			spriteObject._frameWidth, spriteObject._frameHeight, Math.round(x), Math.round(y), spriteObject._frameWidth, spriteObject._frameHeight);
		}
	};

	spriteObject.SetAnimation = function(animation)
	{
		if (spriteObject._currentAnimation != animation && animation)
		{
			spriteObject._currentAnimation = animation;
		}
	};
	
	spriteObject.Update = function()
	{
		spriteObject.Animate();
	};
	
	spriteObject.SetPosition = function(x, y)
	{
		spriteObject._x = (x) ? x : spriteObject._x;
		spriteObject._y = (y) ? y : spriteObject._y;
	};

	spriteObject.Animate = function()
	{
		spriteObject._animationFrame += spriteObject._animationSpeed;
		var animFrame = Math.floor(spriteObject._animationFrame);
		if (animFrame >= spriteObject._currentAnimation.length)
		{
			spriteObject._animationFrame = 0;
			animFrame = 0;
		}
		spriteObject._frame = spriteObject._currentAnimation[animFrame];
	};
	
	return spriteObject;
}