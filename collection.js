const collections = [
    {id : "Notts", artefacts: [{id: "feather"}, {id: "ball"}]},
    {id : "London", artefacts: [{id: "car"}, {id: "baseball"}]}
]

var element = ""

var userCompletion = JSON.parse(localStorage.getItem("userCompletion"));


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


        element += `<a href="artefact.html?collection=${entry.id}&artefact=${artefact.id}" `+ (!hasArtefact ? 'style="pointer-events: none"' : "") + `>${artefact.id}</a>`
    })



    element += "</div>"
    element += "<hr/>"
});


console.log(element)

document.querySelector("#collection-container").innerHTML = element