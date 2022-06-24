module.exports = {
	name: ['inventory', 'i', 'inv'],
	shortDescription: 'Shows your tools, items, money, etc...',
	longDescription: `Shows info about your statistics in HyMiner.
It shows your tools, armor, money, bedrock nuggets and items.`,
	usage: 'inventory',
	display: true,
	code: async d => {
		let inventory = d.gameDb.get('inventory', `_${d.author.id}`)
		let money = d.utils.abbreviateNumber(d.gameDb.get('money', `_${d.author.id}`))
		let bedrockNuggets = d.utils.abbreviateNumber(d.gameDb.get('bedrockNuggets', `_${d.author.id}`))
		let itemsDisplay = inventory.map(item => {
			let itemData = d.data.get(item.id)

			return `${itemData.icon} ${d.utils.abbreviateNumber(item.amount)} **${itemData.name}**`
		})
		if (itemsDisplay[0] === undefined) itemsDisplay = ["Nothing!"]
		
		d.channel.send({
			embeds: [{
				title: 'Inventory',
				description: `${d.data.get('hyminer_items:chest').icon} **${d.author.username}'s** inventory

${d.data.get('hyminer_icons:money').icon} ${money} **${d.data.get('hyminer_icons:money').name}**
${d.data.get('hyminer_icons:bedrock_nuggets').icon} ${bedrockNuggets} **${d.data.get('hyminer_icons:bedrock_nuggets').name}**

**Items**

${itemsDisplay.join('\n')}
`,
				thumbnail: {
					url: d.author.avatarURL({
						size: 4096,
						dynamic: true
					})
				},
				color: d.constants.colors.blue
			}]
		})
	}
}