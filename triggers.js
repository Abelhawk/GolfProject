let allCourses;
let selCourse;
let numberOfHoles = 18;
let p = 1;
let tee = 0;
let columnDiv = document.getElementById("right");
let playersDiv = document.getElementById("left");
let teeSelectDiv = document.getElementById("teeSelect");
$('.container').hide();
$('#teeSelect').hide();


function loadDoc() {
    console.log("Loading...");
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            allCourses = JSON.parse(this.responseText);
            // console.log(allCourses);
            // addOptions();
            $('.container').show();
            $('#teeSelect').show();
            console.log("Columns loaded successfully.");
            createColumns();
            $(".loading").remove();

        }
    };
    xhttp.open("GET", "//uxcobra.com/golfapi/course11819.txt", true);
    xhttp.send();
}

loadDoc();

function createColumns(){
    columnDiv.innerHTML = "";
    for (let i = 1; i <= allCourses.data.holeCount; i++){
        columnDiv.innerHTML += '<div class="column" id="col' + i + '"><div class="cHeader">' + i + '</div><div class="yardage">' + allCourses.data.holes[i-1].teeBoxes[tee].yards + '</div><div class="par">' + allCourses.data.holes[i-1].teeBoxes[tee].par + '</div></div>';
    }
    if (p <= 1){
        createCard();
    }
}

function createCard(){
        playersDiv.innerHTML += '<div class="label" id="playerLabel' + p + '" contenteditable="true"><span style="cursor:pointer" class="fa fa-trash" onclick="deletePlayer('+ p + ')"></span><span>  </span>Player ' + (p) + '</div>';
        $("#totalColumn").append('<div class="hole hole_player'+ p +'" id="playerTot' + p +'">0</div>');
        for(let h = 1; h <= (allCourses.data.holeCount); h++){
            $("#col" + h).append('<input id="p' + p + 'h' + h + '" type="number" class="hole_player'+p+'" onchange="addScore('+ p +')">');
        }
    p++;

}

function addScore(inputId){
    let tempscore = 0;
    for(let i = 1; i <= numberOfHoles; i++){
        tempscore += Number($("#p" + inputId + "h" + i).val());
    }
    $("#playerTot" + inputId).html(tempscore);
}

function deletePlayer(playerNum){
    console.log(p);
    $("#playerTot" + playerNum).remove();
    $(".hole_player" + playerNum).remove();
    $("#playerLabel"+ playerNum).remove();
    p--;

}

function changeTee(){
    let choice = teeSelectDiv.value;
    console.log("The value is " + choice);
    switch(true){
        case (choice == 0):
            console.log("Pro!");
            tee = 0;
            break;
        case (choice == 1):
            console.log("Champion!");
            tee = 1;
            break;
        case (choice == 2):
            console.log("Men's!");
            tee = 2;
            break;
        case (choice == 3):
            console.log("Women's!");
            tee = 3;
    }
    createColumns();
}