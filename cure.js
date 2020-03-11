var country = {
    "population": 110,
    "spread": 1,
    "healthcare": 1,
    "infectedToday": 100,
    "infectedTomorrow": 100,
    "dead": 0,
    "cured":0
};

function cure(country){
    var today = country.infectedToday;

    var cured =  0.05*today*country.healthcare;

    console.log(cured);
    
    country.cured += parseInt(cured, 10);
    country.infectedTomorrow -= parseInt(cured, 10);
    return;
}

cure(country);

module.exports = cure;