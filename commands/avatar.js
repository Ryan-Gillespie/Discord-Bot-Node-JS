module.exports = {
	// This command gets a given user's profile picture and sends a link to it to the channel the command was used in.
	// It also works for multiple users at once.

	name: 'avatar',
	description: 'Get the avatar URL of the tagged user(s), or your own avatar. Note: you need to mention them using @(username)',
	aliases: ['icon', 'pfp'],
	usage: '@[Username1] @[Username2] etc.',
	args: true,
	execute(message) {
		// make sure the args contain a mention to someone
		if (!message.mentions.users.size) {
			return message.channel.send(`Your avatar: <${message.author.displayAvatarURL}>`);
		}

		// Get the avatars of everyone mentioned
		const avatarList = message.mentions.users.map(user => {
			return `${user.username}'s avatar: <${user.displayAvatarURL}>`;
		});

		// send the message
		message.channel.send(avatarList);
	}
};