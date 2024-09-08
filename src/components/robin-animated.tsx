import * as THREE from "three";
import React, { useEffect } from "react";
import { useGraph } from "@react-three/fiber";
import { useGLTF, useAnimations, Float, useTexture } from "@react-three/drei";
import { GLTF, SkeletonUtils } from "three-stdlib";

type ActionName = "idle" | "landing";

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}

type GLTFResult = GLTF & {
  nodes: {
    CH_Susy001: THREE.SkinnedMesh;
    Root: THREE.Bone;
  };
  materials: {
    M_RobinSport: THREE.MeshStandardMaterial;
  };
  animations: GLTFAction[];
};

export function Robin({ skin }: { skin: string }) {
  const { scene, animations } = useGLTF("/robin.glb");
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone) as GLTFResult;
  const { actions, ref } = useAnimations(animations);
  const originalMaterial = nodes.CH_Susy001.material as any;
  const texture = useTexture(skin || "/rt1.png");

  console.log(skin);

  const entryAnimation = async () => {
    if (!actions.landing) return;
    actions.landing.play();
    actions.landing.setLoop(THREE.LoopRepeat, 1);
    actions.landing.clampWhenFinished = true;
    actions?.idle?.play();
  };

  useEffect(() => {
    entryAnimation();
  }, []);

  if (texture) {
    texture.flipY = false;
    originalMaterial.map = texture;
    originalMaterial.map.needsUpdate = true;
    actions?.idle?.play();
  }

  return (
    <group dispose={null}>
      <group name="Scene">
        <group
          name="R_Robin"
          position={[0, 0, 0.843]}
          rotation={[-Math.PI / 2, 0, Math.PI]}
        >
          <primitive object={nodes.Root} />
          <skinnedMesh
            ref={ref as any}
            name="CH_Susy001"
            geometry={nodes.CH_Susy001.geometry}
            material={originalMaterial}
            skeleton={nodes.CH_Susy001.skeleton}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/robin-animated.glb");
