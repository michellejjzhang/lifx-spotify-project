$(document).ready(function(){
    setInterval(function(){
        $.ajax({
            url: '/currently-playing',
            type: 'GET',
            contentType: 'application/json',
            success: function (data) {
                location.reload();
            }
        });
        console.log("testing");
    }, 1500);
});