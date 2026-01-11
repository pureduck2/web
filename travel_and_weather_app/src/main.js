import createMap from "./components/createMap";
import { getWeather } from "./modules/api";
import "./style.css";
import "leaflet/dist/leaflet.css";
import getWeatherDescription from "./utils/getWeatherDescription";
import createWeatherCard from "./components/createWeatherCard";
import createDestinationsList from "./components/createDestinationsList";

async function main() {
    const destinations = [];
    const map = createMap(document.querySelector(".map"));
    const weatherCard = createWeatherCard(document.querySelector(".weather-card"));
    const destinationsList = createDestinationsList(document.querySelector(".destinations"));

    map.onClick(async (lat, lng) => {
        const weather = await getWeather(lat, lng);

        if (weather) {
            weatherCard.selection = {
                lat,
                lng,
                temp: weather.temperature,
                code: weather.weathercode,
                desc: getWeatherDescription(weather.weathercode)
            };

            map.setMarker(lat, lng, "Nowy cel?");
        }
    });

    weatherCard.onAddToList((selection, note) => {
        destinations.push({
            ...selection,
            note
        });
        destinationsList.update(destinations);

        weatherCard.selection = null;
        map.removeMarker();
    });

    destinationsList.onDestinationClick((dest, i) => {
        weatherCard.selection = null;

        const { lat, lng } = dest;
        map.flyTo(lat, lng);
        map.setMarker(lat, lng, dest.note);
    });
}

(async function () {
    await main();
})();
