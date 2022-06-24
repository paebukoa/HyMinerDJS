module.exports = {
	name: 'start',
	shortDescription: 'Starts a new adventure!',
	longDescription: `Starts a new adventure!
Once you use that command, you get introduced to HyMiner and it's basic commands.
You can use that command only one time.`,
	usage: 'start',
	display: true,
	code: async d => {
		if (d.gameDb.get('started', `_${d.author.id}`)) return d.channel.send({
			embeds: [{
				title: 'Error',
				description: "You already started!",
				color: d.constants.colors.red
			}]
		})
		d.gameDb.set('started', true, `_${d.author.id}`)

		let tools = {
			pickaxe: d.data.get("hyminer_tools:wooden_pickaxe")
		}
		let prefix = d.configDb.get('prefix', `_${d.guild.id}`)
		
		d.channel.send({
			embeds: [{
				title: 'Started!',
				description: `Hello, newcomer! You have just started a new adventure! Here are your initials tools:

${tools.pickaxe.icon} **${tools.pickaxe.name}**

To obtain better tools, you should buy them in shop with money!
You can sell items obtained in explorations to get money!
For now, you can use these commands:

\`${prefix}mine\`, \`${prefix}chop\`, \`${prefix}fight\` and \`${prefix}dig\`.

To check what you have in your backpack you can use \`${prefix}inventory\`!
`,
				color: d.constants.colors.green
			}]
		})
	}
}