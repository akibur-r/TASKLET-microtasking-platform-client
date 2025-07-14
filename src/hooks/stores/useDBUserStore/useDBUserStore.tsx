import type { dbUserType } from "@/types/dbUserType/dbUserType";
import { create } from "zustand";

interface UsersStore {
  dbUsers: dbUserType[] | null;
  loading: boolean;

  setDBUsers: (users: dbUserType[]) => void;
  setLoading: (loading: boolean) => void;

  deleteUserByEmail: (email: string) => void;
  updateDBUser: (user: dbUserType) => void;
  updateDBUserByEmail: (email: string, updatedUser: Partial<dbUserType>) => void;
  updateDBUserRoleByEmail: (email: string, newRole: dbUserType["role"]) => void;
}

export const useDBUsersStore = create<UsersStore>((set) => ({
  dbUsers: null,
  loading: false,

  setDBUsers: (users) => set({ dbUsers: users }),
  setLoading: (loading) => set({ loading }),

  deleteUserByEmail: (email) =>
    set((state) => ({
      dbUsers: state.dbUsers?.filter((user) => user.email !== email) || [],
    })),

  updateDBUser: (updatedUser) =>
    set((state) => ({
      dbUsers:
        state.dbUsers?.map((user) =>
          user.email === updatedUser.email ? updatedUser : user
        ) || [],
    })),

  updateDBUserByEmail: (email, updatedUser) =>
    set((state) => ({
      dbUsers:
        state.dbUsers?.map((user) =>
          user.email === email ? { ...user, ...updatedUser } : user
        ) || [],
    })),

  updateDBUserRoleByEmail: (email, newRole) =>
    set((state) => ({
      dbUsers:
        state.dbUsers?.map((user) =>
          user.email === email ? { ...user, role: newRole } : user
        ) || [],
    })),
}));
