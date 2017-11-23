<?php

//template
require_once("./templates/head.html");
require_once("./templates/nav.html");

// content
require_once("./pages/banner.html");
require_once("./pages/works/worksHandler.class.php");
new worksHandler("../projects/", "", "");
require_once("./pages/works.html");
// require_once("./pages/photos.html");
require_once("./pages/CV.html");

// template
require_once("./templates/foot.html");
