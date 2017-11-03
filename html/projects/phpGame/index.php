<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Document</title>

    <link rel="stylesheet" href="/css/styles.css">

</head>
<body>
    <?php
        session_start();

        if (isset($_SESSION['phpGame'])) {
            header('Location: game.php');
        } else {
            header('Location: launchOptions.php');
        }
        // if (isset($_SESSION['direction']) && isset($_POST['direction'])) {
        //     if ($_POST['direction'] == 'delete') {
        //         session_unset($_SESSION['direction']);
        //     } else {
        //         $_SESSION['direction'] .= " " . $_POST['direction'];
        //         echo $_SESSION['direction'];
        //     }
        // } elseif (!isset($_SESSION['direction']) && isset($_POST['direction']) && $_POST['direction'] != 'delete') {
        //     $_SESSION['direction'] = $_POST['direction'];
        //     echo $_SESSION['direction'];
        // } elseif (isset($_SESSION['direction']) && !isset($_POST['direction'])) {
        //     echo $_SESSION['direction'];
        // };

     ?>
    <div class="arrows-box">
        <div class="flex-container flex-justify-center">

            <form action="index.php" method="post">
                    <input type="hidden" name="direction" value="up">
                    <input type="submit" value="&#8593;">
            </form>
        </div>
        <div class="flex-container flex-justify-center">
            <form action="index.php" method="post">

                <input type="hidden" name="direction" value="left">
                <input type="submit" value="&#8592;">
            </form>
            <form action="index.php" method="post">
                <input type="hidden" name="direction" value="right">
                <input type="submit" value="&#8594;">
            </form>
        </div>
        <div class="flex-container flex-justify-center">
            <form action="index.php" method="post">
                <input type="hidden" name="direction" value="down">
                <input type="submit" value="&#8595;">
            </form>
        </div>
        <div class="flex-container flex-justify-center">
            <p>
                <form action="index.php" method="post">
                    <input type="hidden" name="direction" value="delete">
                    <input type="submit" value="&#x2715;">
                </form>
            </p>
        </div>
    </div>

</body>
</html>
