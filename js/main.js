import GAME_API_KEY from './apikey.js';

var gameList;
var gameNameList = [];
var searchResultList = [];

$(document).ready(function() {
    console.log("in jsonOut");

	const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://rawg-video-games-database.p.rapidapi.com/games",
        "method": "GET",
        "headers": {
            "x-rapidapi-key": GAME_API_KEY,
            "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com"
        }
    };
    
    $.ajax(settings).done(function (response) {

        gameList = response.results;

        // Display all games
        $("#cityList").html("");
        for(let i = 0; i < gameList.length; i++) {
            
            $("#cityList").append(
                `
                <div class="game" id="${i}" onclick="getGameId(${i})">
                    <div>
                        <img src="${gameList[i].background_image}" width="100%" height="150px">
                    </div>
                    <div style="color: white; background-color: #2C2C2C; padding: 10px">
                        <h3>${gameList[i].name}</h3>
                    </div>
                </div>
                `
            );

            gameNameList.push({id : i, name: gameList[i].name});
        };

        showSearchResult();
        clearSearchResult();
    });
    
    
}); // end of document ready


function getGameId(id){
    console.log(id);
    sessionStorage.setItem("id", id);
    sessionStorage.setItem("theGame", JSON.stringify(gameList[id]));

    window.location.replace("theGame.html");
}

function showSearchResult() { 
    $("#search").on("input", function(e){

        searchResultList = gameNameList.filter(g => {
            return g.name.toLowerCase().startsWith(e.target.value.toLowerCase());
        });


        $(".search_result").html("");
        if(e.target.value !== ""){
            searchResultList.forEach(g => {
                $(".search_result").append(`
                    <h3 id="${g.id}" onclick="getGameId(${g.id})">${g.name}</h3>
                `);
            })
        }
    });
}

function clearSearchResult(){
    $(".shadow_cover").click(() => {
        $(".search_result").html("");
    })
}
