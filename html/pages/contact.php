<?php
session_start();

$mailRegExp = "/^[_a-z0-9]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i";
$frPhoneRegExp = "/^(\+33[ ]?|0)[0-9][ ]?([0-9]{2}[ ]?){4}$/";

if (isset($_POST["submit"]))
{
    $error = "";

    if (!empty($_POST["name"]))
    {
        $name = $_POST["name"];
        $_SESSION["contactName"] = $name;
    }
    else {
        $error .= "<li>Merci de renseigner un nom.</li>";
    }

    if (!empty($_POST["mail"]))
    {
        if (!preg_match($mailRegExp, $_POST["mail"]))
        {
            $error .= "<li>Merci de renseigner une adresse mail valide.</li>";
        }
        $mail = $_POST["mail"];
        $_SESSION["contactMail"] = $mail;
    }
    else 
    {
        $error .= "<li>Merci de renseigner une adresse mail.</li>";
    }

    if (!empty($_POST["phone"]))
    {
        if (!preg_match($frPhoneRegExp, $_POST["phone"]))
        {
            $error .= "<li>Merci de renseigner un n° de téléphone valide <br> (10 chiffres, avec ou sans espaces tous les 2 chiffres)</li>";
        }
        $phone = $_POST["phone"];
        $_SESSION["contactPhone"] = $phone;
    }
    else {
        $phone = "Non renseigné";
    }

    if (!empty($_POST["content"]))
    {
        $content = $_POST["content"];
        $_SESSION["contactContent"] = $content;
    }
    else 
    {
        $error .= "<li>Veuillez penser à adresser un message.</li>";
    }

    if (empty($_POST["captcha"]) || $_POST["captcha"] != $_SESSION["code"])
    {
        $error .= "<li>Captcha incorrect.</li>";
    }

    if (empty($error))
    {
        $to = "webmaster@quentinbouvier.fr";
        $subject = "Demande de contact sur quentinbouvier.fr";
        $content = "Message: <br> $content <br><br> Téléphone: $phone";

        $headers  = 'MIME-Version: 1.0' . "\r\n";
        $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
        $headers .= 'Return-Receipt-To: ' . $mail . "\r\n"; 
        
        $headers .= 'To: webmaster@quentinbouvier.fr <webmaster@quentinbouvier.fr>' . "\r\n";
        $headers .= 'From: ' . $name . ' <' . $mail . '>' . "\r\n";

        $success = mail($to, $subject, $content, $headers);
        
        $_SESSION["mailResult"] = ($success) ? "<span class='mail-success'>Message envoyé avec succès !</span>" : "<span class='mail-error'>Erreur lors de l'envoi du message.</span>";
    }
    else {
        $error = '<ul class="mail-error">' . $error . '</ul>';
        $_SESSION["mailResult"] = $error;
    }
}

header('Location: /#contact');

