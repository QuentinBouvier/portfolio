$(document).ready(function()
{

    // Silder options
    var options = {
        'width': 900,
        'height': 500,
        'speed': 200,
        'buttonPosition': 'over',
        'leftArrow': '◄',
        'rightArrow': '►'
    }

    // Init slider
    slider(options);

    // TEMP: sets a listener on buttons
    // TODO: implement it in init function
    // TODO: Sets buttons related to single slider
    $('.slider-button').on('click', function()
    {
        slide($(this).data('button'), $('[data-slider="slider1"]'), options)
    });
});

// Control var to deactivate buttons if the slide is running
var isSliding = false;

/**
 * Slider init function
 * @param  {Array}  options Width, Height, Speed
 */
function slider(options)
{

    $.each($('[data-slider]'), function()
    {
        // Checks if there's local storage to put the slider at right position
        if (localStorage.getItem($(this).data('slider')) == null)
        {
            localStorage.setItem($(this).data('slider'), 0);
        }
    });

    options = setDefault(options);


    // init the display
    if (options != false)
    {
        initSlider(options);
    }
}

function setDefault(options)
{
    if (typeof(options.width) === "undefined" ||
        typeof(options.height) === "undefined")
    {
        return false;
    }
    if (typeof(options.speed) === "undefined") options.speed = 400;
    if (typeof(options.buttonPosition) === "undefined") options.buttonPosition = 'bottom';
    if (typeof(options.leftArrow) === "undefined") options.leftArrow = '◄';
    if (typeof(options.rightArrow) === "undefined") options.rightArrow = '►';

    return options;
}

/**
 * Inits the display of Sliders with inline css
 * @param  {Array}  options Width, height, Speed
 */
function initSlider(options)
{
    $.each($('[data-slider]'), function()
    {
        $(this).css(
        {
            'display': 'flex',
            'width': options.width,
            'height': options.height,
            'overflow': 'hidden'
        });

        $.each($(this).find('[data-slider-img]'), function()
        {
            $(this).css(
            {
                'overflow': 'hidden',
                'width': options.width,
                'height': options.height,
                'min-width': options.width,
                'min-height': options.height
            });

            $(this).children().css(
            {
                'display': 'block',
                'margin': '0 auto',
                'height': "100%"
            });
        })

        drawButtons($(this), options);
    });
}

function drawButtons(slider, options)
{
    var buttonCSS = {
        'display': 'flex',
        'justify-content': 'center',
        'align-content': 'center',
        'width': '60px',
        'height': '60px',
        'font-size': '2em',
        'color': 'grey',
        'cursor': 'pointer'
    };

    var buttonCSSOver = {
        'background-color': '#CCC8',
        'border-radius': '10px',
        'color': 'white',
        'flex-direction': 'column',
        'text-align': 'center'
    };

    var buttonContainerCSS = {
        'margin-top': '15px',
        'display': 'flex',
        'width': options.width,
        'justify-content': 'center',
        'top': '0'
    };

    var buttonContainerCSSOver = {
        'justify-content': 'space-between',
        'position': 'relative',
        'top': (((options.height / 2) + parseInt(30)) * -1) + 'px',
        'margin': 'auto 30px'
    }

    var output = '<div>';
    output += '<div class="slider-button" data-button="left">' + options.leftArrow + '</div>';
    output += '<div class="slider-button" data-button="right">' + options.rightArrow + '</div>';
    output += '</div>';

    output = $($.parseHTML(output)).css(buttonContainerCSS);
    output.find('[data-button]').css(buttonCSS);

    if (options.buttonPosition == 'over')
    {
        output = output.css(buttonContainerCSSOver);
        output.find('[data-button]').css(buttonCSSOver);
    }

    $(output).insertAfter(slider);
}

/**
 * Slides the targeted slider to right or left
 * @param  {string} direction Right or Left (Or scrolls to the left)
 * @param  {Object} slider    Targeted slider
 * @param  {Array}  options   Width, Height, Speed
 */
function slide(direction, slider, options)
{
    // If right, puts a shifter at +1, otherwise puts it at -1
    var nextSlide = (direction == 'right') ? 1 : -1;

    // get active slide from localStorage
    var activeSlide = localStorage.getItem(slider.data('slider'));

    // define index position of next slide
    nextSlide = parseInt(nextSlide) + parseInt(activeSlide);

    // Stores the slides estimated positions
    var positions = [];

    for (i = 0; i < slider.children().length; i++)
    {
        positions.push(i * options.width);
    }

    if (nextSlide >= 0 && nextSlide < slider.children().length && !isSliding)
    {
        // IF: nextSlide still inbound, animate scroll the slider to the next or prev image

        // control var, disable animation stacking
        isSliding = true;

        slider.animate(
            {
                scrollLeft: positions[nextSlide]
            },
            options.speed,
            function()
            {
                isSliding = false;
            });


        localStorage.setItem(slider.data('slider'), nextSlide);
    }
    else
    {
        // IF: next or prev slide is out of bound

        // control var, disable animation stacking
        isSliding = true;

        var target = (nextSlide < 0) ? slider.children().length - 1 : 0;

        slider.animate(
            {
                scrollLeft: positions[target]
            },
            options.speed,
            function()
            {
                isSliding = false;
            });

        localStorage.setItem(slider.data('slider'), target);
    }
}
