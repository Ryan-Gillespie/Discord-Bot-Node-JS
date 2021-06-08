module.exports = {
	// This command gets data from a given API and displays the output to the user

	name: 'api',
	description: 'sends a GET request to any api',
	usage: '[url]',
	cooldown: 5,
	async execute(message, args) {
		const fetch = require('node-fetch');
		const querystring = require('querystring');

		// make sure we were given arguments
		if (!args.length) {
			return message.channel.send('You need to supply an api');
		}

		// make the get request
		const response = await fetch(args[0])
			.then(response => response.json());

		// send the user a stringified version of the response
		const _msg = JSON.stringify(response, null, 2);
		message.channel.send('```json\n' + _msg + '\n```');
	},
};