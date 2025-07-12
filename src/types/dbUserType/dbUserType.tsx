export type dbUserType = {
  _id?: string;
  name?: string;
  email: string;
  role: "admin" | "worker" | "buyer" | "default";
  coinBalance?: number;
};
