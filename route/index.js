const express = require('express');
const router = express();
// let alert = require('alert');  

router.get("/login", (req, res) => {
    res.render("login");   
});

router.get("/signup", (req, res) => {
    res.render("signup");  
});

router.get("/games", (req, res) => {
    const name = req.query.name || 'Users'
    res.render('games', {
        name
    });
});

module.exports = router;