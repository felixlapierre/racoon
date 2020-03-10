# racoon
Practice for csgames team SOEN

Write a command line application to simulate the effects of a newly discovered disease, the "Racoon Virus", on a set of countries.

## Input

Your application should take the following command line arguments:
* Argument 1: The filename of the JSON file containing countries data
* Argument 2: The filename of the JSON file containing events data
* Argument 3: The number of days to be simulated

The countries JSON file will have the following format:

`{“countries”: Country[] }`

A Country has the following properties
* `“name”`: String. The name of the country
* `“population”`: Number. The population of the country
* `“spread”`: Number. A factor that affects the rate at which disease spreads in the country
* `“healthcare”`: Number. A factor that affects the death rate due to disease in that country
* `“neightbors”`: String[]. An array of strings with the names of all neighboring countries.

The events JSON file will have the following format

`{“events”: Event[]}`

An Event has the following properties
* `“day”`: Number. The day on which the event occurs
* `“country”`: String. The name of the country in which the event occurs.
* `“type”`: String. The type of event that occurs. 

## Output

(2 point) Your program should output the final state of the simulation in a JSON file. There should be a single property “countries” containing an array of objects with these properties:
* `“name”`: String. The name of the country
* `“uninfected”`: Number. The population of the country that has not yet been infected
* `“infected”`: Number. The population of the country that is currently infected
* `“dead”`: Number. The quantity of people that died of the infection
* `“safe”`: Number. The quantity of people that recovered of the infection without dying.

(2 point) Your program should then output to the standard output the following data
* The country with the highest death count
* The country with the highest total infected rate (% infected + dead + safe)
* The country with the highest uninfected rate (% uninfected)

(1 bonus point) Your program should output a csv file with the total infected (infected + dead + safe) for each country every 5 days. Your file should have 1 column per country, and 1 row per 5-day data point.
## Behaviour
The simulation takes place in a number of days. On each day, perform the following operatons on each country
* Death: 2% of all infected die. Divide this quantity by the “healthcare” value for the country, then round down to the nearest whole number.
* Propagation: 20% of infected people spread the disease to uninfected people in their country. Multiply this by the “spread” value for the country, then round down to the nearest whole number.
* Travel: 1% of infected people spread the disease to uninfected people in another country. Multiply this by the “spread” value for both countries, then round down to the nearest whole number.
* Curing: 5% of infected people become cured every day. Multiply this quantity by the “healthcare” value for the country, then round down.

Note that a country’s propagation for day X should not take into account new infected created through travel from other countries on day X.

Afterwards, resolve any events that have happened that day. Possible events are as follows:
* `infection`: Ten people become infected in the indicated country.
* `close_borders`: The country can no longer gain infected through travel from other countries, and it may no longer infect other countries through travel.
* `outbreak`: The country’s infected count doubles on that day.

