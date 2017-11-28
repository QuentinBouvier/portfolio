// references for jquery intellisense
// with node, install with npm
// typings
// then from your js dir: typings install dt~jquery --global
/// <reference path="./typings/globals/jquery/index.d.ts" />

$(document).ready(function() {

    worksInit();

});

var originalOrder = [];

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
        originalOrder[i] = $(this).css('order');
        if ($(this).hasClass('active')) $(this).removeClass('active');
        if ($(this).hasClass('min')) $(this).removeClass('min');
    });
}

function activate(target)
{
    var clicked;
    $('[data-work]').each(function(i, v) 
    {
        if ($(this).data('work') != target)
        {            
            $(this).css('order', originalOrder[i]);
            $(this).removeClass('active');
            $(this).addClass('min');
        }
        else
        {            
            $(this).css('order', '-2');
            $(this).addClass('active');
            $(this).removeClass('min');
        }
    });

    $('[data-work-preview]').each(function(i, v) {
        
        if ($(this).data('work-preview') != target)
        {            
            $(this).css('order', originalOrder[i] + parseInt(5));
            $(this).addClass('hidden');
            $(this).removeClass('active');
        }
        else
        {
            $(this).css('order', '-1');
            $(this).removeClass('hidden');
            $(this).addClass('active');
        }
    });
}