const fs = require('fs')
const { paths } = require('./constants')

class utils {
	static loadEvents(d) {
		fs.readdirSync('./src/' + paths.events).map(eventFile => {
			const event = require(`./../${paths.events}/${eventFile}`)

			event.run(d)
		})
	}

	static loadCommands(path = paths.commands) {
		const commands = []

		const commandsFolder = fs.readdirSync('./src/' + path, {withFileTypes: true})

		let types = {
                files: commandsFolder.filter(file => file.isFile()),
                dirs: commandsFolder.filter(file => file.isDirectory())
		}

		types.files.map(file => {
			const commandData = require(`./../${path}/${file.name}`)
			commandData.run = commandData.code
			commandData.path = `./src/${path}/${file.name}`
			delete commandData.code
			
			commands.push(commandData)
		})

		types.dirs.map(dir => {
			let loadDir = this.loadCommands(`${path}/${dir.name}`)

			commands.push(...loadDir)
		})
		
		return commands
	}

	static open(d) {
		const data = {}
		
		for (const key in d) {
			if (Object.hasOwn(d, key)) {
				const value = d[key]

				data[key] = value
			}
		}

		return data
	}

	static replaceLast = replaceLast

	static random(min, max) {
		return (Math.round(Math.random() * (max - min))) + min
	}

	static sendError(d, type) {
		let types = {
			notStarted() {
				d.channel.send({
					embeds: [{
						title: 'Error',
						description: `You haven't started yet!
Use \`${d.configDb.get('prefix', `_${d.guild.id}`)}start\` to start right your adventure!`,
						color: d.constants.colors.red
					}]
				})
			}
		}

		let send = types[type]
		if (!send) return;
		send()
	}

	static abbreviateNumber(number, fractionDigits = 1) {
		const tier = Math.floor(Math.log10(Math.abs(number || 1)) / 3);
	    if (tier === 0) return number;
	
	    const symbols = ["K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "O", "N", "D", "UD", "UD", "DD", "TD", "QaD", "QiD", "SxD", "SpD", "OD", "ND", "V", "UV", "DV", "TV", "QaV", "QiV", "SxV", "SpV", "OV", "NV", "DT", "UDT", "DDT", "TDT", "QaDT", "QiDT", "SxDT", "SpDT", "ODT", "NDT", "DQa", "UDQa", "DDQa", "TDQa", "QaDQa", "QiDQa", "SxDQa", "SpDQa", "ODQa", "NDQa", "DQi", "UDQi", "DDQi", "TDQi", "QaDQi", "QiDQi", "SxDQi", "SpDQi", "ODQi", "NDQi", "DSx", "UDSx", "DDSx", "TDSx", "QaDSx", "QiDSx", "SxDSx", "SpDSx", "ODSx", "NDSx", "DSp", "UDSp", "DDSp", "TDSp", "QaDSp", "QiDSp", "SxDSp", "SpDSp", "ODSp", "NDSp", "DO", "UDO", "DDO", "TDO", "QaDO", "QiDO", "SxDO", "SpDO", "ODO", "NDO", "DN", "UDN", "DDN", "TDN", "QaDN", "QiDN", "SxDN", "SpDN", "ODN", "NDN", "C", "UC"] 
	        
	    const symbol = symbols[tier - 1];
	    const abbreviated = number / (Math.pow(10, tier * 3));
	    
	    return abbreviated.toFixed(fractionDigits) + symbol;
	}

	static sendUsage(d, name) {
		let command = d.commands.find(command => typeof command.name === 'string' ? command.name.toLowerCase() === name.toLowerCase() : command.name.map(x => x.toLowerCase()).includes(name.toLowerCase()))
		if (!command) return d.channel.send({
			embeds: [{
				title: 'Error',
				description: `No command with name \`${name}\` found!

You can check a list with all available commands using \`${d.configDb.get('prefix', `_${d.guild.id}`)}help\``,
				color: d.constants.colors.red
			}]
		})
		
		let aliases;
		if (typeof command.name === 'string') aliases = "There are no aliases for that command."
		else aliases = `\`${d.configDb.get('prefix', `_${d.guild.id}`)}${command.name.slice(1).join(`\`, \`${d.configDb.get('prefix', `_${d.guild.id}`)}`)}\``
		
		d.channel.send({
			embeds: [{
				title: `Usage`,
				description: `\`${d.configDb.get('prefix', `_${d.guild.id}`)}${command.usage}\`
${command.longDescription}

**Aliases**

${aliases}
`,
				color: d.constants.colors.light_blue
			}]
		})
	}
}

function replaceLast(text, search, replacer) {
	const splitted = text.split(search)
	const last = splitted.pop()
	return splitted.join(search) + replacer + last
}

module.exports = { utils }