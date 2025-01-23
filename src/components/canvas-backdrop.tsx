import Image from "next/image";

import { cn } from "@/utils/cn";

export const NightSky = () => {
  return (
    <div
      className="h-[400px] w-[680px] transition-opacity flex animate-stars"
      style={{
        backgroundImage: `url("/stars2-1.png")`,
        backgroundSize: "cover",
      }}
    >
      {" "}
      <div className="h-1 w-1 animate-shooting-star rounded-full bg-white md:animate-shooting-star-slow"></div>
      <div className="h-1 w-1 animate-shooting-star-2 rounded-full bg-white"></div>
    </div>
  );
};

export const DaySky = () => {
  return (
    <>
      <Image
        src="/cloudz.png"
        className="ml-10 w-full h-80 opacity-80 animate-clouds mt-24 pointer-events-none"
        width={5000}
        height={1000}
        alt="clouds"
      />
      <Image
        src="/cloudz2.png"
        className="absolute animate-cloudsSlow top-20 left-20 w-full h-80 mt-32 opacity-60 pointer-events-none"
        width={5000}
        height={1000}
        alt="clouds"
      />
      <Image
        src="/cloudz2.png"
        className="absolute animate-clouds top-0 left-0 w-full h-80 mt-40 opacity-40 pointer-events-none"
        width={5000}
        height={1000}
        alt="clouds"
      />
    </>
  );
};

const CanvasBackdrop = ({ night }: { night: boolean }) => {
  return (
    <>
      <div
        id="layer-1"
        className="w-[800px] grid grid-cols-1  min-w-[700px] h-[700px] absolute z-10  left-[50%] top-[30%] translate-y-[-50%] translate-x-[-50%] border-x-4 border-white"
      >
        <div
          className={cn(
            night ? "opacity-100" : "opacity-0",
            "col-start-1 row-start-1 transition-opacity duration-700 bg-gradient-to-t to-[#a8a9ff] from-[#040409]"
          )}
        >
          <NightSky />
        </div>

        <div
          className={cn(
            night ? "opacity-0" : "opacity-100",
            "col-start-1 relative row-start-1 transition-opacity duration-700 w-full h-full bg-gradient-to-b to-sky-300 from-orange-200"
          )}
        >
          <DaySky />
        </div>
      </div>
      <div className="w-[700px] border-b-4 min-w-[700px] h-[700px] absolute z-30 left-[50%] top-[30%] translate-y-[-50%] translate-x-[-50%] border-x-4 border-white">
        <Image
          src={"/ship_bg.png"}
          alt="ship"
          width={1000}
          height={1000}
          className="select-none opacity-70 h-full w-full  border-white border-x-4"
        />
      </div>
    </>
  );
};

export default CanvasBackdrop;
