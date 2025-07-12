import EfficiencyDark from "@/assets/vectors/efficiency_dark.svg";
import EfficiencyLight from "@/assets/vectors/efficiency_light.svg";

export const slide3 = {
  left: (
    <>
      <div className="w-full h-full flex flex-col gap-4 justify-center items-start ">
        <h1 className="font-fancy text-4xl md:text-5xl lg:text-7xl max-w-lg ">
          Small Gig, <br />
          Massive <span className="text-accent">Impact</span>
        </h1>
        <p className="text-base font-light max-w-md">
          Turn bite-sized tasks into breakthrough results. whether you're
          working or hiring, every click counts.
        </p>
      </div>
    </>
  ),
  right: (
    <div className="h-full w-full flex items-center">
      <div className="h-full max-h-64 md:max-h-80 lg:max-h-128 mx-auto">
        <img
          src={EfficiencyDark}
          alt="Efficiency with idea"
          className="hidden dark:block h-full"
        />
        <img
          src={EfficiencyLight}
          alt="Efficiency with idea"
          className="dark:hidden h-full"
        />
      </div>
    </div>
  ),
};
