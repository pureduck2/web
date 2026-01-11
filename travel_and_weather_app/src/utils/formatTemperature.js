const formatter = new Intl.NumberFormat("pl-PL", {
    style: "unit",
    unit: "celsius",
    unitDisplay: "narrow"
})

export default function formatTemperature(temperature) {
    return formatter.format(temperature);
}