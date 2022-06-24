module.exports = {
	name: 'shop',
	shortDescription: 'Buy items and upgrades.',
	longDescription: `In shop, you can buy items, house upgrade, machines, lands, potions and more!
Prices can be updated constantly.`,
	usage: 'shop',
	display: true,
	code: async d => {
		d.channel.send({
			embeds: [{
				title: 'Shop',
				description: `Welcome to shop! Here you can buy items, houses, machines and more!

You can start by selecting a section below:`,
				color: d.constants.colors.yellow
			}],
			components: [{
				type: 'ACTION_ROW',
				components: [{
					type: 'BUTTON',
					label: 'Items',
					customId: 'shop_items',
					emoji: d.data.get('hyminer_items:grass_block')?.icon,
					style: 2
				}, {
					type: 'BUTTON',
					label: 'Machines',
					customId: 'shop_machines',
					emoji: d.data.get('hyminer_machines:drill')?.icon,
					style: 2
				}, {
					type: 'BUTTON',
					label: 'Lands',
					customId: 'shop_lands',
					emoji: d.data.get('hyminer_buildings:land')?.icon,
					style: 2
				}, {
					type: 'BUTTON',
					label: 'Houses',
					customId: 'shop_houses',
					emoji: d.data.get('hyminer_buildings:oak_house_lvl1')?.icon,
					style: 2
				}, {
					type: 'BUTTON',
					label: 'Potions',
					customId: 'shop_potions',
					emoji: d.data.get('hyminer_items:strength_potion')?.icon,
					style: 2
				}]
			}]
		})
	}
}