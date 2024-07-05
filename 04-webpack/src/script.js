import './style.css'

//importing 3js
import * as THREE from 'three'

console.log(THREE)

const scene= new THREE.Scene();

//red cube
const geometry=new THREE.BoxGeometry(1,1,1);
const material= new THREE.MeshBasicMaterial({color:'pink'})
const mesh= new THREE.Mesh(geometry,material)
scene.add(mesh)

//size of the model
const sizes={
    width:800,
    height:600
}

//camera
const camera=new THREE.PerspectiveCamera(75,sizes.width/sizes.height)
camera.position.z=3
camera.position.x=2
camera.position.y=1

scene.add(camera)

//renderer
const canvas=document.querySelector('.webgl')
const renderer= new THREE.WebGLRenderer({
    canvas:canvas
})

renderer.setSize(sizes.width, sizes.height)

renderer.render(scene,camera)