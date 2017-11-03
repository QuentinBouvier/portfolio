<?php

session_start();

require_once('./src/functions.php');

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $_SESSION['phpGame']['gameName']; ?></title>

    <script src="https://code.jquery.com/jquery-3.2.1.slim.js"></script>
    <script src="./src/js/moveKeyboard.js" charset="utf-8"></script>
    <link rel="stylesheet" href="./css/styles.css">
</head>
<body>
    <div class="flex-container">
    <?php

    // store game options in a var for readability
    $gameConsts = $_SESSION['phpGame'];

    if (!isset($_SESSION['score'])) {
        $_SESSION['score'] = 0;
    }
    //check if the goal exists and if the player touched it
    checkGoal();

    // create a block to store the game table
    // block is based on a 30px square table case
    echo '<div style="display: flex; flex-wrap: wrap; width: ' . 30*$gameConsts['axis']['x'] . 'px; height: ' . 30*$gameConsts['axis']['y'] . '">';

    // iterates through game table line by line to draw the characters
    for ($y = 1; $y <= $gameConsts['axis']['y']; $y++) {
        // iterate through game line case by case
        for ($x = 1; $x <= $gameConsts['axis']['x']; $x++) {
            draw($x, $y);
        }
    }
    echo '</div>';
    ?>
    <div class="arrows-box">
        <?php
           echo '<p style="text-align: center">Position: x = ';
           echo $_SESSION['playerPos']['x'];
           echo ' y = ';
           echo $_SESSION['playerPos']['y'];
           echo '</p>';
           echo "<p style='text-align: center'>Score: " . $_SESSION['score'] . "</p>";
        ?>
        <div class="flex-container flex-justify-center">
            <form id='up' action="./src/move.php" method="post">
                    <input type="hidden" name="direction" value="up">
                    <input type="submit" value="&#8593;">
            </form>
        </div>
        <div class="flex-container flex-justify-center">
            <form id='left' action="./src/move.php" method="post">

                <input type="hidden" name="direction" value="left">
                <input type="submit" value="&#8592;">
            </form>
            <form id='right' action="./src/move.php" method="post">
                <input type="hidden" name="direction" value="right">
                <input type="submit" value="&#8594;">
            </form>
        </div>
        <div class="flex-container flex-justify-center">
            <form id='down' action="./src/move.php" method="post">
                <input type="hidden" name="direction" value="down">
                <input type="submit" value="&#8595;">
            </form>
        </div>
    </div>
 </div>

 <form  action="./src/reset.php" method="post">
    <input type="hidden" name="on" value="reset">
    <input type="submit" name="reset" value="reset">
 </form>
</body>
</html>
