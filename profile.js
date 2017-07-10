const https = require("https");
const http = require("http");

function printMessage(username, badgeCount, points) {
    const percentage = (points.JavaScript * 100 / points.total).toFixed(2);
    const message = `${username} has ${badgeCount} total badge(s) and ${points.JavaScript} points in JavaScript (${percentage}% of total points).`;
    console.log(message);
}

// Retrieve and print stats for a username at treehouse
function get(username) {
    try {
        // Connect to the API URL (https://teamtreehouse.com/<user>.json)
        const request = https.get(`https://teamtreehouse.com/${username}.json`, (response) => {
            if (response.statusCode === 200) {
                let body = "";
                response.on("data", (data) => {
                    body += data.toString();
                });

                response.on("end", () => {
                    try {
                        const profile = JSON.parse(body);
                        printMessage(username, profile.badges.length, profile.points);
                    } catch (e) {
                        console.error(e.message);
                    }
                });
            } else {
                const message = `There was an error getting the profile for ${username}: ${ http.STATUS_CODES[response.statusCode]}`;
                console.error(message);
            }
        });
        request.on("error", (e) => console.error(`Request error: ${e.message}`));
    } catch (e) {
        console.error(e.message);
    }
}

exports.get = get;
