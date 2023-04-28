setUpAR();

switch (getModelName()) {
  case "feather":
    insertModelEntity("/models/featherHD.glb");
    break;
  case "ball":
    insertModelEntity("/models/ball.glb");
    break;
  default:
    console.log("something went wrong in switch");
    break;
}

function setUpAR() {
  document.querySelector("#app").innerHTML = `
  <a-scene vr-mode-ui="enabled: false" arjs>
    <a-marker preset="hiro" id="arMarker">
    </a-marker>
    <a-entity camera></a-entity>
  </a-scene>
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
  var urlParameter = window.location.search;
  urlParameter = urlParameter.substring(1);

  var pair = urlParameter.split("=");

  if (pair[0] != "model") {
    console.log("Wrong URL parameter");
  }

  return pair[1];
}
