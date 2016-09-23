/* Input class by Jeff Brooks (c) 2013 */

function Input()
{
	var newInput = {};
	newInput._keys = new Array();
	newInput._clickEventCanvas = undefined;
	newInput._rightClickEvents = new Array();
	newInput._leftClickEvents = new Array();
	
	newInput.UP = 38;
	newInput.DOWN = 40;
	newInput.LEFT = 37;
	newInput.RIGHT = 39;
	newInput.SPACE = 32;
	
	newInput.MouseX = 0;
	newInput.MouseY = 0;
	
	newInput.LeftClick = 0;
	newInput.RightClick = 0;
	
	newInput.KeyPressDown = function(event)
	{
		newInput._keys[event.keyCode] = true;
	};
	newInput.KeyPressUp = function (event)
	{
		newInput._keys[event.keyCode] = false;
	};
	newInput.GetKey = function(keycode)
	{
		return (keycode in newInput._keys && newInput._keys[keycode]);
	};
	newInput.CallRightClickEvents = function(event)
	{
		for (var i = 0; i < newInput._rightClickEvents.length; i++)
		{
			newInput._rightClickEvents[i](event);
		}
	};
	
	newInput.CallLeftClickEvents = function(event)
	{
		for (var i = 0; i < newInput._leftClickEvents.length; i++)
		{
			newInput._leftClickEvents[i](event);
		}
	};
	newInput.MouseDown = function(event)
	{
		//console.log("mouse button down: " + event.button);
		switch (event.button)
		{
			case 0: newInput.CallLeftClickEvents(event); break;
			case 2: newInput.CallRightClickEvents(event); break;
		}
	};
	
	newInput.MouseUp = function(event)
	{
		switch (event.button)
		{
			case 0: newInput.LeftClick = 0; break;
			case 2: newInput.RightClick = 0; break;
		}
	};
	
	
	newInput.MouseMove = function(event)
	{
		newInput.MouseX = event.clientX;
		newInput.MouseY = event.clientY;
	};
	
	newInput.PreventContextMenu = function(event)
	{
		event.preventDefault();
	};
	newInput.SetClickEventCanvas = function(canvas)
	{
		newInput._clickEventCanvas = canvas;
		newInput._clickEventCanvas.addEventListener('contextmenu', newInput.PreventContextMenu, false);
		newInput._clickEventCanvas.addEventListener('mousedown', newInput.MouseDown);
		newInput._clickEventCanvas.addEventListener('mouseup', newInput.MouseUp);
		newInput._clickEventCanvas.onmousemove = newInput.MouseMove;
	};
	newInput.AddRightClickEvent = function(event)
	{
		newInput._rightClickEvents.push(event);
	};
	newInput.AddLeftClickEvent = function(event)
	{
		newInput._leftClickEvents.push(event);
	};
	
	newInput._leftClickHandler = function()
	{
		newInput.LeftClick = Date.now();
	};
	
	newInput.AddLeftClickEvent(newInput._leftClickHandler);

	window.addEventListener('keydown', newInput.KeyPressDown, true);
	window.addEventListener('keyup', newInput.KeyPressUp, true);
	return newInput;
}