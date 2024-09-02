import React, { useEffect } from "react";
import { useGraph } from "@react-three/fiber";
import { useAnimations, useGLTF, useTexture } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import { MeshStandardMaterial } from "three";
import * as THREE from "three";

export function Model(props) {
  const gltf = useGLTF("/untitled.glb");
  const material = useTexture("/robin-texture-1.png");

  const clone = React.useMemo(
    () => SkeletonUtils.clone(gltf.scene),
    [gltf.scene]
  );
  const { nodes } = useGraph(clone);

  const customMaterial = React.useMemo(
    () =>
      new MeshStandardMaterial({
        map: material,
      }),
    [material]
  );

  const { ref, actions } = useAnimations(gltf.animations);

  const entryAnimation = async () => {
    if (!actions.landing) return;
    actions.landing.play();
    actions.landing.setLoop(THREE.LoopRepeat, 1);
    actions.landing.clampWhenFinished = true;
    actions?.idle?.play();
  };

  useEffect(() => {
    entryAnimation();
  }, [actions.landing, actions.idle]);

  return (
    <group {...props} dispose={null}>
      <group
        position={[0, -0.5, 0]}
        rotation-y={Math.PI}
        rotation-x={Math.PI / 2}
      >
        <primitive object={nodes.Root} />
        <skinnedMesh
          ref={ref}
          geometry={nodes.CH_Susy001.geometry}
          material={customMaterial}
          skeleton={nodes.CH_Susy001.skeleton}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/untitled.glb");
