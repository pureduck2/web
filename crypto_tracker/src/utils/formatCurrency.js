import { CURRENCY } from "../modules/currency.js";

const formatter = new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: CURRENCY,
    currencyDisplay: "code",
    signDisplay: "negative"
});

const compactFormatter = new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: CURRENCY,
    currencyDisplay: "code",
    signDisplay: "negative",
    notation: "compact",
    compactDisplay: "long"
});

function createCryptocurrencyFormatter(currency) {
    return new Intl.NumberFormat("pl-PL", {
        style: "currency",
        currency,
        signDisplay: "negative",
        maximumFractionDigits: 11
    });
}

export function formatCryptoCurrency(amount, currency) {
    if (currency.length > 3) {
        const customFormatter = createCryptocurrencyFormatter(currency.substring(0, 3));
        return customFormatter
            .formatToParts(amount)
            .map(x => x.type === "currency" ? currency.toUpperCase() : x.value)
            .join("");
    } else {
        const customFormatter = createCryptocurrencyFormatter(currency);
        return customFormatter.format(amount);
    }
}

export function formatCryptoCurrencySeparate(amount, currency) {
    let customFormatter;
    if (currency.length > 3) {
        customFormatter = createCryptocurrencyFormatter(currency.substring(0, 3));
    } else {
        customFormatter = createCryptocurrencyFormatter(currency);
    }

    const parts = customFormatter.formatToParts(amount);
    const formattedAmount = parts
        .filter(x => x.type !== "currency")
        .filter(x => x.type !== "literal" || x.value.trim().length !== 0)
        .map(x => x.value)
        .join("");

    let formattedCurrency = parts.find(x => x.type === "currency").value;
    if (currency.length > 3) {
        formattedCurrency = currency.toUpperCase();
    }

    return [formattedAmount, formattedCurrency];
}

export function formatCurrency(amount) {
    return formatter.format(amount);
}

export function formatCurrencyCompact(amount) {
    return compactFormatter.format(amount);
}
