function TextSprite(text, textX, textY)
{
	var font = "Lucida Console";
	var fontSize = 16;
	var textSprite = document.createElement('canvas');
	var textCtx = textSprite.getContext('2d');

	textSprite.X = (textX) ? textX : 0;
	textSprite.Y = (textY) ? textY : 0;
	textSprite.OffsetX = 0;
	textSprite.OffsetY = 0;
	
	textSprite._text = (text) ? text : ""; 
	textSprite._fillStyle = '#fff';
	textSprite._font = fontSize + 'pt ' + font;
	textSprite.width = Math.max(36, fontSize * text.length);
	textSprite.height = 23;
	
	textSprite._drawText = function()
	{
		textCtx.clearRect(0, 0, textSprite.width, textSprite.height);
		textCtx.fillStyle = textSprite._fillStyle;
		textCtx.font = textSprite._font;
		textCtx.textBaseline = 'top';
		textCtx.fillText(textSprite._text, 0, 0);
	};
	
	textSprite.SetFont = function(newFont)
	{
		if (newFont && textSprite._font != newFont)
		{
			textSprite._font = newFont;
			textSprite._drawText();
		}
	};
	
	textSprite.SetColor = function(colorCode)
	{
		if (colorCode && textSprite._fillStyle != colorCode)
		{
			textSprite._fillStyle = colorCode;
			textSprite._drawText();
		}
	};
	
	textSprite.SetText = function(newText)
	{
		if ((newText || newText == "") && textSprite._text != newText)
		{		
			textSprite.width = Math.max(36, fontSize * newText.length);
			textSprite._text = newText;
			textSprite._drawText();
		}
	};
	
	textSprite.Render = function(canvas, camera)
	{
		var x = textSprite.X - (textSprite.width/2) + textSprite.OffsetX + ((camera) ? camera.X : 0);
		var y = textSprite.Y - (textSprite.height/2) + textSprite.OffsetY + ((camera) ? camera.Y : 0);
		canvas.drawImage(textSprite, Math.floor(x), Math.floor(y));
	};
	
	textSprite._drawText();
	
	return textSprite;
}