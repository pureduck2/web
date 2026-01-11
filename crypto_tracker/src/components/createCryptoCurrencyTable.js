import { formatCurrency } from "../utils/formatCurrency";
import formatPercentage from "../utils/formatPercentage";

class Order {
    #order;

    constructor() {
        this.#order = "asc";
    }

    set(order) {
        if (order === "asc" || order === "desc") {
            this.#order = order;
        }
    }

    get() {
        return this.#order;
    }

    toggle() {
        this.#order = this.#order === "asc" ? "desc" : "asc";
    }

    symbol() {
        switch (this.#order) {
            case "asc":
                return "↓";
            case "desc":
                return "↑";
            default:
                return "";
        }
    }
}

class CryptoCurrencyTable {
    #cryptoData;
    #orders;

    #target;
    #body;
    #rows;
    #selectedRow;
    #priceHeader;
    #changeHeader;
    #priceHeaderSortOrderElem;
    #changeHeaderSortOrderElem;

    #onRowClickCallback;

    constructor(target, cryptoData) {
        this.#target = target;
        this.#body = this.#target.querySelector(".cryptocurrencies__body");
        this.#cryptoData = cryptoData;
        this.#rows = [];
        this.#onRowClickCallback = null;
        this.#selectedRow = null;
        this.#orders = [new Order(), new Order()];

        this.#priceHeader = this.#target.querySelector(".cryptocurrencies__header-price");
        this.#priceHeaderSortOrderElem = this.#priceHeader.querySelector(".cryptocurrencies__header-sort-order");
        this.#priceHeader.addEventListener("click", () => {
            this.#sort((a, b) => {
                if (a.currentPrice < b.currentPrice) {
                    return -1;
                } else if (a.currentPrice > b.currentPrice) {
                    return 1;
                } else {
                    return 0;
                }
            }, this.#orders[0]);

            this.#changeHeaderSortOrderElem.innerText = "";
            this.#priceHeaderSortOrderElem.innerText = this.#orders[0].symbol();
        });

        this.#changeHeader = this.#target.querySelector(".cryptocurrencies__header-change24h")
        this.#changeHeaderSortOrderElem = this.#changeHeader.querySelector(".cryptocurrencies__header-sort-order");
        this.#changeHeader.addEventListener("click", () => {
            this.#sort((a, b) => {
                if (a.priceChangePercentage24h < b.priceChangePercentage24h) {
                    return -1;
                } else if (a.priceChangePercentage24h > b.priceChangePercentage24h) {
                    return 1;
                } else {
                    return 0;
                }
            }, this.#orders[1]);

            this.#priceHeaderSortOrderElem.innerText = "";
            this.#changeHeaderSortOrderElem.innerText = this.#orders[1].symbol();
        });

        this.#fillTable(this.#cryptoData);
    }

    #fillTable(rows) {
        this.#body.innerHTML = "";

        rows.forEach((entry) => {
            const row = document.createElement("tr");
            row.classList.add("cryptocurrencies__row");

            const priceChangeClass = entry.priceChangePercentage24h >= 0
                ? "cryptocurrencies__cell--positive"
                : "cryptocurrencies__cell--negative";

            row.innerHTML = `
                <td class="cryptocurrencies__cell">${entry.name}</td>
                <td class="cryptocurrencies__cell">${formatCurrency(entry.currentPrice)}</td>
                <td class="cryptocurrencies__cell ${priceChangeClass}">${formatPercentage(entry.priceChangePercentage24h)}</td>
            `;

            row.addEventListener("click", () => {
                if (this.#onRowClickCallback !== null) {
                    this.#onRowClickCallback(row, entry);
                }

                this.#selectRow(row);
            });

            this.#body.append(row);
            this.#rows.push(row);
        });
    }

    onRowClick(callback) {
        this.#onRowClickCallback = callback;
    }

    selectRow(id) {
        const row = this.#rows[id];
        if (row !== undefined) {
            this.#selectRow(row);
        }
    }

    #selectRow(row) {
        if (this.#selectedRow !== null) {
            this.#selectedRow.classList.remove("cryptocurrencies__row--selected");
        }

        row.classList.add("cryptocurrencies__row--selected");
        this.#selectedRow = row;
    }

    #sort(compareFn, order) {
        let sorted = this.#cryptoData.sort(compareFn);

        if (order.get() === "desc") {
            sorted = sorted.reverse();
        }

        order.toggle();
        this.#fillTable(sorted);
    }
}

export default function createCryptoCurrencyTable(target, cryptoData) {
    return new CryptoCurrencyTable(target, cryptoData);
}