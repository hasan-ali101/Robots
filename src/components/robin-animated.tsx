import * as THREE from "three";
import React, { useEffect, useState } from "react";
import { useGraph } from "@react-three/fiber";
import { useGLTF, useAnimations, useTexture } from "@react-three/drei";
import { GLTF, SkeletonUtils } from "three-stdlib";
import { on } from "events";

type ActionName =
  | "idle_1"
  | "stretch_1"
  | "land_1"
  | "stretch_1"
  | "stretch_1"
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

const idleAnimations = [
  "idle_2",
  "idle_2",
  "idle_2",
  "idle_2",
  "stretch_1",
  "stretch_1",
  "stretch_2",
  "stretch_4",
];

const getRandomIdle = () => {
  return idleAnimations[Math.floor(Math.random() * idleAnimations.length)];
};

export function Robin(props: { skin: string }) {
  const { scene, animations } = useGLTF("/robin_5.glb");
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
        actions.wave_1?.reset().setLoop(THREE.LoopRepeat, 2).fadeIn(0.5).play();
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

  let stretchTimeout: NodeJS.Timeout;

  const stretch = () => {
    const randomIdle = getRandomIdle();
    stretchTimeout = setTimeout(() => {
      /*
      if (actions.idle_2?.isRunning()) {
        stretch();
        return;
      } 
       */
      // replace idle_2 with emote ^
      if (actions[randomIdle] && actions.idle_1) {
        actions["idle_1"].fadeOut(0.5);

        actions[randomIdle]!.reset()
          .setLoop(THREE.LoopRepeat, 1)
          .fadeIn(0.5)
          .play();
        actions[randomIdle]!.clampWhenFinished = true;
        const onStretchFinish = () => {
          actions[randomIdle]!.fadeOut(0.5);
          actions.idle_1?.reset().fadeIn(0.5).play();
          actions[randomIdle]!?.getMixer().removeEventListener(
            "finished",
            onStretchFinish
          );

          stretch();
        };

        actions[randomIdle]!?.getMixer().addEventListener(
          "finished",
          onStretchFinish
        );
      }
    }, 7000);
  };

  // const dance = () => {
  //   if (actions["idle_1"]?.isRunning() || actions["stretch_1"]?.isRunning()) {
  //     actions["idle_1"]?.isRunning() && actions["idle_1"]?.fadeOut(0.5);
  //     actions["stretch_1"]?.isRunning() && actions["stretch_1"].fadeOut(0.5);
  //     actions["idle_2"]
  //       ?.reset()
  //       .setLoop(THREE.LoopRepeat, 1)
  //       .fadeIn(0.5)
  //       .play();
  //     actions["idle_2"]!.clampWhenFinished = true;

  //     const onDanceFinish = () => {
  //       actions["idle_2"]?.fadeOut(0.5);
  //       actions["idle_1"]?.reset().fadeIn(0.5).play();
  //       actions["idle_2"]
  //         ?.getMixer()
  //         .removeEventListener("finished", onDanceFinish);
  //     };

  //     actions["idle_2"]?.getMixer().addEventListener("finished", onDanceFinish);
  //   }
  // };

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
    <group
      castShadow
      receiveShadow
      {...props}
      dispose={null}
      onClick={() => {
        // dance();
        console.log("clicked");
      }}
    >
      <group name="Scene">
        <group
          castShadow
          receiveShadow
          name="R_Robin"
          position={[0, 0, 0.843]}
          rotation={[-Math.PI / 2, 0, Math.PI]}
        >
          <primitive object={nodes.Root} />
          <skinnedMesh
            castShadow
            receiveShadow
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
