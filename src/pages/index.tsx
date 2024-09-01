import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Model from "../components/robin";
import { OrbitControls } from "@react-three/drei";

export default function Home() {
  return (
    <Canvas className="w-full bg-blue-100" shadows>
      <ambientLight />
      <OrbitControls />
      <mesh scale={0.8} position={[0, -2, 0]}>
        <Suspense>
          <Model />
        </Suspense>
      </mesh>
    </Canvas>
  );
}
