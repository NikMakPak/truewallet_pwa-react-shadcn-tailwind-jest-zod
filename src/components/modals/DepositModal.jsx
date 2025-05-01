import { useState } from "react";
import { useWallet } from "@/context/WalletContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowUpCircle } from "lucide-react";

const DepositModal = ({ open, onOpenChange }) => {
  const { currency, addTransaction } = useWallet();
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 16));
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!amount || !rate) return;
    
    addTransaction({
      type: "deposit",
      amount: parseFloat(amount),
      rate: parseFloat(rate),
      date: new Date(date).toISOString()
    });
    
    // Reset form
    setAmount("");
    setRate("");
    setDate(new Date().toISOString().slice(0, 16));
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowUpCircle className="text-green-500" />
            <span>Add Deposit</span>
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
            <Label htmlFor="rate">Exchange Rate (RUB)</Label>
            <Input
              id="rate"
              type="number"
              step="0.01"
              min="0"
              placeholder="Enter exchange rate in RUB"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              required
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
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              Add Deposit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DepositModal;
