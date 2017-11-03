$(document).ready(function()
{
    $(document).keydown(function(e)
    {
        if (e.keyCode == 38)
        {
            $('#up').submit();
        }

        if (e.keyCode == 39)
        {
            $('#right').submit();
        }

        if (e.keyCode == 40)
        {
            $('#down').submit();
        }

        if (e.keyCode == 37)
        {
            $('#left').submit();
        }
    });
});
