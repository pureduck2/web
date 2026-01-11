import { calculateCryptocurrencyAmount } from "../modules/calculator";
import { formatCryptoCurrencySeparate } from "../utils/formatCurrency";

class Calculator {
    #cryptocurrency;
    #currency;

    #target;
    #inputFromElem;
    #resultElem;

    constructor(target, cryptocurrency, currency) {
        this.#target = target;
        this.#cryptocurrency = cryptocurrency;
        this.#currency = currency
        this.#inputFromElem = this.#target.querySelector(".calculator__input");
        this.#resultElem = this.#target.querySelector(".calculator__result");

        if (this.#inputFromElem.value !== "") {
            this.#convert();
        }

        this.#inputFromElem.addEventListener("input", this.#convert.bind(this));
        this.#target.querySelector(".calculator__currency").innerText = this.#currency;
    }

    set cryptocurrency(cryptocurrency) {
        this.#cryptocurrency = cryptocurrency;
    }

    updateConversion() {
        this.#convert();
    }

    #convert() {
        const amount = +this.#inputFromElem.value;
        const convertedAmount = calculateCryptocurrencyAmount(amount, this.#cryptocurrency.currentPrice);
        const [formattedAmount, formattedCurrency] = formatCryptoCurrencySeparate(convertedAmount, this.#cryptocurrency.symbol);
        this.#resultElem.innerHTML = 
            `To jest <span class="calculator__value">${formattedAmount}</span> <span class="calculator__cryptocurrency">${formattedCurrency}</span>`;
    }
}

export default function createCalculator(target, cryptocurrency, currency) {
    return new Calculator(target, cryptocurrency, currency);
}