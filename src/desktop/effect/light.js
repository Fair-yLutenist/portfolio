import { uniform } from 'three/tsl'
import { AmbientLight, PointLight } from 'three/webgpu'

const MAX_DECAY = 4

export const pointLight = new PointLight('#e1ded1', 2.35, 0, 1)
pointLight.position.set(1.2, 0.8, 0.9)
Object.defineProperty(pointLight.userData, 'radius', {
  get: () => MAX_DECAY - pointLight.decay,
  set: (radius) => {
    pointLight.decay = MAX_DECAY - radius
  },
})

export const ambientLight = new AmbientLight('#ffffff', 0.3)

export const uLightPosition = uniform(pointLight.position)

export function setupLight(scene, camera) {
  scene.add(pointLight, ambientLight)

  addEventListener('pointermove', (event) => {
    const ndcX = (event.clientX / innerWidth) * 2 - 1
    const ndcY = -((event.clientY / innerHeight) * 2 - 1)
    pointLight.position.x = ndcX * camera.right
    pointLight.position.y = ndcY * camera.top
  })
}