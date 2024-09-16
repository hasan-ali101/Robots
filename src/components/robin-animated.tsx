import * as THREE from "three";
import React, { useEffect, useState } from "react";
import { useGraph } from "@react-three/fiber";
import { useGLTF, useAnimations, useTexture } from "@react-three/drei";
import { GLTF, SkeletonUtils } from "three-stdlib";

type ActionName =
  | "idle_1"
  | "stretch_1"
  | "land_1"
  | "stretch_1"
  | "stretch_2"
  | "wave_1";

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

export function Robin(props: { skin: string }) {
  const { scene, animations } = useGLTF("/robin_3.glb");
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone) as GLTFResult;
  const { actions, ref } = useAnimations(animations);
  const originalMaterial = nodes.CH_Susy001.material as any;
  const texture = useTexture(props.skin || "/rt1.png");
  const [firstRender, setFirstRender] = useState(true);

  const entryAnimation = () => {
    if (!actions.land_1) return;

    // Start land_1 animation
    actions.land_1.reset().setLoop(THREE.LoopRepeat, 1).play();
    actions.land_1.clampWhenFinished = true;

    const onLandFinish = () => {
      actions.land_1?.fadeOut(0.5);
      if (actions.wave_1) {
        actions.wave_1?.reset().setLoop(THREE.LoopRepeat, 4).fadeIn(0.5).play();
        actions.wave_1.clampWhenFinished = true;
      }

      const onWaveFinish = () => {
        actions.wave_1?.reset().fadeOut(0.5);
        if (actions.idle_1) {
          actions.idle_1.reset().fadeIn(0.5).play();
        }

        actions.wave_1
          ?.getMixer()
          .removeEventListener("finished", onWaveFinish);
      };

      actions.wave_1?.getMixer().addEventListener("finished", onWaveFinish);

      actions.land_1?.getMixer().removeEventListener("finished", onLandFinish);
    };

    actions.land_1.getMixer().addEventListener("finished", onLandFinish);
  };

  const stretch = () => {
    setTimeout(() => {
      actions["idle_1"] && actions["idle_1"].paused;
      setTimeout(() => {
        if (actions.stretch_1 && actions.idle_1) {
          actions["idle_1"].fadeOut(0.5);

          actions.stretch_1
            .reset()
            .setLoop(THREE.LoopRepeat, 2)
            .fadeIn(0.3)
            .play();
          actions.stretch_1.clampWhenFinished = true;
          // When stretch_1 finishes, fade it out
          const onStretchFinish = () => {
            actions.stretch_1?.fadeOut(0.5);
            actions.idle_1?.reset().fadeIn(0.5).play();

            // Clean up stretch_1 listener
            actions.stretch_1
              ?.getMixer()
              .removeEventListener("finished", onStretchFinish);

            stretch();
          };

          actions.stretch_1
            ?.getMixer()
            .addEventListener("finished", onStretchFinish);
        }
      }, 500);
    }, 10000);
  };

  useEffect(() => {
    if (firstRender) {
      entryAnimation();
      stretch();
    }
    setFirstRender(false);
  }, [firstRender, stretch, entryAnimation]);

  if (texture) {
    texture.flipY = false;
    originalMaterial.map = texture;
    originalMaterial.map.needsUpdate = true;
    actions?.idle?.play();
  }

  return (
    <group {...props} dispose={null}>
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
