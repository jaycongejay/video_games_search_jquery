var theGame;
var shortScreenshots;


$(document).ready(function() {
	console.log("in jsonOut");
	
	theGame = JSON.parse(sessionStorage.getItem("theGame"));
    
    console.log(theGame);


   $(".head_video").html(`
        <video src="${theGame.clip.clips["full"]}" width="100%" controls autoplay></video>
   `)

   shortScreenshots = theGame.short_screenshots;

   $(".slide_preview").html("");
   for(let i = 0; i < shortScreenshots.length; i++){
       $(".slide_preview").append(`
            <img src="${shortScreenshots[i].image}" width="200px" height="100px" alt="${shortScreenshots[i].id}">
       `);
   }

    loadTheGame();
}); // end of document ready



function loadTheGame(){
    $("#gname").html(`${theGame.name}`);

    let genres = [];
    let platforms = [];
    let stores = [];

    for(let i = 0; i < theGame.genres.length; i++){
        genres.push(theGame.genres[i].name);
    }

    for(let i = 0; i < theGame.platforms.length; i++){
        platforms.push(theGame.platforms[i].platform.name);
    }

    for(let i = 0; i < theGame.stores.length; i++){
        stores.push(theGame.stores[i].store.name);
    }
   
    $("#genres").html(`${genres.join(", ")}`);
    $("#platform").html(`${platforms.join(", ")}`);
    $("#rating").html(`${theGame.rating}`);
    $("#playtime").html(`${theGame.playtime}`);
    $("#released").html(`${theGame.released}`);
    $("#updated").html(`${theGame.updated}`);
    $("#stores").html(`${stores.join(", ")}`);
}