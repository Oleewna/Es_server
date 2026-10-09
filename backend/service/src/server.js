//Il suo unico compito quando il sistema è strutturato bene è: importare le librerie, registrare le routes e avviare il server

const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");//non richiede installazione perche presente di default

// importazione delle routes
const pagesRoutes = require("./routes/pageroutes");//gestita come libreria per le routes dei get
const authRoutes = require("./routes/auth");//gestita come libreria per le routes dei post del login
const weatherRoutes = require("./routes/weather");

const app = express();
const port = 3000;

// config body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../../../frontend/public")));//devo dichiarare dove stanno i file statici

//gestione delle routes
app.use("/", pagesRoutes);
app.use("/", authRoutes);
app.use("/", weatherRoutes);

app.listen(port, () => {
    console.log(`Server avviato su http://localhost:${port}`);
});


/*
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
    alla voce apikey, viene nfornito il codice di accesso per l'account, nel mio caso 44* /
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
*/