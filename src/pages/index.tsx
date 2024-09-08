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
      <div className="relative flex justify-center h-screen w-screen bg-[#3a4862]">
        <Image
          src={"/ship.jpeg"}
          alt="ship"
          width={1000}
          height={1000}
          className="min-h-[650px] h-screen w-[600px] object-cover absolute opacity-40"
        />
        <div className=" min-h-[650px] h-screen min-w-screen bg-trasparent">
          <Canvas className="h-full w-full" shadows>
            <Scene ref={group} skin={skin} bot={bot} />
          </Canvas>
          <div
            className={cn(
              doorsOpen ? "w-16 lg:w-64 sm:w-24 xl:w-96 md:w-32" : "w-1/2",
              " h-screen absolute z-10 bg-[#a57e96] opacity-30 top-0 right-0 transition-all duration-[1500ms]"
            )}
          >
            <div className="relative text-xs sm:text-sm md:text-base w-full h-full p-4 flex flex-col justify-end items-center gap-4">
              <button
                className="bg-black p-2 rounded-xl text-white"
                onClick={() => {
                  rotate();
                }}
              >
                switch
              </button>
              <button
                className="bg-white p-2 rounded-xl "
                onClick={() => {
                  changeSkin();
                }}
              >
                skin
              </button>
            </div>
          </div>
          <div
            className={cn(
              doorsOpen ? "w-16 lg:w-64 sm:w-24 xl:w-96 md:w-32" : "w-1/2",
              "h-screen absolute z-10 bg-[#a57e96] opacity-30 top-0 left-0 transition-all duration-[1500ms]"
            )}
          ></div>
        </div>
      </div>
    </>
  );
  ß;
}
