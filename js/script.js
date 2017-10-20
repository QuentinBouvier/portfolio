$(document).ready(function()
{

    //click on navbar links
    $('.topbar-link').on('click', function()
    {
        var sectionsID = ['#home', '#works', '#curiculum', '#contact'];
        selectButton($(this));
        scrollToElement($(this), sectionsID);
    });

    function selectButton(clicked)
    {
        //remove the highlighting class from every items of the navbar
        $.each($('.topbar-link'), function()
        {
            if ($(this).hasClass('navbar-link-active') && !$(this).hasClass('social-icon'))
            {
                $(this).removeClass('navbar-link-active');
            }
        });

        //if the navbar item isn't a social media link (_blank)
        if (!clicked.hasClass('social-icon'))
        {
            //add the highlighting class on it
            clicked.addClass('navbar-link-active');
        }
    }

    function scrollToElement(element, targetsID)
    {
        //gets 'element' index from the click handler
        //targetsID must be an array of the scroll targets id property
        //scrolls to the id vertical index
        var index = element.index();
        if (!element.hasClass('social-icon'))
        {
            $('html, body').animate(
            {
                scrollTop: $(targetsID[index]).offset().top
            }, 300);
        }
    }
});
