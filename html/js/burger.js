// Listeners
$(document).ready(function()
{
    burgerize();

    // attempt a burgerize on window resize
    $(window).resize(function()
    {
        burgerize();
    });

    // close the menu on scroll is it's expanded
    $(document).scroll(function()
    {
        if ($('[data-navbar]').hasClass('menu-expanded'))
        {
            expandMenu();
        }
    });

    // changedActive event triggered when another top bar button is selected (by scrolling or clicking)
    // See scroller.js line 66
    $('body').on('changedActive', '[data-menu]', function()
    {
        burgerizeScrollBehavior($(this));
    });

    // expand menu on navbar button click
    $('body').on('click touchend', '[data-navbar="button"]', function()
    {
        expandMenu();
        $('.navbar-background').removeClass('navbar-background-transparent');
    });
});

// control var, true if menu not expanded
var isBurgerized = true;

function expandMenu()
{
    $('[data-navbar]').each(function()
    {
        $(this).toggleClass('menu-expanded');
    });
}

/**
 * Put correct classes on menu if viewport is narrow
 */
function burgerize()
{
    // vars for readability
    var master = $('div[data-navbar="master"]');
    var container = $('ul[data-navbar="container"]');
    var button = $('div[data-navbar="button"]');
    var icon = $('div[data-navbar="icon"]');
    var active = $('.navbar-link-active');
    var social = {
        'full': $('.social-full'), 
        'burger': $('.social-burger')
    };

    if (window.matchMedia("(min-width: 800px)").matches)
    {
        // is wider, no burger
        isBurgerized = false;

        if ($('[data-navbar]').hasClass('menu-expanded'))
        {
            expandMenu();
        }

        container.removeClass('menu-burgerized');
        container.addClass('ml-2');
        master.removeClass('flex-justify-between');
        master.removeClass('menu-expanded');
        master.addClass('flex-justify-left');
        button.addClass('hidden');
        icon.removeClass('ml-1');
        social.full.removeClass('hidden');
        social.burger.addClass('hidden');
    }
    else
    {
        // is smaller, burger
        isBurgerized = true;
        burgerizeScrollBehavior($('.navbar-link-active'));

        container.addClass('menu-burgerized');
        container.removeClass('ml-2');
        master.addClass('flex-justify-between');
        master.removeClass('flex-justify-left');
        button.removeClass('hidden');
        icon.addClass('ml-1');
        social.burger.removeClass('hidden');
        social.full.addClass('hidden');
    }
}

/**
 * Change order of buttons on burgerized menu
 * Called on "changedActive" event (see scroller.js line 66)
 * @param {DOM Object} activeLink 
 */
function burgerizeScrollBehavior(activeLink)
{
    if (isBurgerized)
    {
        var output = activeLink.prop("outerHTML");
        $.each($('[data-navbar="container"]').children(), function()
        {
            if ($(this).hasClass('navbar-link-active'))
            {
                return true;
            }
            else
            {
                output += $(this).prop("outerHTML");
            }
        });
        activeLink.parent().html(output);
    }
}
