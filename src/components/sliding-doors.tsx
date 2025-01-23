import { cn } from "@/utils/cn";
import { MessagesSquare, Moon, SlidersHorizontal, Sun } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const SlidingDoors = ({
  night,
  setNight,
  customising,
  setCustomising,
}: {
  night: boolean;
  setNight: Dispatch<SetStateAction<boolean>>;
  customising: boolean;
  setCustomising: Dispatch<SetStateAction<boolean>>;
}) => {
  const [doorsOpen, setDoorsOpen] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setDoorsOpen(true);
    }, 1200);
  }, []);

  return (
    <>
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
              setNight((prev) => !prev);
            }}
            className="border-2 p-1 rounded-xl cursor-pointer hover:scale-105 transition-all"
          >
            {night ? (
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
    </>
  );
};
export default SlidingDoors;
