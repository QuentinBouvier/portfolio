<?php

//html create functions includes
require_once('./functions/htmlTags.php');
require_once('./functions/forms.php');

//quiz raw datas get
$quiz = json_decode(file_get_contents("./quizzes/" . $_GET['quiz'] . ".json"));

$imgSrc = ($quiz->{'image'} != '') ? $quiz->{'image'} : 'http://fakeimg.pl/200x200/?text=No%20image';
$difficulty = array('Facile', 'Moyen', 'Difficile', 'Démoniaque');


//Container of the quiz header
echo openSimple('div', 'container my-4');
echo openSimple('div', 'row justify-content-start');

echo openSimple('div', 'col-md-2 mr-4');
echo addSrc('img', $imgSrc);
echo closeTag('div');
echo openSimple('div', 'col-md-5 quiz-title-container');
echo addInline('h2', $quiz->{'title'});
echo addInline('p', $quiz->{'description'});
echo openSimple('p');
echo 'Auteur: ' . $quiz->{'author'} . '<br>';
echo 'Difficulté : ' . $difficulty[$quiz->{'difficulty'}];
echo closeTag('p');
echo closeTag('div', 3);

//Questions display
echo openSimple('div', 'container');
echo openForm('/', 'post', 'row quiz-container mb-5', 'quizForm');
foreach ($quiz->{'questions'} as $i => $v) {
    $display = '';
    $questionStr = $v->{'question'};
    $answersArr = $v->{'answers'};

    for ($j = 0; $j < count($answersArr); $j++) {
        $answersArr[$j] = addInline(
            'label',
            addInput('radio', "question$i", $j) . " " . $answersArr[$j]
        );
    }


    echo openSimple('div', 'col-md-6 quiz-question-container');
    echo addInline('p', $questionStr);
    echo addList('ul', count($answersArr), $answersArr, 'list-unstyled');
    echo '<hr>';
    echo closeTag('div');

    // echo "$i == ";
    // var_dump($v);
    // echo '<br />';
}

echo addInput('submit');
echo closeTag('form');
echo closeTag('div', 2);

//validation script
echo addSrc('script', './js/postQuiz.js');
