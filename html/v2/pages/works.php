<?php 

require_once "./pages/works/worksHandler.class.php";

$works = new worksHandler("./projects/");

?>

<main>
    <section id="works" class="flex-container flex-justify-center flex-wrap flex-items-center full-height section-1-background">
        <h3>Aperçu des projets</h3>  
        <div class="flex-container flex-justify-center flex-wrap main-work"></div>

            <?php
            foreach($works->getTiles() as $project)
            {
                echo $project;
            }
            ?>
            
        </div>
    </section>
