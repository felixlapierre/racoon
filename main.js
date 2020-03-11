// Read command line arguments
const countriesFileName = process.argv[2];
const eventsFileName = process.argv[3];
const numberOfDays = process.argv[4];

const countries = require(__dirname + "/" + countriesFileName).countries;
const events = require(__dirname + "/" + eventsFileName).events;
const days = Number.parseInt(numberOfDays);

var countryNames = [];

const countriesMap = {};
// Preprocess
countries.forEach((country) => {
    countryNames.push(country.name);
    country.infectedToday = 0;
    country.infectedTomorrow = 0;
    country.dead = 0;
    country.cured = 0;
    country.borders_closed = false;
    countriesMap[country.name] = country;
})

events.sort((event1, event2) => {
    return event1.day - event2.day
})

// Simulation time
const simulate = require('./simulate.js');

// OOPS THEY WANT A MAP
const countriesAfterMap = simulate(countriesMap, events, days);

const countriesAfter = Object.keys(countriesAfterMap).map((country) => {
    return country;
})

// Make sure the data is ok
var highestDeathCount = 0;
var highestDeathCountName = "";

var highestTotalInfectedRate = 0;
var highestTotalInfectedRateName = "";

var highestUninfectedRate = 0;
var highestUninfectedRateName = "";

const fileOutput = countriesAfter.map((country) => {
    const deathCount = country.dead;
    if(deathCount > highestDeathCount) {
        highestDeathCount = deathCount;
        highestDeathCountName = country.name;
    }

    const totalInfected = country.infectedToday + country.dead + country.cured;
    const totalInfectedRate = totalInfected / country.population;
    if(totalInfectedRate > highestTotalInfectedRate) {
        highestTotalInfectedRate = totalInfectedRate;
        highestTotalInfectedRateName = country.name;
    }

    const uninfected = country.population - totalInfected;
    const uninfectedRate = uninfected / country.population;
    if(uninfectedRate > highestUninfectedRate) {
        highestUninfectedRate = uninfectedRate;
        highestUninfectedRateName = country.name;
    }

    return {
        "name": country.name,
        "uninfected": country.population - (country.infectedToday + country.dead + country.cured),
        "infected": country.infectedToday,
        "dead": country.dead,
        "safe": country.cured
    }
})

// Print results as JSON
const fs = require('fs');
fs.writeFileSync("output.json", JSON.stringify({countries: fileOutput}))

// Print stats to command line output
console.log(`Highest death count: ${highestDeathCountName} at ${highestDeathCount}`);
console.log(`Highest infection rate: ${highestTotalInfectedRateName} at ${highestTotalInfectedRate}`);
console.log(`Highest uninfected rate: ${highestUninfectedRateName} at ${highestUninfectedRate}`);

// Print results as CSV
// Assuming format of each country having an array of data points
const result = {
    "countryland": [1, 3, 10, 20, 41],
    "jefftopia": [4, 10, 20, 30, 50]
}

countryNames = ["countryland", "jefftopia"]

const line1 = ["", ...countryNames];
const lines = [line1]

result[countryNames[0]].forEach(() => {
    lines.push([]);
})

countryNames.forEach((countryName) => {
    result[countryName].forEach((datum, index) => {
        lines[index + 1].push(datum);
    })
})

const linesAsStrings = lines.map((line) => {
    return line.join(";");
})

const csv = linesAsStrings.join('\n');

fs.writeFileSync("output.csv", csv)