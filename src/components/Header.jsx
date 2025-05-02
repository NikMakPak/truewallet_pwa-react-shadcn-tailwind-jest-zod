import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

const Header = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);

  // Listen for the beforeinstallprompt event
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      setIsInstallable(true);
      console.log("App can be installed");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);

    // We've used the prompt, and can't use it again, so clear it
    setDeferredPrompt(null);
  };

  const handleExport = () => {
    const transactions = localStorage.getItem("transactions");
    const currency = localStorage.getItem("currency");

    if (!transactions) return;

    const data = {
      currency,
      transactions: JSON.parse(transactions),
      exportDate: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `true-wallet-export-${new Date().toLocaleDateString()}.json`;
    document.body.appendChild(a);
    a.click();

    // Cleanup
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <header className="flex items-center justify-between p-4 border-b border-yellow-500/50">
      <div className="flex items-center gap-2">
        <div className="bg-yellow-400 text-black font-bold p-1 rounded">
          TRUE
        </div>
        <h1 className="text-lg font-bold">Wallet</h1>
      </div>

      {/* Центральная ссылка на GitHub */}
      <a
        href="https://github.com/nikmakpak"
        target="_blank"
        rel="noopener noreferrer"
        className="text-yellow-400 hover:text-yellow-300 transition-colors text-sm font-medium absolute left-1/2 transform -translate-x-1/2"
      >
        made by nikmak
      </a>

      <div className="flex items-center gap-2">
        <ModeToggle />

        <Button
          variant="outline"
          size="icon"
          onClick={handleExport}
          className="border-yellow-500/50 hover:bg-yellow-500/10"
        >
          <Share2 size={18} />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={handleInstallClick}
          className="border-yellow-500/50 hover:bg-yellow-500/10"
          title="Install app"
        >
          <Download size={18} />
        </Button>
      </div>
    </header>
  );
};

export default Header;
