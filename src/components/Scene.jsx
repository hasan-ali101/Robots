import React, { Suspense, useEffect, useState } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";

import Susy from "./susy";
import { Robin } from "./robin-animated";
import Spot from "./spot-light";

const zoom = 1;

const Scene = React.forwardRef((props, ref) => {
  const [showSpotlight, setShowSpotlight] = useState(false);
  const wood_platform = useGLTF("/round_platform.glb");
  const wood_platform_2 = useGLTF("/round_platform_2.glb");

  useEffect(() => {
    setTimeout(() => {
      setShowSpotlight("/");
    }, 2100);
  }, []);

  useEffect(() => {
    wood_platform.scene.traverse((child) => {
      if (child.isMesh) {
        child.material.color.setScalar(3);
      }
    });
    wood_platform_2.scene.traverse((child) => {
      if (child.isMesh) {
        child.material.color.setScalar(2.5);
      }
    });
  }, []);

  return (
    <mesh scale={zoom}>
      <ambientLight intensity={1} castShadow />
      {showSpotlight && (
        <Spot startPosition={[0.1, 2.8, 0]} targetPosition={[0, 0, 0]} />
      )}
      <mesh position={[0.7, -2, -2]} rotation-y={0.3} rotation-x={0} ref={ref}>
        <mesh
          scale={0.8}
          position={[-0.75, -0.23, 0.5]}
          rotation-y={-0.2}
          rotation-x={-0.1}
          rotation-z={-0.05}
        >
          <mesh
            className="cursor-pointer"
            scale={0.4}
            onClick={() => {
              setShowSpotlight(!showSpotlight);
            }}
          >
            <Suspense>
              <primitive receiveShadow object={wood_platform.scene} />
            </Suspense>
          </mesh>

          <mesh visible={props.bot === "robin"}>
            <Suspense>
              <Robin skin={props.skin} />
            </Suspense>
          </mesh>
          <mesh visible={props.bot === "susy"}>
            <Suspense>
              <Susy position={[-0.2, 0.05, -0.2]} path="/susy.glb" />
            </Suspense>
          </mesh>
        </mesh>
      </mesh>
    </mesh>
  );
});

export default Scene;
