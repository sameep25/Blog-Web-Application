import { createContext, useState } from "react";

export const DataContext = createContext(null);

const initialAccount = {
  name: "",
  username: "",
  googleId: "",
  picture: "",
  email: "",
}

const DataProvider = ({ children }) => {


  const [account, setAccount] = useState(initialAccount);

  return (
    <DataContext.Provider
      value={{
        account,
        setAccount,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
