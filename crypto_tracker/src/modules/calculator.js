export function calculateCryptocurrencyAmount(currencyAmount, cryptocurrencyPrice) {
    if (!currencyAmount || currencyAmount < 0) return 0;
    if (!cryptocurrencyPrice || cryptocurrencyPrice < 0) return 0;
    return currencyAmount / cryptocurrencyPrice;
}