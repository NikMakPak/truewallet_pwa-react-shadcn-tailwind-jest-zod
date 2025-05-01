import { useEffect } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { WalletProvider, useWallet } from "@/context/WalletContext";
import Header from "@/components/Header";
import Balance from "@/components/Balance";
import TransactionList from "@/components/TransactionList";
import ActionButton from "@/components/ActionButton";
import CurrencySelector from "@/components/CurrencySelector";

const WalletApp = () => {
  const { isFirstVisit } = useWallet();

  // Register service worker for PWA
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("SW registered: ", registration);
          })
          .catch((registrationError) => {
            console.log("SW registration failed: ", registrationError);
          });
      });
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {isFirstVisit ? (
        <CurrencySelector />
      ) : (
        <>
          <Header />
          <main className="flex-1 p-4 max-w-md mx-auto w-full">
            <Balance />
            <TransactionList />
          </main>
          <ActionButton />
        </>
      )}
    </div>
  );
};

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <WalletProvider>
        <WalletApp />
      </WalletProvider>
    </ThemeProvider>
  );
}

export default App;
