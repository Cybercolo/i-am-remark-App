<template>
    <div id="container"></div>
</template>

<script>
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

export default {
  name: 'Canvas3dJs',
  data() {
    return {
      camera: null,
      scene: null,
      pointLight: null,
      hemisphereLight: null,
      ground: null,
    

      renderer: null,
      mesh: null,

    mainColor : "0x6FA8DC",
    colors : [0xc4ec6e, 0x7089fa, 0xef86f7, 0xb681eb],
    alturaSuelo : 0.01,
    distancia : 1,
    rowLength : 4 * this.distancia,
    groundLength : 1,
    distanceBetweenRows : 8,
    isPressedMe : false,
    }
  },
  methods: {
    init: function() {
        let container = document.getElementById('container');    
        let geometry = new Three.BoxGeometry(0.2, 0.2, 0.2);
        let material = new Three.MeshNormalMaterial();

        this.mesh = new Three.Mesh(geometry, material);
        this.scene.add(this.mesh);

        this.renderer = new Three.WebGLRenderer({antialias: true});
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(this.renderer.domElement);


        ///

      
let cameraOriginalPosition = new Vector3(0, 1, 4)

//////////////////// ESCENA ////////////////////
this.scene = new Scene();
this.scene.fog = new Fog(mainColor, 10, 25);

//////////////////// CAMARAS ////////////////////
this.camera = new PerspectiveCamera(50, container.clientWidth/container.clientHeight, 0.01, 10);
this.camera.lookAt(getCameraTargetVector());
this.camera.position.set(cameraOriginalPosition.x, cameraOriginalPosition.y, cameraOriginalPosition.z);

//////////////////// LIGHT ////////////////////
this.hemisphereLight = new HemisphereLight(0xb5b5b5, 0x6f6f6f, 1);
this.pointLight = new PointLight(0xffffff);
this.pointLight.intensity = 0.7;
this.pointLight.position.set(5, 10, 15);
this.pointLight.castShadow = true;
this.scene.add(this.hemisphereLight, this.pointLight);

//////////////////// GROUND ////////////////////
let geometryGround = new PlaneGeometry(50, 50);
let materialGround = new MeshStandardMaterial({
	color: mainColor,	
});

this.ground = new Mesh(geometryGround, materialGround);
this.ground.rotation.x = (Math.PI * -0.5);
this.ground.receiveShadow = true;

this.scene.add(this.ground);
//////////////////// HELPERS ////////////////////
const gridHelper = new GridHelper(20, 20);
const pointLightHelper = new PointLightHelper(pointLight);
scene.add(pointLightHelper);


//////////////////// RENDERER ////////////////////
const canvas = document.querySelector("#canvas");
const renderer = new WebGLRenderer({
	canvas,
	antialias: true,
	alpha:true
});



renderer.shadowMap.enabled = true;

renderer.render(scene, camera);

    },
    animate: function() {
        requestAnimationFrame(this.animate);
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.02;
        this.renderer.render(this.scene, this.camera);
    }
  },
  mounted() {
      this.init();
      this.animate();
  }
}
</script>
