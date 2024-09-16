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
        child.material.color.setScalar(6);
      }
    });
  }, []);

  return (
    <mesh scale={zoom}>
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        // minAzimuthAngle={-Math.PI / 4}
        // maxAzimuthAngle={Math.PI / 4}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
      />
      <ambientLight intensity={1} castShadow />
      {showSpotlight && (
        <Spot startPosition={[0.1, 3, 0]} targetPosition={[0, 0, 0]} />
      )}
      <mesh position={[0, -1.73, 0]} ref={ref}>
        <mesh scale={0.65}>
          <mesh
            className="cursor-pointer"
            scale={0.38}
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
              <Robin
                skin={props.skin}
                rotation-z={-Math.PI}
                rotation-x={-Math.PI / 2}
              />
            </Suspense>
          </mesh>
          <mesh visible={props.bot === "susy"}>
            <Suspense>
              <Susy position={[-0.2, 0, 0.2]} path="/susy.glb" />
            </Suspense>
          </mesh>
        </mesh>
      </mesh>
    </mesh>
  );
});

export default Scene;
