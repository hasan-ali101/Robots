import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

import { Mesh } from "three";
import Scene from "@/components/Scene";
import Image from "next/image";
import { cn } from "@/utils/cn";
import { ChevronDown, ChevronUp, Moon, Sun } from "lucide-react";
import { Day, Night } from "@/components/background-image";
import ChatArea from "@/components/chat-area";

export default function Home() {
  const [skin, setSkin] = useState<string>("/rt1.png");
  const group = useRef<Mesh>(null!);
  const [doorsOpen, setDoorsOpen] = useState<boolean>(false);
  const [bot, setBot] = useState<string>("robin");
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const [dark, setDark] = useState<boolean>(false);

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
      <div className="bg-[#b0cbdd] flex border-white border-x-4 border-b-4 flex-col justify-center max-h-screen h-screen w-screen overflow-y-auto">
        <div
          id="header"
          className="bg-[#b0cbdd] flex items-center justify-end px-4 h-14 md:h-24 border-white border-y-4 overflow-auto"
        >
          <div
            onClick={() => {
              setDark((prev) => !prev);
            }}
          >
            {dark ? (
              <Sun className="fill-white text-white md:scale-150" />
            ) : (
              <Moon className="fill-white text-white md:scale-150" />
            )}
          </div>
        </div>
        <div className="flex justify-center h-full w-full flex-col max-h-[90%] md:flex-row">
          <div
            className={cn(
              fullScreen ? "h-full" : "h-[50%]",
              "transition-all relative md:h-full w-full md:w-7/12 max-w-[700px] flex items-center justify-center bg-trasparent overflow-hidden"
            )}
          >
            <div
              id="layer-1"
              className="w-[800px] grid grid-cols-1  min-w-[700px] h-[700px] absolute z-10  left-[50%] top-[30%] translate-y-[-50%] translate-x-[-50%] border-x-4 border-white"
            >
              <div
                className={cn(
                  dark ? "opacity-100" : "opacity-0",
                  "col-start-1 row-start-1 transition-opacity duration-700 bg-gradient-to-t to-[#a8a9ff] from-[#040409]"
                )}
              >
                <Night />
              </div>

              <div
                className={cn(
                  dark ? "opacity-0" : "opacity-100",
                  "col-start-1 relative row-start-1 transition-opacity duration-700 w-full h-full bg-gradient-to-b to-sky-300 from-orange-200"
                )}
              >
                <Day />
              </div>
            </div>
            <div
              id="background-image"
              className="w-[700px] min-w-[700px] h-[700px] absolute z-30 left-[50%] top-[30%] translate-y-[-50%] translate-x-[-50%] border-x-4 border-white"
            >
              <Image
                src={"/ship_bg.png"}
                alt="ship"
                width={1000}
                height={1000}
                className="select-none opacity-70 h-full w-full  border-white border-x-4"
              />
            </div>
            <div
              id="robot-canvas"
              className="w-[700px] ml-2 min-w-[700px] h-[700px] absolute z-40 left-[50%] top-[30%] translate-y-[-50%] translate-x-[-50%]"
            >
              <Canvas>
                <Scene ref={group} skin={skin} bot={bot} darkMode={dark} />
              </Canvas>
            </div>

            <div
              id="right-door"
              className={cn(
                doorsOpen ? "w-10 md:w-12" : "w-1/2",
                " bg-[#b0cbdd] opacity-80 transition-all duration-[1500ms] absolute z-50 right-0 top-[30%] translate-y-[-50%] h-[700px]"
              )}
            >
              <div
                className={cn(
                  doorsOpen ? "opacity-100" : "opacity-0",
                  "text-xs sm:text-sm transition-opacity duration-[2000ms] md:text-base w-full h-full p-4 flex flex-col justify-center items-center  gap-4"
                )}
              >
                <button
                  className="border p-3 rounded-xl shadow-2xl text-white"
                  onClick={() => {
                    rotate();
                  }}
                ></button>
                <button
                  className="border p-3 shadow-2xl rounded-xl "
                  onClick={() => {
                    changeSkin();
                  }}
                ></button>
              </div>
            </div>
            <div
              id="left-door"
              className={cn(
                doorsOpen ? "w-10 md:w-12" : "w-1/2",
                "z-50 bg-[#b0cbdd] opacity-80 transition-all duration-[1500ms] left-0 absolute top-[30%] translate-y-[-50%] h-[700px]"
              )}
            />
          </div>

          <div
            id="message area"
            className={cn(
              fullScreen ? "h-16" : "h-1/2",
              "bg-[#b0cbdd] justify-start flex flex-col border-white border-t-4 md:border-t-0 md:border-l-4 md:h-full w-full md:w-1/2"
            )}
          >
            <div
              onClick={() => setFullScreen(!fullScreen)}
              className={cn(
                !fullScreen && "rounded-b-full",
                "border h-5 w-full cursor-pointer bg-[#b0cbdd] flex justify-center md:hidden"
              )}
            >
              {fullScreen ? (
                <ChevronUp color="white" size={20} className="cursor-pointer" />
              ) : (
                <ChevronDown
                  size={20}
                  color="white"
                  className="cursor-pointer"
                />
              )}
            </div>
            <ChatArea hidden={fullScreen} />
          </div>
        </div>
      </div>
    </>
  );
}
