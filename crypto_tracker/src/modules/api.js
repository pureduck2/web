import { CURRENCY } from "./currency";

const BASE_URL = "https://api.coingecko.com/api/v3";
const CURRENCY_URL = CURRENCY.toLowerCase();

export async function getTopCryptocurriences() {
    const n = 50;
    const url = `${BASE_URL}/coins/markets?vs_currency=${CURRENCY_URL}&per_page=${n}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const rawData = await response.json();

        const data = rawData
            .map(entry => {
                return {
                    id: entry.id,
                    name: entry.name,
                    symbol: entry.symbol,
                    currentPrice: entry.current_price,
                    priceChangePercentage24h: entry.price_change_percentage_24h / 100
                }
            });

        return data;
    } catch (error) {
        console.error(error);
        alert("Wystąpił błąd API CoinGecko (możliwy limit zapytań).");
        return [];
    }
}

export async function getMarketChartData(cryptocurrency, days) {
    const url = `${BASE_URL}/coins/${cryptocurrency}/market_chart?vs_currency=${CURRENCY_URL}&days=${days}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const rawData = await response.json();
        const data = [];

        for (let i = 0 ; i < rawData.prices.length; i++) {
            data.push({
                price: rawData.prices[i][1],
                marketCaps: rawData.market_caps[i][1],
                totalVolumes: rawData.total_volumes[i][1],
                timestamp: rawData.prices[i][0]
            });
        }

        return data;
    } catch (error) {
        console.error(error);
        alert("Wystąpił błąd API CoinGecko (możliwy limit zapytań).");
        return [];
    }
}