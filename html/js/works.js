// references for jquery intellisense
// with node, install with npm
// typings
// then from your js dir: typings install dt~jquery --global
/// <reference path="./typings/globals/jquery/index.d.ts" />

$(document).ready(function() {

    dispAllTiles();

});

var idleClass = '';
var miniLowerBarClass = '';
var activeClass = '';

function dispAllTiles()
{
    $('[data-work]').each(function(i, v){
    });
}