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

    $('body').on('changedActive', '[data-menu]', function()
    {
        burgerizeScrollBehavior($(this));
    });

    // expand menu on navbar button click
    $('body').on('click', '[data-navbar="button"]', function()
    {
        expandMenu();
    });
});

function expandMenu()
{
    $('[data-navbar]').each(function()
    {
        $(this).toggleClass('menu-expanded');
    });
}

function burgerize()
{
    var master = $('div[data-navbar="master"]');
    var container = $('ul[data-navbar="container"]');
    var button = $('div[data-navbar="button"]');
    var icon = $('div[data-navbar="icon"]');
    var active = $('.navbar-link-active');

    if (window.matchMedia("(min-width: 800px)").matches)
    {
        // is wider
        container.removeClass('menu-burgerized');
        container.addClass('ml-2');
        master.removeClass('flex-justify-between');
        master.removeClass('menu-expanded');
        master.addClass('flex-justify-left');
        button.addClass('hidden');
        icon.removeClass('ml-1');
    }
    else
    {
        // is smaller
        container.addClass('menu-burgerized');
        container.removeClass('ml-2');
        master.addClass('flex-justify-between');
        master.removeClass('flex-justify-left');
        button.removeClass('hidden');
        icon.addClass('ml-1');
    }
}

function burgerizeScrollBehavior(activeLink)
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
