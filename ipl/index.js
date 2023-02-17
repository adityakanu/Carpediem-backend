const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
// const PORT = 5000;
// const isDev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/register-ipl.html");
});

app.post("/", function (req, res) {
    const userName = req.body.iplUName;
    const userMail = req.body.iplUEmail;

    const data = {
        members: [
            {
                email_address: userMail,
                status: "subscribed",
                merge_fields: {
                    FNAME: userName,
                },
            },
        ],
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us5.api.mailchimp.com/3.0/lists/5c4763d9d1";

    const options = {
        method: "POST",
        auth: "aditya:f53a5c68faa0830aa2a5e89ae58b32e8-us5",
    };

    const request = https.request(url, options, function (response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success-ipl.html");
        }

        response.on("data", function (data) {
            console.log(JSON.parse(data));
        });
    });
    request.write(jsonData);
    request.end();
});

app.listen(port, () =>
    console.log(`Server running on ${port}, http://localhost:${port}`)
);
// app.listen(app.get("port"), () => {
//     console.log("Express server listening on port " + app.get("port"));
// });
// app.listen(PORT, function () {
//     console.error(
//         `Node ${
//             isDev ? "dev server" : "cluster worker " + process.pid
//         }: listening on port ${PORT}`
//     );
// });
// app.listen(PORT, function () {
//     console.log("Server is Online");
// });
//Api Key
// f53a5c68faa0830aa2a5e89ae58b32e8-us5

// list id
// 5c4763d9d1
