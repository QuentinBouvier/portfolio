// Listeners
$(document).ready(function()
{
    selectButton($('[data-menu="0"]'));

    //click on navbar links
    $('body').on('click touchend', '[data-menu]', function()
    {
        scrollToElement($(this), sectionsID);
    });

    $('body').on('click touchend', '[data-navbar="icon"]', function()
    {
        scrollToElement($('[data-menu="0"]'), sectionsID);
    });

    //on scroll event
    $(document).scroll(function()
    {
        selectButtonOnScroll(sectionsID);
    });
});

var sectionsID = ['#home', '#works', '#curiculum', '#contact'];
var exclusionClass = '.social-icon';
var isScrolling = false;


/**
 * Unselect a navigation bar button
 * @param string buttonsClass class name of the buttons to handle starting with a dot (.)
 * @param string buttonActiveClass class name on an active button
 * @param string ignoreClass if you want buttons to be ignored on the bar, set a class name to ignore
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

/**
 * put class navbar-link-active on selected DOM element
 * @param  {DOM object} clicked element to put active button class on
 */
function selectButton(clicked)
{

    unselectButtons('[data-menu]', 'navbar-link-active', exclusionClass);
    //if the navbar item isn't a social media link (_blank)
    if (!clicked.hasClass('social-icon'))
    {
        //add the highlighting class on it
        clicked.addClass('navbar-link-active').trigger('changedActive');
    }
}

/**
 * Scroll the screen to element targetted
 * @param {DOM element} element     the member of the navbar buttons array clicked
 * @param {array}       targetsID   An array of the elements ID names to be targeted
 */
function scrollToElement(element, targetsID)
{
    //unselectButtons('.topbar-link', 'navbar-link-active', 'social-icon');
    //
    //gets 'element' index from the click handler
    //targetsID must be an array of the scroll targets id property
    //scrolls to the id vertical index
    var index = element.data('menu');

    if (!element.hasClass('social-icon'))
    {
        isScrolling = true;
        $('html, body').animate(
        {
            scrollTop: $(targetsID[index]).offset().top + 1
        }, 400, function()
        {
            isScrolling = false;
            selectButton(element);
        });
    }
}

/**
 * Select the matching button if the scroll index is passed on document
 * @param  {array} targetsID  Array of string names of elements to markup
 */
function selectButtonOnScroll(targetsID)
{
    if (!isScrolling)
    {
        //iterate through the number of sections to define where the scroll
        //position is
        $.each(targetsID, function(index, value)
        {
            var nextOffset = $(targetsID[index]).offset().top + $(targetsID[index]).height();
            if (($(document).scrollTop() >= $(targetsID[index]).offset().top - 1 &&
                $(document).scrollTop() < nextOffset) && !$('[data-menu="' + index + '"]').hasClass('navbar-link-active'))
            {
                selectButton($('[data-menu="' + index + '"]'));
            }
        });
    }
}
