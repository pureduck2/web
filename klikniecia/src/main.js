class ClickCounter {
  constructor(buttonId, outputId) {
    this.count = 0;
    this.button = document.getElementById(buttonId);
    this.output = document.getElementById(outputId);

    this.button.addEventListener("click", this.handleClick.bind(this));
  }

  handleClick() {
    this.count++;
    this.output.textContent = `Kliknięcia: ${this.count}`;
  }
}

const counter = new ClickCounter('task1-button', 'task1-output');

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

const colors = ["red", "green", "blue"];
const allBoxes = document.querySelectorAll('.box');
allBoxes.forEach(box => {
  box.addEventListener("click", () => {
    const color = colors[getRandomInt(0, colors.length)];
    box.style = `background-color: ${color}`;
  });
});