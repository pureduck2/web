import "./style.css";
import createCryptocurrencyTable from "./components/createCryptoCurrencyTable.js";
import { getMarketChartData, getTopCryptocurriences } from "./modules/api.js";
import createMarketChart from "./components/createMarketChart.js";
import createCalculator from "./components/createCalculator.js";
import { CURRENCY } from "./modules/currency.js";

async function main() {
    const topCryptocurrencies = await getTopCryptocurriences();
    const topCryptocurrency = topCryptocurrencies[0];
    const table = createCryptocurrencyTable(document.querySelector(".cryptocurrencies"), topCryptocurrencies);
    table.selectRow(0);

    const marketChartData = await getMarketChartData(topCryptocurrency.id, 7);
    const chart = createMarketChart(document.querySelector(".chart__canvas"), marketChartData, topCryptocurrency);

    const calculator = createCalculator(document.querySelector(".calculator"), topCryptocurrency, CURRENCY);

    table.onRowClick(async (_row, cryptocurrency) => {
        const cryptocurrencyId = cryptocurrency.id;

        const marketChartData = await getMarketChartData(cryptocurrencyId, 7);
        chart.cryptocurrency = cryptocurrency;
        chart.refreshChart(marketChartData);

        calculator.cryptocurrency = cryptocurrency;
        calculator.updateConversion();
    });
}

(async function () {
    await main();
})();