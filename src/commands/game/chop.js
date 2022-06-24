module.exports = {
	name: ["chop","c"],
	shortDescription: 'Chops trees in the region with your axe.',
	longDescription: `Chops trees to get wood.
With wood, you can craft materials and upgrade houses, machines...
Loot is different for each axe and can change depending in which world you are.
`,
	usage: 'mine',
	display: true,
	code: async d => {
		if (!d.gameDb.get('started', `_${d.author.id}`)) return d.utils.sendError(d, 'notStarted')
		
		let inventory = d.gameDb.get("inventory", `_${d.author.id}`)
		let tools = d.gameDb.get("tools", `_${d.author.id}`)

		let lootTable = {
			"hyminer_tools:wooden_axe": [
				{
					id: 'hyminer_structures:oak_tree',
					amount: d.utils.random(1, 4),
					attributes: [],
					enchantments: []
				},
			],
			"hyminer_tools:stone_axe": [
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
			"hyminer_tools:iron_axe": [
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
			"hyminer_tools:gold_axe": [
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
			"hyminer_tools:diamond_axe": [
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

		let treeLoot = {
			"hyminer_structures:oak_tree"() {
				return [{
					id: 'hyminer_items:oak_wood',
					amount: d.utils.random(4, 7),
					attributes: [],
					enchantments: []
				}, {
					id: 'hyminer_items:stick',
					amount: d.utils.random(0, 2) === 1 ? d.utils.random(1, 3) : 0,
					attributes: [],
					enchantments: []
				}, {
					id: 'hyminer_items:apple',
					amount: d.utils.random(1, 4) === 1 ? 1 : 0,
					attributes: [],
					enchantments: []
				}, {
					id: 'hyminer_items:oak_sapling',
					amount: d.utils.random(0, 5) === 1 ? d.utils.random(1, 2) : 0,
					attributes: [],
					enchantments: []
				}]
			}
		}
		
		let lootTrees = lootTable[tools.axe.id]
		let displayItems = []
		let displayTrees = lootTrees.map(lootTree => {
			let lootItems = []

			let treesArray = new Array(lootTree.amount)

			for (const treeItem of treesArray) {
				let items = treeLoot[lootTree.id]()
				
				items.map(item => {
					let found = false
					lootItems = lootItems.map(lootItem => {
						if (lootItem.id === item.id) {
							lootItem.amount += item.id
							found = true
						}
						return lootItem;
					})

					if (found) lootItems.push(item)
				})
			}
			
			lootItems.map(lootItem => {
				let item = d.data.get(lootItem.id)

				let found = false
				let amount = lootItem.amount
				if (amount === 0) return displayItems.push(undefined);
				
				inventory = inventory.map(invItem => {
					if (invItem.id === lootItem.id) {
						invItem.amount += lootItem.amount
						found = true
					};
					amount = invItem.amount
					return invItem
				})
	
				if (!found) inventory.push(lootItem)

				displayItems.push(`${item.icon} ${lootItem.amount} **${item.name}**`)
			})

			let tree = d.data.get(lootTree.id)

			return `${tree.icon} ${lootTree.amount} **${tree.name}**`
		})
        displayItems = displayItems.filter(item => item != undefined)

		d.gameDb.set('inventory', inventory , `_${d.author.id}`)
		
		let axe = d.data.get(tools.axe.id)

		d.channel.send(`You chopped ${displayTrees.join(", ")} with your ${axe.icon} **${axe.name}** and gained ${displayItems.join(", ")}`)
	}
}