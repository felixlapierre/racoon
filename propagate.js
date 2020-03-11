var country = {
    "population": 110,
    "spread": 1,
    "healthcare": 1,
    "infectedToday": 100,
    "infectedTomorrow": 100,
    "dead": 0,
    "cured":0
};

function propagate(country){
    var today = country.infectedToday;
    var uninfected = country.population - country.infectedToday;

    var newInfected =  0.2*today*country.spread;

    var remainingUninfected = country.population - country.cured- country.dead - today;

    if (remainingUninfected <= newInfected) newInfected = remainingUninfected;

    console.log(newInfected);

    coutnry.infectedToday += parseInt(newInfected, 10);
}

propagate(country);

module.exports = propagate;