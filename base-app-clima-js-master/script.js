// API KEY --> 79abadfb0f3900de55bd6366878ae548
// URL     --> https://home.openweathermap.org/api_keys
// user : jorgeduarte pass: Jd_010503
// https://api.openweathermap.org/data/2.5/onecall?q=${city}&appid=${KEY}
// https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&appid=79abadfb0f3900de55bd6366878ae548
// Para transformar Kevin a Celsius se debe restar 273.15

let api_key = '79abadfb0f3900de55bd6366878ae548'
let difKelvin = 273.15

//fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&appid=${api_key}`)
//.then(response => response.json())
//.then(response => console.log(response))

// http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}



// Agregamos el evento click al boton
document.getElementById('botonBusqueda').addEventListener('click', () => {
    const ciudad = document.getElementById('ciudadEntrada').value
    if (ciudad) {
        fetchDatosClima(ciudad)
    }
})

function fetchDatosClima(ciudad){
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${ciudad}&limit=5&appid=${api_key}`)
    .then(response => response.json())
    .then(response => muestraCiudad(response))
}



function muestraCiudad(datosgeociudad){
/* [
    {"name":"Rancagua","local_names":{"es":"Rancagua","ru":"Ранкагуа"},"lat":-34.170249,"lon":-70.7407427,"country":"CL","state":"O'Higgins Region"},
    {"name":"Rancagua","lat":-25.1939569,"lon":-66.1866686,"country":"AR","state":"Salta"},
    {"name":"Rancagua","lat":-34.0299629,"lon":-60.5045833,"country":"AR","state":"Buenos Aires"}]
*/
    let latitud = datosgeociudad[0].lat 
    let longitud = datosgeociudad[0].lon 
        
    fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitud}&lon=${longitud}&appid=${api_key}`)
    .then(respuesta => respuesta.json())
    .then(respuesta => mostrarDatosClima(respuesta, datosgeociudad))
}

function mostrarDatosClima(response, datosgeociudad){

 /*   response            

    {
        "lat":33.44,
        "lon":-94.04,
        "timezone":"America/Chicago",
        "timezone_offset":-18000,
        "current":{
           "dt":1684929490,
           "sunrise":1684926645,
           "sunset":1684977332,
           "temp":292.55,
           "feels_like":292.87,
           "pressure":1014,
           "humidity":89,
           "dew_point":290.69,
           "uvi":0.16,
           "clouds":53,
           "visibility":10000,
           "wind_speed":3.13,
           "wind_deg":93,
           "wind_gust":6.71,
           "weather":[
              {
                 "id":803,
                 "main":"Clouds",
                 "description":"broken clouds",
                 "icon":"04d"
              }
           ]
        },
        "minutely":[
           {
              "dt":1684929540,
              "precipitation":0
           },
           ...
        ],
        "hourly":[
           {
              "dt":1684926000,
              "temp":292.01,
              "feels_like":292.33,
              "pressure":1014,
              "humidity":91,
              "dew_point":290.51,
              "uvi":0,
              "clouds":54,
              "visibility":10000,
              "wind_speed":2.58,
              "wind_deg":86,
              "wind_gust":5.88,
              "weather":[
                 {
                    "id":803,
                    "main":"Clouds",
                    "description":"broken clouds",
                    "icon":"04n"
                 }
              ],
              "pop":0.15
           },
           ...
        ],
        "daily":[
           {
              "dt":1684951200,
              "sunrise":1684926645,
              "sunset":1684977332,
              "moonrise":1684941060,
              "moonset":1684905480,
              "moon_phase":0.16,
              "summary":"Expect a day of partly cloudy with rain",
              "temp":{
                 "day":299.03,
                 "min":290.69,
                 "max":300.35,
                 "night":291.45,
                 "eve":297.51,
                 "morn":292.55
              },
              "feels_like":{
                 "day":299.21,
                 "night":291.37,
                 "eve":297.86,
                 "morn":292.87
              },
              "pressure":1016,
              "humidity":59,
              "dew_point":290.48,
              "wind_speed":3.98,
              "wind_deg":76,
              "wind_gust":8.92,
              "weather":[
                 {
                    "id":500,
                    "main":"Rain",
                    "description":"light rain",
                    "icon":"10d"
                 }
              ],
              "clouds":92,
              "pop":0.47,
              "rain":0.15,
              "uvi":9.23
           },
           ...
        ],
         "alerts": [
         {
           "sender_name": "NWS Philadelphia - Mount Holly (New Jersey, Delaware, Southeastern Pennsylvania)",
           "event": "Small Craft Advisory",
           "start": 1684952747,
           "end": 1684988747,
           "description": "...SMALL CRAFT ADVISORY REMAINS IN EFFECT FROM 5 PM THIS\nAFTERNOON TO 3 AM EST FRIDAY...\n* WHAT...North winds 15 to 20 kt with gusts up to 25 kt and seas\n3 to 5 ft expected.\n* WHERE...Coastal waters from Little Egg Inlet to Great Egg\nInlet NJ out 20 nm, Coastal waters from Great Egg Inlet to\nCape May NJ out 20 nm and Coastal waters from Manasquan Inlet\nto Little Egg Inlet NJ out 20 nm.\n* WHEN...From 5 PM this afternoon to 3 AM EST Friday.\n* IMPACTS...Conditions will be hazardous to small craft.",
           "tags": [
     
           ]
         },
         ...
       ]
*/                     
     
                   
    // seleccinamos el div completo
    const divDatosClima = document.getElementById('datosClima')

    // dejamos vacio el div
    divDatosClima.innerHTML = ''

    const ciudadNombre = datosgeociudad[0].name
    const paisSigla = datosgeociudad[0].country
    const temperatura = response.current.temp 
    const descripcion = response.current.weather[0].description
    const humedad = response.current.humidity
    const icono = response.current.weather[0].icon

    // Para recuperar icono --> https://openweathermap.org/img/wn/10d@2x.png
    // Creamos elementos que serán incluidos en el div
    const ciudadTitulo = document.createElement('h2')
    ciudadTitulo.textContent = `${ciudadNombre}, ${paisSigla}`

    const temperaturaInfo = document.createElement('p')
    temperaturaInfo.textContent = `La temperatura es ${Math.floor(temperatura -  difKelvin)} °C` 

    const humedadaInfo = document.createElement('p')
    humedadaInfo.textContent = `La húmedadas es ${humedad} %` 

    const descripcionInfo = document.createElement('p')
    descripcionInfo.textContent = `La Descripción Meteorológica es : ${descripcion}`

    const iconInfo = document.createElement('img')
    iconInfo.src = `https://openweathermap.org/img/wn/${icono}@2x.png`

    // Agregamos los elementos creados al div
    divDatosClima.appendChild(ciudadTitulo)
    divDatosClima.appendChild(temperaturaInfo)
    divDatosClima.appendChild(humedadaInfo)
    divDatosClima.appendChild(descripcionInfo)
    divDatosClima.appendChild(iconInfo)
}