import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // we can do inside the class or do
//out side of the class by accessing each material
// ambientLight.color=new THREE.Color(0xffffff)
// ambientLight.intensity=0.5
scene.add(ambientLight);

//directional light
const directionalLight=new THREE.DirectionalLight(0x00fffc,0.3)
// directionalLight.position
scene.add(directionalLight)

//hemisphere light
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.5);//in this light we need to add the light color for the upperhemisphere and the lower hemisphere and also the intensity as the third parameter
scene.add(hemisphereLight);//dont forget to add to the scene

//point light
//point light is a small point which will disperse light into every direction
//the intensity will be strong if the face is facing the light
// const pointLight=new THREE.PointLight(0x00ff00,0.5,3,2)//parameters are the color,intensity, distance and decay(dimness)
// pointLight.position.set(1,-0.5,1)
// scene.add(pointLight)

//rectAreaLight only works with MeshStandrdMaterial and MeshPhysicalMaterial
const reactAreaLight= new THREE.RectAreaLight(0x4e00ff,2,3,1)
reactAreaLight.position.set(-1.5,0,1.5)
reactAreaLight.lookAt(new THREE.Vector3());
scene.add(reactAreaLight)

const spotLight = new THREE.SpotLight(
  0x78ff00,
  0.5,
  10,
  Math.PI * 0.1,
  0.25,
  1
); //penumbra is how the light is dimmed along the edges of the light ray
spotLight.position.set(0, 2, 3);
scene.add(spotLight);
spotLight.target.position.x = -1.75;
// scene.add(spotLight.target)//direct it to the left
//spotlight works differently its a object and not a vector3

//handle performance issues while using light

//low cost light
//ambient and hemisphere

//BAKING
//means baking the light inside the texture

//HELPERS
// positining the light can be difficult as we cannot see light and only can see the effect of light so we use lighthelped
const hemisphereLightHelper=new THREE.HemisphereLightHelper(hemisphereLight, 0.2);
scene.add(hemisphereLightHelper)

const directionalLightHelper= new THREE.DirectionalLightHelper(directionalLight,0.2)
scene.add(directionalLightHelper)

//moves the helper towards the light 
const spotLightHelper= new THREE.SpotLightHelper(spotLight,0.2)
scene.add(spotLightHelper)
window.requestAnimationFrame(()=>{
    spotLightHelper.update();
})

const rectAreaLightHelper= new RectAreaLightHelper(reactAreaLight)  
scene.add(rectAreaLightHelper)
/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.4;

// Objects
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.position.x = -1.5;

const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 32, 64),
  material
);
torus.position.x = 1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.65;

scene.add(sphere, cube, torus, plane);

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

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime;
  cube.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.15 * elapsedTime;
  cube.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

/*

    - we instantiate the light class and add it to the scene like the mesh
    - 
*/
