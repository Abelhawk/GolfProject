let allCourses;
let selCourse;
let numPlayers = 3;
let numberOfHoles = 18;

function loadDoc() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            allCourses = JSON.parse(this.responseText);
            // console.log(allCourses);
            createColumns();
            createCard();

        }
    };
    xhttp.open("GET", "//uxcobra.com/golfapi/course11819.txt", true);
    xhttp.send();
}

loadDoc();

let columnDiv = document.getElementById("right");
let playersDiv = document.getElementById("left");


function initialize() {
}

function createColumns(){
    for (let i = 1; i <= allCourses.data.holeCount; i++){
        columnDiv.innerHTML += '<div class="column" id="col' + i + '"><div class="cHeader">' + i + '</div></div>';
    }
}

function createCard(){
    for(let p = 1; p < (numPlayers + 1); p++){
        playersDiv.innerHTML += '<div class="playerLabel' + p + '" contenteditable="true"><span style="cursor:pointer" class="fa fa-trash" onclick="deletePlayer('+ p + ')"></span><span>  </span>Player ' + (p) + '</div>';
        $("#totalColumn").append('<div class="hole_player'+p+'" id="playerTot' + p +'">0</div>');
        for(let h = 1; h <= (allCourses.data.holeCount); h++){ //Should create columns but isn't
            $("#col" + h).append('<input id="p' + p + 'h' + h + '" type="number" class="hole_player'+p+'" onchange="addScore('+ p +')">');

        }
    }
}

function addScore(inputId){
    let tempscore = 0;
    for(let i = 1; i <= numberOfHoles; i++){
        tempscore += Number($("#p" + inputId + "h" + i).val());
    }
    $("#playerTot" + inputId).html(tempscore);
}

function deletePlayer(playerNum){
    $(".hole_player" + playerNum).remove();
    $(".playerLabel"+ playerNum).remove();
}