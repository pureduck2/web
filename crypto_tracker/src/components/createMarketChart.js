import ChartJs from "chart.js/auto";
import { formatDate } from "../utils/formatDate.js";
import { formatCurrencyCompact } from "../utils/formatCurrency.js";
import { CURRENCY } from "../modules/currency.js";

class MarketChart {
    #target;
    #marketChartData;
    #cryptocurrency;
    #chart;

    constructor(target, marketChartData, cryptocurrency) {
        this.#target = target;
        this.#marketChartData = marketChartData;
        this.#cryptocurrency = cryptocurrency;
        this.#chart = null;

        this.refreshChart();
    }

    set cryptocurrency(cryptocurrency) {
        this.#cryptocurrency = cryptocurrency;
    }

    refreshChart(marketChartData) {
        if (marketChartData !== undefined) {
            this.#marketChartData = marketChartData;
        }

        if (this.#chart !== null) {
            this.#chart.destroy();
        }

        const cryptocurrencySymbol = this.#cryptocurrency.symbol.toUpperCase();
        const currency = CURRENCY;
        const xlabels = this.#marketChartData.map(item => formatDate(item.timestamp));
        const ydata = this.#marketChartData.map(item => item.price);
        this.#chart = new ChartJs(this.#target, {
            type: "line",
            data: {
                labels: xlabels,
                datasets: [{
                    label: `Cena ${cryptocurrencySymbol} w ${currency}`,
                    data: ydata,
                    borderColor: "#4a90e2",
                    backgroundColor: "rgba(74, 144, 226, 0.1)",
                    borderWidth: 2,
                    fill: true,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false,
                        ticks: {
                            callback: (value) => formatCurrencyCompact(value),
                        }
                    }
                }
            }
        });
    }
}

export default function createMarketChart(target, marketChartData, cryptocurrency) {
    return new MarketChart(target, marketChartData, cryptocurrency);
}