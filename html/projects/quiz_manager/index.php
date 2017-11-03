<?php

require_once('./templates/head.html');
require_once('./templates/nav.html');

if (isset($_GET['page'])) {
    if ($_GET["page"] == '404') {
        require_once('./templates/404.html');
    } else {
        require_once("./pages/" . $_GET["page"] . ".php");
    }
} else {
    require_once('./pages/index.php');
}

require_once('./templates/foot.html');
