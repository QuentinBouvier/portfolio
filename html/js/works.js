// references for jquery intellisense
// with node, install with npm
// typings
// then from your js dir: typings install dt~jquery --global
/// <reference path="./typings/globals/jquery/index.d.ts" />

$(document).ready(function() {

    dispAllTiles();

});

var idleClass = 'flex-container flex-columns project-tile fourth-width';
var miniLowerBarClass = '';
var activeClass = '';
var tilesOrder = [];

function dispAllTiles()
{
    $('[data-work]').each(function(i, v){
        tilesOrder.push($(this).css('order'));
    });
}