const express = require("express")
const path = require("path");
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');

app.use(session({ secret: 'expresspasskey' }))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get("/", function (req, res) {
    if (!req.session.guess) {
        req.session.guess = 0;
    }
    if (!req.session.number) {
        req.session.number = Math.floor(Math.random() * (100) + 1);
    }
    console.log(req.session.number)
    context = {
        "guess": req.session.guess,
        "number": req.session.number,
    }
    res.render('index', context);
});

app.post("/submit", function (req, res) {
    req.session.guess = req.body.guess;
    res.redirect('/');
});

app.get('/restart', function (req, res) {
    req.session.destroy();
    res.redirect('/');
});

app.listen(8000, function () {
    console.log("listening on port 8000");
});