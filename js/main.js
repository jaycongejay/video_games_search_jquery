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

        console.log(gameList)

        // Display all games
        $("#cityList").html("");
        for(let i = 0; i < gameList.length; i++) {
            
            $("#cityList").append(
                `
                <div class="card" id="${i}" onclick="getGameId(${i})" style="width: 18rem;">
                    <img src="${gameList[i].background_image}" width="286px" height="150px" class="card-img-top" alt="${gameList[i].name}">
                    <div class="card-body bg-dark text-white">
                        <h6 class="card-title">${gameList[i].name}</h6>
                        <button id="${i}" onclick="getGameId(${i})" class="btn btn-light btn-sm see_more_btn" style="width: 100%; margin-top: 10px">See more</button>
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

window.getGameId = getGameId;

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
                    <h3 class="list-group-item" id="${g.id}" onclick="getGameId(${g.id})">
                        <img src="data/images/search_icon2.png" alt="search icon" width="30px" style="color: #E92C2C; padding-right: 10px">${g.name}
                    </h3>
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
