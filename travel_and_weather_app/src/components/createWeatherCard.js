import formatCoordinates from "../utils/formatCoordinates";
import formatTemperature from "../utils/formatTemperature";

class WeatherCard {
    #selection;
    #target;
    #coordsElem;
    #tempElem;
    #condElem;
    #noteInput;
    #addButton;
    #onAddToListCallback;

    constructor(target) {
        this.#selection = null;
        this.#target = target;
        this.#coordsElem = target.querySelector(".weather-card__coords");
        this.#tempElem = target.querySelector(".weather-card__temp");
        this.#condElem = target.querySelector(".weather-card__cond");
        this.#noteInput = target.querySelector(".weather-card__input");
        this.#addButton = target.querySelector(".weather-card__button");

        this.#addButton.addEventListener("click", () => {
            if (this.#onAddToListCallback !== null) {
                this.#onAddToListCallback(this.#selection, this.#noteInput.value.trim());
            }
        });
    }

    set selection(selection) {
        if (selection === undefined) {
            return;
        }

        this.#selection = selection;

        if (selection !== null) {
            this.#coordsElem.innerText = formatCoordinates(this.#selection.lat, this.#selection.lng);
            this.#tempElem.innerText = formatTemperature(this.#selection.temp);
            this.#condElem.innerText = this.#selection.desc;
            this.#target.classList.remove("weather-card--hidden");
            this.#noteInput.value = "";
            this.#noteInput.focus();
        } else {
            this.#target.classList.add("weather-card--hidden");
        }
    }

    onAddToList(callback) {
        if (callback !== undefined) {
            this.#onAddToListCallback = callback;
        }
    }
}

export default function createWeatherCard(target) {
    return new WeatherCard(target);
}