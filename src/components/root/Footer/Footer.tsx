import Logo from "@/components/shared/Logo/Logo";
import { BsTwitterX } from "react-icons/bs";
import { FiFacebook, FiLinkedin } from "react-icons/fi";
import { Link } from "react-router";

interface FooterProps {
  className?: string;
}

const Footer = ({ className = "" }: FooterProps) => {
  return (
    <footer className={`mx-auto px-4 py-2 flex flex-col gap-4 ${className}`}>
      <div className="flex flex-col md:flex-row gap-y-4 justify-between items-center">
        <div className="h-14">
          <Logo showText />
        </div>
        <div className="flex gap-2 items-end text-xl">
          <Link
            target="_blank"
            to={"/"}
            className="hover:text-primary transition-all duration-100"
          >
            <FiFacebook />
          </Link>
          <Link
            target="_blank"
            to={"/"}
            className="hover:text-primary transition-all duration-100"
          >
            <FiLinkedin />
          </Link>
          <Link
            target="_blank"
            to={"/"}
            className="hover:text-primary transition-all duration-100"
          >
            <BsTwitterX className="text-base" />
          </Link>
        </div>
      </div>
      <div className="text-xs border-t border-t-foreground/10 dark:border-t-foreground/5 py-1 text-center md:text-left">
        © 2025 by Tasklet LLC. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
