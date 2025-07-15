import useTopUsersApi from "@/api/open/useTopUsersApi";
import SectionHeader from "@/components/shared/SectionHeader/SectionHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import type { dbUserType } from "@/types/dbUserType/dbUserType";
import { useEffect, useState } from "react";
import { FaEthereum } from "react-icons/fa";

const TopWorkersSection = () => {
  const { getTopUsersPromise } = useTopUsersApi();
  const [users, setUsers] = useState<dbUserType[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const res = await getTopUsersPromise();
        if (res) {
          setUsers(res);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchTopUsers().then(() => {
      setLoading(false);
    });
  });

  return (
    <section className="max-w-screen-xl mx-auto p-4 space-y-8">
      <SectionHeader
        name="Best Workers"
        tagline="Top earning workers in Tasklet"
      />
      <main className="grid md:grid-cols-3 gap-x-6 lg:gap-x-8 gap-y-4">
        {loading || !users ? (
          <></>
        ) : (
          <>
            {users.map((user: dbUserType) => (
              <Card>
                <CardContent className="grid grid-cols-1 gap-3">
                  <div className="flex justify-center">
                    <Avatar className="size-16 md:size-20 ring-4 ring-accent/40">
                      <AvatarImage src={user.photoURL} />
                      <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex flex-col gap-1 justify-center items-center">
                    <h2 className="text-xl font-fancy font-medium text-center">
                      {user.name}
                    </h2>
                    <CardDescription className="flex">
                      <FaEthereum className="size-6 text-accent/80" />
                      <span className="text-lg">{user.coinBalance}</span>
                    </CardDescription>
                  </div>
                </CardContent>
              </Card>
            ))}
          </>
        )}
      </main>
    </section>
  );
};

export default TopWorkersSection;
