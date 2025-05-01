import { useState, useEffect } from "react";
import { useWallet } from "@/context/WalletContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowDownCircle, Loader2 } from "lucide-react";
import { fetchExchangeRate } from "@/services/currencyService";

const ExpenseModal = ({ open, onOpenChange }) => {
  const { currency, addTransaction } = useWallet();
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [comment, setComment] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 16));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    if (open && currency) {
      setLoading(true);
      setError(false);
      
      fetchExchangeRate(currency)
        .then((currentRate) => {
          setRate(currentRate.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch exchange rate:", err);
          setError(true);
          setLoading(false);
        });
    }
  }, [open, currency]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!amount || !rate) return;
    
    addTransaction({
      type: "expense",
      amount: parseFloat(amount),
      rate: parseFloat(rate),
      comment,
      date: new Date(date).toISOString()
    });
    
    // Reset form
    setAmount("");
    setRate("");
    setComment("");
    setDate(new Date().toISOString().slice(0, 16));
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowDownCircle className="text-rose-500" />
            <span>Add Expense</span>
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount ({currency})</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              placeholder={`Enter amount in ${currency}`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="border-yellow-500/30 focus-visible:ring-yellow-500/50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="rate" className="flex items-center gap-2">
              <span>Exchange Rate (RUB)</span>
              {loading && <Loader2 className="animate-spin h-4 w-4" />}
            </Label>
            <Input
              id="rate"
              type="number"
              step="0.01"
              min="0"
              placeholder={loading ? "Loading current rate..." : "Enter exchange rate in RUB"}
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              required
              disabled={loading}
              className={`border-yellow-500/30 focus-visible:ring-yellow-500/50 ${
                error ? "border-rose-500" : ""
              }`}
            />
            {error && (
              <p className="text-sm text-rose-500">
                Failed to fetch current rate. Please enter manually.
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="comment">Comment (Optional)</Label>
            <Input
              id="comment"
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border-yellow-500/30 focus-visible:ring-yellow-500/50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date">Date & Time</Label>
            <Input
              id="date"
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border-yellow-500/30 focus-visible:ring-yellow-500/50"
            />
          </div>
          
          <DialogFooter>
            <Button 
              type="submit" 
              className="bg-rose-500 hover:bg-rose-600 text-white"
              disabled={loading}
            >
              Add Expense
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ExpenseModal;
