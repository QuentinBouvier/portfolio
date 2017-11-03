<?php

/**
 * Opens a simple HTML form tag
 * @param  string $action Optional form action param (Default: none)
 * @param  string $method Optional form method param (default: get)
 * @param  string $class  Optional form class param (default: none)
 * @param  string $id     Optional form Id param (optional: none)
 * @return string         html formated string <form ...>
 */
function openForm($action = '', $method = 'get', $class = '', $id = '')
{
    $display = '<form ';
    if ($action != '') {
        $display .= "action='$action' ";
    }
    if ($method != '') {
        $display .= "method='$method' ";
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
 * add an simple unlabelled input tag
 * @param string $type  Input type
 * @param string $name  Optional Input name param
 * @param string $value Optional Input value param
 * @param string $class Optional Input class
 * @param string $id    Optional Iput id
 * @return string       Html formatted string <input ...>
 */
function addInput($type, $name = '', $value = '', $class = '', $id = '')
{
    $display = "<input type='$type' ";
    if ($name != "") {
        $display .= "name='$name' ";
    }
    if ($value != "") {
        $display .= "value='$value' ";
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
