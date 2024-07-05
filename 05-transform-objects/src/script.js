import "./style.css";
import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */

const group=new THREE.Group()

scene.add(group)

const cube1= new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color:pink})
)

group.add(cube1)

const cube2= new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),  
    new THREE.MeshBasicMaterial({color:red})
)

group.add(cube2)


/**
 * Sizes
 */ 
const sizes = {
  width: 800,
  height: 600,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 4;
scene.add(camera);

console.log(mesh.position.distanceTo(camera.position));

camera.lookAt(mesh.position)

//takes the length of the vector and reduces it to one
// mesh.position.normalize();
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
