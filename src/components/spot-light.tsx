import { SpotLight } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { SpotLight as SpotLightImpl } from "three";

export default function Spot({
  targetPosition = [0, 0, 0],
  startPosition = [0, 4, 0],
}: {
  targetPosition: [number, number, number];
  startPosition: [number, number, number];
}) {
  const light = useRef<SpotLightImpl>(null);

  useEffect(() => {
    // Ensure the light reference exists before setting the target position

    if (light.current) {
      light.current.target.position.set(...targetPosition);
      light.current.target.updateMatrixWorld();
    }
  }, [targetPosition]);

  return (
    <SpotLight
      castShadow
      color={"white"}
      ref={light}
      penumbra={1}
      angle={Math.PI * 1.1}
      anglePower={6}
      intensity={1}
      position={startPosition}
      decay={1}
      distance={50}
    />
  );
}
