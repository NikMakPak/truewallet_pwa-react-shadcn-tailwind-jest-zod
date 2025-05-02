import { useState } from "react";
import { useWallet } from "@/context/WalletContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpCircle, ArrowDownCircle, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TransactionList = () => {
  const { currency, filterTransactions } = useWallet();
  const [filter, setFilter] = useState("all");

  const handleFilterChange = (value) => {
    setFilter(value);
  };

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const transactions = filterTransactions(filter === "all" ? null : filter);

  return (
    <div className="w-full">
      <Tabs defaultValue="all" onValueChange={handleFilterChange}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="deposit">Deposits</TabsTrigger>
          <TabsTrigger value="expense">Expenses</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <TransactionItems
            transactions={transactions}
            currency={currency}
            formatCurrency={formatCurrency}
            formatRubles={formatRubles}
            formatDate={formatDate}
          />
        </TabsContent>

        <TabsContent value="deposit" className="mt-0">
          <TransactionItems
            transactions={transactions}
            currency={currency}
            formatCurrency={formatCurrency}
            formatRubles={formatRubles}
            formatDate={formatDate}
          />
        </TabsContent>

        <TabsContent value="expense" className="mt-0">
          <TransactionItems
            transactions={transactions}
            currency={currency}
            formatCurrency={formatCurrency}
            formatRubles={formatRubles}
            formatDate={formatDate}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const TransactionItems = ({
  transactions,
  currency,
  formatCurrency,
  formatRubles,
  formatDate,
}) => {
  const { deleteTransaction } = useWallet();

  if (transactions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        No transactions found
      </div>
    );
  }

  return (
    <AnimatePresence>
      <div className="space-y-3">
        {transactions.map((transaction) => (
          <motion.div
            key={transaction.id}
            className={`flex items-center justify-between p-3 rounded-lg border ${
              transaction.type === "deposit"
                ? "bg-green-500/10 border-green-500/30"
                : "bg-rose-500/10 border-rose-500/30"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 24,
            }}
            layout
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-full ${
                  transaction.type === "deposit"
                    ? "bg-green-500/20 text-green-500"
                    : "bg-rose-500/20 text-rose-500"
                }`}
              >
                {transaction.type === "deposit" ? (
                  <ArrowUpCircle size={20} />
                ) : (
                  <ArrowDownCircle size={20} />
                )}
              </div>

              <div>
                <div className="font-medium">
                  {transaction.type === "deposit" ? "Deposit" : "Expense"}
                  {transaction.comment && ` - ${transaction.comment}`}
                </div>
                <div className="text-sm text-gray-400">
                  {formatDate(transaction.date)}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div
                  className={`font-medium ${
                    transaction.type === "deposit"
                      ? "text-green-500"
                      : "text-rose-500"
                  }`}
                >
                  {transaction.type === "deposit" ? "+" : "-"}
                  {formatCurrency(transaction.amount, currency)}
                </div>
                <div className="text-sm text-gray-400">
                  {formatRubles(transaction.amount * transaction.rate)}
                </div>
              </div>

              <motion.button
                className="text-gray-400 hover:text-rose-500 transition-colors p-1"
                onClick={() => deleteTransaction(transaction.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Delete transaction"
              >
                <Trash2 size={18} />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  );
};

export default TransactionList;
