import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useDBUser } from "@/hooks/useDBUser/useDBUser";

const OverviewHeader = () => {
  const { dbUser } = useDBUser();
  return (
    <>
      <header className="text-center flex gap-2 items-center justify-center">
        <h2 className="text-2xl lg:text-3xl font-medium font-fancy">
          {dbUser?.name}
        </h2>
        <Badge variant={"success"}>{dbUser?.role}</Badge>
      </header>
      <Separator />
    </>
  );
};

export default OverviewHeader;
