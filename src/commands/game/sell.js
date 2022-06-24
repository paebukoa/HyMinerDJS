module.exports = {
	name: 'sell',
	shortDescription: `Sells items in your inventory.`,
	longDescription: `Sells items in your inventory.
For selling everything, you can also use \`ev\`, \`evy\` or \`all\` (without providing item ID).
All items are selled by their price in shop.`,
	usage: 'sell <amount/all/everything> <itemID>',
	display: true,
	code: async d => {
		let [type, ...itemId] = d.args
		if (type == undefined) return d.utils.sendUsage(d, 'sell')
		
		if (itemId[0] === undefined) itemId = ['']
		itemId = itemId.join('_')

		let inventory = d.gameDb.get('inventory', `_${d.author.id}`)
		let money = d.gameDb.get('money', `_${d.author.id}`)

		if (['everything', 'ev', 'evy'].includes(type.toLowerCase()) || (type.toLowerCase() === 'all' && [undefined, ''].includes(itemId))) {
			let newValue = sellEvy()
			money += newValue
			inventory = []
		} else {
			if ((isNaN(type) || Number(type) < 1) && type !== 'all') return d.channel.send({
				embeds: [{
					title: 'Error',
					description: `Invalid amount in \`${type}\`

Amount must be a number above 0 and below item amount or just \`all\`.`,
					color: d.constants.colors.red
				}]
			})

			if (itemId == undefined || itemId == '') return d.utils.sendUsage(d, 'sell')
			
			let item = d.data.get(`hyminer_items:${itemId}`)
			if (!item) return d.channel.send({
				embeds: [{
					title: 'Error',
					description: `Invalid item ID: \`${itemId}\`

You can check all items IDs clicking here.`,
					color: d.constants.colors.red
				}]
			})


			let invItem = inventory.find(invItem => invItem.id === item.id)
			let itemAmount = invItem.amount
			if (!invItem) return d.channel.send({
				embeds: [{
					title: 'Error',
					description: `You don't have \`${item.name}\` in your inventory.

Make sure you typed the correct item ID.`,
					color: d.constants.colors.red
				}]
			})

			if (type === 'all') {
				inventory = inventory.filter(invItem => invItem.id !== item.id)
				money += invItem.amount * item.price
			} else {
				if (Number(type) > invItem.amount) return d.channel.send({
					embeds: [{
						title: 'Error',
						description: `Invalid amount in \`${type}\`

Amount must be a number above 0 and below item amount or just \`all\`.`,
						color: d.constants.colors.red
					}]
			})
				
				inventory = inventory.map(x => {
					if (x.id === item.id) {
						x.amount -= Number(type)
					}
					if (x.amount <= 0) return undefined;
					return x
				})
				inventory = inventory.filter(x => x !== undefined)
				money += Number(type) * item.price
			}

			d.channel.send({
				embeds: [{
					title: 'Sell',
					description: `You sold ${item.icon} ${type === 'all' ? d.utils.abbreviateNumber(invItem.amount) : type} **${item.name}** for ${d.data.get('hyminer_icons:money').icon} ${type === 'all' ? d.utils.abbreviateNumber(invItem.amount * item.price) : d.utils.abbreviateNumber(Number(type) * item.price)} **${d.data.get('hyminer_icons:money').name}** ${itemAmount === Number(type) ? `\n\nTip: you can use \`${d.configDb.get('prefix', `_${d.guild.id}`)}sell all <itemID>\` to sell all amount of an item!` : ''}`,
					color: d.constants.colors.yellow
				}]
			})
		}

		d.gameDb.set('inventory', inventory, `_${d.author.id}`)
		d.gameDb.set('money', money, `_${d.author.id}`)

		function sellEvy() {
			let value = 0
			let display = []
			for (let invItem of inventory) {
				let item = d.data.get(invItem.id)
				if (!item) return d.channel.send({
					embeds: [{
						title: 'Error',
						description: `There are something wrong with your inventory!
The item with ID \`${invItem.id}\` doesn't exists!

You can join in our official support server using \`${d.configDb.get('prefix', `_${d.guild.id}`)}support\`.`,
						color: d.constants.colors.red
					}]
				})
				value += invItem.amount * item.price

				display.push(`${item.icon} ${d.utils.abbreviateNumber(invItem.amount)} **${item.name}** - ${d.data.get('hyminer_icons:money').icon} **${d.utils.abbreviateNumber(invItem.amount * item.price)}**`)
			}

			if (value <= 0) return d.channel.send({
				embeds: [{
					title: 'Error',
					description: `Your inventory is empty!`,
					color: d.constants.colors.red
				}]
			})

			d.channel.send({
				embeds: [{
					title: 'Sell',
					description: `You sold **everything** for ${d.data.get('hyminer_icons:money').icon} ${d.utils.abbreviateNumber(value)} **${d.data.get('hyminer_icons:money').name}**

${display.join('\n')}`,
					color: d.constants.colors.yellow
				}]
			})

			return value
		}
	}
}