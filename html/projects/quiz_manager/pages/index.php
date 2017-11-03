<h1>Bienvenue sur SuperQuiz</h1>
<h2>Le super site de quiz !</h2>
<h4>Veuillez selectionner un quiz, ou rechercher un quiz dans la barre de navigation</h4>

<?php
require_once('./functions/htmlTags.php');
$quizDir = './quizzes/';

$nOfQuiz = count(scandir($quizDir)) - 2;
$nOfQuiz = ($nOfQuiz > 10) ? 10 : $nOfQuiz;

for ($i = 1; $i <= $nOfQuiz; $i++) {
    $quiz = json_decode(file_get_contents("$quizDir$i.json"));
    $imgSrc = ($quiz->{'image'} != '') ? $quiz->{'image'} : 'http://fakeimg.pl/200x200/?text=No%20image';
    $difficulty = array('Facile', 'Moyen', 'Difficile', 'Démoniaque');

    echo openSimple('div', 'container');
    echo openSimple('div', 'row');
    echo openHref('a', "?page=playQuiz&quiz=$i", 'index-quiz-list-container  col-md-6');
    echo openSimple('div', 'm-2');
    echo addSrc('img', $imgSrc, 'mr-4');
    echo addInline('h4', $quiz->{'title'});
    echo addInline('p', $quiz->{'description'});
    echo addInline('p', 'Par: ' . $quiz->{'author'});
    echo addInline('p', 'Difficulté : ' . $difficulty[$quiz->{'difficulty'}]);
    echo closeTag('div');
    echo closeTag('a');
    echo closeTag('div', 2);
}
?>
