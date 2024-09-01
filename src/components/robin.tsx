import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

export default function Robin() {
  const gltf = useGLTF("/robin2.glb");
  const { ref, actions } = useAnimations(gltf.animations);

  useEffect(() => {
    const entryAnimation = async () => {
      if (!actions.landing) return;
      actions.landing.play();
      actions.landing.setLoop(THREE.LoopRepeat, 1);
      actions.landing.clampWhenFinished = true;
      actions?.idle?.play();
    };
    entryAnimation();
  }, [actions.landing, actions.idle]);

  return <primitive ref={ref} object={gltf.scene} />;
}
