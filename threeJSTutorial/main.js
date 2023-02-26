import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


const scene = new THREE.Scene();
//creating camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

//creating object using geometry

//go to three.js documentation and search for geometry
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );

//creating material
//mesh basic material is a material that is not affected by light
//const material = new THREE.MeshBasicMaterial( { color: 0xFF6347, wireframe: true } );


//mesh standard material is a material that is affected by light
const material = new THREE.MeshStandardMaterial( { color: 0xFF6347 } );

//creating mesh
//combines geometry and material
const torus = new THREE.Mesh( geometry, material );

scene.add(torus);

//////////lights//////////
//creating point light
//point light is a light that emits light in all directions
//light is white
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,5,5);

//creating ambient light
//ambient light is a light that emits light in all directions
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

//const lightHelper = new THREE.PointLightHelper(pointLight);
//const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(lightHelper, gridHelper);

//listens to mouse 
const controls = new OrbitControls(camera, renderer.domElement);


//adding background image
function addStars(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24); //creates sphere
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff }); //creates material
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100)); //creates random number between -100 and 100

  star.position.set(x, y, z);
  scene.add(star);
}

//creates 200 stars
Array(200).fill().forEach(addStars);

const spaceTexture = new THREE.TextureLoader().load('images/space.jpg');
scene.background = spaceTexture;


//adding avatar
const jeffTexture = new THREE.TextureLoader().load('images/jeff.png');

const jeff = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: jeffTexture })
);
scene.add(jeff);

////////moon
const moonTexture = new THREE.TextureLoader().load('images/moon.jpg');

//moon texture
const normalTexture = new THREE.TextureLoader().load('images/normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture
  })
);

//adds moon to the scene
scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);


function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  jeff.rotation.y += 0.01;
  jeff.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();


//infinite loop to animate the object
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();