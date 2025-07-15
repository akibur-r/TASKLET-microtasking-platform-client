import ErrorGraphicsDark from "@/assets/vectors/error_403_dark.svg";
import ErrorGraphicsLight from "@/assets/vectors/error_403_light.svg";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";

const Unauthorized = () => {
  const navigate = useNavigate();
  return (
    <section
      className="
    relative min-h-screen w-full flex items-center justify-center
    bg-[conic-gradient(from_270deg_at_50%_50%,_#fffbea,_#fef3c7,_#fde68a,_#fef3c7,_#fffbea)]
    dark:bg-[conic-gradient(from_270deg_at_50%_50%,_#78350f30,_#f59e0b30,_#fde68a30,_#f59e0b30,_#78350f30)]
    text-center overflow-hidden
  "
    >
      <div
        className="
      absolute inset-0 backdrop-blur-sm bg-yellow-50/60
      dark:bg-yellow-900/70 mix-blend-multiply dark:mix-blend-overlay pointer-events-none
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
          <Button
            asChild
            size={"sm"}
            className="bg-amber-600/40 hover:bg-amber-600/60"
          >
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

export default Unauthorized;
