import '../css/style.css'
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

/*
Air Vent by J-Toastie [CC-BY] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/PCqBwDkgAz)
*/
// import modelAir from "../images/airvent.glb";



let renderer, scene, camera, object;

const canvas = document.querySelector("#canvas");

let size = {
  width: window.innerWidth,
  height: window.innerHeight
};

function init(){

  // レンダラー
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(size.width, size.height);
  // renderer.shadowMap.enable = true;

  //シーン
  scene = new THREE.Scene();

  //カメラ
  // camera = new THREE.PerspectiveCamera(45, size.width / size.height, 1, 100);
  // camera.position.set(0, 0, 5);
  // scene.add(camera);

  //ウインドウとWebGL座標を一致させる
  const fov = 45;
  const fovRadian = (fov / 2) * (Math.PI / 180); //視野角をラジアンに変換
  const distance = (size.height / 2) / Math.tan(fovRadian); //ウインドウぴったりのカメラ距離
  camera = new THREE.PerspectiveCamera(fov, size.width / size.height, 1, distance * 2);
  camera.position.z = distance;
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  scene.add(camera);

  //コントローラー
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  //ライト
  const light = new THREE.DirectionalLight(0xffffff, 1.5);
  light.position.set(1, 1, 1);
  scene.add(light);

  // ローダーを定義
  const gltfLoader = new GLTFLoader();
  // GLTFファイルのロード
  gltfLoader.load('/images/airvent.glb', (gltf) => {
    // シーンに追加
    object = gltf.scene
    scene.add(object);

    object.scale.set(200, 200, 200);
    object.rotation.y = radian(-45);

  });

  //メッシュ
  // const geometry = new THREE.BoxGeometry(50, 50, 50);
  // const material = new THREE.MeshStandardMaterial({color: 0x444444});
  // const mesh = new THREE.Mesh(geometry, material);
  // scene.add(mesh);


  function animate(){
    //アニメーション処理
    if(object) {
      object.rotation.y += 0.01;
    }
    
    //レンダリング
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(animate);
  }
  animate();
  
}

init();

// ラジアンに変換
function radian(val) {
  return (val * Math.PI) / 180;
}

// ランダムな数
// function random(min, max) {
//   return Math.random() * (max - min) + min;
// }

//リサイズ
function onWindowResize() {
  // レンダラーのサイズを修正
  renderer.setSize(window.innerWidth, window.innerHeight);
  // カメラのアスペクト比を修正
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}
window.addEventListener("resize", onWindowResize);
