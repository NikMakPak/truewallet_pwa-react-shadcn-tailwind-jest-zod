import { useWallet } from "@/context/WalletContext";
import { Card, CardContent } from "@/components/ui/card";

const Balance = () => {
  const { currency, calculateBalance, calculateRubleBalance } = useWallet();

  const formatCurrency = (amount, currencyCode) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode || "USD",
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatRubles = (amount) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="w-full bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 border-yellow-500/50 shadow-lg shadow-yellow-500/10 mb-6">
      <CardContent className="p-6">
        <div className="space-y-3">
          <div className="text-sm text-yellow-400">Total Balance</div>
          <div className="text-4xl font-bold tracking-tight text-white">
            {formatCurrency(calculateBalance(), currency)}
          </div>
          <div className="text-xl text-gray-300">
            {formatRubles(calculateRubleBalance())}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Balance;
