import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useDBUser } from "@/hooks/useDBUser/useDBUser";
import { FaEthereum } from "react-icons/fa";
import LoaderSpinner from "../LoaderSpinner/LoaderSpinner";

const CoinBalanceBadge = () => {
  const { dbUser, dbUserLoading } = useDBUser();
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="cursor-pointer p-0.5 rounded-full px-2  bg-amber-500/10 hover:bg-amber-500/15 border border-amber-500/20 flex items-center gap-0.5 text-md">
          {dbUserLoading ? (
            <LoaderSpinner size={4} className="text-amber-500" />
          ) : (
            <>
              <FaEthereum className="text-amber-500 dark:text-amber-400" />
              <>{dbUser?.coinBalance || 0}</>
            </>
          )}
        </span>
      </TooltipTrigger>
      <TooltipContent>Coin Balance</TooltipContent>
    </Tooltip>
  );
};

export default CoinBalanceBadge;
