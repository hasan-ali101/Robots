import { Float, useAnimations, useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

export default function Susy({ path }: { path: string }) {
  const gltf = useGLTF(path);
  const { ref, actions } = useAnimations(gltf.animations);

  const entryAnimation = async () => {
    if (!actions.landing) return;
    await actions.landing.play();
    actions.landing.setLoop(THREE.LoopRepeat, 1);
    actions.landing.clampWhenFinished = true;
    actions["idle"]?.play();
  };

  useEffect(() => {
    entryAnimation();
  }, [actions.landing, actions.idle]);

  return (
    <Float speed={10} rotationIntensity={0} floatingRange={[-0.2, 0]}>
      <primitive ref={ref} object={gltf.scene} />
    </Float>
  );
}
