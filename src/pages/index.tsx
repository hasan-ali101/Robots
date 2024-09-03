import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

import { Mesh } from "three";
import Scene from "@/components/Scene";

export default function Home() {
  const group = useRef<Mesh>(null!);

  const rotate = () => {
    group.current.rotation.y += Math.PI;
  };

  return (
    <>
      <div className="w-screen h-screen relative  bg-sky-950">
        <Canvas className={`z-0`} shadows>
          <Scene ref={group} />
        </Canvas>

        <div className="w-screen h-40 absolute z-10 opacity-80 top-0 left-0">
          <div className="relative w-full h-full">
            <button
              className="bg-black text-white absolute bottom-10 right-10"
              onClick={() => {
                rotate();
              }}
            >
              switch
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
