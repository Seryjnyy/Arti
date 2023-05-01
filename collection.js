const collections = [
    {id : "UON-MOA", name: "The University of Nottingham Museum of Archaeology", artefacts: [{id: "feather", rarity: 2}, {id: "ball", rarity: 0}]},
    {id : "London", name: "London museum", artefacts: [{id: "car", rarity: 0}, {id: "baseball", rarity: 1}]}
]


var userCompletion = null;

something();
calculateLevel();

function something(){
    userCompletion = JSON.parse(localStorage.getItem("userCompletion"));

    if(userCompletion == null){
        localStorage.setItem("userCompletion", JSON.stringify([]));
        userCompletion = [];
    }

    // element stuff

    var element = ""

    element += "<h1 class='text-2xl'>Your collection</h1>"

    collections.forEach(entry => {
        element += `<div class="mb-6">`;
        element += `<h1 class="text-center"> ${entry.name}</h1>`
    
        element += "<div class='flex flex-col items-center'>"
        entry.artefacts.forEach(artefact => {
            var hasArtefact = false;
    
            userCompletion.forEach(completionRecord => {
                if(entry.id == completionRecord.id){
                    completionRecord.artefacts.forEach(artefactRecord => {
                        if(artefactRecord.id == artefact.id){
                            hasArtefact = true;
                        }
                    })
                }
            })
    
            var bgColour = "";
            switch(artefact.rarity){
                case 0: // common
                    bgColour = "bg-orange-400"
                    break;
                case 1: // average
                    bgColour = "bg-blue-500"
                    break;
                case 2: // rare
                    bgColour = "bg-purple-700"
                    break;
            }
    
            element += "<div class='flex w-screen justify-between px-8 text-lg bg-slate-200 "  + (!hasArtefact ? 'opacity-60' : '') + "'>"
            element += `<a href="artefact.html?collection=${entry.id}&artefact=${artefact.id}" `+ (!hasArtefact ? 'style="pointer-events: none"' : "") + `>${artefact.id}</a>`
            element += `<div >${hasArtefact}</div>`
            element += `<div class="${bgColour}" >${artefact.rarity}</div>`
            element += "</div>"
        })
        element += "</div>"
    
    
        element += "</div>"
    });
    
    document.querySelector("#collection-container").innerHTML = element
}

function calculateLevel(){
    // calculate level by adding all level points
    // calculate level points for all artefacts in user completion
    var points = 0;
    userCompletion.forEach(entry => {
        entry.artefacts.forEach(artefact => {
            var rarityModifier = 1;

            collections.forEach(collectionEntry => {
                if(collectionEntry.id == entry.id){
                    collectionEntry.artefacts.forEach(artefactEntry => {
                        if(artefactEntry.id == artefact.id){
                            rarityModifier += artefactEntry.rarity;
                        }
                    })
                }
            })

            // go through all quizzes
            artefact.completion.forEach(quizCompletion => {
                    // base for discovering artefact
                    points += 50 * rarityModifier;
    
                    // for completing artefact
                    if(quizCompletion.completed){
                        points += 100 * rarityModifier;
                    }
                    
                    
                    // give points proportional to their score and time left
                    points += quizCompletion.scorePercent * 100 * rarityModifier;
                    points += quizCompletion.timeLeftPercent * 100 * rarityModifier;

            })
            console.log(points)

        })
    })

    // do something with points
    insertUserLevel(points);
}

function insertUserLevel(exp){
    var element = "";
    element += "<h1 class='text-2xl'>Your level</h1>"
    element += `<p> ${exp}</p>`
    document.querySelector("#collection-user-level").innerHTML = element
}

