import { 
  Font, 
  FontData 
} from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { 
  Scene,
  PerspectiveCamera,
  MeshPhongMaterial, 
  Mesh, 
  DirectionalLight,
  WebGLRenderer,
  Vector3
} from 'three';
import fontData from './resources/font/RubikGlitchPop_Regular.json';

function App() {
  const scene = new Scene();

  // Створення камери
  const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.setZ(100);

  // Створення рендерера
  const renderer = new WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  // renderer.setClearColor(0xc0c0c0);
  document.body.appendChild(renderer.domElement);

  // Завантаження шрифту
  const font = new Font(fontData as unknown as FontData);

  // Створення геометрії для літери "C"
  const geometry = new TextGeometry('C', {
    font: font,
    size: 80,
    height: 5,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 10,
    bevelSize: 8,
    bevelOffset: 0,
    bevelSegments: 5
  });

  // центруємо літеру "C" по центру координат
  geometry.computeBoundingBox();
  const center = geometry.boundingBox!.getCenter(new Vector3(0, 0, 0));
  geometry.translate(-center.x, -center.y, -center.z);  

  // Створення матеріалу для літери "C"
  const material = new MeshPhongMaterial({ color: 0x00ffb7, wireframe: false });

  // Створення мешу для літери "C"
  const letterC = new Mesh(geometry, material);

  // Додавання мешу на сцену
  scene.add(letterC);

  // Створення та додавання світла на сцену
  const light = new DirectionalLight(0xffffff, 1);
  light.position.set(10, 20, 10); // Позиція світла (x, y, z)
  scene.add(light);

  // Анімація та рендер сцени
  const animate = () => {
    requestAnimationFrame(animate);

    // Обертання літери "C" навколо своєї осі
    letterC.rotation.y += 0.01;
    
    renderer.render(scene, camera);
  };
  
  animate();
}

export default App;
