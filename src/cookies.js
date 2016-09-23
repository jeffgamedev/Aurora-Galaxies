

Cookies = {};

Cookies.cookiefile = undefined;
Cookies.cookiekey = undefined;

Cookies.Save = function()
{
	document.cookie= Cookies.cookiefile+"="+Cookies.cookiekey+";max-age="+60*60*24*365*10+";path=;domain=/index.html";
	console.log("cookie made of "+Cookies.cookiefile+" and "+Cookies.cookiekey);
};

Cookies.Load = function()
{
	var allcookies=document.cookies;
	cookiearray=allcookies.split(';');
};

