import ErrorGraphicsDark from "@/assets/vectors/error_404_dark.svg";
import ErrorGraphicsLight from "@/assets/vectors/error_404_light.svg";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";

const ErrorElement = () => {
  const navigate = useNavigate();
  return (
    <section
      className="
    relative min-h-screen w-full flex items-center justify-center
    bg-[conic-gradient(from_270deg_at_50%_50%,_#fff0f0,_#ffe6e6,_#ffcccc,_#ffe6e6,_#fff0f0)]
    dark:bg-[conic-gradient(from_270deg_at_50%_50%,_#450a0a30,_#991b1b30,_#f8717130,_#991b1b30,_#450a0a30)]
    text-center overflow-hidden
  "
    >
      <div
        className="
      absolute inset-0 backdrop-blur-sm bg-red-50/60
      dark:bg-red-900/70 mix-blend-multiply dark:mix-blend-overlay pointer-events-none
    "
      ></div>

      <div className="relative z-10 text-red-800 dark:text-red-200 space-y-4">
        <img
          src={ErrorGraphicsLight}
          alt=""
          className="h-full w-full dark:hidden"
        />
        <img
          src={ErrorGraphicsDark}
          alt=""
          className="hidden dark:block h-full w-full"
        />
        <div className="flex flex-col items-center justify-center">
          <Button asChild size={"sm"} className="bg-destructive/40 ">
            <Link to={"/"}>Go to Homepage</Link>
          </Button>
          <Button
            onClick={() => navigate(-1)}
            size={"sm"}
            variant={"link"}
            className="underline text-foreground"
          >
            Go Back
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ErrorElement;
