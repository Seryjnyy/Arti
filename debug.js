var element = ""
var debugOpened = false;

// start debug content

element += "<div id='debug-container' class='bg-red-300 w-screen h-96 flex flex-col items-center hidden'>"

// Reset user completion button
element += `<button 
id="debug-reset-button"
class="mt-6 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
>Reset user completion</button>`

// Go to artifact one 
element += `<button 
id="debug-artefact-one-button"
class="mt-6 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
>Artefact 1</button>`

// Go to artifact two 
element += `<button 
id="debug-artefact-two-button"
class="mt-6 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
>Artefact 2</button>`

element += "</div>"

// end debug content

element += "<button id='debug-toggle'> DEBUG </button>"

document.querySelector("#debug").innerHTML = element;

document.querySelector("#debug-reset-button").addEventListener("click", () => {
    localStorage.removeItem("userCompletion");
    location.reload();
})

document.querySelector("#debug-artefact-one-button").addEventListener("click", () => {
    location.href=`artefact.html?collection=UON-MOA&artefact=feather`
})

document.querySelector("#debug-artefact-two-button").addEventListener("click", () => {
    location.href=`artefact.html?collection=UON-MOA&artefact=ball`
})

document.querySelector("#debug-toggle").addEventListener("click", () => {
    debugOpened = !debugOpened;

    if(debugOpened){
        document.querySelector("#debug-container").classList.remove("hidden");
    }else{
        document.querySelector("#debug-container").classList.add("hidden");
    }

    
})