function Leader()
{
	var leaderPNGs = ["leader01.png","leader02.png"];
	var leader = {};
	var leaderId = Math.floor(Math.random() * 2);
	var image = Resources.GetImage(leaderPNGs[leaderId]);
	leader._sprite = Sprite(image, -70, -70);
	leader.Title = Names.GetLeaderTitle();
	leader.Name = Names.GetLeaderName();
	leader.Render = leader._sprite.Render;
	return leader;
}
