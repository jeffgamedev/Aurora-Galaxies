var Names = {};

Names._names = ["Arcita","Rax","Ray","Yor","Yeal","Oril","Kraken","Hydro","Watero","Ox'ten","Vertonic","Indi",
"Barabous","Flax","Seal","Erebus","Jex","Ferro","Slie","Eora","Rarete","Titan","Neo","Telio","Vitreos","Freeman",
"Fira","Clay","Rock","Core","Skie","Soel","Mal","Bart","Opal","Ire","Blood","Flesh","Alum","Pyro","Lurk","Pori",
"Rugal","Ryu","Guile","Blanka","Sagat","Jo","Nazgul","Thrall","Ragnaros","Nefarion","Nexus","Pire","Radia","Ness",
"Illidan","Lelu","Jimbolli","Horse","Javal","Jordan","Blith","Terraros","Zelda","Mario","Farie","Sunberg","Pandae",
"Kael","Grue","Keif","Sensi","Raven","Ocean","Rook","Zork","Fidol","Dell","Haitel","Creo","Ionic","Tuncan","Norse",
"Legolas","Dwarf","Hobbite","Klaxon","Eori","Utevo","Lux","Blane","Tarshan","Shadow","Blade","Imp","Brooks","Phoeti",
"Filu","Realiu","Damil","Reil","Roal","Deago","B'eal","Crypt","Cobalt","Salin","Axekin","Goblin","Cratos","Nairben",
"Epoch","Vavak","Snake","Venru","Malor","Kero","Diamond","Bear","Canine","Mallow","Geno","Zomb","Merlin","Zerg",
"Ouya","Exbone","Playsta","Tendonin","Fergus","Sedlet","Crysis","Dorel","Makoto","Dudley","Akuma","Zool","Rizen",
"Lagoon","Lufia","Soul","Dune","Leto","Saytr","Cervantes","Doob","Exo","Deus","Erid","Or'tan","Ma'ab","Vecna",
"Flea","Magus","Ozzie","Chrono","Slash","Marle","Lucca","Lavos","Schala","Janus","Zeal","Guardia","Sharkey"];

Names._galaxySurnames = ["Span","Cluster","Expanse","Nebula","Drift","Haven","Galax","Cycle"];

Names._leaderTitles = ["Delegate","Ambassador","Chief","Duke","Founder","Watcher","Philanthropist","Enforcer","Chosen"];

Names.GetName = function()
{
	var i = Math.floor(Math.random() * Names._names.length);
	return Names._names[i];
};

Names.GetLeaderTitle = function()
{
	var i = Math.floor(Math.random() * Names._leaderTitles.length);
	return Names._leaderTitles[i];
};

Names.GetLeaderName = function()
{
	var name = Names.GetName();
	if (Math.random() * 2 > 1)
	{
		name += " " + Names.GetName();
	}
	return name;
};


Names.GetGalaxySurname = function()
{
	var i = Math.floor(Math.random() * Names._galaxySurnames.length);
	return Names._galaxySurnames[i];
};

Names._uniqueNames = Names._names.slice(0);

Names.GetUniqueName = function()
{
	if (Names._uniqueNames.length == 0)
	{
		return "err: NoUnique";
	}
	var i = Math.floor(Math.random() * Names._uniqueNames.length);
	var name = Names._uniqueNames[i];
	Names._uniqueNames.splice(i, 1);
	
	return name;
};

Names.Romanize = function (num)
{
    if (!+num)
    {
    	return false;
    }
    var digits = String(+num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
               "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
               "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman = "",
        i = 3;
    while (i--)
    {
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
	}
    return Array(+digits.join("") + 1).join("M") + roman;
};