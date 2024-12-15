export interface User {
  id: string;
  displayName: string;
  email: string;
  photoURL: string;
  createdAt: string | Date;
  password: string;
  role: UserRole;
}

export type UserDisplay = Omit<User, "password">;

type UserRole = "user" | "admin";

export interface UserFormEmailPassword {
  email: string;
  password: string;
}
