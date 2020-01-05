const randomPuppy = require('random-puppy');

module.exports = {
	// Uses the random-puppy package from npm to get a random image from a given subreddit.
	// Gets one from a random subreddit if no arguments given.
	// If a subreddit is given you can specify the number of images to pull from that subreddit too.

	name: 'reddit',
	description: 'Gets a meme from a random subreddit. Gives you a picture of a doggo if you dont enter a real subreddit or it cant find an image',
	usage: '[optional subreddit name] [optional number of posts]',
	aliases: ['meme'],
	execute(message, args) {
		// initialize array of subreddits to pull randomly from
		let reddit = [
			'me_irl',
			'memes',
		]

		// get a random subreddit from the reddit array
		let subreddit = reddit[Math.floor(Math.random() * reddit.length)];
		
		// if a subreddit is specified, set subreddit to the first argument
		if (args[0]) subreddit = args[0];

		// looping logic if we want to browse several memes
		let iterations = 1;
		if (args[1]) iterations = args[1];

		// lets the user know that it's working on this request as this package is a little slow
		message.channel.startTyping();
		
		// loop through the given number of iterations and then send the image to the channel
		for (var i=0; i < iterations; i++) {
			// get the image and then send it to the channel in that order
			randomPuppy(subreddit).then(url => {
				message.channel.send({
					file: url
				}).then(() => message.channel.stopTyping());
			}).catch(err => console.error(err));
		}
	},
};