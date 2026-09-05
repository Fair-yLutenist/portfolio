import { useEffect, useRef } from "react";
import {
  AgXToneMapping,
  Color,
  OrthographicCamera,
  Scene,
  WebGPURenderer,
} from "three/webgpu";
import { setupLight } from "../src/desktop/effect/light.js";
import { createPlane } from "../src/desktop/effect/plane.js";
import { setupTextures } from "../src/desktop/effect/textures.js";

const VIEW_HEIGHT = 4;
const MAX_PIXEL_RATIO = 2;

export default function BackgroundEffect({ imageSrc, depthSrc }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let renderer, camera, plane, resizeObserver;
    let cancelled = false;

    (async () => {
      renderer = new WebGPURenderer({ antialias: true });
      renderer.setPixelRatio(Math.min(devicePixelRatio, MAX_PIXEL_RATIO));
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.toneMapping = AgXToneMapping;

      container.appendChild(renderer.domElement);
      await renderer.init();

      if (cancelled) return;

      await setupTextures({ map: imageSrc, depth: depthSrc });

      const scene = new Scene();
      scene.background = new Color("#000000");

      camera = new OrthographicCamera();
      camera.position.set(0, 0, 5);

      setupLight(scene, camera);

      plane = createPlane();
      scene.add(plane);

      const onResize = () => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        const aspect = w / h;

        camera.top = VIEW_HEIGHT * 0.5;
        camera.bottom = -camera.top;
        camera.right = camera.top * aspect;
        camera.left = -camera.right;
        camera.updateProjectionMatrix();

        plane.scale.set(VIEW_HEIGHT * aspect, VIEW_HEIGHT, 1);
        renderer.setSize(w, h);
      };

      onResize();
      resizeObserver = new ResizeObserver(onResize);
      resizeObserver.observe(container);

      renderer.setAnimationLoop(() => renderer.render(scene, camera));
    })();

    return () => {
      cancelled = true;
      resizeObserver?.disconnect();
      renderer?.setAnimationLoop(null);
      renderer?.dispose();
      if (renderer?.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [imageSrc, depthSrc]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 block w-full h-full"
    />
  );
}