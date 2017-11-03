<?php  ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <link rel="stylesheet" href="./css/styles.css">
</head>
<body>
    <form action="./src/saveOptions.php" method="post">
        <label>Nom du game <input type="text" name="gameName" value="" placeholder="nom" required></label><br><br>
        <label>Taille du game <input class="options-input-number" type="number" name="width" min="0" max="30" value="0" required> px</label><br><br>
        <input type="submit" value="Launch">
    </form>
</body>
</html>
