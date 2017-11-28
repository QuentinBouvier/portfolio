// references for jquery intellisense
// with node, install with npm
// typings
// then from your js dir: typings install dt~jquery --global
/// <reference path="./typings/globals/jquery/index.d.ts" />

$(document).ready(function() {

    worksInit();

});

var originalPos;

function worksInit()
{
    dispAllTiles();
    
    $('[data-work]').on('click', function() {
        activate($(this).data('work'));
    });
}

function dispAllTiles()
{
    $('[data-work]').each(function(i, v){
        if ($(this).hasClass('active')) $(this).removeClass('active');
        if ($(this).hasClass('min')) $(this).removeClass('min');
    });
}

function activate(target)
{
    $('[data-work]').each(function() 
    {
        if ($(this).data('work') != target)
        {
            $(this).removeClass('active');
            $(this).addClass('min');
        }
        else
        {
            $(this).addClass('active');
            $(this).removeClass('min');
        }
    });

    $('[data-work-preview]').each(function() {
        
        if ($(this).data('work-preview') != target)
        {
            $(this).addClass('hidden');
        }
        else
        {
            $(this).removeClass('hidden');
        }
    });
}