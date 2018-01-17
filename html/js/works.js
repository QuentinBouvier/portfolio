// references for jquery intellisense
// with node, install with npm
// typings
// then from your js dir: typings install dt~jquery --global
/// <reference path="./globals/jquery/index.d.ts" />

$(document).ready(function() {

    worksInit();

});

var originalOrder = [];
var firstUse = true, smartphone = true;

/**
 * Set listeners on tiles and close buttons
 */
function worksInit()
{
    dispAllTiles();
    
    $('[data-work]').on('click', function() {
        activate($(this).data('work'));
    });

    $('.closing-cross').on('click', function() {
        resetWorks();
    });
}

/**
 * Set tiles style to normal and get original order
 */
function dispAllTiles()
{
    $('[data-work]').each(function(i, v){
        originalOrder[i] = $(this).css('order');
        if ($(this).hasClass('active')) $(this).removeClass('active');
        if ($(this).hasClass('min')) $(this).removeClass('min');
    });
}

/**
 * Minimize not clicked tiles, put targeted tile and preview on first position,
 * set targetted objects to active style to launch animation
 * @param { DOM Element } target 
 */
function activate(target)
{
    smartphone = !window.matchMedia("(min-width: 550px)").matches
        
    // listen to first use to set a timeout or not on position switching
    timeout = (firstUse || smartphone) ? 0 : 1000;

    // tiles
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

    // previews
    $('[data-work-preview]').each(function(i, v) 
    {
        // this scope
        var current = $(this);

        // not active previews
        if (current.data('work-preview') != target)
        {
            current.attr('style', 'order: -2;');
            setTimeout(function() 
            {
                current.removeClass('active');
                current.css('order', parseInt(originalOrder[i]) + parseInt(5));
            }, timeout);
        }
        else //active preview
        {            
            $('break').remove();
            $('<break></break>').insertAfter(current);
            current.css('order', '-2');

            setTimeout(function() {                
                current.addClass('active');
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
    smartphone = !window.matchMedia("(min-width: 550px)").matches
        
    // listen to first use to set a timeout or not on position switching
    timeout = (firstUse || smartphone) ? 0 : 1000;

    $('[data-work]').each(function(i, v) 
    {
        var current = $(this);
        
        setTimeout(function() {
            current.css('order', originalOrder[i]);
            current.removeClass('active');
            current.removeClass('min');
        }, timeout - 200);
    });

    $('[data-work-preview]').each(function(i, v) 
    {
        var current = $(this);
        current.attr('style', '');
        setTimeout(function() {
            $(current).removeClass('active');
        }, timeout);
        
    });

    setTimeout(function() 
    {
        $('break').remove();
    }, timeout);

    firstUse = true;
}
