const inventory = [
    {
        name: 'Monitor 27"',
        amount: 25,
        minimumAmount: 5,
    },
    {
        name: "Dysk SSD 1TB",
        amount: 57,
        minimumAmount: 10,
    },
    {
        name: "Kabel HDMI",
        amount: 25,
        minimumAmount: 20,
    },
    {
        name: "Banan",
        amount: 2,
        minimumAmount: 1,
    }
];

function updateAmountElement(amountElement, amount, minimumAmount) {
    if (amount > minimumAmount) {
        amountElement.innerText = `✅ Stan: ${amount} szt.`;
        amountElement.className = "item__amount--ok";
    } else if (amount > 0 && amount <= minimumAmount) {
        amountElement.innerText = `UWAGA! Stan: ${amount} szt.`;
        amountElement.className = "item__amount--warning";
    } else {
        amountElement.innerText = `❌ Stan: 0 szt.`;
        amountElement.className = "item__amount--bad";
    }
}

const inventoryElement = document.querySelector("#inventory");

inventory.forEach((item) => {
    const nameElement = document.createElement("h2");
    nameElement.innerText = item.name;

    const amountElement = document.createElement("p");
    updateAmountElement(amountElement, item.amount, item.minimumAmount);

    const minimumAmountElement = document.createElement("p");
    minimumAmountElement.innerText = `Min. zapas: ${item.minimumAmount} szt.`;

    const releaseButton = document.createElement("button");
    releaseButton.innerText = "- Wydanie";
    releaseButton.addEventListener("click", () => {
        if (item.amount > 0) {
            item.amount -= 1;
        }
        updateAmountElement(amountElement, item.amount, item.minimumAmount);
    });

    const acceptanceButton = document.createElement("button");
    acceptanceButton.innerText = "+ Przyjęcie";
    acceptanceButton.addEventListener("click", () => {
        item.amount += 1;
        updateAmountElement(amountElement, item.amount, item.minimumAmount);
    });

    const itemElement = document.createElement("div");
    itemElement.className = "item";
    itemElement.append(
        nameElement,
        amountElement,
        minimumAmountElement,
        releaseButton,
        acceptanceButton,
        document.createElement("hr")
    );

    inventoryElement.appendChild(itemElement);
});