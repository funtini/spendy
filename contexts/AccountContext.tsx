import React, { createContext, useContext, useState } from 'react';

interface AccountContextValue {
  selectedAccountId: string | null;
  setSelectedAccountId: (id: string | null) => void;
}

const AccountContext = createContext<AccountContextValue | null>(null);

export const AccountProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);

  return (
    <AccountContext.Provider value={{ selectedAccountId, setSelectedAccountId }}>
      {children}
    </AccountContext.Provider>
  );
};

export const useSelectedAccount = () => {
  const ctx = useContext(AccountContext);
  if (!ctx) throw new Error('useSelectedAccount must be used within AccountProvider');
  return ctx;
};
