module.exports = function() {
    return [{
        "name": "countryland",
        "population": 172647,
        "spread": 1.5,
        "healthcare": 0.8,
        "neighbors": [
            "schnitzelia",
            "jefftopia"
        ],
        "infectedToday": 1000,
        "infectedTomorrow": 1000,
        "dead": 50,
        "cured": 60
    },
    {
        "name": "jefftopia",
        "population": 45998,
        "spread": 0.6,
        "healthcare": 1.2,
        "neighbors": [
            "countryland",
            "placeplace"
        ],
        "infectedToday": 2000,
        "infectedTomorrow": 2000,
        "dead": 100,
        "cured": 120
    }]
}