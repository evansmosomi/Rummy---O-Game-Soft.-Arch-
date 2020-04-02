var tiles = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"];
var colours = ["yellow", "blue", "red", "green"];
var deck = new Array();

function getDeck()
{
	var deck = new Array();

	for(var i = 0; i < colours.length; i++)
	{
		for(var x = 0; x < tiles.length; x++)
		{
			var tile = {Value: tiles[x], colour: colours[i]};
			deck.push(tile);
		}
	}
		
	return deck;
}

function startGame () 
{
 
	deck = getDeck();
	shuffle();
	renderDeck(2);
	createPlayers(2);
    createPlayersUI();
	document.getElementById('player_' + currentPlayer).classList.add('active');
}

 function createPlayers(num)
{
     players = new Array();
     for(var i = 1; i <= num; i++)
     {
           var hand = new Array();
           var player = { Name: 'Player ' + i, ID: i, Points: 0, Hand: hand };
           players.push(player);
     }          
}

function deal()
{
	 for(var i = 0; i < 2; i++)
            {
                for (var j = 0; j < players.length; j++)
                {
                    var current = deck.pop();
                    players[j].Hand.push(current);
                    renderCard(1);
                }
            }
}


function shuffle()
{
	
	for (var i = 0; i < 1200; i++)
	{
		var location1 = Math.floor((Math.random() * deck.length));
		var location2 = Math.floor((Math.random() * deck.length));
		var temp = deck[location1];

		deck[location1] = deck[location2];
		deck[location2] = temp;
	}

	
}

function renderDeck(num)
{
	document.getElementById('deck').innerHTML = '';
	for(var i = 0; i < num ; i++)
	{
		var tile = document.createElement("div");
		var value = document.createElement("div");
		var colour = document.createElement("div");
		tile.className = "tile";
		value.className = "value";
		colour.className = "colour " + deck[i].colour;

		value.innerHTML = deck[i].Value;
		tile.appendChild(value);
		tile.appendChild(colour);

		document.getElementById("deck").appendChild(tile);
	}
}

 function createPlayersUI()
        {
            document.getElementById('players').innerHTML = '';
            for(var i = 0; i < players.length; i++)
            {
                var div_player = document.createElement('div');
                var div_playerid = document.createElement('div');
                var div_hand = document.createElement('div');
                var div_points = document.createElement('div');

                div_points.className = 'points';
                div_points.id = 'points_' + i;
                div_player.id = 'player_' + i;
                div_player.className = 'player';
                div_hand.id = 'hand_' + i;

                div_playerid.innerHTML = 'Player ' + players[i].ID;
                div_player.appendChild(div_playerid);
                div_player.appendChild(div_hand);
                div_player.appendChild(div_points);
                document.getElementById('players').appendChild(div_player);
            }
        }


                
            
