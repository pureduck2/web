import L from "leaflet";

class Map {
    #target;
    #map;
    #currentMarker;
    #onClickCallback;

    constructor(target) {
        this.#target = target;
        this.#currentMarker = null;
        this.#onClickCallback = null;

        this.#map = L.map(this.#target)
            .setMaxBounds([
                [-90, -180],
                [90, 180]
            ])    
            .setMinZoom(2)
            .setView([52.23, 21.01], 5);
        
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.#map);

        this.#map.on("click", async (e) => {
            if (this.#onClickCallback !== null) {
                const { lat, lng } = e.latlng;
                await this.#onClickCallback(lat, lng);
            }
        });
    }

    onClick(callback) {
        if (callback !== null || callback !== undefined) {
            this.#onClickCallback = callback;
        }
    }

    setMarker(lat, lng, text) {
        this.removeMarker();

        this.#currentMarker = L.marker([lat, lng])
            .addTo(this.#map);

        if (text !== undefined) {
            this.#currentMarker = this.#currentMarker
                .bindPopup(text)
                .openPopup();
        }
    }

    removeMarker() {
        if (this.#currentMarker !== null) {
            this.#map.removeLayer(this.#currentMarker);
        }
        this.#currentMarker = null;
    }

    flyTo(lat, lng) {
        this.#map.flyTo([lat, lng], 10);
    }
}

export default function createMap(target) {
    return new Map(target);
}