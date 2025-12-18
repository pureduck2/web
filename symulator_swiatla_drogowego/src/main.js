// --- Elementy DOM ---
const startButton = document.getElementById('start-button');
const lightContainer = document.getElementById('traffic-light');

// =======================================================
// ZADANIE: Uzupełnij logikę poniżej
// =======================================================

class TrafficLight {
    constructor(container) {
        this.container = container;
        this.currentState = 'red'; // Stan początkowy
        this.lights = {}; // Obiekt do przechowywania elementów DOM

        // 1. TWORZENIE DOM (createElement / append)
        // Stwórz trzy 'div' dla świateł (czerwone, żółte, zielone).
        // Nadaj im odpowiednie klasy (np. 'light red', 'light yellow', 'light green').
        // Zapisz je w 'this.lights' (np. this.lights.red = ...)
        // Dodaj je do 'container' za pomocą .append()
        // (Uzupełnij kod)
        this.lights.red = document.createElement("div");
        this.lights.red.classList.add("light", "red");
        this.container.append(this.lights.red);

        this.lights.yellow = document.createElement("div");
        this.lights.yellow.classList.add("light", "yellow");
        this.container.append(this.lights.yellow);

        this.lights.green = document.createElement("div");
        this.lights.green.classList.add("light", "green");
        this.container.append(this.lights.green);
    }

    // Metoda uruchamiająca cykl
    start() {
        // Uruchamiamy pierwszy cykl (włączamy czerwone)
        this.changeState('red');
    }

    // Metoda główna sterująca zmianą świateł
    changeState(newState) {
        // 2. Aktualizujemy stan
        this.currentState = newState;
        
        // 3. Wyłączamy wszystkie światła (usuwamy klasę 'active')
        // (Uzupełnij kod - pętla po 'this.lights')
        for (const key in this.lights) {
          const light = this.lights[key];
          light.classList.remove("active");
        }

        // 4. Włączamy odpowiednie światło (dodajemy klasę 'active')
        //    i planujemy następną zmianę używając setTimeout
        // (Uzupełnij kod - użyj 'switch' lub 'if/else if')

        switch (this.currentState) {
            case 'red':
                // Włącz czerwone, ustaw timer na zmianę na zielone
                // (Uzupełnij kod)
                this.lights.red.classList.add("active");
                setTimeout(() => { this.changeState("green"); }, 2000);
                break;
            case 'green':
                // Włącz zielone, ustaw timer na zmianę na żółte
                // (Uzupełnij kod)
                this.lights.green.classList.add("active");
                setTimeout(() => { this.changeState("yellow"); }, 3000);
                break;
            case 'yellow':
                // Włącz żółte, ustaw timer na zmianę na czerwone
                // (Uzupełnij kod)
                this.lights.yellow.classList.add("active");
                setTimeout(() => { this.changeState("red"); }, 1000);
                break;
        }
    }
}

// Inicjalizacja
const myLight = new TrafficLight(lightContainer);

// 5. EVENT LISTENER
// Dodaj listener 'click' do 'startButton', który wywoła metodę 'myLight.start()'
// (Uzupełnij kod)
startButton.addEventListener("click", () => {
  myLight.start();
  startButton.disabled = true;
  startButton.innerText = "Uruchomiono";
});
