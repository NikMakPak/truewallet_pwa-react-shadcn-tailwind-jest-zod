import { useWallet } from "@/context/WalletContext";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.7,
      }}
    >
      <Card className="w-full bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 border-yellow-500/50 shadow-lg shadow-yellow-500/10 mb-6">
        <CardContent className="p-6">
          <div className="space-y-3">
            <motion.div
              className="text-sm text-yellow-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Total Balance
            </motion.div>
            <motion.div
              className="text-4xl font-bold tracking-tight text-white"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            >
              {formatCurrency(calculateBalance(), currency)}
            </motion.div>
            <motion.div
              className="text-xl text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {formatRubles(calculateRubleBalance())}
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Balance;
