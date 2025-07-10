import LogoImage from "@/assets/vectors/tasklet.svg";
import { Link } from "react-router";

interface LogoProps {
  showText?: boolean;
}

const Logo = ({ showText = false }: LogoProps) => {
  return (
    <Link to="/" className="h-full flex items-center gap-1">
      <img src={LogoImage} alt="T" className="h-[70%]" />

      <span
        className={`text-lg font-semibold font-primary ${
          !showText && "hidden md:block"
        }`}
      >
        Tasklet
      </span>
    </Link>
  );
};

export default Logo;
