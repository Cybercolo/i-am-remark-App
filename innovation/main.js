import * as THREE from "three"

import {
	GLTFLoader
} from "three/examples/jsm/loaders/GLTFLoader";

import {
	boxes
} from "./people.js";
// var parsedJSON = require('./people.json');
// var result = parsedJSON.people

//////////////////// GLOBAL VARIABLES ////////////////////
let alturaSuelo = 0.01;
let distancia = 1.2;
let rowLength = 4 * distancia;
let groundLength = 1;
let distanceBetweenRows = 8;

//////////////////// ESCENA ////////////////////
const scene = new THREE.Scene();
scene.background = new THREE.Color("white");
scene.fog = new THREE.Fog("white", 0.1, 35);

//////////////////// CAMARAS ////////////////////
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1, 4);

//////////////////// LIGHT ////////////////////
const hemisphereLight = new THREE.HemisphereLight(0xb5b5b5, 0x474747, 1);

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
scene.add(pointLightHelper);


//////////////////// RENDERER ////////////////////
const canvas = document.querySelector("#canvas");
const renderer = new THREE.WebGLRenderer({
	canvas
});

renderer.shadowMap.enabled = true;

renderer.render(scene, camera);

//////////////////// LOOP ////////////////////
function animate() {
	requestAnimationFrame(animate);

	camera.aspect = canvas.clientWidth / canvas.clientHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
	// controls.update();
	renderer.render(scene, camera);
}

//////////////////// DATA ////////////////////
let colors = [0xc4ec6e, 0x7089fa, 0xef86f7, 0xb681eb];


//////////////////// FUNCTIONS ////////////////////

// function generateElements(modelsArray, arrayPerson, colors) {
// 	arrayPerson.forEach((item, i) => {
// 		if (i % 5 == 0) {
// 			row++;
// 		}
//
// 		let person = getRandomItem(modelsArray).clone();
// 		let color = new THREE.MeshStandardMaterial();
// 		person.material = color;
// 		person.castShadow = true;
// 		person.material.color.set(getRandomItem(colors));
//
// 		person.position.set(setPosition(i, arrayPerson).x, setPosition(i, arrayPerson).y, setPosition(i, arrayPerson).z);
//
// 		scene.add(person);
//
// 	});
//
// }







function getRandomModelLocation() {
	let randomLocation = getRandomItem(modelLocationArray);
	return randomLocation;
}

function getRandomItem(array) {
	let index = Math.floor(Math.random() * array.length);
	return array[index];
}

function setPosition(index, row, array) {
	if (index === array.length - 1) {
		const vector0 = new THREE.Vector3(0, alturaSuelo, 0);
		return vector0;
	}
	let vector = new THREE.Vector3(index * distancia - (rowLength / 2) - ((rowLength + distancia) * (row - 1)), alturaSuelo, -(distanceBetweenRows + row * distanceBetweenRows));
	return vector;
}

function createText(item) {
	let text = `${item.name}/n${item.country}`
	return text;
}

function printDescriptionWithWordWrap(context, text, x, y, lineHeight, fitWidth) {
	let wordsArray = text.split(' ');
	let currentLine = 0;
	let index = 1;

	while (index <= wordsArray.length) {
		let string = wordsArray.slice(0, index).join(' ');
		let stringWidth = context.measureText(string).width;

		if (stringWidth > fitWidth) {
			let finalText = wordsArray.slice(0, index - 1).join(' ');
			context.fillText(finalText, x, y + (lineHeight * currentLine));
			currentLine++;
			wordsArray = wordsArray.splice(index - 1);
			index = 1;
		} else {
			index++;
		}
	}
	// Last line :
	context.fillText(wordsArray.join(' '), x, y + (lineHeight * currentLine));
	return currentLine;
}

function addText(item, bubbleMesh) {
	let canvas = document.createElement('canvas');
	canvas.width = 400;
	canvas.height = 400;
	let context = canvas.getContext("2d");
	context.font = "24pt Arial";
	context.fillStyle = "black";
	context.textAlign = "left";
	// context.fillRect(0, 0, canvas.width, canvas.height)

	let lineHeight = context.measureText("M").width * 1.5;
	let text = createText(item);
	let lines = text.split('/n');
	let rowsText = printDescriptionWithWordWrap(context, item.description, 50, 24 + lineHeight, lineHeight, 300) + 1;
	for (var i = 0; i < lines.length; i++) {
		context.fillText(lines[i], 50, 24 + (i * lineHeight * (rowsText + 1)));
	}

	let texture = new THREE.Texture(canvas);
	texture.needsUpdate = true;

	let spriteMaterial = new THREE.SpriteMaterial({
		map: texture
	});

	let sprite = new THREE.Sprite(spriteMaterial);
	sprite.position.set(0, 0.50 - 0.15, 0);
	// let centerPositionY = 1 / (rowsText + (rowsText / 2));
	// MAYBE FIX?? CENTER THIS
	bubbleMesh.add(sprite);
	scene.add(bubbleMesh);
}

function generateTextBubble(item, objectWidth, objectPositionX, objectHeight, objectPositionZ) {
	const bubbleShape = new THREE.Shape();
	let bubbleWidth = 1;
	let bubbleHeight = 1;
	let bubbleBorderRadius = 0.2;
	let bubblePositionX = -0.5;
	let bubblePositionY = 0;

	function roundedRect(ctx, x, y, width, height, radius) {
		ctx.moveTo(x, y + radius);
		ctx.lineTo(x, y + height - radius);
		ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
		ctx.lineTo(x + width - radius, y + height);
		ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
		ctx.lineTo(x + width, y + radius);
		ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
		ctx.lineTo(x + radius, y);
		ctx.quadraticCurveTo(x, y, x, y + radius);
	}
	roundedRect(bubbleShape, bubblePositionX, bubblePositionY, bubbleWidth, bubbleHeight, bubbleBorderRadius);

	let bubbleGeometry = new THREE.ShapeGeometry(bubbleShape);
	let bubbleMaterial = new THREE.MeshBasicMaterial({
		color: 0xf1f1f1
	});
	const bubbleMesh = new THREE.Mesh(bubbleGeometry, bubbleMaterial);
	bubbleMesh.position.set(objectPositionX, (objectHeight * 2) + 0.15, objectPositionZ);
	addText(item, bubbleMesh);

	scene.add(bubbleMesh);
}


let modelLocationArray = ["models3D/model01.glb", "models3D/model02.glb", "models3D/model03.glb", "models3D/model04.glb", "models3D/model05.glb", "models3D/model06.glb", "models3D/model07.glb", "models3D/model08.glb"]
const gltfLoader = new GLTFLoader();
let index = 0;
let modelsArray = [];

function loadNextModel() {
	if (index > modelLocationArray.length - 1) {
		generateElements(boxes, colors);
		return;
	};
	gltfLoader.load(modelLocationArray[index], function(object) {
		modelsArray.push(object.scene.children[0])
		index++;
		loadNextModel();
	});
}


function generateElements(arrayPerson, colors) {
	let row = 0;
	arrayPerson.forEach((item, index) => {
		if (index % 5 == 0) {
			row++
		}
		let person = getRandomItem(modelsArray).clone();
		let color = new THREE.MeshStandardMaterial();
		person.material = color;
		// gltf.scene --> Group
		// gltf.scene.children[0] --> Mesh
		person.material.color.set(getRandomItem(colors));
		person.scale.set(2, 2, 2);
		person.rotation.set(-1.5707963267948966, 0, -1.5707963267948966);
		person.position.set(setPosition(index, row, arrayPerson).x, setPosition(index, row, arrayPerson).y, setPosition(index, row, arrayPerson).z);
		person.castShadow = true;

		let boundingBox = person.geometry.boundingBox;
		let objectHeight = boundingBox.max.z - boundingBox.min.z;
		let objectWidth = boundingBox.max.y - boundingBox.min.y;

		generateTextBubble(item, objectWidth, person.position.x, objectHeight, person.position.z);
		scene.add(person);

	});
}

// SCROLL MOVEMENT
let wheelCount = camera.position.z;

canvas.addEventListener("wheel", function(e) {
	let maxZoomOutValue = 7;
	pointLight.position.set(pointLight.position.x, pointLight.position.y, camera.position.z + 10);
	camera.position.z = getWheelCount(e);
	console.log()
	longerGround(e);
	if (camera.position.z > maxZoomOutValue) {
		stopZoomOut(maxZoomOutValue);
	} else if (camera.position.y < 3.5) {
		moveCameraY(e)
	}
});

function moveCameraY(e) {
	if (camera.position.y < 3.5) {
		if (e.deltaY < 0) {
			camera.position.y++
		} else if (camera.position.y <= 1) { // para que la cam no atraviese el suelo
			camera.position.y = 1;
		} else {
			camera.position.y--
		}
	}
}

function getWheelCount(e) {
	e.deltaY < 0 ? wheelCount-- : wheelCount++;
	return wheelCount;
}

function longerGround(e) { // para que el suelo se alargue si la camara se va muy lejos
	e.deltaY < 0 ? ground.scale.set(1, (groundLength += 0.05), 1) : ground.scale.set(1, (groundLength -= 0.05), 1);
}

function stopZoomOut(maxZoomOutValue) {
	camera.position.set(0, 1, maxZoomOutValue);
	ground.scale.set(1, 1, 1);
	wheelCount = maxZoomOutValue;
	groundLength = 1;
}

animate();
loadNextModel()

// GENERACIÓN RANDOM
// let x = Math.floor(Math.random() * (ground.geometry.parameters.width / 2));
// x *= Math.round(Math.random()) ? 1 : -1;
// let z = Math.floor(Math.random() * (ground.geometry.parameters.height / 2));
// z *= Math.round(Math.random()) ? 1 : -1;
// caja.position.set(x, 0.49, z)