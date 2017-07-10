// Problem: Need a simple way to look at user's badge count & JS points on Treehouse
// Solution: Use Node.js to connect to Treehouse's API to get and print profile info
const https = require('https');

// Function to print message to console
function printMessage(username, badgeCount, points) {
    const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;
    console.log(message);
}

// Retrive and print stats for a username at treehouse
function getProfile(username) {
    // Connect to the API URL (https://teamtreehouse.com/<user>.json)
    const response = https.get(`https://wteamtreehouse.com/${username}.json`, (response) => {
        let body = "";
        response.on('data', data => {
            // Read data
            body += data.toString();
        });

        response.on('end', () => {
            // Parse data
            const profile = JSON.parse(body);
            // Print data
            printMessage(username, profile.badges.length, profile.points.JavaScript);
        });
    });
    reponse.on('error', e => console.error(e));
}

const users = process.argv.slice(2);
users.forEach(getProfile);
