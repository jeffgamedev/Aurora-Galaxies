/* Resources class created by Jeff Brooks (c) 2013 */

// STATIC CLASS
Resources = {};

// Create public references
Resources.Input = Input();
Resources.InterfaceCanvas = undefined;
Resources.FrontCanvas = undefined;
Resources.BackCanvas = undefined;

Resources.Initialize=function()
{
	/* Private Members  */
	/********************/
	/* Canvas Setup     */
	Resources._interfaceCanvasObject = document.getElementById("interfaceCanvas");
	Resources._frontCanvasObject = document.getElementById("frontCanvas");
	Resources._backCanvasObject = document.getElementById("backCanvas");
	
	/* Methods Setup     */
	Resources._currentInterval = undefined;
	Resources._updateMethod = undefined;
	Resources._renderMethod = undefined;
	
	/* Image Library */
	Resources._images = new Array();
	Resources._imagesLib = new Object();
	Resources._loadCount = 0;
	Resources._canvasPixelBuffer = 20;

	/* Public Members   */
	/********************/
	Resources.FPS = 30;
	Resources.BackCanvas = Resources._backCanvasObject.getContext('2d');
	Resources.FrontCanvas = Resources._frontCanvasObject.getContext('2d');
	Resources.InterfaceCanvas = Resources._interfaceCanvasObject.getContext('2d');
	
	Resources.Sounds = new Array();
	
	Resources.LoadSound = function(soundName)
	{
		var sound = new Audio(soundName);
		Resources.Sounds.push(sound);
	};
	
	Resources.PlaySound = function(index)
	{
		if (index >= 0 && index < Resources.Sounds.length)
		{
			Resources.Sounds[index].currentTime = 0;
			Resources.Sounds[index].pause();
			Resources.Sounds[index].play();
		};
	};
	
	Resources.ScreenWidth = function()
	{
		return Resources._frontCanvasObject.width;
	};
	
	Resources.ScreenHeight = function()
	{
		return Resources._frontCanvasObject.height;
	};
	
	Resources.ResizeWindow = function()
	{
		if (Resources.BackCanvas.canvas.width != window.innerWidth-Resources._canvasPixelBuffer || 
			Resources.BackCanvas.canvas.height != window.innerHeight-Resources._canvasPixelBuffer)
		{
			Resources.BackCanvas.canvas.width = window.innerWidth-Resources._canvasPixelBuffer;
			Resources.BackCanvas.canvas.height = window.innerHeight-Resources._canvasPixelBuffer;
			Resources.FrontCanvas.canvas.width = window.innerWidth-Resources._canvasPixelBuffer;
			Resources.FrontCanvas.canvas.height = window.innerHeight-Resources._canvasPixelBuffer;
			Resources.InterfaceCanvas.canvas.width = window.innerWidth-Resources._canvasPixelBuffer;
			Resources.InterfaceCanvas.canvas.height = window.innerHeight-Resources._canvasPixelBuffer;
			console.log("resized canvas to window size: "
			 + Resources.BackCanvas.canvas.width + ", " + Resources.BackCanvas.canvas.width);
			return true;
		}
		return false;
	};

	/* Private Methods  */
	/********************/
	function SetInterval (interval)
	{
		if (Resources._currentInterval != undefined)
		{
			clearInterval(Resources._currentInterval);
		}
		if (interval != undefined)
		{
			setInterval(interval, 1000 / Resources.FPS);
			Resources._currentInterval = interval;
		}
	}
	
	function DefaultUpdate()
	{
	}
	
	function DefaultRender()
	{
	}
	
	function MainInterval ()
	{
		Resources._updateMethod();
		Resources._renderMethod();
		//UpdateDisplaySize();
	};
	
	/************************/
	/* Resources Initialize */
	/************************/
	Resources.Input.SetClickEventCanvas(Resources._interfaceCanvasObject);
	Resources.SetUpdateMethod(DefaultUpdate); // set the default update method
	Resources.SetRenderMethod(DefaultRender); // set the default render method
	SetInterval(MainInterval); // set the main interval
};

/* Public Methods   */
/********************/
/** Public: Resources.SetUpdateMethod : Allows public setting of the update call **/
Resources.SetUpdateMethod = function(updateMethod)
{
	if (updateMethod)
	{
		Resources._updateMethod = updateMethod;
	}
};

/** Public: Resources.SetRenderMethod : Allows public setting of the render call **/
Resources.SetRenderMethod = function(renderMethod)
{
	if (renderMethod)
	{
		Resources._renderMethod = renderMethod;	
	}
};

Resources.FinishedLoading = function ()
{
	return Resources._loadCount >= Resources._images.length;
};

/* returns an image in the library */
Resources.GetImage = function (name)
{
	if (Resources._imagesLib)
	{
		return Resources._imagesLib[name];
	}
	console.log("Err: failed to return image: " + name);
	return null;
};

Resources.LoadImage = function (filePath)
{
	console.log("loading image: " + filePath);
	var image = new Image();
	var imageName = filePath.split('/');
	imageName = imageName[imageName.length-1];
	if (Resources._imagesLib[imageName]) // already in library
	{
		return; // exit
	}
	Resources._imagesLib[imageName] = image;
	Resources._images.push(image);
	image.src = filePath;
	image.onload = function()
	{
		Resources._loadCount++;	
	};
};
