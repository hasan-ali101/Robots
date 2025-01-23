import React, { Suspense, useEffect, useState } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";

import { Robin } from "./robin-animated";
import Spot from "./spot-light";

const zoom = 1;

const Scene = React.forwardRef(
  ({ night, texture }: { night: boolean; texture: string }, ref) => {
    const [showSpotlight, setShowSpotlight] = useState(false);

    const wood_platform = useGLTF("/round_platform_2.glb");

    useEffect(() => {
      setTimeout(() => {
        if (night) {
          !showSpotlight && setShowSpotlight(true);
        } else {
          showSpotlight && setShowSpotlight(false);
        }
      }, 800);
    }, [night]);

    useEffect(() => {
      wood_platform.scene.traverse((child) => {
        if (child.isMesh) {
          child.material.color.setScalar(3);
        }
      });
    }, []);

    return (
      <mesh scale={zoom}>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
        <ambientLight intensity={night ? 0.7 : 1.2} castShadow />
        {showSpotlight && (
          <Spot startPosition={[0, 1.35, 0]} targetPosition={[0, 0, 0]} />
        )}
        <mesh position={[0, -1.73, 0]} ref={ref}>
          <mesh scale={0.65}>
            <mesh
              scale={0.38}
              onClick={() => {
                setShowSpotlight(!showSpotlight);
              }}
            >
              <Suspense>
                <primitive receiveShadow object={wood_platform.scene} />
              </Suspense>
            </mesh>

            <mesh>
              <Suspense>
                <Robin
                  texture={texture}
                  rotation-z={-Math.PI}
                  rotation-x={-Math.PI / 2}
                />
              </Suspense>
            </mesh>
          </mesh>
        </mesh>
      </mesh>
    );
  }
);

export default Scene;
