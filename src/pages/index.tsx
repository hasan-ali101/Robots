import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

import { Mesh } from "three";
import Scene from "@/components/Scene";
import Image from "next/image";
import { cn } from "@/utils/cn";

export default function Home() {
  const [skin, setSkin] = useState<string>("/rt1.png");
  const group = useRef<Mesh>(null!);
  const [doorsOpen, setDoorsOpen] = useState<boolean>(false);
  const [bot, setBot] = useState<string>("robin");

  const rotate = () => {
    setBot(bot === "susy" ? "robin" : "susy");
  };

  const changeSkin = () => {
    if (skin === "/rt1.png") {
      setSkin("/rt2.png");
    } else {
      setSkin("/rt1.png");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setDoorsOpen(true);
    }, 1200);
  }, []);

  return (
    <>
      <div className="flex bg-[#b0cbdd] border-white border-x-8 border-b-8 flex-col justify-center h-screen w-screen">
        <div className="bg-[#b0cbdd] h-20 border-white border-y-8 "></div>
        <div className="flex justify-center h-full w-full flex-col md:flex-row">
          <div className="relative  h-2/3 md:h-full w-full md:w-7/12 max-w-[800px] flex items-center justify-center bg-trasparent overflow-hidden">
            <div className="w-[800px] ml-2 min-w-[800px] h-[900px] absolute z-20 left-[50%] top-[30%] translate-y-[-50%] translate-x-[-50%]">
              <Canvas>
                <Scene ref={group} skin={skin} bot={bot} />
              </Canvas>
            </div>
            <div className="w-[800px] min-w-[800px] h-[900px] absolute left-[50%] top-[30%] translate-y-[-50%] translate-x-[-50%] border-x-8 border-white">
              <Image
                src={"/ship.jpeg"}
                alt="ship"
                width={800}
                height={800}
                className="opacity-70 h-full w-full  border-white border-x-8"
              />
            </div>

            <div
              className={cn(
                doorsOpen ? "w-12 md:w-24" : "w-1/2",
                " bg-[#506e88] opacity-80 transition-all duration-[1500ms] absolute z-30 right-0 top-[30%] translate-y-[-50%] h-[900px]"
              )}
            >
              <div className="text-xs sm:text-sm md:text-base w-full h-full p-4 flex flex-col justify-center items-center  gap-4">
                <button
                  className="bg-black p-3 rounded-xl shadow-2xl text-white"
                  onClick={() => {
                    rotate();
                  }}
                ></button>
                <button
                  className="bg-white p-3 shadow-2xl rounded-xl "
                  onClick={() => {
                    changeSkin();
                  }}
                ></button>
              </div>
            </div>

            <div
              className={cn(
                doorsOpen ? "w-12 md:w-24" : "w-1/2",
                "z-30 bg-[#506e88] opacity-80 transition-all duration-[1500ms] left-0 absolute top-[30%] translate-y-[-50%] h-[900px]"
              )}
            />
          </div>
          <div className="bg-[#e5c7c5] border-white border-8 flex-1"></div>
        </div>
      </div>
    </>
  );
}
