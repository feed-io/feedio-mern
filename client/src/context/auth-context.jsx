import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  token: null,
  membershipStatus: "free",
  login: () => {},
  logout: () => {},
  updateMembershipStatus: () => {},
});
