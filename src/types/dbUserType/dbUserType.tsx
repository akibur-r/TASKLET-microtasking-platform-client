export type dbUserType = {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "worker" | "buyer" | "default";
  coinBalance: number;
  joinDate: string;
  status: "deleted" | "active";
  photoURL: string;
};

export type newDBUserType = {
  name: string;
  email: string;
  role: "admin" | "worker" | "buyer" | "default";
  photoURL: string;
};
