export const config = {
    currentWeatherUrl: (lat, lon) => `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${process.env.OWM}&units=imperial`,
    weatherTileUrl: (x, y, z, layer) => `https://tile.openweathermap.org/map/${layer}/${z}/${x}/${y}.png?appid=${process.env.OWM}`,
    googleApiKey: process.env.GA
}