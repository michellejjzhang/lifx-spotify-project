var dataDisplay = {
    displaySongData: function(){
        var results = $.get("/spotify/update", function(body){
            console.log("testing");
            console.log(body);
        });
    },
    displayAudioFeatures: function(body){
        var rows = "";
        for(var key in body){
            rows += '<dt>'+ key +'</dt><dd>' + body[key] + '</dd>';
        }
        $('#songInfo').append(rows);
    },
    displayCurrentlyPlaying: function(songName){
        $('#currentlyPlaying').append('<dd>'+songName+'</dd>');
    }
};
module.exports = dataDisplay;