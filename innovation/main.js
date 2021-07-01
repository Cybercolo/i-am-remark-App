import {
	Scene,
	Color,
	PerspectiveCamera,
	OrthographicCamera,
	Fog,
	WebGLRenderer,
	HemisphereLight,
	PointLight,
	Shape,
	Mesh,
	Sprite,
	Texture,
	PlaneGeometry,
	ShapeGeometry,
	SpriteMaterial,
	MeshStandardMaterial,
	MeshBasicMaterial,
	Vector3,
	PointLightHelper,
	GridHelper,
	BoxGeometry,
} from "./source/three.module.js"

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
let isPressedMe = false;

//////////////////// ESCENA ////////////////////
const scene = new Scene();
scene.background = new Color("white");
scene.fog = new Fog("white", 10, 25);

//////////////////// CAMARAS ////////////////////
const camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 25);
// const camera = new OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 1, 1000);
camera.lookAt(getCameraTargetVector());

let cameraOriginalPosition = new Vector3(0, 1, 4)
camera.position.set(cameraOriginalPosition.x, cameraOriginalPosition.y, cameraOriginalPosition.z);

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
	color: "white"
});

const ground = new Mesh(geometryGround, materialGround);
ground.rotation.x = (Math.PI * -0.5);

ground.receiveShadow = true;


scene.add(ground);
//////////////////// HELPERS ////////////////////
const gridHelper = new GridHelper(20, 20);
const pointLightHelper = new PointLightHelper(pointLight);
scene.add(pointLightHelper);


//////////////////// RENDERER ////////////////////
const canvas = document.querySelector("#canvas");
const renderer = new WebGLRenderer({
	canvas,
	antialias: true
});

renderer.shadowMap.enabled = true;

renderer.render(scene, camera);

//////////////////// FUNCTIONS ////////////////////

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
		const vector0 = new Vector3(0, alturaSuelo, 0);
		return vector0;
	}
	let vector = new Vector3(index * distancia - (rowLength / 2) - ((rowLength + distancia) * (row - 1)), alturaSuelo, -(distanceBetweenRows + (row * distanceBetweenRows)));
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

	while (index <= wordsArray.length && index <= wordsArray.length) {
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
	// context.fillRect(0, 0, canvas.width, canvas.height)
	context.fillStyle = "black";
	context.textAlign = "left";

	let lineHeight = context.measureText("M").width * 1.5;
	let text = createText(item);
	let lines = text.split('/n');
	let rowsText = printDescriptionWithWordWrap(context, item.description, 50, 24 + lineHeight, lineHeight, 300) + 1;

	for (var i = 0; i < lines.length; i++) {
		context.fillText(lines[i], 50, 24 + (i * lineHeight * (rowsText + 1)));
	}

	let texture = new Texture(canvas);
	texture.needsUpdate = true;

	let spriteMaterial = new SpriteMaterial({
		map: texture
	});


	let sprite = new Sprite(spriteMaterial);

	sprite.position.set(0, 0.50 - 0.15, 0.15);
	bubbleMesh.add(sprite);
	scene.add(bubbleMesh);
}

function generateTextBubble(item, objectWidth, objectPositionX, objectHeight, objectPositionZ) {
	const bubbleShape = new Shape();
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

	let bubbleGeometry = new ShapeGeometry(bubbleShape);
	let bubbleMaterial = new MeshBasicMaterial({
		color: 0xf1f1f1
	});
	const bubbleMesh = new Mesh(bubbleGeometry, bubbleMaterial);
	bubbleMesh.position.set(objectPositionX, (objectHeight * 2) + 0.15, objectPositionZ);
	bubbleMesh.rotation.set(0, 0, 0)
	addText(item, bubbleMesh);

	scene.add(bubbleMesh);
}

let modelLocationArray = ["models3D/model01.glb", "models3D/model02.glb", "models3D/model03.glb", "models3D/model04.glb", "models3D/model05.glb", "models3D/model06.glb", "models3D/model07.glb", "models3D/model08.glb"]
const gltfLoader = new GLTFLoader();
let loadedModels = 0;
let modelsArray = [];

function loadNextModel() {
	if (loadedModels > modelLocationArray.length - 1) {
		generateElements(people, colors);
		return;
	};
	gltfLoader.load(modelLocationArray[loadedModels], function(object) {
		modelsArray.push(object.scene.children[0])
		loadedModels++;
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
		let color = new MeshStandardMaterial();
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

		// generateTextBubble(item, objectWidth, person.position.x, objectHeight, person.position.z);
		scene.add(person);
	});
}

// CAMERA MOVEMENT

// SCROLL
let wheelCount = camera.position.z;
canvas.addEventListener("wheel", function(e) {
	let maxZoomOutValue = 7;
	let cameraTargetVector = getCameraTargetVector();
	camera.lookAt(cameraTargetVector);

	pointLight.position.set(pointLight.position.x, pointLight.position.y, camera.position.z + 10); // pointlight following camera
	camera.position.z = getWheelCount(e);

	if (camera.position.z > maxZoomOutValue) { // camera zoom out limit
		stopZoomOut(maxZoomOutValue);
	} else if (camera.position.y < 3.5) {
		moveCameraYScroll(e);
	}
	longerGroundScroll(e);
});

function moveCameraYScroll(e) {
	if (e.deltaY < 0) { // if moves to the front
		camera.position.y++
	}

	if (e.deltaY > 0) { // if moves backwards
		if (camera.position.y <= 1) {
			return;
		}
		camera.position.y--
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

function longerGroundScroll(e) { // para que el suelo se alargue si la camara se va muy lejos
	e.deltaY < 0 ? ground.scale.set(1, (groundLength += 0.05), 1) : ground.scale.set(1, (groundLength -= 0.05), 1);
}

function stopZoomOut(maxZoomOutValue) {
	camera.position.set(0, 1, maxZoomOutValue);
	ground.scale.set(1, 1, 1);
	wheelCount = maxZoomOutValue;
	groundLength = 1;
}

function getTargetPositionCamara(cameraPositionCounter) {
	let targetPosition = new Vector3(0, 5, -(-1 + (cameraPositionCounter * distanceBetweenRows)));
	return targetPosition;
}

let cameraPositionCounter = 0;

document.querySelector(".forwards").addEventListener("click", function() {
	cameraPositionCounter++;
	let targetPosition = getTargetPositionCamara(cameraPositionCounter)
	// let targetPositionCamara = new Vector3(targetPosition.x, targetPosition.y, targetPosition.z);
	let duration = 1000;
	tweenCube(targetPosition, duration, cameraPositionCounter);
});

document.querySelector(".backwards").addEventListener("click", function() {
	cameraPositionCounter--;
	let targetPosition = getTargetPositionCamara(cameraPositionCounter)
	let duration = 1000;
	tweenCube(targetPosition, duration);
})

function tweenCube(targetPosition, duration) {
	let currentPosition = camera.position;
	let tween = new TWEEN.Tween(currentPosition)
		.to(targetPosition, duration)
		.onUpdate(function() {
			camera.position.y = currentPosition.y;
			pointLight.position.set(pointLight.position.x, pointLight.position.y, camera.position.z + 10);
			camera.lookAt(getCameraTargetVector());
			longerGround(currentPosition)
		})
		.start();
}


function longerGround(cameraPosition) {
	// if (ground.scale.y === 1) {
	// 	return;
	// }
	ground.scale.y = 1 + (cameraPositionCounter / 2);
	console.log(ground.scale);
	// console.log(cameraPosition.z * -1);
	// ground.scale.set(1, (groundLength -= 0.05), 1);
}

//////////////////// LOOP ////////////////////
function animate() {
	requestAnimationFrame(animate);

	camera.aspect = canvas.clientWidth / canvas.clientHeight;
	camera.updateProjectionMatrix();
	TWEEN.update()
	renderer.setSize(window.innerWidth, window.innerHeight);
	// controls.update();
	renderer.render(scene, camera);
}





animate();
loadNextModel()