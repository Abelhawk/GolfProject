let numPlayers = 14;
let course;

loadDoc();

let columnDiv = document.getElementById("right");
let playersDiv = document.getElementById("left");


function initialize() {
    createColumns();
}

function createColumns(){
    for (let i = 0; i < course.holes.length; i++){
        columnDiv.innerHTML += '<div class="column" id="col' + (i+1) + '"><div class="cHeader">' + course.holes[i].name + '</div></div>';
    }
    fillCard();
}

function createCard(){
    for(let h = 0; h < (course.holes.length + 1); h++){
        $("#col" + h).append('<input id="p' + p + 'h' + h + '" type="text">');
    }
}

function fillCard(){
    for(let p = 0; p < numPlayers; p++){
        playersDiv.innerHTML += '<div class="playerLabel" contenteditable="true">Player ' + (p+1) + '</div>';
    }
}

function loadDoc() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            course = JSON.parse(this.responseText);
            console.log(course);

            let seltees = course.holes[0].tees;
            for(let i=0; i < seltees.length; i++){
                $("#teeSelect").append("<option value='i'>CHAMPION</option>");
            }
            // createCard()
        }
    };
    xhttp.open("GET", "holes.txt", true);
    xhttp.send();
}

