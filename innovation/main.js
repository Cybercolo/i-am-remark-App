import * as THREE from "three"

import {
	OrbitControls
} from "./node_modules/three/examples/jsm/controls/OrbitControls.js"

let alturaSuelo = 0.49;
let distancia = 1.5;
let rowLength = 6;
let counterRow = 0;
let row = 0;
// length dependiente de distancia !!!



// ESCENA
const scene = new THREE.Scene();
scene.background = new THREE.Color("white");
scene.fog = new THREE.Fog("white", 0.1, 30);
// CAMARAS
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.set(0, 2, 3);
camera.focus = 1;



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
	color: "white"
});

const ground = new THREE.Mesh(geometryGround, materialGround);
ground.rotation.x = (Math.PI * -0.5);

ground.receiveShadow = true;

scene.add(ground);




// HELPERS
const gridHelper = new THREE.GridHelper(20, 20);
const pointLightHelper = new THREE.PointLightHelper(pointLight);
scene.add(pointLightHelper, gridHelper);




// RENDERER
const canvas = document.querySelector("#app");
const renderer = new THREE.WebGLRenderer({
	canvas
});

renderer.shadowMap.enabled = true;

renderer.render(scene, camera);



// CONTROLS
// const controls = new OrbitControls(camera, canvas);
// controls.target.set(0, 0, 0);   // SET THE ORIGIN OF ORBIT CONTROLS




// LOOP
function animate() {
	requestAnimationFrame(animate);

	camera.aspect = canvas.clientWidth / canvas.clientHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);

	// controls.update();
	renderer.render(scene, camera);
}



// MODELS
const geometryBox = new THREE.BoxGeometry(1, 1, 1);
const materialBox = new THREE.MeshStandardMaterial({
	color: 0xffffff
});
const geometrySpehere = new THREE.SphereGeometry(0.5, 8, 6);
const materialSpehere = new THREE.MeshStandardMaterial();

const box01 = new THREE.Mesh(geometryBox, materialBox);
const box02 = new THREE.Mesh(geometryBox, materialBox);
const spehere03 = new THREE.Mesh(geometrySpehere, materialSpehere);
const box04 = new THREE.Mesh(geometryBox, materialBox);

let models = [box01, box02, spehere03, box04];




// FUNCTION


function generateElements(arrayModels, arrayPerson, colors) {
	arrayPerson.forEach((item, i) => {
		if (i % 5 == 0) {
			row++;
		}
		let person = getRandomItem(arrayModels).clone();
		let color = new THREE.MeshStandardMaterial();
		person.material = color;
		person.castShadow = true;
		person.material.color.set(getRandomItem(colors));

		person.position.set(setPosition(i, arrayPerson).x, setPosition(i, arrayPerson).y, setPosition(i, arrayPerson).z);

		scene.add(person);
	});
}

let boxes = [{
		name: "caja1"
	},
	{
		name: "caja2"
	},
	{
		name: "caja3"
	},
	{
		name: "caja4"
	},
	{
		name: "caja5"
	},
	{
		name: "caja6"
	},
	{
		name: "caja7"
	},
	{
		name: "caja8"
	},
	{
		name: "caja9"
	},
	{
		name: "caja10"
	},
	{
		name: "caja11"
	},
	{
		name: "caja12"
	}
];

let colors = [0xc4ec6e, 0x7089fa, 0xef86f7, 0xb681eb];

generateElements(models, boxes, colors);

function getRandomItem(array) {
	let index = Math.floor(Math.random() * array.length);
	return array[index];
}


function setPosition(index, array) {
	if (index === array.length - 1) {
		const vector0 = new THREE.Vector3(0, alturaSuelo, 0);
		return vector0;
	}

	let vector = new THREE.Vector3(index * 1.5 - (rowLength / 2) - ((rowLength + 1.5) * (row - 1)), alturaSuelo, -(6 + row * 2));
	return vector;

}


let dummyTargetPosition = new THREE.Vector3(0, 0, 0);
dummyTargetPosition;
// let wheelCount = 0;
let count = 0;

function getWheelCount(e) {
	e.deltaY < 0 ? count-- : count++;
	// console.log(count)
	return count;
}



canvas.addEventListener("wheel", function(e) {
	// let count = getWheelCount(e);
	camera.position.set(0, 2, getWheelCount(e))

});





// scope.domElement.addEventListener( 'wheel', onMouseWheel, { passive: false } );





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