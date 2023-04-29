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
    <a-marker preset="hiro" id="arMarker">
    </a-marker>
    <a-entity camera></a-entity>
  </a-scene>
  <button class="text-white fixed top-0 left-0" onclick=\"location.href='/artefact.html?collection=${collection}&artefact=${artefact}'\">Something</button>
`;
}

function insertModelEntity(modelLocation) {
  document.querySelector("#arMarker").innerHTML = `
  <a-entity
  position="0 0 0"
  gltf-model=${modelLocation}
  scale="10 10 10"
  ></a-entity> 
`;
}

function getModelName() {
  switch(collection){
    case "Notts":
      switch(artefact){
        case "feather":
          insertModelEntity("/models/featherHD.glb");
          break;
        case "ball":
          insertModelEntity("/models/ball.glb");
            break;
      }
      break;
      default:
        console.log("ERROR: no matching collection")
        break;
  }
}
