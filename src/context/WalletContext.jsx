import { createContext, useContext, useState, useEffect } from "react";

const WalletContext = createContext();

export const useWallet = () => {
  return useContext(WalletContext);
};

export const WalletProvider = ({ children }) => {
  const [currency, setCurrency] = useState(() => {
    const savedCurrency = localStorage.getItem("currency");
    return savedCurrency || "";
  });

  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("transactions");
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  const [isFirstVisit, setIsFirstVisit] = useState(() => {
    return !localStorage.getItem("currency");
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (currency) {
      localStorage.setItem("currency", currency);
    }
  }, [currency]);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // Calculate total balance
  const calculateBalance = () => {
    return transactions.reduce((total, transaction) => {
      if (transaction.type === "deposit") {
        return total + transaction.amount;
      } else {
        return total - transaction.amount;
      }
    }, 0);
  };

  // Calculate total in rubles
  const calculateRubleBalance = () => {
    return transactions.reduce((total, transaction) => {
      if (transaction.type === "deposit") {
        return total + transaction.amount * transaction.rate;
      } else {
        return total - transaction.amount * transaction.rate;
      }
    }, 0);
  };

  // Add a new transaction
  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now(),
      date: transaction.date || new Date().toISOString(),
      balanceAfter:
        calculateBalance() +
        (transaction.type === "deposit"
          ? transaction.amount
          : -transaction.amount),
    };

    setTransactions([newTransaction, ...transactions]);
  };

  // Set the currency for the wallet
  const setupCurrency = (selectedCurrency) => {
    setCurrency(selectedCurrency);
    setIsFirstVisit(false);
  };

  // Filter transactions by type
  const filterTransactions = (type) => {
    if (!type || type === "all") {
      return transactions;
    }
    return transactions.filter((transaction) => transaction.type === type);
  };

  // Delete a transaction by ID
  const deleteTransaction = (id) => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
  };

  const value = {
    currency,
    transactions,
    isFirstVisit,
    calculateBalance,
    calculateRubleBalance,
    addTransaction,
    setupCurrency,
    filterTransactions,
    deleteTransaction,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};
