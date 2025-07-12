import ExpertDark from "@/assets/vectors/experts_dark.svg";
import ExpertLight from "@/assets/vectors/experts_light.svg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export const slide2 = {
  left: (
    <>
      <div className="w-full h-full flex flex-col gap-4 justify-center items-start ">
        <h1 className="font-fancy text-4xl md:text-5xl lg:text-7xl max-w-lg ">
          Find and Hire top <span className="text-accent">1%</span> Expert
        </h1>
        <p className="text-base font-light">
          Get the most with the least spending on our platform
        </p>
        <Button asChild>
          <Link
            to={"/"}
            className="bg-gradient-to-bl from-primary to-accent/60 "
          >
            Post a Job
          </Link>
        </Button>
      </div>
    </>
  ),
  right: (
    <div className="h-full w-full flex items-center">
      <div className="h-full max-h-64 md:max-h-80 lg:max-h-128 mx-auto">
        <img
          src={ExpertDark}
          alt="Expert with idea"
          className="hidden dark:block h-full"
        />
        <img
          src={ExpertLight}
          alt="Expert with idea"
          className="dark:hidden h-full"
        />
      </div>
    </div>
  ),
};
