const collections = [
    {id : "Notts", artefacts: [{id: "feather", rarity: 2}, {id: "ball", rarity: 0}]},
    {id : "London", artefacts: [{id: "car", rarity: 0}, {id: "baseball", rarity: 1}]}
]

var element = ""

var userCompletion = JSON.parse(localStorage.getItem("userCompletion"));


document.querySelector("#collection-reset-button").addEventListener("click", () => {
    console.log("something")
    // localStorage.removeItem("userCompletion");
})

// check completion to determine if user unlocked the artefact
// if not disable it and let the user know they have not found it yet

collections.forEach(entry => {
    element += `<div class="flex flex-col">${entry.id}`;

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

        element += `<a class="${bgColour}" href="artefact.html?collection=${entry.id}&artefact=${artefact.id}" `+ (!hasArtefact ? 'style="pointer-events: none"' : "") + `>${artefact.id}</a>`
    })



    element += "</div>"
    element += "<hr/>"
});

// calculate stuff based on user completion
calculateLevel();

function calculateLevel(){
    // calculate level by adding all level points
    // calculate level points for all artefacts in user completion
    var points = 0;
    userCompletion.forEach(entry => {
        entry.artefacts.forEach(artefact => {
            var rarityModifier = 1;

            // find rarity 
            artefact.id
            entry.id
            collections.forEach(collectionEntry => {
                if(collectionEntry.id == entry.id){
                    collectionEntry.artefacts.forEach(artefactEntry => {
                        if(artefactEntry.id == artefact.id){
                            rarityModifier += artefactEntry.rarity;
                        }
                    })
                }
            })

            if(artefact.completion != null){
                points += 50 * rarityModifier;

                if(artefact.completion.completed){
                    points += 100 * rarityModifier;
                }

                points += artefact.completion.scorePercent * 100 * rarityModifier;
                points += artefact.completion.timePercent * 100 * rarityModifier;
            }
        })
    })
    console.log(points)
}


console.log(element)

document.querySelector("#collection-container").innerHTML = element