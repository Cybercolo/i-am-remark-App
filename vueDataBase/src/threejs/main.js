import {
	Scene,
	Color,
	PerspectiveCamera,
	Fog,
	WebGLRenderer,
	HemisphereLight,
	PointLight,
	Mesh,
	PlaneGeometry,
	MeshStandardMaterial,
	Vector3,
	PointLightHelper
} from "./source/three.module.js";

import {
	GLTFLoader
} from "./source/GLTFLoader.js";

import {
	people
} from "./people.js";

//////////////////// DATA ////////////////////
let colors = [0xc4ec6e, 0x7089fa, 0xef86f7, 0xb681eb];

//////////////////// GLOBAL VARIABLES ////////////////////
let alturaSuelo = 0.01;
let distancia = 1;
let rowLength = 4 * distancia;
let groundLength = 1;
let distanceBetweenRows = 8;

//////////////////// ESCENA ////////////////////
const scene = new Scene();
scene.background = new Color(0xdde9ed);
scene.fog = new Fog(0xdde9ed, 10, 25);

//////////////////// CAMARAS ////////////////////
const camera = new PerspectiveCamera(
	50,
	window.innerWidth / window.innerHeight,
	0.1,
	25
);
// const camera = new OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 1, 1000);
camera.lookAt(getCameraTargetVector());

let cameraOriginalPosition = new Vector3(0, 1, 4);
camera.position.set(
	cameraOriginalPosition.x,
	cameraOriginalPosition.y,
	cameraOriginalPosition.z
);

//////////////////// LIGHT ////////////////////
const hemisphereLight = new HemisphereLight(0xb5b5b5, 0x6f6f6f, 1);

const pointLight = new PointLight(0xffffff);
pointLight.intensity = 0.7;
pointLight.position.set(5, 10, 15);
pointLight.castShadow = true;

scene.add(hemisphereLight, pointLight);
//////////////////// GROUND ////////////////////
const geometryGround = new PlaneGeometry(50, 50);
const materialGround = new MeshStandardMaterial({
	color: 0xdde9ed,
});

const ground = new Mesh(geometryGround, materialGround);
ground.rotation.x = Math.PI * -0.5;

ground.receiveShadow = true;

scene.add(ground);
//////////////////// HELPERS ////////////////////
const pointLightHelper = new PointLightHelper(pointLight);
scene.add(pointLightHelper);

//////////////////// RENDERER ////////////////////
const canvas = document.querySelector("#canvas");
const renderer = new WebGLRenderer({
	canvas,
	antialias: true,
});

renderer.shadowMap.enabled = true;

renderer.render(scene, camera);

//////////////////// FUNCTIONS ////////////////////

// function getRandomModelLocation() {
// 	let randomLocation = getRandomItem(modelLocationArray);
// 	return randomLocation;
// }

function getRandomItem(array) {
	let index = Math.floor(Math.random() * array.length);
	return array[index];
}

function setPosition(index, row, array) {
	if (index === array.length - 1) {
		const vector0 = new Vector3(0, alturaSuelo, 0);
		return vector0;
	}
	let vector = new Vector3(
		index * distancia - rowLength / 2 - (rowLength + distancia) * (row - 1),
		alturaSuelo,
		-(distanceBetweenRows + row * distanceBetweenRows)
	);
	return vector;
}

let modelLocationArray = [
	"models3D/model01.glb",
	"models3D/model02.glb",
	"models3D/model03.glb",
	"models3D/model04.glb",
	"models3D/model05.glb",
	"models3D/model06.glb",
	"models3D/model07.glb",
	"models3D/model08.glb",
];
const gltfLoader = new GLTFLoader();
let loadedModels = 0;
let modelsArray = [];

function loadNextModel() {
	if (loadedModels > modelLocationArray.length - 1) {
		generateElements(people, colors);
		return;
	}
	gltfLoader.load(modelLocationArray[loadedModels], function(object) {
		modelsArray.push(object.scene.children[0]);
		loadedModels++;
		loadNextModel();
	});
}

function generateElements(arrayPerson, colors) {
	let row = 0;
	arrayPerson.forEach((item, index) => {
		if (index % 5 == 0) {
			row++;
		}
		let person = getRandomItem(modelsArray).clone();
		let color = new MeshStandardMaterial();
		person.material = color;
		// gltf.scene --> Group
		// gltf.scene.children[0] --> Mesh
		person.material.color.set(getRandomItem(colors));
		person.scale.set(2, 2, 2);
		person.rotation.set(-1.5707963267948966, 0, -1.5707963267948966);
		person.position.set(
			setPosition(index, row, arrayPerson).x,
			setPosition(index, row, arrayPerson).y,
			setPosition(index, row, arrayPerson).z
		);
		person.castShadow = true;
		//
		// 		let boundingBox = person.geometry.boundingBox;
		// 		let objectHeight = boundingBox.max.z - boundingBox.min.z;
		// 		let objectWidth = boundingBox.max.y - boundingBox.min.y;
		// 		// generateTextBubble(item, objectWidth, person.position.x, objectHeight, person.position.z);
		// 		scene.add(person);
	});
}

// CAMERA MOVEMENT

// SCROLL
let wheelCount = camera.position.z;
canvas.addEventListener("wheel", function(e) {
	let maxZoomOutValue = 7;
	let cameraTargetVector = getCameraTargetVector();
	camera.lookAt(cameraTargetVector);

	pointLight.position.set(
		pointLight.position.x,
		pointLight.position.y,
		camera.position.z + 10
	); // pointlight following camera
	camera.position.z = getWheelCount(e);

	if (camera.position.z > maxZoomOutValue) {
		// camera zoom out limit
		stopZoomOut(maxZoomOutValue);
	} else if (camera.position.y < 3.5) {
		moveCameraYScroll(e);
	}
	longerGroundScroll(e);
});

function moveCameraYScroll(e) {
	if (e.deltaY < 0) {
		// if moves to the front
		camera.position.y++;
	}

	if (e.deltaY > 0) {
		// if moves backwards
		if (camera.position.y <= 1) {
			return;
		}
		camera.position.y--;
	}
}

function getCameraTargetVector() {
	let cameraTargetVector = new Vector3(0, 1, camera.position.z - 15);
	return cameraTargetVector;
}

function getWheelCount(e) {
	e.deltaY < 0 ? wheelCount-- : wheelCount++;
	return wheelCount;
}

function longerGroundScroll(e) {
	// para que el suelo se alargue si la camara se va muy lejos
	e.deltaY < 0 ?
		ground.scale.set(1, (groundLength += 0.05), 1) :
		ground.scale.set(1, (groundLength -= 0.05), 1);
}

function stopZoomOut(maxZoomOutValue) {
	camera.position.set(0, 1, maxZoomOutValue);
	ground.scale.set(1, 1, 1);
	wheelCount = maxZoomOutValue;
	groundLength = 1;
}

function getTargetPositionCamara(cameraPositionCounter) {
	let targetPosition;
	if (cameraPositionCounter === 0) {
		targetPosition = new Vector3(
			cameraOriginalPosition.x,
			cameraOriginalPosition.y,
			cameraOriginalPosition.z
		);
		return targetPosition;
	}
	targetPosition = new Vector3(
		0,
		5,
		-(-1 + cameraPositionCounter * distanceBetweenRows)
	);
	return targetPosition;
}

let cameraPositionCounter = 0;
let bubblesContainer = document.querySelector(".bubbles");
let peopleIndex = 0;

document.querySelector(".forwards").addEventListener("click", function() {
	if (peopleIndex === 0) generateBubbles();
	console.log(people[peopleIndex])
	if (peopleIndex % 5 === 0) {
		cameraPositionCounter++;
		let targetPosition = getTargetPositionCamara(cameraPositionCounter);
		let duration = 1000;
		tweenCube(targetPosition, duration, cameraPositionCounter);
	}
	if (peopleIndex !== 1) {
		moveBubbles(bubblesContainer, peopleIndex - 1, true);
	}
	peopleIndex++;

});

document.querySelector(".backwards").addEventListener("click", function() {
	if (peopleIndex === 1) hideBubbles();
	console.log(people[peopleIndex])
	if (peopleIndex % 5 === 0) {
		cameraPositionCounter--;
		let targetPosition = getTargetPositionCamara(cameraPositionCounter);
		let duration = 1000;
		tweenCube(targetPosition, duration);
	}
	if (peopleIndex !== 0) {
		// if its not the first one
		moveBubbles(bubblesContainer, peopleIndex - 1, false);
		console.log(people[peopleIndex]);
		peopleIndex--;
	}

});

function tweenCube(targetPosition, duration) {
	let currentPosition = camera.position;
	let tween = new TWEEN.Tween(currentPosition)
		.to(targetPosition, duration)
		.onUpdate(function() {
			camera.position.y = currentPosition.y;
			pointLight.position.set(
				pointLight.position.x,
				pointLight.position.y,
				camera.position.z + 10
			);
			camera.lookAt(getCameraTargetVector());
			ground.scale.y = 1 + cameraPositionCounter / 1.5;
		})
		.start();
}

function generateBubbles() {
	people.forEach((item) => {
		let bubble = document.createElement("div");
		bubble.classList.add("bubble");
		bubble.innerHTML = `<p>${item.name}</p>
		<p>${item.description}</p>
		<p>${item.country}</p>`;
		bubblesContainer.appendChild(bubble);
		bubblesContainer.style.display = "flex";
	});
}

function hideBubbles() {
	bubblesContainer.style.transform = `translateX(0)`;
	bubblesContainer.style.display = "none";
}

// RETURNS THE INDEX OF THE ITEM IN ARRAY
// function getIndex(item) {
// 	let index = people.indexOf(item);
// 	return index;
// }

// MOVES THE OBJECT THE EXACT AMOUNT TO BE CENTERED, BASED ON INDEX
function moveBubbles(bubblesContainer, indexPeople, isFont) {
	let nextIndex;
	if (isFont) {
		nextIndex = indexPeople + 1;
	} else {
		nextIndex = indexPeople - 1;
	}
	nextIndex = indexPeople + 1;
	bubblesContainer.style.transform = `translateX(-${(100 / people.length) * nextIndex}%)`;
}

//////////////////// LOOP ////////////////////
function animate() {
	requestAnimationFrame(animate);

	camera.aspect = canvas.clientWidth / canvas.clientHeight;
	camera.updateProjectionMatrix();
	TWEEN.update();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.render(scene, camera);
}

animate();
loadNextModel();

export * from "../threejs/main.js"