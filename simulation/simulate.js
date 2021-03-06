behavior = require('./behavior.js');

function apply_event_to_country(event, country) {
	if (event.type === "infection") {
		country.infected_today += 10;
	} else if (event.type == 'close_borders') {
		country.borders_closed = true;
	} else {
		country.infected_today *= 2;
	}

	country.infected_today = Math.min(country.infected_today, country.population)
}

function check_for_events(day, events, countries) {
	for (event of events) {
		if (event.day == day) {
			for (country in countries) {
				apply_event_to_country(event, countries[country]);
			}
		}
	}
}

function correct_data(countries) {
	for (country in countries) {
		countries[country].infected_today = countries[country].infected_tomorrow;
	}
}

function simulate(days, countries, events) {
	for (let i = 1; i <= days; i++) {
		check_for_events(i, events, countries);

		for (country in countries) {
			countries[country].infected_tomorrow = countries[country].infected_today
			behavior.simulate_death(countries[country]);
			behavior.simulate_propagation(countries[country]);
			behavior.simulate_travel(countries[country], countries);
			behavior.simulate_curing(countries[country]);
		}
		// behavior.simulate_death(countries);
		// behavior.simulate_propagation(countries);
		// behavior.simulate_travel(countries);
		// behavior.simulate_curing(countries);
		correct_data(countries);
	}

	return countries;
}

module.exports.simulate = simulate;