const passport = require("passport");
// lo scopo della libreria è gestire l'autenticazione e mantenere l'identità dell'utente.
// Permette di autenticarsi tramite account Google.
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// Registrazione della strategia Google in Passport
passport.use(
    new GoogleStrategy(
        { // dati ottenuti dal file .env
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3001/google/callback",
        },
        // Google restituisce i dati dell'utente autenticato.
        async (accessToken, refreshToken, profile, done) => {
            // try {
            const user = {
                googleId: profile.id,
                displayName: profile.displayName,
                firstName:
                    profile.name?.givenName ||
                    profile.displayName?.split(" ")[0] ||
                    "Utente",
                email: profile.emails?.[0]?.value,
            };
            // comunica a Passport che l'autenticazione è andata a buon fine e restituisce l'utente
            return done(null, user);
            // } catch (err) {
            //     return done(err, null);
            // }
        }
    )
);

// quando l'utente si autentica express-session di express genera una sessione,
// con il metodo serialize gli caccio dentro le info di user sopra
passport.serializeUser((user, done) => {
    done(null, user);
});

// deserializeUser() è il metodo che, partendo dall'id salvato nella sessione con serializeUser(), ricostruisce l'oggetto utente
passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;