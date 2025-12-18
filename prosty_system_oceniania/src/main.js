class App {
  #averageGrade = 0;
  #grades = [];

  #averageGradeElement;
  #gradesElement;

  constructor() {
    this.#averageGradeElement = document.querySelector("#average-grade");
    this.#gradesElement = document.querySelector("#grades");

    const subjectElement = document.querySelector("#subject");
    const gradeElement = document.querySelector("#grade");
    const submitButton = document.querySelector("form button");

    submitButton.addEventListener("click", (e) => {
      e.preventDefault();

      this.#addGrade(subjectElement.value, +gradeElement.value);
      this.render();
    });
  }

  #addGrade(name, grade) {
    if (isNaN(grade)) {
      alert("Ocena musi być liczbą");
      return;
    }
    if (grade < 1 || grade > 6 || grade % 0.5 !== 0) {
      alert("Ocena musi być jedną z tych wartości: 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6");
      return;
    }

    this.#grades.push({name, grade});
    this.#calculateAverage();
  }

  #calculateAverage() {
    this.#averageGrade = 0;
    this.#grades.forEach(({name, grade}) => {
      this.#averageGrade += grade;
    });
    this.#averageGrade /= this.#grades.length;
  }

  render() {
    this.#averageGradeElement.innerHTML = `Średnia ocen: ${this.#averageGrade.toPrecision(3)}`;
    this.#gradesElement.innerHTML = "";
    this.#grades.forEach(({name, grade}) => {
      this.#gradesElement.innerHTML += `<li>${name}: ${grade}</li>`;
    });
  }
}

const app = new App();
app.render();