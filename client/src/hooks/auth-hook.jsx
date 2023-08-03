import { useCallback, useEffect, useState } from "react";

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [tokenExpDate, setTokenExpDate] = useState(null);
  const [userId, setUserId] = useState(null);
  const [membershipStatus, setMembershipStatus] = useState("free");

  const login = useCallback(
    (uid, userToken, userMembershipStatus, expirationDate) => {
      setToken(userToken);
      setUserId(uid);
      setMembershipStatus(userMembershipStatus);

      const tokenExpirationDate =
        expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);

      setTokenExpDate(tokenExpirationDate);

      localStorage.setItem(
        "userData",
        JSON.stringify({
          userId: uid,
          token: userToken,
          membershipStatus: userMembershipStatus,
          expiration: tokenExpirationDate.toISOString(),
        })
      );
    },
    []
  );

  const signup = useCallback(
    (uid, userToken, userMembershipStatus) => {
      login(uid, userToken, userMembershipStatus);
    },
    [login]
  );

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpDate(null);
    setUserId(null);
    setMembershipStatus("free");
    localStorage.removeItem("userData");
  }, []);

  const updateMembershipStatus = useCallback((status) => {
    setMembershipStatus(status);
    const storedData = JSON.parse(localStorage.getItem("userData"));
    localStorage.setItem(
      "userData",
      JSON.stringify({
        ...storedData,
        membershipStatus: status,
      })
    );
  }, []);

  useEffect(() => {
    if (token && tokenExpDate && tokenExpDate instanceof Date) {
      const remainingTime = tokenExpDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpDate]);

  useEffect(() => {
    let storedData;
    try {
      storedData = JSON.parse(localStorage.getItem("userData"));
    } catch (error) {
      console.error("Error parsing stored user data:", error);
      return;
    }

    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        storedData.membershipStatus,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return {
    token,
    login,
    signup,
    logout,
    userId,
    membershipStatus,
    updateMembershipStatus,
  };
};
