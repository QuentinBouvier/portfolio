<?php 

require_once "./pages/works/worksHandler.class.php";

$works = new worksHandler("./projects/");

?>

<main>
    <section id="works" class="flex-container flex-justify-center flex-wrap flex-items-center full-height section-1-background">
        <h3>Aperçu des projets</h3>  
        <div class="flex-container flex-justify-center flex-items-center flex-wrap main-work">

            <?php
                echo $works->output();            
            ?>
            
            <script src="./js/works.js"></script>

        </div>
    </section>
