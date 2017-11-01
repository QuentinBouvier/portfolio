$(document).ready(function()
{
    var sectionsID = ['#home', '#works', '#curiculum', '#contact'];
    var buttonClass = '.topbar-link';
    var isScrolling = false;

    //click on navbar links
    $('.topbar-link').on('click', function()
    {
        scrollToElement($(this), sectionsID);
    });

    //on scroll event
    $(document).scroll(function()
    {
        selectButtonOnScroll(sectionsID);
    });

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

        unselectButtons('.topbar-link', 'navbar-link-active', 'social-icon');
        //if the navbar item isn't a social media link (_blank)
        if (!clicked.hasClass('social-icon'))
        {
            //add the highlighting class on it
            clicked.addClass('navbar-link-active');
        }
    }

    /**
     * Scroll the screen to element targetted
     * @param {DOM element} element     an object of the targeted elements
     * @param {array}       targetsID   An array of the elements ID to be targeted
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
                scrollTop: $(targetsID[index]).offset().top + 1
            }, 250, function()
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
                if ($(document).scrollTop() >= $(targetsID[index]).offset().top &&
                    $(document).scrollTop() < $(targetsID[index + 1]).offset().top)
                {
                    selectButton($($('.topbar-link')[index]));
                }
            });
        }
    }

});
