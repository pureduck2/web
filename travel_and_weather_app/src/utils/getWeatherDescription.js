const CODES = {
    0: "Czyste niebo",
    1: "Głównie bezchmurnie",
    2: "Częściowe zachmurzenie",
    3: "Pochmurno",

    45: "Mgła",
    48: "Mgła osadzająca szadź",

    51: "Lekka mżawka",
    53: "Umiarkowana mżawka",
    55: "Gęsta mżawka",

    56: "Lekka marznąca mżawka",
    57: "Gęsta marznąca mżawka",

    61: "Lekki deszcz",
    63: "Umiarkowany deszcz",
    65: "Silny deszcz",

    66: "Lekki marznący deszcz",
    67: "Silny marznący deszcz",

    71: "Lekkie opady śniegu",
    73: "Umiarkowane opady śniegu",
    75: "Silne opady śniegu",

    77: "Śnieg ziarnisty",

    80: "Lekkie przelotne opady deszczu",
    81: "Umiarkowane przelotne opady deszczu",
    82: "Gwałtowne przelotne opady deszczu",

    85: "Lekkie przelotne opady śniegu",
    86: "Silne przelotne opady śniegu",

    95: "Burza",

    96: "Burza z lekkim gradem",
    99: "Burza z silnym gradem"
};

export default function getWeatherDescription(code) {
    return CODES[code] || "Inne";
}