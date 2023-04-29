const axeQuizContent = [
    {question : "who went there?", options: ["this", "that", "them", "then"], answer: "this"},
    {question : "next one?", options: ["bat", "rat", "hat", "fat"], answer: "hat"}
]

const allQuizzes = [
    {id : "axeFirst", collection: "Notts",  content: axeQuizContent, timeConstraint: 60, scoreRequirement: 2,},
    {id : "axeSecond", collection: "Notts",  content: axeQuizContent, timeConstraint: 120, scoreRequirement: 2},
    {id : "featherFirst", collection: "Notts",  content: axeQuizContent, timeConstraint: 60, scoreRequirement: 2},
    {id : "featherSecond", collection: "Notts",  content: axeQuizContent, timeConstraint: 60, scoreRequirement: 2},
]

var totalQuestionAmount = 0;
var currentQuestion = 0;
var currentQuiz = [];
var score = 0;
var timerID = -1;
var time = 0;
var alreadyAttempted = false;

determineQuiz();

function determineQuiz(){
    var urlParameter = window.location.search;
    urlParameter = urlParameter.substring(1);
    var pairs = urlParameter.split("&");
    
    if(pairs.length < 3){
      console.log("ERROR:: Not enough URL parameters")
      return;
    }
    
    const quizCollection = pairs[0].split("=")[1];
    const quizArtefact = pairs[1].split("=")[1];
    alreadyAttempted = pairs[2].split("=")[1] === "true";

    console.log(alreadyAttempted)

    for(let i = 0; i < allQuizzes.length; i++){
        if(allQuizzes[i].id == quizArtefact && allQuizzes[i].collection == quizCollection){
            setupAxeQuiz(allQuizzes[i]);
        }
    }

}

function setupAxeQuiz(quiz){
    currentQuiz = quiz;
    totalQuestionAmount = currentQuiz.content.length;
    currentQuestion = 0;
    time = quiz.timeConstraint;

    insertQuiz();

    // set up first question
    insertQuestion(currentQuiz.content[0].question);
    insertOptions(currentQuiz.content[0].options);

    // start timer, not trusted solution
    // v better one but not needed rn
    // https://stackoverflow.com/questions/29971898/how-to-create-an-accurate-timer-in-javascript
    timerID = setInterval(() => {
        if(time > 0){
            time--;

            // update time text
            insertTime();
        }

        // do things based on the fact time run out
        

    }, 1000);
}

function insertTime(){
    document.querySelector("#quiz-timer").innerHTML = time;
}

function handleNextQuestion(){
    clearInterval(timerID);

    // check if user answered
    const options = document.getElementsByName("option");
    let answered = false;
    let userAnswer;

    for(let i = 0; i < options.length; i++){

        if(options[i].checked === true){
            answered = true;            
            userAnswer = options[i].value;
        }

    }

    if(!answered){
        console.log("answer the question then")
        return;
    }

    // disable answer button
    document.querySelector("#quiz-answer-button").style.display = "none";


    // check answer
    if(userAnswer === currentQuiz.content[currentQuestion].answer){
        // let user know
        correctAnswer();
        score++;
    }else{
        incorrectAnswer();
    }

    // update score
    document.querySelector("#quiz-score").innerHTML = score;

    // move to next question
    setTimeout(() => {
        currentQuestion++;
        document.querySelector("#quiz-current-question").innerHTML = currentQuestion;

        // end of quiz
        if(currentQuestion >= currentQuiz.content.length){
            // display results
            insertResult();
            // save 
            // result, time, 
            var store = JSON.parse(localStorage.getItem("userCompletion"));

            // localStorage.setItem("userCompletion");
            // already attempted = can unlock next quiz, but can't improve score
            // so can set completed to true but not update score etc.
            console.log(store)

            var collectionExists = false;
            var artefactExists = false;
            store.forEach(entry => {
                if(entry.id == currentQuiz.collection){
                    entry.artefacts.forEach((artefact) => {

                        if(artefact.id == currentQuiz.id.split(/(?=[A-Z])/)[0]){
                            

                            var entryForQuizExists = false;
                            console.log("artefact completion: " + artefact.completion)
                            artefact.completion.forEach((quizRecord) => {
                                
                                if(quizRecord.id === currentQuiz.id.split(/(?=[A-Z])/)[1].toLowerCase()){
                                    entryForQuizExists = true;
                                    // check attempted

                                    quizRecord.completed = score >= currentQuiz.scoreRequirement
                                    
                                    if(!alreadyAttempted){
                                        completed = score >= currentQuiz.scoreRequirement, // based on score percent
                                        scorePercent = score / currentQuiz.content.length, // based on score and total score 
                                        timeLeftPercent = time / currentQuiz.timeConstraint  // based on time left left and initial time
                                    }
    
                                    localStorage.setItem("userCompletion", JSON.stringify(store));

                                }
                            })

                            if(!entryForQuizExists){
                                // insert the entire thing
                                artefact.completion.push({
                                    id: currentQuiz.id.split(/(?=[A-Z])/)[1].toLowerCase(),
                                    completed: score >= currentQuiz.scoreRequirement, // based on score percent
                                    scorePercent: score / currentQuiz.content.length, // based on score and total score 
                                    timeLeftPercent: time / currentQuiz.timeConstraint  // based on time left left and initial time
                                })

                                localStorage.setItem("userCompletion", JSON.stringify(store));
                                console.log(artefact)
                            }

                        }
                    });
                }
            });

            return;
        }
            

        insertQuestion(currentQuiz.content[currentQuestion].question);
        insertOptions(currentQuiz.content[currentQuestion].options);

        // re-enable answer button
        document.querySelector("#quiz-answer-button").style.display = "block";
    }, 10);
}

function correctAnswer(){
    document.querySelector('#quiz-options').innerHTML = "<div>Correct</div>";
}

function incorrectAnswer(){
    document.querySelector('#quiz-options').innerHTML = "<div>Incorrect</div>";
}


function insertQuestion(question){
    document.querySelector('#quiz-question').innerHTML = "<h1>" + question + "</h1>";
}

function insertOptions(options){
    optionElement = "";
    
    for(let i = 0; i < options.length; i++){
        optionElement += `
        <div>
            <input id="option-${i}" value="${options[i]}" type="radio" name="option" class="radio" />
            <label for="option-${i}" id="option-${i}-label">${options[i]}</label>
            <hr/>
        </div>
        `
    }

    document.querySelector('#quiz-options').innerHTML = optionElement;
}

function endQuiz(){

}

function saveAttempt(){

}

function insertQuiz(){
    document.querySelector('#quiz-container').innerHTML = `
    <div class="flex flex-col items-center">
        <div class="flex">
            <h1>Time: <span id="quiz-timer">0</span> </h1>
            <h1>Score : <span id="quiz-score">0</span> / ${totalQuestionAmount}</h1>
            <h1>Question : <span id="quiz-current-question">0</span> / ${totalQuestionAmount}</h1>
        </div>
        <div id="quiz-question">
            <h1>Question</h1>
        </div>
        <div id="quiz-options">
        </div>
        <div>
            <button id="quiz-answer-button" onclick="handleNextQuestion()" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Next question</button>
        </div>
    </div>
</div>
  `
}

function insertResult(){
    document.querySelector('#quiz-container').innerHTML = `
    <div>well done</div>
    <div>Score : ${score} / ${totalQuestionAmount} </div>
    `
}