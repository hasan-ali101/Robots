import React, { Suspense } from "react";
import Susy from "./susy";
import { Robin } from "./robin-animated";
import { OrbitControls } from "@react-three/drei";

const Scene = React.forwardRef((props, ref) => {
  return (
    <>
      <ambientLight />
      <OrbitControls />
      <mesh position={[0, -1.5, 0]} rotation-x={0.1} rotation-y={0.3} ref={ref}>
        <mesh scale={0.8} position={[-1.2, 0, 0.8]}>
          <Suspense>
            <Robin skin="/rt1.png" />
          </Suspense>
        </mesh>
        <mesh scale={0.8} position={[1.2, 0, -1]} rotation-y={2.8}>
          <Suspense>
            <Susy path="/susy.glb" />
          </Suspense>
        </mesh>
      </mesh>
    </>
  );
});

export default Scene;
