
var allCountries={ 
    doughnut :{
        "population": 110,
        "spread": 1,
        "healthcare": 1,
        "infectedToday": 100,
        "infectedTomorrow": 100,
        "neighbors": [
            "hecc",
            "beans"
        ]
    },
    beans: {
        "population": 50,
        "spread": 1,
        "healthcare": 5,
        "infectedToday": 20,
        "infectedTomorrow": 20,
        "neighbors": [
            "hecc",
            "doughnut"
        ]
    },
    
    hecc:  {
        "population": 50,
        "spread": 1,
        "healthcare": 5,
        "infectedToday": 20,
        "infectedTomorrow": 20,
        "neighbors": [
            "beans",
            "doughnut"
        ]
    }
};

function travel(country, allCountries){

    var infectious =  0.01*country.infectedToday*country.spread;

    country.neighbors.forEach(neighbor => {
        infectNeighbor(allCountries[neighbor], infectious);
    });

    return ;
}


function infectNeighbor(country, infectorFactor){
    if(!country.bordersClosed)
    {
        var remainingUninfected = country.population - country.cured- country.dead - country.infectedToday;

        var newInfected = parseInt(infectorFactor*country.spread);

        if (remainingUninfected <= newInfected) newInfected = remainingUninfected;

        country.infectedTomorrow-=newInfected;
    }

}
travel(allCountries.doughnut, allCountries);

module.exports = travel;