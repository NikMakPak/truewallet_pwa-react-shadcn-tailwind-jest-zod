import { useState } from "react";
import { useWallet } from "@/context/WalletContext";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { availableCurrencies } from "@/services/currencyService";

const CurrencySelector = () => {
  const { setupCurrency } = useWallet();
  const [selectedCurrency, setSelectedCurrency] = useState("");
  
  const handleCurrencySelect = (currencyCode) => {
    setSelectedCurrency(currencyCode);
  };
  
  const handleSubmit = () => {
    if (selectedCurrency) {
      setupCurrency(selectedCurrency);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <Card className="w-full max-w-md border-yellow-500/50">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Welcome to <span className="text-yellow-400">TRUE</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <p className="text-center mb-6">
            Please select the currency you want to track:
          </p>
          
          <div className="grid grid-cols-2 gap-3">
            {availableCurrencies.map((currency) => (
              <Button
                key={currency.code}
                variant={selectedCurrency === currency.code ? "default" : "outline"}
                className={`border-yellow-500/30 ${
                  selectedCurrency === currency.code 
                    ? "bg-yellow-400 text-black hover:bg-yellow-500" 
                    : "hover:bg-yellow-500/10"
                }`}
                onClick={() => handleCurrencySelect(currency.code)}
              >
                <div className="flex flex-col items-center">
                  <span className="text-lg font-bold">{currency.code}</span>
                  <span className="text-xs">{currency.name}</span>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
        
        <CardFooter>
          <Button
            onClick={handleSubmit}
            disabled={!selectedCurrency}
            className="w-full bg-yellow-400 text-black hover:bg-yellow-500 disabled:opacity-50"
          >
            Continue
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CurrencySelector;
