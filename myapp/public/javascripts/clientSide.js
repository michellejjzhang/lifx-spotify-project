$(document).ready(function(){
    setInterval(function(){
        $.ajax({
            url: '/',
            type: 'GET',
            contentType: 'application/json',
            success: function (data) {
                location.reload();
            }
        });
    }, 1500);
});