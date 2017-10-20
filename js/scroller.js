/**
 * Unselect a navigation bar button
 * buttonsClass: class name of the buttons to handle starting with a dot (.)
 * buttonActiveClass: class name on an active button
 * ignoreClass: if you want buttons to be ignored on the bar, set a class name to ignore
 */
function unselectButtons(buttonsClass, buttonActiveClass, ignoreClass)
{
    //remove the highlighting class from every items of the navbar
    $.each($(buttonsClass), function()
    {
        if ($(this).hasClass(buttonActiveClass) && !$(this).hasClass(ignoreClass))
        {
            $(this).removeClass(buttonActiveClass);
        }
    });
}

function selectButton(clicked)
{

    unselectButtons('.topbar-link', 'navbar-link-active', 'social-icon');
    //if the navbar item isn't a social media link (_blank)
    if (!clicked.hasClass('social-icon'))
    {
        //add the highlighting class on it
        clicked.addClass('navbar-link-active');
    }
}

/**
 * element: an object of the targeted element
 * targetsID: An array of the elements ID to be targeted
 */
function scrollToElement(element, targetsID)
{
    //unselectButtons('.topbar-link', 'navbar-link-active', 'social-icon');
    //
    //gets 'element' index from the click handler
    //targetsID must be an array of the scroll targets id property
    //scrolls to the id vertical index
    var index = element.index();
    if (!element.hasClass('social-icon'))
    {
        isScrolling = true;
        $('html, body').animate(
        {
            scrollTop: $(targetsID[index]).offset().top
        }, 250, function()
        {
            isScrolling = false;
            selectButton(element);
        });
    }
}

function selectButtunOnScroll(targetsID)
{
    if (!isScrolling)
    {
        //iterate through the number of sections to define where the scroll
        //position is
        $.each(targetsID, function(index, value)
        {
            if ($(document).scrollTop() >= $(targetsID[index]).offset().top &&
                $(document).scrollTop() < $(targetsID[index + 1]).offset().top)
            {
                selectButton($($('.topbar-link')[index]));
            }
        });
    }
}
