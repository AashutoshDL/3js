import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import * as dat from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
// const axesHelper= new THREE.AxesHelper();
// scene.add(axesHelper)
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("/textures/matcaps/8.png");
// fonts
const fontLoader = new FontLoader();

fontLoader.load(
  "/font/helvetiker_regular.typeface.json",

  (font) => {
    // cons ole.log("font loaded");
    const textGeometry = new TextGeometry("Skill Museum", {
      font: font,
      size: 0.5,
      height: 0.2,
      curveSegments: 4,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.01,
      bevelOffset: 0,
      bevelSegments: 5,
    });
    textGeometry.center();
    const material = new THREE.MeshMatcapMaterial({
      matcap: matcapTexture,
    });
    const text = new THREE.Mesh(textGeometry, material);
    scene.add(text);

    // console.time('donuts');//used to monitfor the time its JS not 3js

    const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);

    for (let i = 0; i < 200; i++) {
      const donut = new THREE.Mesh(donutGeometry, material);
      //randomness of the donut
      donut.position.x = (Math.random() - 0.5) * 10;
      donut.position.y = (Math.random() - 0.5) * 10;
      donut.position.z = (Math.random() - 0.5) * 10;
      //rotation of the donut 
      donut.rotation.x = Math.random() * Math.PI;
      donut.rotation.y = Math.random() * Math.PI;

      const scale = Math.random();
      donut.scale.set(scale, scale, scale);

      //adding the scene into the donut
      scene.add(donut);
    }
    // console.timeEnd('donuts') used to monitor the time its JS NOT 3JS
  }
);

/**
 * Object
 */
// const cube = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial()
// );

// scene.add(cube);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

/*
 CHAPTER NOTES

 - since the FontLoader.js had been moved to another directory we needed to import it and then use it without the 'THREE.'
 - load function expects a callback function
 - in js now if the propert of the object is same as the vairable we can write only once
 - goal is to center the text we pulled out the axesHelper to help with centering the code
 - but we can simply shift the mesh to make the text appear in the center but that would affect the rotation
 - the center isnt the exact corner of the HELLO text but a little of the corner of H
 - box and shpere bounding
 - by default 3js used sphereBounding
 - we can do this     
    textGeometry.computeBoundingBox()
    textGeometry.translate(
      -(textGeometry.boundingBox.max.x-0.02) * 0.5,
      -(textGeometry.boundingBox.max.y-0.02) * 0.5,
      -(textGeometry.boundingBox.max.z-0.03) * 0.5
    )
    and center the text or use textGeometry.center() function to center the text
 -  
*/
