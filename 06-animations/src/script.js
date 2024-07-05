import "./style.css";
import * as THREE from "three";
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();



// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
 
//animations

//time
// let time=Date.now()

//clock
const clock= new THREE.Clock();
gsap.to(mesh.position,{ duration:1, delay:1, x:2})

const tick = () =>
{
    // const currentTime= Date.now();
    // let deltaTime=currentTime-time;
    // time=currentTime; 
    // console.log(deltaTime )

    // const elapsedTime=clock.getElapsedTime()
    // console.log(elapsedTime)

    //update object
    // mesh.rotation.x += 0.01
    // mesh.rotation.y += 0.01
 
    // mesh.position.x = Math.sin(elapsedTime)
    // mesh.position.y = Math.sin(elapsedTime)
    // mesh.position.z = Math.sin (elapsedTime)

    // camera.position.x = Math.sin(elapsedTime)
    // camera.position.y = Math.sin(elapsedTime)
    // camera.lookAt(mesh.position)
    
    //render
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick)


};

tick();
