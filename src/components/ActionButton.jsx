import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import DepositModal from "./modals/DepositModal";
import ExpenseModal from "./modals/ExpenseModal";
import { motion, AnimatePresence } from "framer-motion";

const ActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const handleDepositClick = () => {
    setDepositModalOpen(true);
    setIsOpen(false);
  };
  
  const handleExpenseClick = () => {
    setExpenseModalOpen(true);
    setIsOpen(false);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-10">
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                <Button
                  onClick={handleDepositClick}
                  className="rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg flex items-center gap-2"
                >
                  <ArrowUpCircle size={18} />
                  <span>Deposit</span>
                </Button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  onClick={handleExpenseClick}
                  className="rounded-full bg-rose-500 hover:bg-rose-600 text-white shadow-lg flex items-center gap-2"
                >
                  <ArrowDownCircle size={18} />
                  <span>Expense</span>
                </Button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={toggleMenu}
            className="rounded-full w-14 h-14 bg-yellow-400 hover:bg-yellow-500 text-black shadow-lg shadow-yellow-500/20"
          >
            <motion.div
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <Plus size={24} />
            </motion.div>
          </Button>
        </motion.div>
      </div>
      
      <DepositModal open={depositModalOpen} onOpenChange={setDepositModalOpen} />
      <ExpenseModal open={expenseModalOpen} onOpenChange={setExpenseModalOpen} />
    </>
  );
};

export default ActionButton;
