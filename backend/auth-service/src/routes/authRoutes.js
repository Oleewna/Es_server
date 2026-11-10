const express = require("express");
const passport = require("../../config/passport");
const env = require("../../config/env");
const router = express.Router();

// lo scopo è: login fallisce --> restituzione alla home con navbar non modificata
// login va a buon fine restituzione alla home con navbar aggiornata

router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
}));

router.get("/google/callback",
    passport.authenticate("google", {
        failureRedirect: env.FRONTEND_URL,
        session: true,
    }),
    (req, res) => {
        res.redirect(env.FRONTEND_URL);
    }
);

// Usata dalla navbar: restituisce solo ciò che serve all'interfaccia
router.get("/me", (req, res) => {

    /*if (!req.user) {
        return res.json({
            authenticated: false
        });
    }*/

    // risposta dipendente dalla sessione: mai in cache
    res.set("Cache-Control", "no-store");

    if (!req.isAuthenticated()) { //json non autenticato
        return res.json({ authenticated: false });
    }

    res.json({ //json autenticato
        authenticated: true,
        //firstName: req.user.displayName.split(" ")[0] //restituzione di bool e nome
        firstName: req.user.firstName,
    });

});

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);

        req.session.destroy(() => {
            res.clearCookie("connect.sid");
            res.redirect(env.FRONTEND_URL);
        });
    });
});

module.exports = router;