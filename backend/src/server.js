const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");// non richiede installazione perche presente di default

const app = express();
const port = 3000;

// config body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../../frontend/public")));// devo dichiarare

// get Pagina di Home
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/public/index.html"));
});

// get Pagina di login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/public/login.html"));
});

// get Pagina di about
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/public/about.html"));
});

// get Pagina di signin
app.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/public/signin.html"));
});

// get Pagina di signin
app.get('/weather', (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/public/weather.html"));
});

// Gestione del login (POST)
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Semplice controllo (solo dimostrativo)
    if (username === 'admin' && password === '1234') {
        res.send('Login effettuato!');
    } else {
        res.send(`Credenziali non valide.<br>Username inserito: ${username} <br> Password`);
    }
});

// post Pagina weather
app.post('/weather', async (req, res) => {
    const city = req.body.city;
    console.log(city);

    //res.send(`Hai richiesto il meteo per: ${city}`);
    /*occorre registrarsi sul sito https://openweathermap.org per ottenere una api key
    alla voce apikey, viene nfornito il codice di accesso per l'account, nel mio caso 44*/
    const apiKey = "0ac7779fc99f7d9c48d2cf22a5271088";

    try {
        // Chi const response: Response
                // Chiamata API meteo
        const response = await fetch(
            `https://openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=it`
        );

        const data = await response.json();

        // Se la città non esiste
        if (data.cod !== 200) {
            return res.json({
                error: true,
                message: "Città non trovata"
            });
        }

        // Risposta JSON pulita
        res.json({
            city: data.name,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            temperature: data.main.temp,
            humidity: data.main.humidity,
            wind: data.wind.speed
        });

    } catch (err) {
        console.error(err);
        res.json({
            error: true,
            message: "Errore nel server"
        });
    }
});

app.listen(port, () => {
    console.log(`Server avviato su http://localhost:${port}`);
});
