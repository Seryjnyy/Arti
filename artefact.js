const validCollections = [
  {id: "UON-MOA", artefacts: ["axe"]}
]


var ARTEFACT = "";
var COLLECTION = "";
checkArtefactCompletion();
insertDir()

// localStorage.setItem("userCompletion", JSON.stringify([
//     {id: "Notts", artefacts: [{id: "axe", completion: [{completed: true, timeRemaining: 12, scorePercent: 52}, {completed: false, timeRemaining: 0, scorePercent: 0}]}, {id: "ball", completion: [{completed: true, timeRemaining: 1, scorePercent: 22}]}]},
//     {id: "Leeds", artefacts: []},
//     {id: "Brum", artefacts: [{id: "shovel", completion: [{completed: true, timeRemaining: 99, scorePercent: 32}]}]}
// ]));

function checkArtefactCompletion() {
  // localStorage.removeItem("userCompletion")

  // DUPLICATE CODE OF THIS IN QUIZ JS
  // DUPLICATE CODE OF THIS IN MAIN JS
    var urlParameter = window.location.search;
    urlParameter = urlParameter.substring(1);
    var keyValuePairs = urlParameter.split("&");

    if(keyValuePairs.length < 2){
      console.log("ERROR:: Not enough URL parameters")
      return;
    }

    COLLECTION = keyValuePairs[0].split("=")[1];
    ARTEFACT = keyValuePairs[1].split("=")[1];

    // check if valid collection
    var collectionValid = false;
    var artefactValid = false;
    validCollections.forEach((entry) => {
      if(entry.id == COLLECTION){
        collectionValid = true;

        entry.artefacts.forEach((artefact) => {
          if(artefact == ARTEFACT){
            artefactValid = true;
          }
        })
      }
    })

    if(!collectionValid){
      console.log("ERROR::Invalid collection");
      return;
    }

    
    if(!artefactValid){
      console.log("ERROR::Invalid artefact");
      return;
    }
    // check if valid artefact


    // get user completion
    var store = JSON.parse(localStorage.getItem("userCompletion"));

    // console.log(JSON.parse(store))
    if (store == null) {
        console.log("ERROR::No user completion in local storage");
        localStorage.setItem("userCompletion", JSON.stringify([]))
        store = JSON.parse(localStorage.getItem("userCompletion"));
    }

    if (store.length == 0) {
        console.log("ERROR::User completion empty");
    }

    var collectionRecordExists = false;
    var artefactRecordExists = false;
    var artefactRecord = null;

    store.forEach((entry) => {
        if (entry.id == COLLECTION) {
            collectionRecordExists = true;
            entry.artefacts.forEach((artefact) => {
                if (artefact.id == ARTEFACT) {
                    artefactRecordExists = true;
                    artefactRecord = artefact;
                }
            });
        }

        console.log(entry);
    });

    if (!collectionRecordExists) {
        console.log("ERROR::No record for this collection");
        store.push({ id: COLLECTION, artefacts: [] });
        localStorage.setItem("userCompletion", JSON.stringify(store));
        JSON.parse(localStorage.getItem("userCompletion"));
        // add collection
    }

    if (!artefactRecordExists) {
        console.log("ERROR::No record for this artefact");
        store.forEach((entry) => {
            if (entry.id == COLLECTION) {
                entry.artefacts.push({ id: ARTEFACT, completion: [] });
                artefactRecord = { id: ARTEFACT, completion: [] };
            }
        });
        localStorage.setItem("userCompletion", JSON.stringify(store));
        JSON.parse(localStorage.getItem("userCompletion"));
        // add artefact
    }

    console.log(store)
    insertButtons(artefactRecord);
}

function insertButtons(artefactRecord){
  var element = "";

  // console.log("insert Buttons")
  // console.log(artefactRecord)
  // quiz one
  // available from start
  // let user know he attempted
  element += "<div class='mt-6 flex flex-col items-center'>"
  element += "<h1 class='text-2xl font-semibold mb-4'>Quiz</h1>"
  element += `<button 
  class="bg-purple-400 h-10 min-w-fit hover:bg-purple-500 text-white font-semibold py-1 px-2 rounded-full text-sm" 
  onclick=\"location.href='/quiz.html?collection=${COLLECTION}&artefact=${ARTEFACT}First&completed=${(artefactRecord.completion.length > 0) == true}'\">Quiz one</button>`

  if(artefactRecord.completion.length > 0){
    element += "<p class='text-sm text-gray-600'>*Already attempted</p>"
  }

  element += "</div>";

  // quiz two
  // available if completed quiz one
  // let user know he attempted
  element += "<div class='mt-6 flex flex-col items-center'>"
  element += `<button 
  ${artefactRecord.completion.length >= 1 ? "" : "disabled"}
  class="bg-purple-400 h-10 min-w-fit hover:bg-purple-500 text-white font-semibold py-1 px-2 rounded-full text-sm" 
  onclick=\"location.href='/quiz.html?collection=${COLLECTION}&artefact=${ARTEFACT}Second&completed=${(artefactRecord.completion.length > 0) == true}'\">Quiz two</button>`
  if(artefactRecord.completion.length > 1){
    element += "<p class='text-sm text-gray-600'>*Already attempted</p>"
  }else if(artefactRecord.completion.length == 1){
    element += "<p class='text-sm text-gray-600'>*Inspect the model before attempting this quiz</p>"
  }else if(artefactRecord.completion.length == 0){
    element += "<p class='text-sm text-gray-600'>*Complete quiz one to unlock this one.</p>"
  }

  element += "</div>";

  // view model
  // available if completed quiz one
  element += "<div class='mt-12 flex flex-col items-center'>"
  element += "<h1 class='text-2xl font-semibold mb-4'>AR model</h1>"
  element += `<button 
  ${artefactRecord.completion.length >= 1 ? "" : "disabled"}
  class="bg-purple-400 h-10 min-w-fit hover:bg-purple-500 text-white font-semibold py-1 px-2 rounded-full text-sm" 
  onclick=\"location.href='/ar.html?collection=${COLLECTION}&artefact=${ARTEFACT}'\">View model</button>`
  if(artefactRecord.completion.length < 1){
    element += "<p class='text-sm text-gray-600'>*Complete quiz one to view the model.</p>"
  }

  // need a way back to the artefact page from the model

  element += "</div>";

  // console.log(element)

  document.querySelector("#artefact-container").innerHTML = element;
}

function insertDir(){
  document.querySelector("#artefact-dir").innerHTML = `<h1>${COLLECTION + "/" + ARTEFACT}</h1> <hr>`
}
