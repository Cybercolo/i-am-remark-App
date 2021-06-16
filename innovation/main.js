import * as THREE from "three"

import {
	OrbitControls
} from "./node_modules/three/examples/jsm/controls/OrbitControls.js"


// ESCENA
const scene = new THREE.Scene();
scene.background = new THREE.Color("white");
scene.fog = new THREE.Fog("white", 0.1, 20);
// CAMARAS
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.set(5, 5, 5);



// GEOMETRIA
const geometryBox = new THREE.BoxGeometry(1, 1, 1);
const materialBox = new THREE.MeshStandardMaterial({
	color: 0xffffff
});
const box = new THREE.Mesh(geometryBox, materialBox);

box.position.setY((box.geometry.parameters.height) / 2);
box.castShadow = true;


scene.add(box);





// LIGHT
const hemisphereLight = new THREE.HemisphereLight("white", "grey", 0.4);



const pointLight = new THREE.PointLight(0xffffff);
pointLight.intensity = 0.7;
pointLight.position.set(5, 10, 15);
pointLight.castShadow = true;

scene.add(hemisphereLight, pointLight);




// GROUND
const geometryGround = new THREE.PlaneGeometry(50, 50);
const materialGround = new THREE.MeshStandardMaterial({
	color: "blue"
});

const ground = new THREE.Mesh(geometryGround, materialGround);
ground.rotation.x = (Math.PI * -0.5);

ground.receiveShadow = true;

scene.add(ground);




// HELPERS
// const gridHelper = new THREE.GridHelper(20, 20);
const pointLightHelper = new THREE.PointLightHelper(pointLight);
scene.add(pointLightHelper);




// RENDERER
const canvas = document.querySelector("#app");
const renderer = new THREE.WebGLRenderer({
	canvas
});

renderer.shadowMap.enabled = true;

renderer.render(scene, camera);



// CONTROLS
const controls = new OrbitControls(camera, canvas);
// controls.target.set(0, 0, 0);   // SET THE ORIGIN OF ORBIT CONTROLS




// LOOP
function animate() {
	requestAnimationFrame(animate);

	camera.aspect = canvas.clientWidth / canvas.clientHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);


	controls.update();
	renderer.render(scene, camera);


}

box.addEventListener("click", function() {

})





// FUNCTION

// function generateElements(array) {
// 	array.forEach((item, i) => {
// 		let caja = new THREE.Mesh(geometryBox, materialBox);
//
//
// 		caja.castShadow = true;
// 		scene.add(caja);
// 	});
// }
// // let boxes = [{
// 	name: "caja1"
// }, {
// 	name: "caja2"
// }];









// generateElements(boxes);

animate();

// POINTLIGHT FOLLOWING CAMERA
// pointLight.position.set(camera.position.x, camera.position.y, camera.position.z);

// GENERACIÓN RANDOM
// let x = Math.floor(Math.random() * (ground.geometry.parameters.width / 2));
// x *= Math.round(Math.random()) ? 1 : -1;
// let z = Math.floor(Math.random() * (ground.geometry.parameters.height / 2));
// z *= Math.round(Math.random()) ? 1 : -1;
// caja.position.set(x, 0.49, z)