import { Float, useAnimations, useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

export default function Susy({ path }: { path: string }) {
  const gltf = useGLTF(path);
  const { ref, actions } = useAnimations(gltf.animations);

  const entryAnimation = async () => {
    if (!actions.landing) return;
    actions.landing.play();
    actions.landing.setLoop(THREE.LoopRepeat, 1);
    actions.landing.clampWhenFinished = true;
    actions["idle"]?.play();
  };

  useEffect(() => {
    entryAnimation();
  }, [actions.landing, actions.idle]);

  return (
    <Float
      speed={10} // Animation speed, defaults to 1
      rotationIntensity={0} // XYZ rotation intensity, defaults to 1
      floatingRange={[-0.2, 0]}
    >
      <primitive ref={ref} object={gltf.scene} />
    </Float>
  );
}
