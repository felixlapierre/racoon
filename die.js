var country = {
    "population": 150,
    "spread": 0,
    "healthcare": 2,
    "infectedToday": 110,
    "infectedTomorrow": 100
};
function die(country){
    var today = country.infectedToday;

    var dead =  ((0.02*today)/country.healthcare)
    console.log(parseInt(dead,10));

    country.infectedTomorrow -= parseInt(dead, 10);
    country.dead += parseInt(dead, 10);
}

die(country);
module.exports = die;