$(document).ready(function()
{

    // Debug button to start the game over
    $('button[data-action="reset"]').on('click', function()
    {
        reset();

        // reload the page
        location.reload();
    });

    // listnener for options validation and game start
    $('button[data-action="submitOptions"]').on('click', function()
    {
        launch();
    });

    $(document).keydown(function(e)
    {
        // up
        if (e.keyCode == 38)
        {
            localStorage.setItem('player', JSON.stringify(move('player', 'up', 1)));
            draw();
        }

        // right
        else if (e.keyCode == 39)
        {
            localStorage.setItem('player', JSON.stringify(move('player', 'right', 1)));
            draw();
        }

        // down
        else if (e.keyCode == 40)
        {
            localStorage.setItem('player', JSON.stringify(move('player', 'down', 1)));
            draw();
        }

        // left
        else if (e.keyCode == 37)
        {
            localStorage.setItem('player', JSON.stringify(move('player', 'left', 1)));
            draw();
        }
    });

    /**
     * Loads the correct screen depending on localstorage gameState value
     */
    function init()
    {
        // if there's no local storage
        if (localStorage.getItem('gameState') == null)
        {
            // create gameState to rely on
            localStorage.setItem('gameState', 'optionScreen');
            displayScreen(localStorage.getItem('gameState'));
        }
        else
        {
            //display the current state
            displayScreen(localStorage.getItem('gameState'));
            if (localStorage.getItem('gameState') == 'gameScreen')
            {
                generateGameGrid();
            }
        }
    }

    /**
     * Initialize game with options checked by user, sets the gameState to gameScreen
     */
    function launch()
    {
        // get the options and store 'em
        var gameWidth = $('input[name="gameWidth"]').val();
        var gameHeight = $('input[name="gameHeight"]').val();
        var gameDifficulty = $('input[name="difficulty"]:checked').val();

        // If there's no hole in options
        if (gameWidth == '' || gameHeight == '')
        {
            alert('Merci de renseigner tous les champs');
        }
        else
        {
            // store options in localStorage as object
            var options = {
                'x': gameWidth,
                'y': gameHeight,
                'difficulty': gameDifficulty
            };

            // push to localStorage, stringify the options before push
            localStorage.setItem('gameOptions', JSON.stringify(options));
            localStorage.setItem('gameState', 'gameScreen');

            // Launch the game
            generateGameGrid();
            displayScreen(localStorage.getItem('gameState'));
        }
    }

    /**
     * Clear local storage (And thus restarts the game)
     */
    function reset()
    {
        localStorage.clear();
    }

    /**
     * Draw the grid used as game area
     */
    function generateGameGrid()
    {
        // get the game options
        var gameOptions = JSON.parse(localStorage.getItem('gameOptions'));
        // Select the game screen
        var gameScreen = $('section[data-state="gameScreen"]');

        // Var into which the grid appends
        var html = '<div class="game-display">';

        html += '<h2>I wanna be the boring grid game</h2>';
        html += '<div class="game-grid">';

        // grid itself
        for (var y = 1; y <= gameOptions.y; y++)
        {
            for (var x = 1; x <= gameOptions.x; x++)
            {
                html += '<div class="game-cell" ';
                html += 'data-x="' + x + '" data-y="' + y + '"></div>';
            }
        }
        html += '</div><h3 data-state="score">SCORE : 0<h3>';
        html += '</div></div>';
        gameScreen.html(html);

        // set the game grid size as inline style
        $('.game-grid').css('width', gameOptions.x * 30 + 'px');
        $('.game-grid').css('height', gameOptions.y * 30 + 'px');

        // Put entities into game
        insertObjects();
    }

    /**
     * Change the display
     * @param  {String} gameState screen name
     */
    function displayScreen(gameState)
    {
        // hide all unactive screens
        $('section[data-state!="' + gameState + '"]').each(function()
        {
            $(this).addClass('hidden');
        });
        // display active screen
        $('section[data-state="' + gameState + '"]').removeClass('hidden');
    }

    /**
     * put elements in the grid (player and goal and enemies)
     */
    function insertObjects()
    {
        // get the game grid size
        var gameOptions = JSON.parse(localStorage.getItem('gameOptions'));
        var player = JSON.parse(localStorage.getItem('player'));

        // if there's no player pos in memory
        // if game starts
        if (localStorage.getItem('player') == null)
        {
            // init the player at pos (1,1)
            var player = {
                'x': 1,
                'y': 1,
                'score': 0,
                'steps': 0
            }

            // push the player pos in localStorage
            localStorage.setItem('player', JSON.stringify(player));
        }
        else
        {
            // get the player pos from storage
            var player = JSON.parse(localStorage.getItem('player'));
        }

        var enemies = handleEnemies();

        // if there's no goal
        // If the game starts or the goal was eaten
        if (localStorage.getItem('goal') == null)
        {
            var goal = generate('goal', gameOptions, player);
        }
        else
        {
            var goal = JSON.parse(localStorage.getItem('goal'));
        }

        updateScore();

        var playerCell = $('div[data-x="' + player.x + '"][data-y="' + player.y + '"]');
        playerCell.addClass('player');

        var goalCell = $('div[data-x="' + goal.x + '"][data-y="' + goal.y + '"]');
        goalCell.addClass('goal');

        $.each(enemies, function(i, v)
        {
            var eCell = $('div[data-x="' + v.x + '"][data-y="' + v.y + '"]')
            if (!eCell.hasClass('enemy'))
            {
                eCell.addClass('enemy');
            }
        });
    }

    // clears all cells
    function refreshGrid()
    {
        $('div.game-cell').each(function()
        {
            $(this).removeClass('goal');
            $(this).removeClass('player');
            $(this).removeClass('enemy');
        });
    }

    // shift position accordin to direction with step
    function move(object, direction, step)
    {
        // get vars from localStorage
        if ($.type(object) == 'string')
        {
            var object = JSON.parse(localStorage.getItem(object));
        }
        var gameOptions = JSON.parse(localStorage.getItem('gameOptions'));

        // shift, checks if it's not out of bounds
        if (direction == 'up')
        {
            object.y = (object.y - step < 1) ? 1 : object.y - step;
        }
        if (direction == 'down')
        {
            object.y = (object.y + step > gameOptions.y) ? gameOptions.y : object.y + step;
        }
        if (direction == 'right')
        {
            object.x = (object.x + step > gameOptions.x) ? gameOptions.x : object.x + step;
        }
        if (direction == 'left')
        {
            object.x = (object.x - step < 1) ? 1 : object.x - step;
        }

        return object;
    }

    /**
     * Check if some entities collide
     */
    function checkCollisions()
    {
        var player = JSON.parse(localStorage.getItem('player'));
        var goal = JSON.parse(localStorage.getItem('goal'));
        var enemies = JSON.parse(localStorage.getItem('enemies'));

        // if player and goal collides, increase score
        if (player.x == goal.x && player.y == goal.y)
        {
            generate('goal', JSON.parse(localStorage.getItem('gameOptions')), player);
            player.score++;
            localStorage.setItem('player', JSON.stringify(player));

            updateScore();
        }

        // if player and ennemy collide, you lose
        $.each(enemies, function(i, v)
        {
            if (player.x == v.x && player.y == v.y)
            {
                localStorage.setItem('gameState', 'defeatScreen');

                updateScore();
            }
        });
    }

    /**
     * Generate an object with coords (only) that is not positioned on the player position, pushes the object datas in localStorage
     * @param  {String}  objectName Name of the object you need to generate a pos
     * @param  {Object}  maxVal     Object that contains an 'x' and a 'y' to bound max values of the coordinates
     * @param  {Object}  player     The object that must not be on the same coords
     * @param  {Boolean} push       Set if the push to localstorage is done or not
     * @return {Object}             an object coordinates with an x and a y
     */
    function generate(objectName, maxVal, player, push = true)
    {
        var position = {
            'x': rand(1, maxVal.x),
            'y': rand(1, maxVal.y)
        }

        // if the object is generated on the player, regenerate
        while (position.x == player.x && position.y == position.y)
        {
            position = {
                'x': rand(1, maxVal.x),
                'y': rand(1, maxVal.y)
            }
        }

        // push if chosen
        if (push)
        {
            localStorage.setItem(objectName, JSON.stringify(position));
        }

        return position;
    }

    /**
     * Create an enemies array and push it into local storage
     * @return {Object} enemies coords object
     */
    function handleEnemies()
    {
        var enemies = '';
        if (localStorage.getItem('enemies') == null)
        {
            var gameOptions = JSON.parse(localStorage.getItem('gameOptions'));
            var nOfCells = gameOptions.x * gameOptions.y;
            var player = JSON.parse(localStorage.getItem('player'));
            var eArray = [];
            for (i = 0; i < nOfCells / 75; i++)
            {
                eArray.push(generate('enemy', gameOptions, player, false));
            }
            enemies = eArray;
            localStorage.setItem('enemies', JSON.stringify(eArray));
        }
        enemies = JSON.parse(localStorage.getItem('enemies'));

        return enemies;
    }

    /**
     * Append a new enemy into the game
     */
    function addEnemy()
    {
        var enemies = JSON.parse(localStorage.getItem('enemies'));
        var player = JSON.parse(localStorage.getItem('player'))
        var gameOptions = JSON.parse(localStorage.getItem('gameOptions'));

        enemies.push(generate('enemy', gameOptions, player, false));

        localStorage.setItem('enemies', JSON.stringify(enemies));
    }

    /**
     * Redraw score
     */
    function updateScore()
    {
        var score = JSON.parse(localStorage.getItem('player')).score;
        if (score >= 15)
        {
            localStorage.setItem('gameState', 'victoryScreen');
        }
        $('h3[data-state="score"]').html('SCORE : ' + score);
    }

    /**
     * Move an entities by itself.
     * Rules are:
     * Goal, 10% chances to move in random direction
     * Enemies, 75% chances to ove 1 tile in random direction + 20% to move 1 to 3 tiles in random direction
     */
    function moveEntities()
    {
        var dirArray = ['up', 'right', 'down', 'left'];
        var enemies = JSON.parse(localStorage.getItem('enemies'));

        if (cRand(10))
        {
            localStorage.setItem('goal', JSON.stringify(move('goal', dirArray[rand(0, 4)], rand(2, 6))));
        }

        $.each(enemies, function(i, v)
        {
            if (cRand(75))
            {
                v = move(v, dirArray[rand(0, 4)], 1);
            }
            if (cRand(20))
            {
                v = move(v, dirArray[rand(0, 4)], rand(1, 3));
            }
        });
        localStorage.setItem('enemies', JSON.stringify(enemies));
    }

    /**
     * Counts steps of the player
     * Incerase difficulty every x steps (x is set by difficulty chosen in the options screen)
     */
    function difficulty()
    {
        var player = JSON.parse(localStorage.getItem('player'));
        var gameOptions = JSON.parse(localStorage.getItem('gameOptions'));

        player.steps++;

        if (player.steps % gameOptions.difficulty == 0)
        {
            addEnemy();
        }

        localStorage.setItem('player', JSON.stringify(player));

    }

    /**
     * Calls functions necessary for game loop
     */
    function draw()
    {
        refreshGrid();

        moveEntities();
        checkCollisions();
        difficulty();
        displayScreen(localStorage.getItem('gameState'));

        insertObjects();
    }

    /**
     * Generate a random number between a range
     * @param  {integer} min Range minimum
     * @param  {integer} max Range maximum
     * @return {integer}     Random number between min and max (included)
     */
    function rand(min, max)
    {
        return Math.floor((Math.random() * (max)) + min);
    }

    /**
     * Generates a true or false with {chances}%
     * @param  {integer} chances percentage of chance to generate a true
     * @return {Boolean}
     */
    function cRand(chances)
    {
        return (chances >= rand(0, 100));
    }

    // Prepares the game
    init();
});
