const formatter = new Intl.NumberFormat("pl-PL", {
    style: "percent",
    signDisplay: "negative",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

export default function formatPercentage(percentage) {
    return formatter.format(percentage);
}