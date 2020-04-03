
        var colours = ["Red", "Yellow", "Blue", "Green"];
        var values = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"];
        var deck = new Array();
        var players = new Array();
        var currentPlayer = 0;


        function createDeck()
        {
            deck = new Array();
            for (var i = 0 ; i < values.length; i++)
            {
                for(var x = 0; x < colours.length; x++)
                {
                    var weight = parseInt(values[i]);
                    
                    var tile = { Value: values[i], colour: colours[x], Weight: weight };
                    deck.push(tile);
                }
				
            }
			
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

        function shuffle()
        {
            
            for (var i = 0; i < 100; i++)
            {
                var location1 = Math.floor((Math.random() * deck.length));
                var location2 = Math.floor((Math.random() * deck.length));
                var temp = deck[location1];

                deck[location1] = deck[location2];
                deck[location2] = temp;
            }
        }

        function startGame()
        {
			
            currentPlayer = 0;
            createDeck();
            shuffle();
            createPlayers(document.getElementById("play").value);
            createPlayersUI();
            dealHands(1);
            document.getElementById('player_' + currentPlayer).classList.add('active');
			check();
        }

        function dealHands(k)
        {
           
            for(var i = 0; i < k; i++)
            {
                for (var j = 0; j < players.length; j++)
                {
                    var tile = deck.pop();
                    players[j].Hand.push(tile);
                    rendertile(tile, j);
                    updatePoints();
                }
            }   
        }

		function check()
		{
			if (players[currentPlayer].Points > players[(currentPlayer+1)].Points )
            {
                document.getElementById('player_' + currentPlayer).classList.remove('active');
                currentPlayer += 1;
                document.getElementById('player_' + currentPlayer).classList.add('active');
            }
		}
		
        function rendertile(tile, player)
        {
            var hand = document.getElementById('hand_' + player);
            hand.appendChild(gettileUI(tile));
        }

        function gettileUI(tile)
        {
            var el = document.createElement('div');
            var icon = '';
            if (tile.colour == 'Yellow')
            icon='yellow';
            else if (tile.colour == 'Red')
            icon = 'red';
            else if (tile.colour == 'Blue')
            icon = 'blue';
            else
            icon = 'green';
            
            el.className = 'tile';
            el.innerHTML = tile.Value + '<br/>' + icon;
            return el;
        }

        function getPoints(player)
        {
            var points = 0;
            for(var i = 0; i < players[player].Hand.length; i++)
            {
                points += players[player].Hand[i].Weight;
            }
            players[player].Points = points;
            return points;
        }

        function updatePoints()
        {
            for (var i = 0 ; i < players.length; i++)
            {
                getPoints(i);
                document.getElementById('points_' + i).innerHTML = players[i].Points;
            }
        }

        function deal()
        {
			
            createDeck();
			shuffle()
            dealHands(14);
            document.getElementById('player_' + currentPlayer).classList.add('active');
			check();
			 //var joker = { Value: J, colour: blue, Weight: weight };
           // deck.push(joker);
        }

       function initalMelds ()
		{
			var meld = new Array;
			for (var i = 0; i < 14 ; i++)
			{
				for (var j = 0; j < 14 ; j++)
				{
					for (var k = 0; k < 14 ; k++)
					{
						c = players[currentPlayer].Hand[i].weight;
						n = players[currentPlayer].Hand[j].weight;
						f = players[currentPlayer].Hand[k].weight;
						
				
						if (((c-n)== 1) && ((n-f) == 1))
						{
							var tile1 = hand.pop(c);
							var tile2 = hand.pop(j);
							var tile3 = hand.pop(k);
							players[currentPlayer].meld.push(tile1);
							players[currentPlayer].meld.push(tile2);
							players[currentPlayer].meld.push(tile3);
							
						}		
					}
				}	
			}
			
			for (var n = 0; n < meld.length ; n++) 
			{
			var tile = meld[n];
			rendertile(tile, currentPlayer);
			}
			if ( players[currentPlayer].Points > 25)
			{
			switchActive();
			}
		}
        

        function switchActive ()
		{
			document.getElementById('player_' + currentPlayer).classList.remove('active');
			currentPlayer += 1;
			document.getElementById('player_' + currentPlayer).classList.add('active');
		}
		/*
		
		function reMeld ()
		{
			var reMel = new Array;
			var set = document.getElementById("tile").addEventListener("click");
				if ((player[currentPlayer].hand.tile.colour ==set.colour) &&
				(player[currentPlayer].hand.tile.weight - set.weight) == 1)
				{
					players[currentPlayer].reMel.push(set);
					players[currentPlayer].reMel.push(tile);
					eliminate_tiles()
				}
		}

        function replaceJoker ()
		{
			x = players[currentPlayer].Hand.tile[Value: values[J], colour: colours[blue], Weight: weight];
			 
			for (var i = 0; i < 14 ; i++)
					{
						c = players[currentPlayer].Hand[i]
						if (x==c){
							
							eliminate_tiles()
						}
					}
		}
		*/
		
		function eliminate_tiles()
        {
        	while(end_game == false){
        		if(player.length == 0){
        			end_game = true;
        		}

        		else{
        			switchActive ();
        		}
        	}

        } 

		
		function end ()
		{
			if (players[currentPlayer].Points > players[(currentPlayer+1)].Points )
            {
				alert("Player 1 Wins");
			}
			else  
			{
				alert("Player 2 Wins");
			}
		}

        

        
