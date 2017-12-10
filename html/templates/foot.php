<footer id="contact">
    <div class="footer-background flex-container flex-columns flex-items-center">
        <h3>Me contacter: </h3>
        <form class="contact-form flex-container flex-columns flex-items-center" action="../pages/contact.php" method="post">
            <?php
                if (isset($_SESSION["mailResult"]))
                {
                    echo $_SESSION["mailResult"];
                    unset($_SESSION["mailResult"]);
                }
            ?>
            <label><input type="text" name="name" placeholder="Votre nom (Obligatoire)"></label>
            <label><input type="text" name="mail" placeholder="Addresse mail (Obligatoire)"></label>
            <label><input type="text" name="phone" placeholder="n° de téléphone"></label>
            <label><textarea name="content" cols="30" rows="10" placeholder="Votre message (Obligatoire)"></textarea></label>
            <input type="submit" name ="submit" value="Envoyer">
        </form>
        <div class="copyrights">Copyrights © 2017 Quentin Bouvier / Babbleprod. Contenu sous licence <a href="https://github.com/angular/angular.js/blob/master/LICENSE">MIT</a></div>
    </div>
</footer>

<script type="text/javascript" src="./js/burger.js"></script>
<script type="text/javascript" src="./js/scroller.js"></script>
<script type="text/javascript" src="./js/slider.js"></script>

</html>
