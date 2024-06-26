getURLParameters()

setUpAR();

getModelName();

var collection;
var artefact;

function getURLParameters(){
  var urlParameter = window.location.search;
  urlParameter = urlParameter.substring(1);
  var pairs = urlParameter.split("&");
  
  if(pairs.length < 2){
    console.log("ERROR:: Not enough URL parameters")
    return;
  }
  
  collection = pairs[0].split("=")[1];
  artefact = pairs[1].split("=")[1];
}

function setUpAR() {
  document.querySelector("#app").innerHTML = `
  <a-scene vr-mode-ui="enabled: false" arjs="sourceType: webcam; debugUIEnabled: false;">
  
  <a-marker preset="hiro" id="arMarker"></a-marker>

    <a-entity camera position="0 0 0"></a-entity>
  </a-scene>
  <button 
  class="absolute top-2 right-2 bg-purple-400 h-10 min-w-fit hover:bg-purple-500 text-white font-semibold py-1 px-2 rounded-full text-sm" 
  onclick=\"location.href='/artefact.html?collection=${collection}&artefact=${artefact}'\">Back to artefact</button>
`;
}

function insertModelEntity(modelLocation, scale) {
  var scaleStr = "1 1 1";
  if(scale != ""){
      scaleStr = scale;
  }

  document.querySelector("#arMarker").innerHTML = `
  <a-entity
  position="0 0 0"
  gltf-model=${modelLocation}
  scale=${scaleStr}
  ></a-entity> 
`;
}

function getModelName() {
  switch(collection){
    case "UON-MOA":
      switch(artefact){
        case "axe":
          insertModelEntity("/models/axe.glb", "");
          break;
        case "under":
          insertModelEntity("/models/under.glb", "");
            break;
        case "above":
          insertModelEntity("/models/tower.glb", "");
            break;
        case "tiny":
          insertModelEntity("/models/axe.glb", "0.1 0.1 0.1");
            break;
        case "huge":
          insertModelEntity("/models/axe.glb", "10 10 10");
            break;
      }

      break;
      default:
        console.log("ERROR: no matching collection")
        break;
  }
}
