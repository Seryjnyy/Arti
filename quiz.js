const axeFirstQuizContent = [
    {question : "Through which technique did the Beaker people create shields, buckets and cauldrons?", options: ["Casting", "Beating", "Aggregating", "Smelting"], answer: "Beating"},
    {question : "What was added to Bronze to make it stronger?", options: ["Iron", "Mercury", "Copper", "Lead"], answer: "Lead"},
    {question : "What did the Beaker people begin doing instead of burials and stone circles?", options: ["Cremation", "Burial at Sea", "Resomation", "Mausoleum"], answer: "Cremation"},
    {question : "When did the Beaker people come to Britain?", options: ["Around 1000BC", "Around 1500BC", "Around 2500BC", "Late 500BC"], answer: "Around 2500BC"}
]

const axeSecondQuizContent = [
    {question : "What was an axe called in the early Bronze Age?", options: ["Siekra", "Palstave", "Axe", "Woodfall"], answer: "Palstave"},
]

const allQuizzes = [
    {id : "axeFirst", collection: "UON-MOA",  content: axeFirstQuizContent, timeConstraint: 60, scoreRequirement: 2},
    {id : "axeSecond", collection: "UON-MOA",  content: axeSecondQuizContent, timeConstraint: 60, scoreRequirement: 2},
]

var totalQuestionAmount = 0;
var currentQuestion = 0;
var currentQuiz = [];
var score = 0;
var timerID = -1;
var time = 0;
var alreadyAttempted = false;

var quizCollection = "";
var quizArtefact = "";

determineQuiz();

function determineQuiz(){
    var urlParameter = window.location.search;
    urlParameter = urlParameter.substring(1);
    var pairs = urlParameter.split("&");
    
    if(pairs.length < 3){
      console.log("ERROR:: Not enough URL parameters")
      return;
    }
    
    quizCollection = pairs[0].split("=")[1];
    quizArtefact = pairs[1].split("=")[1];

    alreadyAttempted = pairs[2].split("=")[1] === "true";

    console.log(alreadyAttempted)

    for(let i = 0; i < allQuizzes.length; i++){
        if(allQuizzes[i].id == quizArtefact && allQuizzes[i].collection == quizCollection){
            setupAxeQuiz(allQuizzes[i]);
        }
    }

    insertDir(quizCollection, quizArtefact);
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
    }, 1000);
}

function correctAnswer(){
    document.querySelector('#quiz-options').innerHTML = "<div  class='mt-8 text-green-600 text-2xl'>Correct</div>";
}

function incorrectAnswer(){
    document.querySelector('#quiz-options').innerHTML = "<div class='mt-8 text-red-600 text-2xl'>Incorrect</div>";
}


function insertQuestion(question){
    document.querySelector('#quiz-question').innerHTML = "<h1 class='text-4xl mt-2 mb-8 text-left'>" + question + "</h1>";
}

function insertOptions(options){
    var optionElement = "";
    
    for(let i = 0; i < options.length; i++){
        optionElement += `
        <div class="mb-3">
            <input id="option-${i}" value="${options[i]}" type="radio" name="option" class="radio" />
            <label for="option-${i}" id="option-${i}-label">${options[i]}</label>
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
        <div class="flex justify-between gap-5">
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
            <button id="quiz-answer-button" class="bg-transparent mt-6 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Next question</button>
        </div>
    </div>
</div>
  `
  document.querySelector('#quiz-answer-button').addEventListener("click", handleNextQuestion);
}


function insertResult(){
    document.querySelector('#quiz-container').innerHTML = `
    <h1 class="text-2xl">Well done!!</h1>
    <div>Score : ${score} / ${totalQuestionAmount} </div>
    <button
    id="quiz-back-to-artefact"
    class="bg-blue-500 mt-8 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" 
    >Back to artefact</button>
    `
    document.querySelector("#quiz-back-to-artefact").addEventListener("click", () => {
        var artefactSplit = quizArtefact.split(/(?=[A-Z])/);
        location.href=`artefact.html?collection=${quizCollection}&artefact=${artefactSplit[0]}`
    })

}

function insertDir(){
    var artefactSplit = quizArtefact.split(/(?=[A-Z])/);
    document.querySelector("#artefact-dir").innerHTML = `<h1>${quizCollection + "/" + artefactSplit[0] + "/" + artefactSplit[1].toLowerCase() + " quiz"}</h1> <hr>`
  }