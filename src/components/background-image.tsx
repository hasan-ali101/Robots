import Image from "next/image";

export const Night = () => {
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

export const Day = () => {
  return (
    <>
      <Image
        src="/cloudz.png"
        className="ml-10 w-full h-80 opacity-80 animate-clouds mt-24"
        width={5000}
        height={1000}
        alt="clouds"
      />
      <Image
        src="/cloudz2.png"
        className="absolute animate-cloudsSlow top-20 left-20 w-full h-80 mt-32 opacity-60"
        width={5000}
        height={1000}
        alt="clouds"
      />
      <Image
        src="/cloudz2.png"
        className="absolute animate-clouds top-0 left-0 w-full h-80 mt-40 opacity-40"
        width={5000}
        height={1000}
        alt="clouds"
      />
    </>
  );
};
