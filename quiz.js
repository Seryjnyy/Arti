quizAttempt = "axeQuiz"
axeQuizContent = [
    {question : "who went there?", options: ["this", "that", "them", "then"], answer: "this"},
    {question : "next one?", options: ["bat", "rat", "hat", "fat"], answer: "hat"}
]

allQuizzes = [
    {id : "axeQuiz", content: axeQuizContent, timeConstraint: 60}
]

totalQuestionAmount = 0;
currentQuestion = 0;
currentQuiz = [];
score = 0;
timerID = -1;
time = 0;

switch(quizAttempt){
    case allQuizzes[0].id:
        setupAxeQuiz(allQuizzes[0]);
        break;
}

function setupAxeQuiz(quiz){
    currentQuiz = quiz.content;
    totalQuestionAmount = currentQuiz.length;
    currentQuestion = 0;
    time = quiz.timeConstraint;

    insertQuiz();

    // set up first question
    insertQuestion(currentQuiz[0].question);
    insertOptions(currentQuiz[0].options);

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
    if(userAnswer === currentQuiz[currentQuestion].answer){
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
        if(currentQuestion >= currentQuiz.length){
            console.log("getting heres")
            // display results
            insertResult();
            // save 
            // result, time, 


            return;
        }
            

        insertQuestion(currentQuiz[currentQuestion].question);
        insertOptions(currentQuiz[currentQuestion].options);

        // re-enable answer button
        document.querySelector("#quiz-answer-button").style.display = "block";
    }, 200);
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