const express = require("express");
const app = express();
const fs = require("fs");
const ejs = require("ejs");
const request = require("request");

app.use(express.json());
app.use(express.urlencoded());

app.get("/core/cgss", (req, res) => {
    res.redirect(301, "starlightstage://");
});

app.get("/core/mltd", (req, res) => {
    res.redirect(301, "theaterdays://");
});

app.post("/core/cgss", (req, res) => {
    fs.readFile(__dirname + "/cgssicon.ejs", "utf8", function(error, data) {
        res.send(
            ejs
                .render(data, {
                    key: req.body.key
                })
                .toString()
        );
    });
});

app.post("/core/mltd", (req, res) => {
    fs.readFile(__dirname + "/mltdicon.ejs", "utf8", function(error, data) {
        res.send(
            ejs
                .render(data, {
                    key: req.body.key
                })
                .toString()
        );
    });
});

app.get("/img/mltd/:imgid", (req, res) => {
    fs.readFile(__dirname + "/img/mltd" + req.params.imgid, function(
        error,
        data
    ) {
        if (error) {
            fs.readFile(__dirname + "/img/mltd/error.png", function(
                error,
                data
            ) {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(data);
            });
            request(
                (url =
                    "https://storage.matsurihi.me/mltd/icon_l/" +
                    req.params.imgid),
                (method = "GET")
            ).pipe(
                fs.createWriteStream(
                    __dirname + "/img/mltd/" + req.params.imgid
                )
            );
        } else {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        }
    });
});

app.use("/", express.static("/home/ubuntu/custom-icon/frontend"));

module.exports = app;
