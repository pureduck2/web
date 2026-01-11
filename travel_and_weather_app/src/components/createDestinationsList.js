import formatCoordinates from "../utils/formatCoordinates";
import formatTemperature from "../utils/formatTemperature";

class DestinationsList {
    #target;
    #listElem;

    #onDestinationClickCallback;

    constructor(target) {
        this.#target = target;
        this.#listElem = this.#target.querySelector(".destinations__list");
        this.#onDestinationClickCallback = null;

        this.update([]);
    }

    onDestinationClick(callback) {
        if (callback !== undefined) {
            this.#onDestinationClickCallback = callback;
        }
    }

    update(destinations) {
        this.#listElem.innerHTML = "";

        if (destinations.length === 0) {
            this.#listElem.innerHTML = '<li class="destinations__empty-msg">Kliknij na mapę, aby dodać cel.</li>';
            return;
        }

        destinations.forEach((dest, i) => {
            const item = document.createElement("li");
            item.classList.add("destinations__item");

            const itemNote = document.createElement("span");
            itemNote.classList.add("destinations__item-note");
            itemNote.innerText = dest.note;

            item.innerHTML = `
                <span class="destinations__item-note">${dest.note}</span>
                <span class="destinations__item-meta">Pogoda: ${dest.desc}, ${formatTemperature(dest.temp)}</span>
                <span class="destinations__item-coords">(${formatCoordinates(dest.lat, dest.lng)})</span>
            `;

            item.addEventListener("click", () => {
                this.#onDestinationClickCallback(dest, i);
            });

            this.#listElem.append(item);
        })
    }
}

export default function createDestinationsList(target) {
    return new DestinationsList(target);
}