var highScore = document.querySelector("#score");
var clear = document.querySelector("#clear");
var goBack = document.querySelector("#goBack");

//CLEAR SCORES IN LOCAL STORAGE 
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});
//RETRIEVES LOCAL STORAGE VALUE 
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {

    for (var i = 0; i < allScores.length; i++) {

        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " " + allScores[i].score;
        highScore.appendChild(createLi);

    }
}
//TRANSFER TO INDEX PAGE
goBack.addEventListener("click", function () {
    window.location.replace("./index.html");
});