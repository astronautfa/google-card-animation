import "./index.css";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

function App() {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [animationState, setAnimateState] = useState<
    "idle" | "opening" | "closing"
  >("idle");

  useEffect(() => {
    if (animationState === "closing") {
      const timeOut = setTimeout(() => {
        setActiveCard(null);
        setAnimateState("idle");
      }, 1000);

      return () => clearTimeout(timeOut);
    }
  }, [animationState]);

  return (
    <div className="grid">
      <div
        className="grid h-screen grid-cols-2 place-items-center overflow-hidden bg-blue-500 [grid-area:1/1] [perspective:500px]"
        onClick={() => {
          setAnimateState("opening");
          setActiveCard("fake-id");
        }}
      >
        <Card className="rotate-[1deg] [grid-area:1/1]" />
        <Card className="-rotate-[1deg] [grid-area:1/1]" />
        <Card
          className="rotate-[1.5deg] [grid-area:1/1]"
          title="You will be amazed"
        />

        <Card
          className={twMerge(
            "peer-hover/next:card--to-left peer-focus-within/next:card--to-left peer-hover/show:card--to-right peer-focus-within/show:card--to-right [grid-area:1/1]",
            animationState === "opening" && "animate-card-visible",
            animationState === "closing" && "animate-card-hidden",
          )}
          title="Animate so many things with just CSS!"
        />
      </div>

      {activeCard && (
        <div className="content-container absolute inset-0 flex justify-center overflow-auto pb-20">
          <div
            className={twMerge(
              "pointer-events-none relative top-[5vh] mb-20 min-h-screen w-[90%] rounded-[4.5rem] bg-white px-16 py-16 opacity-0",
              animationState === "opening" && "animate-card-details",
              animationState === "closing" && "animate-card-details-hidden",
            )}
          >
            <button
              onClick={() => setAnimateState("closing")}
              className="absolute right-8 top-8 flex h-20 w-20 items-center justify-center rounded-full bg-black text-4xl"
            >
              👋
            </button>
            <h1 className="text-4xl leading-[1.1] [white-space:balance] md:text-[120px]">
              Animate so many things with just CSS
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}

const Card = ({ className, title }: { className?: string; title?: string }) => (
  <div
    className={twMerge(
      "pointer-events-none absolute grid aspect-[3/4] w-[65vw] transition-transform duration-1000 [transform-style:preserve-3d] md:w-[30vw]",
      className,
    )}
  >
    <div className="pointer-events-none rounded-3xl bg-gray-300 [grid-area:1/1] [transform-style:preserve-3d] [backface-visibility:hidden] [transform:translateZ(-5px)] md:-mb-[5px] md:-mt-[5px] md:[transform:translateZ(-10px)]" />
    <div className="pointer-events-none absolute flex h-full w-full flex-col items-start rounded-3xl bg-gray-100 p-8 shadow-2xl [grid-area:1/1]">
      <p className="mb-2 rounded-full bg-blue-400 px-5 py-1 text-xs text-white md:text-sm">
        The web can
      </p>
      {title && (
        <p className="font-medium leading-tight md:text-4xl">{title}</p>
      )}

      <div className="mx-auto mt-auto h-[40%] w-[80%] rounded-[80px] bg-blue-200 text-[0px]">
        The place for a nice illustration
      </div>
    </div>
    <div className="pointer-events-none rounded-3xl bg-white [grid-area:1/1] [backface-visibility:hidden] [transform:rotateY(180deg)]" />
  </div>
);

export default App;
