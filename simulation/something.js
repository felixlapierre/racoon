countries = {
	hello: {
		population: 500,
		infected_today: 0,
		infected_tomorrow: 0,
		borders_closed: false
	}
};

events = [
	{
		day: 2,
		country: "hello",
		type: "infection"
	},
	{
		day: 2,
		country: "hello",
		type: "close_borders"
	}
];

module.exports = {
	countries: countries,
	events: events
}