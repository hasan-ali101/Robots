import { cn } from "@/utils/cn";
import { Brain, Earth, SmilePlus, UserRoundPen } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";

const skins = ["rt1", "rt2", "rt3", "rt4", "rt5", "rt6"];

const Customisation = ({
  setSkin,
}: {
  setSkin: Dispatch<SetStateAction<string>>;
}) => {
  const [category, setCategory] = useState<string>("appearance");

  return (
    <div className="bg-secondary gap-2 flex flex-col md:flex-row max-w-[700px] max-h-[550px] md:py-4">
      <div className="flex md:flex-col text-white overflow-auto overflow-x-auto md:pr-2">
        <div
          onClick={() => {
            setCategory("appearance");
          }}
          className="border-slate-100 bg-primary/70 border-2 flex flex-col px-4 justify-center items-center py-6 opacity-80 w-full h-fit transition-transform cursor-pointer"
        >
          <UserRoundPen stroke-width="1" size={24} />
          <p>Appearance</p>
        </div>
        <div
          onClick={() => {
            setCategory("personality");
          }}
          className="border-slate-100 border-2 bg-primary/70 flex flex-col px-4 justify-center items-center py-6 opacity-80 w-full h-fit transition-transform cursor-pointer"
        >
          <Brain stroke-width="1" size={24} />
          <p>Personality</p>
        </div>
        <div
          onClick={() => {
            setCategory("emotes");
          }}
          className="border-slate-100 border-2 bg-primary/70 flex flex-col px-4 justify-center items-center py-6 opacity-80 w-full h-fit transition-transform cursor-pointer"
        >
          <SmilePlus stroke-width="1" size={24} />
          <p>Emotes</p>
        </div>
        <div
          onClick={() => {
            setCategory("environment");
          }}
          className="border-slate-100 border-2 bg-primary/70 flex flex-col px-4 justify-center items-center py-6 opacity-80 w-full h-fit transition-transform cursor-pointer"
        >
          <Earth stroke-width="1" size={24} />
          <p>Environment</p>
        </div>
      </div>
      {category === "appearance" && (
        <div className="grid h-full grid-cols-12 text-white px-4 w-full gap-y-8 gap-x-4 md:gap-x-6 overflow-auto">
          {skins.map((skin) => (
            <Image
              onClick={() => {
                setSkin(skin + ".png");
              }}
              className="col-span-6 cursor-pointer"
              src={"/" + skin + ".png"}
              alt=""
              width={1000}
              height={1000}
            ></Image>
          ))}
        </div>
      )}
    </div>
  );
};

export default Customisation;
