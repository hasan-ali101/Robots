import { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Mesh } from "three";

import Scene from "@/components/scene";
import { cn } from "@/utils/cn";
import ChatArea from "@/components/chat-area";
import Nav from "@/components/nav";
import CanvasBackdrop from "@/components/canvas-backdrop";
import SlidingDoors from "@/components/sliding-doors";
import Customisation from "@/components/customisation";

export default function Home() {
  const [skin, setSkin] = useState<string>("/rt7.png");
  const group = useRef<Mesh>(null!);
  const [night, setNight] = useState<boolean>(false);
  const [customising, setCustomising] = useState<boolean>(false);

  return (
    <div className="bg-primary flex border-white border-x-4 border-b-4 flex-col justify-center max-h-screen h-screen w-screen overflow-y-auto">
      <Nav />
      <div className="flex justify-center h-full w-full flex-col max-h-[90%] md:flex-row h-md:flex-col h-md:items-center">
        <div
          className={cn(
            "h-[50%] transition-all relative md:h-full w-full h-md:h-1/2 h-md:w-full md:w-7/12 max-w-[700px] flex items-center justify-center bg-trasparent overflow-hidden"
          )}
        >
          <CanvasBackdrop night={night} />
          <div className="w-[700px] ml-2 min-w-[700px] h-[700px] absolute z-40 left-[50%] top-[30%] translate-y-[-50%] translate-x-[-50%]">
            <Canvas>
              <Scene ref={group} texture={skin} night={night} />
            </Canvas>
          </div>

          <SlidingDoors
            customising={customising}
            night={night}
            setNight={setNight}
            setCustomising={setCustomising}
          />
        </div>

        <div
          className={cn(
            "h-1/2 bg-primary h-md:items-center h-md:border-l-0 justify-start flex flex-col border-white border-t-4 md:border-t-0 md:border-l-4 md:h-full h-md:h-full w-full md:w-1/2 h-md:w-full "
          )}
        >
          {customising ? <Customisation setSkin={setSkin} /> : <ChatArea />}
        </div>
      </div>
    </div>
  );
}
