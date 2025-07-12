import WorkerDark from "@/assets/vectors/worker_dark.svg";
import WorkerLight from "@/assets/vectors/worker_light.svg";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { Link } from "react-router";

export const slide1 = {
  left: (
    <>
      <div className="w-full h-full flex flex-col gap-4 justify-center items-start ">
        <motion.h1
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 1 }}
          className="font-fancy text-4xl md:text-5xl lg:text-7xl max-w-lg "
        >
          Join the Future of <span className="text-accent">Microtasking</span>
        </motion.h1>

        <p className="text-base font-light">
          Complete simple micro tasks and get real money!
        </p>
        <Button asChild>
          <Link to={"/"} className="bg-gradient-to-r from-primary to-accent/50">
            Join Now
          </Link>
        </Button>
      </div>
    </>
  ),
  right: (
    <div className="h-full w-full flex items-center">
      <div className="h-full max-h-64 md:max-h-80 lg:max-h-128 mx-auto">
        <img
          src={WorkerDark}
          alt="Worker with idea"
          className="hidden dark:block h-full"
        />
        <img
          src={WorkerLight}
          alt="Worker with idea"
          className="dark:hidden h-full"
        />
      </div>
    </div>
  ),
};
