import { LoaderCircle } from "lucide-react";

interface LoaderSpinnerProps {
  className?: string;
  size?: number;
}

const LoaderSpinner = ({ className = "", size = 4 }: LoaderSpinnerProps) => {
  const sz = `size-${size}`;
  return <LoaderCircle className={`animate-spin ${sz} ${className}`} />;
};

export default LoaderSpinner;
