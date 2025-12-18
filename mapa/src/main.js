import "./style.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

async function getUsers() {
  const url = "https://jsonplaceholder.typicode.com/users";
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return await response.json();
}

let map = L.map("map")
  .setMaxBounds([
    [-90, -180],
    [90, 189]
  ])
  .setMinZoom(2)
  .setView([0, -0], 2);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function main(users) {
  users.forEach(user => {
    const userGeo = user.address.geo;
    console.log(userGeo);

    const popupText = `${user.name}, ${user.address.city}`;
    L.marker([userGeo.lat, userGeo.lng], { alt: popupText })
      .addTo(map)
      .bindPopup(popupText);
  });
}

getUsers()
  .then(main);