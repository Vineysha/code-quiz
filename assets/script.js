//QUIZ QUESTIONS
var questions = [
    {
        title: "Where is the correct place to insert a Javascript file?",
        choices: ["The <body> section", "The <head> section", "Both the <head> and <body> sections are correct"],
        answer: "Both the <head> and <body> sections are correct"
    },
    {
        title: "How does a FOR loop start?",
        choices: ["for (i<=5; i++)", "for i = 1 to 5", "for (i=0; i<=5; i++)", "for (i=0; i<=5)"],
        answer: "for (i=0; i<=5; i++)"
    },
    {
        title: "Which event occurs when the user clicks on an HTML element?",
        choices: ["onmouseover", "onclick", "onchange", "onmouseclick"],
        answer: "onclick"
    },
    {
        title: "What will the following code return? Boolean(10 > 9)",
        choices: ["NaN", "null", "true", "false"],
        answer: "true"
    },
    {
        title: "How do you write 'Hello World' in an alert box?",
        choices: ["msg('Hello World');", "alertBox('Hello World');", "alert('Hello World');", "msgBox('Hello World');"],
        answer: "alert('Hello World');"
    },

];

var score = 0;
var questionIndex = 0;

var time = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");

// SECONDS LEFT
var secondsLeft = 76;
// INTERVAL TIME
var holdInterval = 0;
//MINUS 10 SECONDS FOR EVERY INCORRECT ANSWER
var penalty = 10;

var ulCreate = document.createElement("ul");

// TRIGGERS TIMER
timer.addEventListener("click", function () {
    // INTERVAL SET TO 0
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            time.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                complete();
                time.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

// TRIGGERS THE START OF THE QUIZ
function render(questionIndex) {
    // CLEARS DATA 
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    
    for (var i = 0; i < questions.length; i++) {
        
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }
    
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
// COMPARES CHOICES WITH ANSWER
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // CORRECT
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
            // CORRECT 
        } else {
            // DEDUCTS FROM secondsLeft FOR WRONG ANSWERS
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Incorrect! The answer is:  " + questions[questionIndex].answer;
        }

    }
    
    questionIndex++;

    if (questionIndex >= questions.length) {
        // LAST PAGE AND USER SCORES
        complete();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);

}
// APPEND LAST PAGE
function complete() {
    questionsDiv.innerHTML = "";
    time.innerHTML = "";

    
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "Quiz Completed!"

    questionsDiv.appendChild(createH1);

    
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

    // CALCULATES TIME REMAINING TO REPLACE WITH SCORE
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionsDiv.appendChild(createP2);
    }

    
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsDiv.appendChild(createLabel);

    
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    //SUBMIT
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createSubmit);

    // CAPTURES INITIAL AND SCORES
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("No value!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // GOES TO SCORES PAGE
            window.location.replace("scores.html");
            
        }
    });

}


