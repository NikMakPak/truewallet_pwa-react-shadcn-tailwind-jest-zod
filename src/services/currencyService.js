// Function to fetch the current exchange rate
export const fetchExchangeRate = async (currency) => {
  try {
    // Using the free Open Exchange Rates API
    const response = await fetch(`https://open.er-api.com/v6/latest/RUB`);
    const data = await response.json();
    
    if (data && data.rates && data.rates[currency]) {
      // Convert from RUB to the target currency rate
      const rateInRub = 1 / data.rates[currency];
      return parseFloat(rateInRub.toFixed(2));
    }
    
    throw new Error("Currency rate not found");
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    throw error;
  }
};

// List of available currencies
export const availableCurrencies = [
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "CNY", name: "Chinese Yuan" },
  { code: "TRY", name: "Turkish Lira" },
];
