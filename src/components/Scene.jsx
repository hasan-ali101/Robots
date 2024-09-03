import React, { Suspense, useEffect, useRef, useState } from "react";

import Susy from "./susy";
import { Robin } from "./robin-animated";
import { OrbitControls, SpotLight } from "@react-three/drei";

function MovingSpot() {
  const light = useRef();

  return (
    <SpotLight
      castShadow
      ref={light}
      penumbra={1}
      angle={0.3}
      anglePower={1}
      intensity={2}
      position={[0, 3.8, 0]}
      decay={1}
      distance={10}
    />
  );
}

const Scene = React.forwardRef((props, ref) => {
  const [showSpotlight, setShowSpotlight] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowSpotlight(true);
    }, 800);
  }, []);

  return (
    <>
      <ambientLight intensity={0.15} />

      {showSpotlight && <MovingSpot color="white" />}

      <OrbitControls />
      <mesh position={[0.7, -0.8, -1.4]} rotation-y={0.3} ref={ref}>
        <mesh
          scale={0.8}
          position={[-1.1, 0, 1.2]}
          rotation-y={-0.2}
          rotation-x={-0.1}
          rotation-z={-0.05}
        >
          <Suspense>
            <Robin skin="/rt1.png" />
          </Suspense>
        </mesh>
        <mesh
          scale={0.8}
          position={[1.3, 0, -1.2]}
          rotation-y={2.8}
          rotation-x={0.1}
        >
          <Suspense>
            <Susy path="/susy.glb" />
          </Suspense>
        </mesh>
      </mesh>
    </>
  );
});

export default Scene;
