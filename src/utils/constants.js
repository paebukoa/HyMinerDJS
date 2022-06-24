const discordjs = require('discord.js')
const dotenv = require('dotenv').config()

const paths = {
	events: 'events',
	commands: 'commands'
}

const options = {
	token: process.env.TOKEN,
	intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES'],
	prefix: 'hym!'
} 

const gameVars = {
	started: false,
	inventory: [],
	money: 0,
	bedrockNuggets: 0,
	tools: {
		sword: {
			id: 'hyminer_tools:wooden_sword'
		},
		pickaxe: {
			id: 'hyminer_tools:wooden_pickaxe'
		},
		axe: {
			id: 'hyminer_tools:wooden_axe'
		},
		shovel: {
			id: 'hyminer_tools:wooden_shovel'
		},
		hoe: {
			id: 'hyminer_tools:wooden_hoe'
		}
	},
	armor: {
		helmet: undefined,
		chestplate: undefined,
		leggings: undefined,
		boots: undefined
	}
}

const configVars = {
	prefix: options.prefix,
	botVer: 'v2.4.6',
	maintenance: false,
	isDev: false
}

const colors = {
	yellow: '#ffd86b',
    red: '#ad2f2f',
    blue: '#5ca3e6',
    light_blue: '#4fd0f7',
    green: '#72d656'
}

module.exports = { paths, gameVars, configVars, options, colors }