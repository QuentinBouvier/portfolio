<?php


// displays a simple case in the game grid
function displayCase($color)
{
    return "<div style='border: 1px solid black; width: 28px; height: 28px ; text-align: center; font-size: 11px; background-color: $color'></div>";
}

// displays the player's case in the game grid
function displayPlayer()
{
    return "<div style='border: 1px solid black; width: 28px; height: 28px ; text-align: center; font-size: 11px; background: white url(./images/theguy.png) center center no-repeat; background-size: cover;'></div>";
}

// displays the goal's case in the game grid
function displayGoal()
{
    return '<div style="border: 1px solid black; width: 28px; height: 28px ; text-align: center; font-size: 11px; background: white url(./images/cherry.png) center center no-repeat; background-size: cover;"></div>';
}

// init a goal on a random coord in the grid (x(1 to maxX), y(1 to maxY))
function setGoal($maxX, $maxY)
{
    $_SESSION['goal']['x'] = rand(1, $maxX);
    $_SESSION['goal']['y'] = rand(1, $maxY);
}

// check if the player collides the goal and increment the score
function checkGoal()
{
    //check if theres a goal set
    if (!isset($_SESSION['goal'])) {
        setGoal($_SESSION['phpGame']['axis']['x'], $_SESSION['phpGame']['axis']['y']);
    }

    //check if the player is on the same case as the goal
    if (array_diff_assoc($_SESSION['goal'], $_SESSION['playerPos']) == null) {
        setGoal($_SESSION['phpGame']['axis']['x'], $_SESSION['phpGame']['axis']['y']);
        $_SESSION['score']++;
    }
}

function colorMatrix($paddingX, $paddingY)
{
    $output;
    $m = 0;
    $halfDone = false;
    for ($y = 1; $y <= ($paddingY*2+1); $y++) {
        for ($x = 1; $x <= ($paddingX*2+1); $x++) {
            $output[$x][$y] = ($x-1 < $paddingX-$m || $x-1 > $paddingX+$m) ? 0 : 1;
        }
        if ($y > $paddingY) {
            $halfDone = true;
        }
        $m += (!$halfDone) ? 1 : -1;
    }

    // display
    // for ($y = 1; $y <= ($height*2+1); $y++) {
    //     for ($x = 1; $x <= ($width*2+1); $x++) {
    //         echo " " . $output[$x][$y] . "";
    //     }
    //     echo '<br />';
    // }die;

    return $output;
}

function defineColor($x, $y, array $playerPos, array $gridSize)
{
    $output = '';
    $colorMatrix = colorMatrix(round($gridSize['x'] * 0.2), round($gridSize['y'] * 0.2));

    $playerRelative['x'] = floor(count($colorMatrix) / 2);
    $playerRelative['y'] = floor(count($colorMatrix) / 2);

    var_dump($playerRelative);

    return $output;
}

function draw($x, $y)
{
    $color = defineColor($x, $y, $_SESSION['playerPos'], $_SESSION['phpGame']['axis']);
    // display the player in the correct case
    if ($x == $_SESSION['playerPos']['x'] && $y == $_SESSION['playerPos']['y']) {
        echo displayPlayer();
    }
    // if the case is occupied by a goal
    elseif ($x == $_SESSION['goal']['x'] && $y == $_SESSION['goal']['y']) {
        if ($color != 'black') {
            echo displayGoal();
        } else {
            echo displayCase('black');
        }
    }
    // Draws a blank case
    else {
        echo displayCase($color);
    }
}
