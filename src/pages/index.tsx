import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

import { Mesh } from "three";
import Scene from "@/components/Scene";
import Image from "next/image";
import { cn } from "@/utils/cn";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Home() {
  const [skin, setSkin] = useState<string>("/rt1.png");
  const group = useRef<Mesh>(null!);
  const [doorsOpen, setDoorsOpen] = useState<boolean>(false);
  const [bot, setBot] = useState<string>("robin");
  const [fullScreen, setFullScreen] = useState<boolean>(false);

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
      <div className="bg-[#b0cbdd] flex border-white border-x-8 border-b-8 flex-col justify-center h-screen w-screen">
        <div className="bg-[#b0cbdd] h-14 md:h-24 border-white border-y-8 "></div>
        <div className="flex justify-center h-full w-full flex-col md:flex-row">
          <div
            className={cn(
              fullScreen ? "h-full" : "h-[55%]",
              "transition-all relative md:h-full w-full md:w-7/12 max-w-[700px] flex items-center justify-center bg-trasparent overflow-hidden"
            )}
          >
            <div className="w-[700px] ml-2 min-w-[700px] h-[700px] absolute z-20 left-[50%] top-[30%] translate-y-[-50%] translate-x-[-50%]">
              <Canvas>
                <Scene ref={group} skin={skin} bot={bot} />
              </Canvas>
            </div>
            <div className="w-[700px] min-w-[700px] h-[700px] absolute left-[50%] top-[30%] translate-y-[-50%] translate-x-[-50%] border-x-8 border-white">
              <Image
                src={"/ship_ai.jpeg"}
                alt="ship"
                width={1000}
                height={1000}
                className="select-none opacity-70 h-full w-full  border-white border-x-8"
              />
            </div>

            <div
              className={cn(
                doorsOpen ? "w-12" : "w-1/2",
                " bg-[#506e88] opacity-80 transition-all duration-[1500ms] absolute z-30 right-0 top-[30%] translate-y-[-50%] h-[700px]"
              )}
            >
              <div
                className={cn(
                  doorsOpen ? "opacity-100" : "opacity-0",
                  "text-xs sm:text-sm transition-opacity duration-[2000ms] md:text-base w-full h-full p-4 flex flex-col justify-center items-center  gap-4"
                )}
              >
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
                doorsOpen ? "w-12" : "w-1/2",
                "z-30 bg-[#506e88] opacity-80 transition-all duration-[1500ms] left-0 absolute top-[30%] translate-y-[-50%] h-[700px]"
              )}
            />
          </div>
          <div className="bg-[#e5c7c5] justify-center flex border-white border-t-8 md:border-t-0 md:border-l-8 flex-1">
            <div
              className={cn(
                !fullScreen && "rounded-b-full",
                "border h-5 w-full bg-[#b0cbdd] flex justify-center md:hidden"
              )}
            >
              {fullScreen ? (
                <ChevronUp
                  color="white"
                  size={20}
                  className="cursor-pointer"
                  onClick={() => setFullScreen(false)}
                />
              ) : (
                <ChevronDown
                  size={20}
                  color="white"
                  className="cursor-pointer"
                  onClick={() => setFullScreen(true)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
