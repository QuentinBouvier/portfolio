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
                $nameHolder = (isset($_SESSION["contactName"])) ? "value='$_SESSION[contactName]'" : "";
                unset($_SESSION["contactName"]);
                $mailHolder = (isset($_SESSION["contactMail"])) ? "value='$_SESSION[contactMail]'" : "";
                unset($_SESSION["contactMail"]);
                $phoneHolder = (isset($_SESSION["contactPhone"])) ? "value='$_SESSION[contactPhone]'" : "";
                unset($_SESSION["contactPhone"]);
                $contentHolder = (isset($_SESSION["contactContent"])) ? $_SESSION["contactContent"] : "";
                unset($_SESSION["contactContent"]);
            ?>
            <label><input type="text" name="name" placeholder="Votre nom (Obligatoire)" <?= $nameHolder; ?>></label>
            <label><input type="text" name="mail" placeholder="Addresse mail (Obligatoire)" <?= $mailHolder; ?>></label>
            <label><input type="text" name="phone" placeholder="n° de téléphone" <?= $phoneHolder; ?>></label>
            <label><textarea name="content" cols="30" rows="10" placeholder="Votre message (Obligatoire)"><?= $contentHolder; ?></textarea></label>
            <label class="flex-container flex-align-center">
            <?php 
                $image = imagecreate(50, 20); //create blank image (width, height)
                $bgcolor = imagecolorallocate($image, 0, 0, 0); //add background color with RGB.
                $textcolor = imagecolorallocate($image, 255, 255, 255); //add text/code color with RGB.
                $code = rand(1000, 9999); //create a random number between 1000 and 9999
                
                $_SESSION['code'] = ($code); //add the random number to session 'code'
                imagestring($image, 10, 8, 3, $code, $textcolor); //create image with all the settings above.
                ob_start();
                    imagepng($image);
                    $imagedata = ob_get_contents();
                ob_end_clean();
                echo '<img class="captcha" src="data:image/png;base64,'.base64_encode($imagedata).'"/>';
            ?>
            <input type="text" name="captcha" placeholder="Saisir le captcha">
            </label>
            <input type="submit" name ="submit" value="Envoyer">
        </form>
        <div class="copyrights">Copyrights © 2017 Quentin Bouvier / Babbleprod. Contenu sous licence <a href="https://github.com/angular/angular.js/blob/master/LICENSE">MIT</a></div>
    </div>
</footer>

<script type="text/javascript" src="./js/burger.js"></script>
<script type="text/javascript" src="./js/scroller.js"></script>
<script type="text/javascript" src="./js/slider.js"></script>

</html>
