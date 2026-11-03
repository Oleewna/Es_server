const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get("/login", (req, res) => {
    const incomingHost = (req.headers["x-forwarded-host"] || req.headers.host || "").toString();
    const gatewayHost = ["localhost:4000", "127.0.0.1:4000"];
    const targetPath = gatewayHost.some((host) => incomingHost.includes(host)) ? "/api/v1/auth/google" : "/google";
    res.redirect(targetPath);
});

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/login",
    }),
    (req, res) => {
        console.log(req.user);

        const userName = req.user?.displayName
            || req.user?.name
            || req.user?.emails?.[0]?.value?.split("@")[0]
            || "User";

        const frontendUrl = `http://localhost:4000/api/v1?welcome=${encodeURIComponent(userName.trim())}`;
        return res.redirect(frontendUrl);
    }
);

module.exports = router;