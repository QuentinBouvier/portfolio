$(document).ready(function()
{
    $('#quizForm').submit(function(e)
    {
        e.preventDefault();
        var urlGet = window.location.search.substr(1).split('&');
        var quizNo = '';
        $.each(urlGet, function(i, v)
        {
            if (v.split('=')[0] == 'quiz')
            {
                quizNo = v.split('=')[1];
            }
        });
        var allChecked = true;
        $.each($('#quizForm').find('input'), function(i, v)
        {
            debugger;
        });
    });
});
