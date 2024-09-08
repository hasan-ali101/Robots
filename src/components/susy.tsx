import { Float, useAnimations, useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

export default function Susy({
  path,
  position,
}: {
  path: string;
  position: [number, number, number];
}) {
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

  return <primitive position={position} ref={ref} object={gltf.scene} />;
}
