$(document).ready(function()
{
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

    // expand menu on navbar button click
    $('div[data-navbar="button"]').click(function()
    {
        expandMenu();
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
        var active = $('.navbar-link-active');

        if (window.matchMedia("(min-width: 800px)").matches)
        {
            // is wider
            container.removeClass('menu-burgerized');
            master.removeClass('flex-justify-between');
            master.removeClass('menu-expanded');
            master.addClass('flex-justify-left');
            button.addClass('hidden');
            active.removeClass('mb-2');
        }
        else
        {
            // is smaller
            container.addClass('menu-burgerized');
            master.addClass('flex-justify-between');
            master.removeClass('flex-justify-left');
            button.removeClass('hidden');
            active.addClass('mb-2');
        }
    }
});
