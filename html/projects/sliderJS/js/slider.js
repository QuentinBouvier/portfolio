/* HTML pattern
data-slider-img must be in the same order as the dom order
 * <div data-slider="SLIDER_NAME">
 *      <div data-slider-img="1">CONTENT</div>
 *      <div data-slider-img="2">CONTENT</div>
 * </div>
 */

$(document).ready(function()
{

    var options = {
        'slider1':
        {
            'width': 900,
            'height': 500,
            'speed': 200,
            'buttonPosition': 'over',
            'leftArrow': '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
            'rightArrow': '<i class="fa fa-arrow-right" aria-hidden="true"></i>'
        },
        'slider2':
        {
            'width': 500,
            'height': 190,
            'speed': 200,
            'buttonPosition': 'bottom',
            'leftArrow': '<',
            'rightArrow': '>'
        }
    }

    // Do slider
    slider(options);
});


/**************************************
 * Options: [default value]
 *  width: required
 *  height: required
 *  speed: Duration of the slide animation. [400]
 *  buttonPosition: Position of the slide buttons. [bottom], over, TODO {none}
 *  leftArrow: html string for left arrow sign. [◄]
 *  rightArrow: html string for right arrow sign. [►]
 *  loop: Behavior when last or first slide is reached. [scrollOver], TODO {infinite, stop}
 *
 **************************************/


/**************************************
 * Prototypes :
 * slider(options);
 * setDefault(options);
 * initSliders(options);
 * createListeners(slider, options);
 * drawButtons(slider, options);
 * getPosition(slider, options);
 * slide(direction, slider, options);
 *
 **************************************/


/**************************************
 * Controls
 **************************************/
var isSliding = false;
var position = {};

/**************************************
 * Functions
 **************************************/

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

    // Size options are required, return false if not provided
    options = setDefault(options);

    // init the display
    if (options != false)
    {
        initSliders(options);
    }
    else
    {
        console.log("ERROR #01: Width and Height options must be provided for every sliders");
    }
}

/**
 * Sets default options for undefined required fields
 * @param {ARRAY}       options array of options
 * @return {ARRAY|BOOL}         Correctly populated options array, false if width or height are undefined
 */
function setDefault(options)
{
    $.each(options, function(i, v)
    {
        if (typeof(v.width) === "undefined" ||
            typeof(v.height) === "undefined")
        {
            return false;
        }
        if (typeof(v.speed) === "undefined") v.speed = 400;
        if (typeof(v.buttonPosition) === "undefined" || !v.buttonPosition.match(/^(bottom|over)$/)) v.buttonPosition = 'bottom';
        if (typeof(v.leftArrow) === "undefined") v.leftArrow = '◄';
        if (typeof(v.rightArrow) === "undefined") v.rightArrow = '►';
        if (typeof(v.loop) === "undefined" || !v.loop.match(/^(stop|loop|scrollOver)$/)) v.loop = 'stop';
    });
    return options;
}

/**
 * Inits the display of Sliders with inline css
 * @param  {Array}  options Width, height, Speed
 */
function initSliders(options)
{
    // sets inline style for sliders
    $.each($('[data-slider]'), function()
    {
        var currentSlider = $(this).data('slider');

        // Slider container style
        $(this).css(
        {
            'display': 'flex',
            'width': options[currentSlider].width,
            'height': options[currentSlider].height,
            'overflow': 'hidden',
            'position': 'relative'
        });

        // selects slides container
        $.each($(this).find('[data-slider-img]'), function()
        {
            // slide style
            $(this).css(
            {
                'overflow': 'hidden',
                'width': options[currentSlider].width,
                'height': options[currentSlider].height,
                'min-width': options[currentSlider].width,
                'min-height': options[currentSlider].height
            });

            // slide content style
            $(this).children().css(
            {
                'display': 'block',
                'margin': '0 auto',
                'height': "100%"
            });
        })

        drawButtons($(this), options);
        createListeners($(this), options);
        position = getPosition($(this), options, position);
    });
}

/**
 * Init mouse and keyboard listeners for the selected slider
 * @param  {Object} slider  target slider
 * @param  {Array}  options array of options
 * @return {Void}
 */
function createListeners(slider, options)
{
    var sliderName = slider.data('slider');
    var sliderSelector = '[data-slider="' + sliderName + '"]';
    var buttonsSelector = '[data-control="' + sliderName + '"]'

    $(buttonsSelector).on('click', function()
    {
        slide($(this).data('button'), $('[data-slider="' + slider.data('slider') + '"]'), options)
    });

    // animations hover if button option 'over' selected
    if (options[sliderName].buttonPosition == 'over')
    {
        $(sliderSelector).on("mouseenter", function()
        {
            $(buttonsSelector).css(
            {
                'opacity': '0.70',
                'transition': '0.2s'
            });
        });
        $(sliderSelector).on("mouseleave", function()
        {
            $(buttonsSelector).css(
            {
                'opacity': '0.2',
                'transition': '0.2s'
            });
        });

        $(buttonsSelector).on('mouseenter', function()
        {
            $(this).css(
            {
                'background-color': '#666',
                'opacity': '0.70'
            });
        });
        $(buttonsSelector).on('mouseleave', function()
        {
            $(this).css('background-color', '#CCC');
        });
    }

}

/**
 * Draw the buttons on the slider area
 * @param  {Object} slider   The concerned slider selector
 * @param  {Array}  options  Options
 */
function drawButtons(slider, options)
{
    var currentSlider = slider.data('slider');

    var buttonSize = 0.067 * options[currentSlider].width;

    // button style for default display
    var buttonCSS = {
        'display': 'flex',
        'justify-content': 'center',
        'align-content': 'center',
        'width': buttonSize + 'px',
        'height': buttonSize + 'px',
        'font-size': '2em',
        'color': 'grey',
        'cursor': 'pointer'
    };

    var buttonCSSBottom = {
        'display': 'inline-block',
        'margin-left': options[currentSlider].width / 2 - buttonSize + 'px',
        'margin-right': -1 * (options[currentSlider].width / 2 - buttonSize) + 'px',
        'text-align': 'center',
        'line-height': buttonSize + 'px'
    };

    // button style for 'over' display
    var buttonCSSOver = {
        'background-color': '#CCC',
        'border-radius': '18%',
        'color': 'white',
        'flex-direction': 'column',
        'text-align': 'center',
        'position': 'relative',
        'opacity': '0.2'
    };

    var buttonLeftCSSOver = {
        'left': '15px',
        'top': (((options[currentSlider].height / 2) + parseInt(buttonSize) / 2) * -1) + 'px',
    };

    var buttonRightCSSOver = {
        'left': options[currentSlider].width - parseInt(15) - parseInt(buttonSize),
        'top': (((options[currentSlider].height / 2) + parseInt(buttonSize) * 1.5) * -1) + 'px',
    }

    // HTML for buttons
    var output = '<div class="slider-button" data-button="left" data-control="' + slider.data('slider') + '">' + options[currentSlider].leftArrow + '</div>';
    output += '<div class="slider-button" data-button="right" data-control="' + slider.data('slider') + '">' + options[currentSlider].rightArrow + '</div>';

    // button style injection.
    // This first line modify 'output' var type from string to HTML object
    output = $($.parseHTML(output));
    // inject css into 'output' html
    output.css(buttonCSS);

    // inject css when 'over' option is set
    if (options[currentSlider].buttonPosition == 'over')
    {
        //output = output.css(buttonContainerCSSOver);
        output.css(buttonCSSOver);
        output.filter('[data-button="left"]').css(buttonLeftCSSOver);
        output.filter('[data-button="right"]').css(buttonRightCSSOver);
    }
    else if (options[currentSlider].buttonPosition == 'bottom')
    {
        output.css(buttonCSSBottom);
    }

    // Push button HTML after the slider
    $(output).insertAfter(slider);
}

/**
 * returns the number of currently displayed slide
 * @param  {Object}  slider  Target slider
 * @param  {Array}   options Options array
 * @return {Integer}         Active slide number in target slider
 */
function getPosition(slider, options, position)
{
    var sliderName = slider.data('slider');
    slider.children().each(function(i, v)
    {
        if ($(v).position().left == 0)
        {
            position[slider.data('slider')] = $(v).data('slider-img');
        }
    });

    return position;
}

/**
 * Slides the targeted slider to right or left
 * @param  {string} direction Right or Left (Or scrolls to the left)
 * @param  {Object} slider    Targeted slider
 * @param  {Array}  options   Width, Height, Speed
 */
function slide(direction, slider, options)
{
    var currentSlider = slider.data('slider');

    // If right, puts a shifter at +1, otherwise puts it at -1
    var nextSlide = (direction == 'right') ? 1 : -1;

    // get active slide from localStorage
    var activeSlide = position[currentSlider];

    // define index position of next slide
    nextSlide = parseInt(nextSlide) + parseInt(activeSlide);

    // Stores the slides estimated slidePos
    var slidePos = [];

    for (i = 0; i < slider.children().length; i++)
    {
        slidePos.push(i * options[currentSlider].width);
    }

    if (nextSlide >= 1 && nextSlide <= slider.children().length && !isSliding)
    {
        // IF: nextSlide still inbound

        // control var, prevents animation stacking
        isSliding = true;

        slider.animate(
            {
                scrollLeft: slidePos[nextSlide - 1]
            },
            options[currentSlider].speed,
            function()
            {
                isSliding = false;
            });


        position[currentSlider] = nextSlide;
    }
    else
    {
        // IF: next or prev slide is out of bound

        // control var, disable animation stacking
        isSliding = true;

        var target = (nextSlide < 1) ? slider.children().length : 1;

        slider.animate(
            {
                scrollLeft: slidePos[target - 1]
            },
            options[currentSlider].speed,
            function()
            {
                isSliding = false;
            });

        position[currentSlider] = target;
    }
}
