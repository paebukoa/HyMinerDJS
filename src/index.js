const discordjs = require('discord.js')
const { utils } = require('./utils/funcs')
const Database = require('./utils/database')
const constants = require('./utils/constants')
const itemsData = require('./utils/data')
const time = require ('./utils/time').Time
const express = require('express')

const client = new discordjs.Client({intents: constants.options.intents, partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER', 'GUILD_MEMBER']})

const gameDb = new Database('game', constants.gameVars)
const configDb = new Database('config', constants.configVars)
const internalDb = new Database('internal')

let data = {
	client,
	commands: utils.loadCommands(),
	utils, gameDb, configDb, internalDb, discordjs, constants, time,
	data: itemsData
}

console.log(data.commands)

utils.loadEvents(data)


client.login(constants.options.token)

process.on('uncaughtException', function (err) {
    console.error(err);
    console.log("\nANTI-CRASH | Here I am!");
});

const app = express()

app.get('/', (req, res) => {
	const now = new Date()
	console.log(`Received a ping ${now.getHours() < 10 ? `0${now.getHours()}` : now.getHours()}:${now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes()}, ${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`)
	res.sendStatus(200)
})

app.listen(3000, () => {
	console.log('Express initialized')
})