module.exports = {
	name: ["mine","m"],
	shortDescription: 'Mines with your pickaxe.',
	longDescription: `Mines in caves and get cobblestone and ores.
Cobblestone can be used to craft materials and upgrade houses, machines...
Raw ores can be used in furnace to make their ingot.
Ingots can be used to craft materias and upgrade machines.
Loot is different for each pickaxe and can change depending in which world you are.
`,
	usage: 'mine',
	display: true,
	code: async d => {
		if (!d.gameDb.get('started', `_${d.author.id}`)) return d.utils.sendError(d, 'notStarted')
		
		let inventory = d.gameDb.get("inventory", `_${d.author.id}`)
		let tools = d.gameDb.get("tools", `_${d.author.id}`)

		let lootTable = {
			"hyminer_tools:wooden_pickaxe": [
				{
					id: 'hyminer_items:cobblestone',
					amount: d.utils.random(10, 35),
					attributes: [],
					enchantments: []
				},
			],
			"hyminer_tools:stone_pickaxe": [
				{
					id: 'hyminer_items:cobblestone',
					amount: d.utils.random(25, 50),
					attributes: [],
					enchantments: []
				},
				{
					id: 'hyminer_items:coal',
					amount: d.utils.random(1, 10),
					attributes: [],
					enchantments: []
				},
				{
					id: 'hyminer_items:raw_iron',
					amount: d.utils.random(0, 3),
					attributes: [],
					enchantments: []
				}
			],
			"hyminer_tools:iron_pickaxe": [
				{
					id: 'hyminer_items:cobblestone',
					amount: d.utils.random(35, 50),
					attributes: [],
					enchantments: []
				},
				{
					id: 'hyminer_items:coal',
					amount: d.utils.random(3, 15),
					attributes: [],
					enchantments: []
				},
				{
					id: 'hyminer_items:raw_iron',
					amount: d.utils.random(5, 12),
					attributes: [],
					enchantments: []
				},
				{
					id: 'hyminer_items:raw_gold',
					amount: d.utils.random(0, 2),
					attributes: [],
					enchantments: []
				},
				{
					id: 'hyminer_items:diamond',
					amount: d.utils.random(0, d.utils.random(0, d.utils.random(0, d.utils.random(0, d.utils.random(0, d.utils.random(0, d.utils.random(0, d.utils.random(0, d.utils.random(0, d.utils.random(0, 1)))))))))) === 1 ? d.utils.random(1, 2) : 0,
					attributes: [],
					enchantments: []
				}
			],
			"hyminer_tools:gold_pickaxe": [
				{
					id: 'hyminer_items:cobblestone',
					amount: d.utils.random(15, 30),
					attributes: [],
					enchantments: []
				},
				{
					id: 'hyminer_items:coal',
					amount: d.utils.random(18, 50),
					attributes: [],
					enchantments: []
				},
				{
					id: 'hyminer_items:raw_iron',
					amount: d.utils.random(8, 22),
					attributes: [],
					enchantments: []
				},
				{
					id: 'hyminer_items:raw_gold',
					amount: d.utils.random(3, 7),
					attributes: [],
					enchantments: []
				}
			],
			"hyminer_tools:diamond_pickaxe": [
				{
					id: 'hyminer_items:cobblestone',
					amount: d.utils.random(118, 159),
					attributes: [],
					enchantments: []
				},
				{
					id: 'hyminer_items:coal',
					amount: d.utils.random(34, 70),
					attributes: [],
					enchantments: []
				},
				{
					id: 'hyminer_items:raw_iron',
					amount: d.utils.random(15, 25),
					attributes: [],
					enchantments: []
				},
				{
					id: 'hyminer_items:raw_gold',
					amount: d.utils.random(8, 16),
					attributes: [],
					enchantments: []
				},
				{
					id: 'hyminer_items:diamond',
					amount: d.utils.random(0, d.utils.random(0, d.utils.random(0, 1))) === 1 ? d.utils.random(1, 4) : 0,
					attributes: [],
					enchantments: []
				}
			]
		}
		
		let lootItems = lootTable[tools.pickaxe.id]
		let displayItems = lootItems.map(item => {
			let itemData = d.data.get(item.id)
			let found = false
			let amount = item.amount
			if (amount === 0) return undefined;
			
			inventory = inventory.map(invItem => {
				if (invItem.id === item.id) {
					invItem.amount += item.amount
					found = true
				};
				amount = invItem.amount
				return invItem
			})

			if (!found) inventory.push(item)

			return `${itemData.icon} ${item.amount} **${itemData.name}**`
		})

		displayItems = displayItems.filter(x => x !== undefined)

		d.gameDb.set('inventory', inventory , `_${d.author.id}`)
		
		let pickaxe = d.data.get(tools.pickaxe.id)

		d.channel.send(`You mined ${displayItems.join(", ")} with your ${pickaxe.icon} **${pickaxe.name}**`)
	}
}