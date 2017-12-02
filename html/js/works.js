// references for jquery intellisense
// with node, install with npm
// typings
// then from your js dir: typings install dt~jquery --global
/// <reference path="./typings/globals/jquery/index.d.ts" />

$(document).ready(function() {

    worksInit();

});

var originalOrder = [];
var firstUse = true;

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
    timeout = (firstUse) ? 0 : 1000;

    $('[data-work]').each(function(i, v) 
    {
        var current = $(this);

        if (current.data('work') != target)
        {
            setTimeout(function(){
                current.css('order', originalOrder[i]);
                current.removeClass('active');
                current.addClass('min');
            }, timeout);
        }
        else
        {
            setTimeout(function() {
                current.css('order', '-3');
                current.addClass('active');
                current.removeClass('min');
            }, timeout);
        }
    });

    $('[data-work-preview]').each(function(i, v) 
    {
        var current = $(this);

        if (current.data('work-preview') != target)
        {
            current.attr('style', '');
            setTimeout(function() 
            {
                current.css('order', parseInt(originalOrder[i]) + parseInt(5));
            }, timeout);
        }
        else
        {
            
            current.css('order', '-2');

            setTimeout(function(){
                $('break').remove();
                $('<break></break>').insertAfter(current);

                current.css({
                    "width": "70vw",
                    "height": "70vh",
                    "min-width": "345px"
                })
            }, timeout);
        }
    });

    firstUse = false;
}

function resetWorks()
{


    firstUse = true;
}