var element = ""
var debugOpened = false;

// start debug content

element += "<div id='debug-container' class='bg-red-300 w-screen h-96 flex flex-col items-center hidden'>"

// Reset user completion button
element += `<button 
id="debug-reset-button"
class="mt-6 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
>Reset user completion</button>`

// Point buttons

element += "<div class='flex'>" 

// Add points
element += `<button 
id="debug-add-extra-points-button"
class="mt-6 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
>+200 points</button>`

// Reset points
element += `<button 
id="debug-reset-extra-points-button"
class="mt-6 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
>Reset extra points</button>`

element += "</div>"

// Go to artifact one
element += "<div class='flex'>" 

element += `<button 
id="debug-artefact-one-button"
class="mt-6 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
>Artefact 1</button>`

element += `<button 
id="debug-artefact-one-view-model-button"
class="mt-6 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
>View model</button>`

element += `<button 
id="debug-artefact-one-complete-quiz-one-button"
class="mt-6 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
>Complete quiz 1</button>`

element += `<button 
id="debug-artefact-one-complete-quiz-two-button"
class="mt-6 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
>Complete quiz 2</button>`

element += "</div>"

// Go to artifact two 
// element += "<div class='flex'>" 

// element += `<button 
// id="debug-artefact-two-button"
// class="mt-6 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
// >Artefact 2</button>`

// element += `<button 
// id="debug-artefact-two-view-model-button"
// class="mt-6 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
// >View model</button>`

// element += `<button 
// id="debug-artefact-two-complete-quiz-one-button"
// class="mt-6 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
// >Complete quiz 1</button>`

// element += `<button 
// id="debug-artefact-two-complete-quiz-two-button"
// class="mt-6 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
// >Complete quiz 2</button>`

// element += "</div>"

// Add view test models
element += "<div class='flex'>" 

element += `<button 
id="debug-test-under-button"
class="mt-6 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
>Test under</button>`

element += `<button 
id="debug-test-above-button"
class="mt-6 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
>Test above</button>`

element += `<button 
id="debug-test-side-button"
class="mt-6 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
>Test side</button>`

element += "</div>"

element += "<div class='flex'>" 

element += `<button 
id="debug-test-under-button"
class="mt-6 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
>Test tiny</button>`

element += `<button 
id="debug-test-above-button"
class="mt-6 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
>Test huge</button>`


element += "</div>"



element += "</div>"

// end debug content

element += "<button id='debug-toggle'> DEBUG </button>"

document.querySelector("#debug").innerHTML = element;

document.querySelector("#debug-reset-button").addEventListener("click", () => {
    localStorage.removeItem("userCompletion");
    localStorage.removeItem("extraPoints");
    location.reload();
})

// Artefact 1

document.querySelector("#debug-artefact-one-button").addEventListener("click", () => {
    location.href=`artefact.html?collection=UON-MOA&artefact=feather`
})

document.querySelector("#debug-artefact-one-view-model-button").addEventListener("click", () => {
    location.href=`ar.html?collection=UON-MOA&artefact=feather`
})

// document.querySelector("#debug-artefact-one-complete-quiz-one-button").addEventListener("click", () => {
//     var store = JSON.parse(localStorage.getItem("userCompletion"));

//     // store.forEach(element => {
//     //     if(element.id == "UON-MOA"){
//     //         element.artefacts.forEach(artefact => {
//     //             if(artefact.id == "ball"){
//     //                 artefact.
//     //             }
//     //         })
//     //     }
//     // });
// })


// Artefact 2

// document.querySelector("#debug-artefact-two-button").addEventListener("click", () => {
//     location.href=`artefact.html?collection=UON-MOA&artefact=ball`
// })

// document.querySelector("#debug-artefact-two-view-model-button").addEventListener("click", () => {
//     location.href=`ar.html?collection=UON-MOA&artefact=ball`
// })

// Extra point buttons
document.querySelector("#debug-add-extra-points-button").addEventListener("click", () => {
    var store = JSON.parse(localStorage.getItem("extraPoints"));

    localStorage.setItem("extraPoints", store + 200);
})

document.querySelector("#debug-reset-extra-points-button").addEventListener("click", () => {
    localStorage.setItem("extraPoints", 0);
})

document.querySelector("#debug-toggle").addEventListener("click", () => {
    debugOpened = !debugOpened;

    if(debugOpened){
        document.querySelector("#debug-container").classList.remove("hidden");
    }else{
        document.querySelector("#debug-container").classList.add("hidden");
    }

    
})