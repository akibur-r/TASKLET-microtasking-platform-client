import { LoaderCircle } from "lucide-react";

interface LoaderSpinnerProps {
  className?: string;
  size?: number;
}

const LoaderSpinner = ({ className = "", size = 6 }: LoaderSpinnerProps) => {
  const sz = `size-${size}`;
  return (
    <div className={`${sz} ${className}`}>
      <LoaderCircle className="animate-spin h-full w-full" />
    </div>
  );
};

export default LoaderSpinner;
