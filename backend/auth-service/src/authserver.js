const express = require("express"); // riga 1 (parzialmente coperta dal tooltip)

const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = 3001;

app.use(express.json());

app.use("/", authRoutes);

app.listen(PORT, () => {
    console.log(`Auth Service avviato sulla porta ${PORT}`);
});