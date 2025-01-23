import localFont from "next/font/local";

import { cn } from "@/utils/cn";

const akira = localFont({
  src: "../fonts/Akira.otf",
});

const Nav = () => {
  return (
    <div className="bg-primary flex items-center justify-center px-4 md:py-4 py-2 border-white border-y-4">
      <div
        className={cn(
          akira.className,
          "text-3xl sm:text-4xl md:text-5xl text-white font-semibold tracking-wider"
        )}
      >
        CHATTERBOTS
      </div>
    </div>
  );
};

export default Nav;
