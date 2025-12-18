import "./style.css";
import Chart from "chart.js/auto";

const ctx = document.getElementById("chart");
const daysElement = document.getElementById("days");
const errorElement = document.getElementById("error");

daysElement.addEventListener('input', () => {
  const days = +daysElement.value;

  if (days > 0) {
    refreshChart(days);
  }
});

async function getMarketChartData(days) {
  const url = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${days}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const rawData = await response.json();
  console.log(rawData);
  const data = [];

  for (let i = 0; i < rawData.prices.length; i++) {
    data.push({
      price: rawData.prices[i][1],
      marketCaps: rawData.market_caps[i][1],
      totalVolumes: rawData.total_volumes[i][1],
      timestamp: rawData.prices[i][0]
    });
  }
  
  return data;
}

const formatter = new Intl.DateTimeFormat("pl-PL", {
  timeStyle: "short",
  dateStyle: "short"
});

function formatDate(timestamp) {
  const date = new Date(timestamp);
  return formatter.format(date).replace(/,/, '');
}

let chart = null;

function main(data) {
  console.log(data);
  if (chart !== null) {
    chart.destroy();
  }

  errorElement.style.visibility = "hidden";
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map((row) => formatDate(row.timestamp)),
      datasets: [{
        label: "Cena Bitcoina w USD",
        data: data.map(row => row.price)
      }]
    },
  });
}

function refreshChart(days) {
  getMarketChartData(days)
    .then(main)
    .catch(() => {
      errorElement.style.visibility = "visible";
      errorElement.innerText = "Wystąpił błąd";
    });
}

refreshChart(7);