function remainingUninfected(country){
    return country.population - country.cured- country.dead - country.infectedToday;
}

module.exports = remainingUninfected;