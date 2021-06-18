import * as THREE from "three"

import {
	OrbitControls
} from "./node_modules/three/examples/jsm/controls/OrbitControls.js"

//////////////////// GLOBAL VARIABLES ////////////////////
let alturaSuelo = 0.49;
let row = 0;
let distancia = 1.25;
let rowLength = 4 * distancia;
let groundLength = 1;

//////////////////// ESCENA ////////////////////
const scene = new THREE.Scene();
scene.background = new THREE.Color("white");
scene.fog = new THREE.Fog("white", 0.1, 30);

//////////////////// CAMARAS ////////////////////
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1, 4);

//////////////////// LIGHT ////////////////////
const hemisphereLight = new THREE.HemisphereLight("white", "grey", 0.4);



const pointLight = new THREE.PointLight(0xffffff);
pointLight.intensity = 0.7;
pointLight.position.set(5, 10, 15);
pointLight.castShadow = true;


scene.add(hemisphereLight, pointLight);
//////////////////// GROUND ////////////////////
const geometryGround = new THREE.PlaneGeometry(50, 50);
const materialGround = new THREE.MeshStandardMaterial({
	color: "white"
});

const ground = new THREE.Mesh(geometryGround, materialGround);
ground.rotation.x = (Math.PI * -0.5);

ground.receiveShadow = true;


scene.add(ground);
//////////////////// HELPERS ////////////////////
const gridHelper = new THREE.GridHelper(20, 20);
const pointLightHelper = new THREE.PointLightHelper(pointLight);
scene.add(pointLightHelper, gridHelper);




//////////////////// RENDERER ////////////////////
const canvas = document.querySelector("#canvas");
const renderer = new THREE.WebGLRenderer({
	canvas
});

renderer.shadowMap.enabled = true;

renderer.render(scene, camera);

//////////////////// DATA ////////////////////
const geometryBox = new THREE.BoxGeometry(1, 2, 1);
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
let colors = [0xc4ec6e, 0x7089fa, 0xef86f7, 0xb681eb];
let boxes = [{
		id: "caja1"
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
//////////////////// LOOP ////////////////////
function animate() {
	requestAnimationFrame(animate);

	camera.aspect = canvas.clientWidth / canvas.clientHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);

	// controls.update();
	renderer.render(scene, camera);
}

//////////////////// FUNCTIONS ////////////////////

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

function getRandomItem(array) {
	let index = Math.floor(Math.random() * array.length);
	return array[index];
}

function setPosition(index, array) {
	if (index === array.length - 1) {
		const vector0 = new THREE.Vector3(0, alturaSuelo, 0);
		return vector0;
	}

	let vector = new THREE.Vector3(index * distancia - (rowLength / 2) - ((rowLength + distancia) * (row - 1)), alturaSuelo, -(6 + row * 6));
	return vector;
}

// SCROLL MOVEMENT
let wheelCount = camera.position.z;

canvas.addEventListener("wheel", function(e) {
	let maxZoomOutValue = 7;

	camera.position.z = getWheelCount(e);

	longerGround(e);

	if (camera.position.z > maxZoomOutValue) {
		stopZoomOut(maxZoomOutValue);
	}
	moveCameraY(e)

});

function moveCameraY(e) {
	if (e.deltaY < 0) {
		camera.position.y++
	} else if (camera.position.y <= 1) {
		camera.position.y = 1;
	} else {
		camera.position.y--
	}
}

function getWheelCount(e) {
	e.deltaY < 0 ? wheelCount-- : wheelCount++;
	return wheelCount;
}

function longerGround(e) {
	e.deltaY < 0 ? ground.scale.set(1, (groundLength += 0.05), 1) : ground.scale.set(1, (groundLength -= 0.05), 1);
}

function stopZoomOut(maxZoomOutValue) {
	camera.position.set(0, 1, maxZoomOutValue);
	ground.scale.set(1, 1, 1);
	wheelCount = maxZoomOutValue;
	groundLength = 1;
}



generateElements(models, boxes, colors);
animate();









// POINTLIGHT FOLLOWING CAMERA
// pointLight.position.set(camera.position.x, camera.position.y, camera.position.z);

// GENERACIÓN RANDOM
// let x = Math.floor(Math.random() * (ground.geometry.parameters.width / 2));
// x *= Math.round(Math.random()) ? 1 : -1;
// let z = Math.floor(Math.random() * (ground.geometry.parameters.height / 2));
// z *= Math.round(Math.random()) ? 1 : -1;
// caja.position.set(x, 0.49, z)