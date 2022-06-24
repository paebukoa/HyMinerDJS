module.exports = {
	name: ['help', 'h', 'cmds', 'commands'],
	display: false,
	code: async d => {
		let [cmd] = d.args

		if (cmd == undefined || cmd === '') {
			let displayCommands = d.commands.filter(command => command.display === true).map(command => `\`${d.configDb.get('prefix', `_${d.guild.id}`)}${typeof command.name === 'string' ? command.name : command.name[0]}\` - ${command.shortDescription}`)
	
			d.channel.send({
				embeds: [{
					title: 'Help',
					description: `Hello! I'm HyMiner, a Minecraft based game bot.
In HyMiner you can explore dungeons and caves, have your own house, craft better tools, farm plantable items, have your own animals found in explorations, travel between worlds and more!
Below you can see a list of available commands:

${displayCommands.join('\n\n')}`,
					color: d.constants.colors.light_blue
				}]
			})	
		} else d.utils.sendUsage(d, cmd)
	}
}