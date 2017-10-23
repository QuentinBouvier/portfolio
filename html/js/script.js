$(document).ready(function()
{
    var sectionsID = ['#home', '#works', '#curiculum', '#contact'];
    var buttonClass = '.topbar-link';

    selectButton($($('.topbar-link')[0]));

    //click on navbar links
    $('.topbar-link').on('click', function()
    {
        scrollToElement($(this), sectionsID);
    });

    //on scroll event
    $(document).scroll(function()
    {
        selectButtunOnScroll(sectionsID);
    });
});
