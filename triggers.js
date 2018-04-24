let allCourses;
let selCourse;

function loadDoc() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            allCourses = JSON.parse(this.responseText);
            console.log(allCourses);

            createCard()
        }
    };
    xhttp.open("GET", "//uxcobra.com/golfapi/course11819.txt", true);
    xhttp.send();
}

loadDoc();

let columnDiv = document.getElementById("right");
let playersDiv = document.getElementById("left");


function initialize() {
    createColumns();
}

function createColumns(){
    for (let i = 0; i < allCourses.data.holeCount; i++){
        columnDiv.innerHTML += '<div class="column" id="col' + (i+1) + '"><div class="cHeader">' + allCourses.holes[i].hole + '</div></div>';
    }
    fillCard();
}

function createCard(){
    for(let h = 0; h < (allCourses.data.holeCount + 1); h++){
        $("#col" + h).append('<input id="p' + p + 'h' + h + '" type="text">');
    }
}

function fillCard(){
    for(let p = 0; p < numPlayers; p++){
        playersDiv.innerHTML += '<div class="playerLabel" contenteditable="true">Player ' + (p+1) + '</div>';
    }
}


