<?php

/**
 * Close on or more html tags
 * @param  string  $type name of the html tag to close
 * @param  integer $n    number of repeats of closing tag (default 1)
 * @return string        html formatted string </$type> x $n
 */
function closeTag($type, $n = 1)
{
    $display = '';
    for ($i = 0; $i < $n; $i++) {
        $display .= "</$type>";
    }
    return $display;
}

/**
 * Open a simple HTML tag with class and id params
 * @param  string $type  block tag name
 * @param  string $class [class name]
 * @param  string $id    [id name]
 * @return string        html formatted string <$type ...>
 */
function openSimple($type, $class = '', $id = '')
{
    $display = "<$type ";
    if ($class != "") {
        $display .= "class='$class' ";
    }
    if ($id != "") {
        $display .= "id='$id'";
    }
    $display .= '>';

    return $display;
}

/**
 * Opens a tag with a href param
 * @param string $type   tag type
 * @param string $href   url
 * @param string $target target, for a tags
 * @param string $class  [description]
 */
function openHref($type, $href, $class = '', $id = '', $target = '')
{
    $display = "<$type href='$href' ";
    if ($target != '') {
        $display .= "target='$target' ";
    }
    if ($class != "") {
        $display .= "class='$class' ";
    }
    if ($id != "") {
        $display .= "id='$id'";
    }
    $display .= '>';

    return $display;
}

/**
 * Add inline html tag with a content and closes it
 * @param string $type    tag type
 * @param string $content tag content
 * @param string $class   optional tag class
 * @param string $id      optional tag id
 */
function addInline($type, $content, $class = '', $id = '')
{
    $display = "<$type ";
    if ($class != "") {
        $display .= "class='$class' ";
    }
    if ($id != "") {
        $display .= "id='$id'";
    }
    $display .= ">$content</$type>";

    return $display;
}

/**
 * add and empty tag with a source url.
 * @param string $type  tag type
 * @param string $src   source url
 * @param string $class class, default empty
 * @param string $id    id, default EmptyIterator
 * @return string       string of the tag
 */
function addSrc($type, $src, $class = '', $id = '')
{
    $display = "<$type src='$src'";
    if ($class != "") {
        $display .= "class='$class' ";
    }
    if ($id != "") {
        $display .= "id='$id'";
    }
    $display .= '>';

    if ($type == 'script') {
        $display .= '</script>';
    }

    return $display;
}

/**
 * Creates a list with $n number of lines containing content
 * of an array
 * @param string  $type   List style (ul or ol)
 * @param integer $n      Number of lines
 * @param array   $liCont Lines content
 * @param string  $class  Optional class of the list
 * @param string  $id     Optional id of the list
 */
function addList($type, $n, array $liCont, $class = '', $id = '')
{
    $display = "<$type ";
    if ($class != "") {
        $display .= "class='$class' ";
    }
    if ($id != "") {
        $display .= "id='$id'";
    }
    $display .= '>';

    for ($i = 0; $i < $n; $i++) {
        $display .= "<li>$liCont[$i]</li>";
    }

    $display .= '</ul>';

    return $display;
}
