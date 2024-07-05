import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

// Debug
const gui = new dat.GUI();

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();

//textures
const minecraft = textureLoader.load("/textures/minecraft.png");
const alpha = textureLoader.load("/textures/door/alpha.jpg");
const door = textureLoader.load("/textures/door/color.jpg");
const abmientOcclusion = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const height = textureLoader.load("/textures/door/height.jpg");
const metalness = textureLoader.load("/textures/door/metalness.jpg");
const normal = textureLoader.load("/textures/door/normal.jpg");
const roughness = textureLoader.load("/textures/door/roughness.jpg");
const matcapTexture = textureLoader.load("/textures/matcaps/1.png");
const gradientTexture = textureLoader.load("/textures/gradients/3.jpg");

minecraft.wrapS = THREE.MirroredRepeatWrapping;
minecraft.wrapT = THREE.MirroredRepeatWrapping;

minecraft.generateMipmaps = false;
minecraft.minFilter = THREE.NearestFilter;
minecraft.magFilter = THREE.NearestFilter;

gradientTexture.generateMipmaps = false;
gradientTexture.minFilter = THREE.NearestFilter;
gradientTexture.magFilter = THREE.NearestFilter;
gradientTexture.generateMipmaps = false;

const environmentMapTexture = cubeTextureLoader.load([
  "/textures/environmentMaps/0/px.jpg",
  "/textures/environmentMaps/0/nx.jpg",
  "/textures/environmentMaps/0/py.jpg",
  "/textures/environmentMaps/0/ny.jpg",
  "/textures/environmentMaps/0/pz.jpg",
  "/textures/environmentMaps/0/nz.jpg",
]);

// const material = new THREE.MeshBasicMaterial();
// material.map=minecraft;//texture
// material.color.set('blue')//color
// material.wireframe=true;//wireframe
// material.opacity=0.5
// material.transparent=true;
// material.alphaMap=alpha;
// material.side=THREE.DoubleSide //displays both sides of the plane or anything u rendering

// const material=new THREE.MeshNormalMaterial();
// material.flatShading=true;

// const material = new THREE.MeshMatcapMaterial()
// material.matcap=matcapTexture;//displaying the texture

// const material= new THREE.MeshDepthMaterial()

// const material= new THREE.MeshLambertMaterial();

// const material= new THREE.MeshPhongMaterial();
// material.shininess=100;
// material.specular= new THREE.Color("red")

// const material= new THREE.MeshToonMaterial();
// material.gradientMap=gradientTexture;

const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.2;
// material.map = door;
// material.aoMap=abmientOcclusion
// material.displacementMap=height
// material.displacementScale=0.10;
// material.metalnessMap=metalness;
// material.roughnessMap=roughness;
// material.normalMap=normal;
// material.alphaMap=alpha
// material.transparent=true;
material.envMap = environmentMapTexture;
gui.add(material, "metalness").min(0).max(1).step(0.0001);
gui.add(material, "roughness").min(0).max(1).step(0.0001);
gui.add(material, "aoMapIntensity").min(0).max(10).step(0.0001);
gui.add(material, "displacementScale").min(0).max(1).step(0.0001);

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), material);

sphere.position.x = -1.5;
sphere.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
);

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material); //first two params are for the plane and two others are the subdivisions
plane.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 64, 128),
  material
);

torus.position.x = +1.5;
torus.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2)
);

scene.add(sphere, plane, torus);

// lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);
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

  sphere.rotation.y = 0.1 * elapsedTime;
  plane.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.15 * elapsedTime;
  plane.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

//NOTES FOR THE CHAPTER

// Materials is used to insert colour into the each visible pixel of the geometries

// The algorithms are written in programs called shaders which we don’t need to write we can use the built in materials

// The mesh needs a material as another parameter

//  this time we have used one material for different geometry hence when we do changes in the one material we have changes in all of the material. For instance we have made the sphere plane and the torus
// And used the same material for all of that now if I change the color of the material then the color of all of the geometry will change.

// While using meshbasicmaterial we can merge all the properties like the
// Texture
// Color
// And the wireframe

// And while using the opacity we need to set that the material is tranparent or we can say set the materail transparency to true

// Also while using the alphaMap value we need to set the transparency into true

// alphaMap can be used to control the opacity in much detail

// Normals can be used for lighting reflection and refraction

// MeshNormalMaterial uses physically based rendering principles(PBR)

// PBR are the principles that tend to mimc the real life scenarios

// Flatshading will flatte the faces, meaning that the normals wont be interpolated between the vertices

// Mesh normal  and mesh basic share the same properties but the mesh normal has a unique propety called flatshading

// Meshmactcap material will display a color using the normal as a reference to pick the right color on a textture that looks like a sphere

// Mesh matcap material arent affected by lighting since the matcap files encode baked lighting. It will cast shawdow into the objects that receive shadows but won't self-shadow

// MeshLabmertMaterial is one of the material that  will react to light,
// When we remove the light the material isnt visible,
// When we keep only the ambinet light and not the point light then it will result in much dim materials.

// MeshPhongMaterial is very similar but the strange pattern from the lambert is gone. We can control the reflection with the shiness and the reflection with specular

// MeshToonMaterial is cartoonish.  We can have control over it by providing gradient

// Dat.GUI this is the tool to debug and tweak the values we need to add the values using gui.add() after declaring

// We can access the uv co-ordinaretes (plane.geometry.attributes.uv.array)

// We need to use setAttribute to set another additional attribute

// We didn’t chose uv2 3js needs uv2 coordinates to apply tha ambientocculusion textture
// We also need to pass the attribute array

// To use the texture and map we need to use the mateiral.aomap=texturename

// Can use aomap intensity to control the intensity

// When we used the high texute with displacement map the spheres where disordiented whereas the plane was fine

// That was due to the plane not having enough vertices hance we add subdivisions
// We also have other map which can be used for detailing and displaying better results

// we can also use the normalScale which is a vector 2 hence has an x and y and change the values accordingly

//we can also control the alpha using the alphaMap

//MeshPhysicalMaterial is the same as the MeshStandardMaterial but with support of a clear coat effect

//points material is used to make particles(details in later chapters)

//ShaderMaterial and RawShaderMateiral lets u make your own materials

//EnvironmentMap is the image of what should be outside of the scene So we provide what should be outside the scene it is supported by multiple materials but we will use MeshStandardMaterial

//3js only supports cube environment maps so we will use that to see how it looks

//we need to use the cubeTextureLoader and then we need to provide the texture in array in the order of positivex,negativex,positive y, negative y, positive z,negative zs

//where to find environment maps: THE WEB copyright free HDRIHaven

//use online tool to convert the HDRI into the cubemaps
