import React, {useState} from 'react';
import {createContext} from 'react';
const AuthContext = createContext();

export function AuthProvider({children}) {
  const [auth, setAuth] = useState({user: null, token: null});

  return (
    <AuthContext.Provider value={{auth, setAuth}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
