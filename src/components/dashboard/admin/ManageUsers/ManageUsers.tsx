import useUserApi from "@/api/useUserApi";
import LoaderSpinner from "@/components/shared/LoaderSpinner/LoaderSpinner";
import SectionHeader from "@/components/shared/SectionHeader/SectionHeader";
import UserDeleteButton from "@/components/shared/users/UserDeleteButton/UserDeleteButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDBUsersStore } from "@/hooks/stores/useDBUserStore/useDBUserStore";
import { useDBUser } from "@/hooks/useDBUser/useDBUser";
import type { dbUserType } from "@/types/dbUserType/dbUserType";
import { format } from "date-fns";
import {
  AtSign,
  CalendarDays,
  ContactRound,
  GripHorizontal,
  Star,
} from "lucide-react";
import { useEffect } from "react";

const ManageUsers = () => {
  const { getAllUserInfoPromise } = useUserApi();
  const { dbUser } = useDBUser();
  const {
    dbUsers,
    setDBUsers,
    loading: dbUsersLoading,
    setLoading: setDBUsersLoading,
  } = useDBUsersStore();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setDBUsersLoading(true);
        getAllUserInfoPromise()
          .then((res) => {
            setDBUsers(res);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.error("Fetch tasks error:", err);
      } finally {
        setDBUsersLoading(false);
      }
    };

    fetchTasks();
  }, [dbUser]);

  return (
    <section className="space-y-8">
      <SectionHeader
        name="Manage Tasks"
        tagline="You are modifying other users information"
        className="text-center space-y-1"
        taglineClassName="text-accent/90"
      />
      <main>
        {dbUsersLoading ? (
          <div className="flex justify-center">
            <LoaderSpinner />
          </div>
        ) : dbUsers?.length ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-fit hidden md:table-cell">
                  SL.
                </TableHead>
                <TableHead>
                  <ContactRound className="md:hidden size-4" />
                  <span className="hidden md:block">Name</span>
                </TableHead>
                <TableHead>
                  <AtSign className="md:hidden size-4" />
                  <span className="hidden md:block">Email</span>
                </TableHead>
                <TableHead>
                  <CalendarDays className="md:hidden size-4 mx-auto" />
                  <span className="hidden md:block">Joined At</span>
                </TableHead>
                <TableHead>
                  <GripHorizontal className="md:hidden size-4 mx-auto" />
                  <span className="hidden md:block text-center">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow key={dbUser?._id} className="bg-accent/5">
                <TableCell className="font-medium hidden md:table-cell ">
                  <Star className="size-3" />
                </TableCell>
                <TableCell>{dbUser?.name}</TableCell>
                <TableCell>{dbUser?.email}</TableCell>
                <TableCell>
                  {format(dbUser?.joinDate || "", "dd LLL yyyy - h:mm a")}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2 justify-center">
                    <UserDeleteButton
                      disabled
                      userEmail={dbUser?.email || ""}
                    />
                  </div>
                </TableCell>
              </TableRow>
              {dbUsers
                .filter((user: dbUserType) => user.email !== dbUser?.email)
                .map((user: dbUserType, idx) => (
                  <TableRow key={user._id}>
                    <TableCell className="font-medium hidden md:table-cell ">
                      {idx + 1}
                    </TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {format(user.joinDate, "dd LLL yyyy - h:mm a")}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2 justify-center">
                        <UserDeleteButton userEmail={user?.email || ""} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        ) : (
          <>You haven't added any task yet.</>
        )}
      </main>
    </section>
  );
};

export default ManageUsers;
