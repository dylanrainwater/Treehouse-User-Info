const https = require('https');

function printMessage(username, badgeCount, points) {
    const percentage = (points.JavaScript * 100 / points.total).toFixed(2);
    const message = `${username} has ${badgeCount} total badge(s) and ${points.JavaScript} points in JavaScript (${percentage}% of total points).`;
    console.log(message);
}

// Retrieve and print stats for a username at treehouse
function getProfile(username) {
    // Connect to the API URL (https://teamtreehouse.com/<user>.json)
    https.get(`https://teamtreehouse.com/${username}.json`, (response) => {
        let body = "";
        response.on('data', data => {
            body += data.toString();
        });

        response.on('end', () => {
            const profile = JSON.parse(body);
            printMessage(username, profile.badges.length, profile.points);
        });
    }).on('error', e => console.error(e));
}

const users = process.argv.slice(2);
users.forEach(getProfile);
