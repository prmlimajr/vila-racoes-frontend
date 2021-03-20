import React, { createContext, useState, useCallback, useContext } from 'react';
import { login, logout } from 'app/api/auth';
import { loggedIn, getUser, getToken, loggedOut } from 'app/services/auth';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const user = getUser();
    const token = getToken();

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {};
  });

  const signIn = useCallback(async ({ email, password }) => {
    const { token, user } = await login(email, password);
    loggedIn(token, user);
  }, []);

  const signOut = useCallback(async () => {
    await logout();
    loggedOut();
    setData({});
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
