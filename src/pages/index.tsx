import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import localFont from "next/font/local";
import { Mesh } from "three";
import Image from "next/image";
import {
  Brain,
  ChevronDown,
  ChevronUp,
  Earth,
  MessagesSquare,
  Moon,
  SlidersHorizontal,
  SmilePlus,
  Sun,
  UserRoundPen,
} from "lucide-react";

import Scene from "@/components/Scene";
import { cn } from "@/utils/cn";
import { Day, Night } from "@/components/background-image";
import ChatArea from "@/components/chat-area";

const akira = localFont({
  src: "../fonts/Akira.otf",
});

export default function Home() {
  const [skin, setSkin] = useState<string>("/rt1.png");
  const group = useRef<Mesh>(null!);
  const [doorsOpen, setDoorsOpen] = useState<boolean>(false);
  const [bot, setBot] = useState<string>("robin");
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const [dark, setDark] = useState<boolean>(false);
  const [customising, setCustomising] = useState<boolean>(false);

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
      <div className="bg-primary flex border-white border-x-4 border-b-4 flex-col justify-center max-h-screen h-screen w-screen overflow-y-auto">
        <div
          id="header"
          className="bg-primary flex items-center justify-center px-4 md:py-4 py-2 border-white border-y-4"
        >
          <div
            className={cn(
              akira.className,
              "text-3xl sm:text-4xl md:text-5xl text-white font-semibold tracking-wider"
            )}
          >
            CHATTERBOTS
          </div>
        </div>
        <div className="flex justify-center h-full w-full flex-col max-h-[90%] md:flex-row h-md:flex-col h-md:items-center">
          <div
            className={cn(
              fullScreen ? "h-full" : "h-[50%]",
              "transition-all relative md:h-full w-full h-md:h-1/2 h-md:w-full md:w-7/12 max-w-[700px] flex items-center justify-center bg-trasparent overflow-hidden"
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
              className="w-[700px] border-b-4 min-w-[700px] h-[700px] absolute z-30 left-[50%] top-[30%] translate-y-[-50%] translate-x-[-50%] border-x-4 border-white"
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
                doorsOpen ? "w-14 md:w-20" : "w-1/2",
                " bg-primary opacity-90 transition-all duration-[1500ms] absolute z-50 right-0 top-[30%] translate-y-[-50%] h-[700px]"
              )}
            />
            <div
              id="left-door"
              className={cn(
                doorsOpen ? "w-14 md:w-20" : "w-1/2",
                "z-50 bg-primary opacity-80 transition-all duration-[1500ms] left-0 absolute top-[30%] translate-y-[-50%] h-[700px]"
              )}
            >
              <div
                className={cn(
                  doorsOpen ? "opacity-100" : "opacity-0",
                  " transition-opacity duration-[2000ms]  w-full h-full p-4 flex flex-col justify-center items-center gap-5"
                )}
              >
                <div
                  onClick={() => {
                    setDark((prev) => !prev);
                  }}
                  className="border-2 p-1 rounded-xl cursor-pointer hover:scale-105 transition-all"
                >
                  {dark ? (
                    <Sun className="fill-white text-white" />
                  ) : (
                    <Moon className="fill-white text-white " />
                  )}
                </div>
                <div className="flex flex-col items-center text-white gap-2">
                  <button
                    className={cn(
                      customising ? "bg-white/30" : "bg-none hover:scale-105",
                      "border-2 p-1 rounded-xl shadow-2xl text-white transition-transform"
                    )}
                    onClick={() => {
                      setCustomising(true);
                    }}
                  >
                    <SlidersHorizontal className="w-6 h-6" />
                  </button>
                </div>
                <div className="flex flex-col items-center  text-white gap-2">
                  <button
                    className={cn(
                      customising ? "bg-none hover:scale-105" : "bg-white/30",
                      "border-2 p-1 shadow-2xl rounded-xl transition-transform"
                    )}
                    onClick={() => {
                      setCustomising(false);
                    }}
                  >
                    <MessagesSquare className="w-6 h-6" color="white" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            id="message area"
            className={cn(
              fullScreen ? "h-16" : "h-1/2",
              "bg-primary h-md:items-center h-md:border-l-0 justify-start flex flex-col border-white border-t-4 md:border-t-0 md:border-l-4 md:h-full h-md:h-full w-full md:w-1/2 h-md:w-full "
            )}
          >
            {customising && (
              <div className="grid bg-secondary h-full grid-cols-12 text-white  p-10 w-full gap-y-8 md:gap-x-6 overflow-auto max-w-[700px] max-h-[550px]">
                <div className="border-slate-100 bg-primary/70 border-4 flex flex-col px-4 justify-center items-center p-2 opacity-80 w-full rounded-lg md:col-span-6 col-span-12 md:col-start-1 hover:scale-105 transition-transform cursor-pointer">
                  <UserRoundPen stroke-width="1" size={100} />
                  <p>Appearance</p>
                </div>
                <div className="border-slate-100 border-4 bg-primary/70 flex flex-col px-4 justify-center items-center p-2 opacity-80 w-full rounded-lg md:col-span-6 col-span-12 md:col-start-7 hover:scale-105 transition-transform cursor-pointer">
                  <Brain stroke-width="1" size={100} />
                  <p>Personality</p>
                </div>
                <div className="border-slate-100 border-4 bg-primary/70 flex flex-col px-4 justify-center items-center p-2 opacity-80 w-full rounded-lg md:col-span-6 col-span-12 md:col-start-1 hover:scale-105 transition-transform cursor-pointer">
                  <SmilePlus stroke-width="1" size={90} />
                  <p>Emotes</p>
                </div>
                <div className="border-slate-100  border-4 bg-primary/70 flex flex-col px-4 justify-center items-center p-2 opacity-80 w-full rounded-lg md:col-span-6 col-span-12 md:col-start-7 hover:scale-105 transition-transform cursor-pointer">
                  <Earth stroke-width="1" size={100} />
                  <p>Environment</p>
                </div>
              </div>
            )}
            <ChatArea hidden={customising} />
          </div>
        </div>
      </div>
    </>
  );
}
