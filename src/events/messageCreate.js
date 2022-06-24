module.exports = {
	run: async d => {
		d.client.on('messageCreate', async message => {
			const data = d.utils.open(d)
			
			let msg = {
				args: message.content.split(' ')
			}
			const cmdPart = msg.args.shift()

			data.message = message
			data.channel = message.channel
			data.guild = message.guild
			data.author = message.author
			data.args = msg.args

			let prefix = d.configDb.get("prefix", `_${data.guild.id}`)
			
			if (!cmdPart.startsWith(prefix)) return;

			msg.cmd = cmdPart.replace(prefix, '')
			
			const commands = d.commands.filter(command => 
				typeof command.name === 'string' ? 
				command.name.toLowerCase() === msg.cmd.toLowerCase() :
				Array.isArray(command.name) ? 
				command.name.find(name => name.toLowerCase() === msg.cmd.toLowerCase()) != undefined :
				false
			)

			commands.map(command => {
				const cmdData = d.utils.open(data)

				cmdData.command = command;

				command.run?.(cmdData).catch(e => {
					console.log(e)
					data.channel.send({
						embeds: [{
							title: 'Internal Error',
							description: `Something went wrong with HyMiner!
**Error**: \`${e.message}\`

You can join our official support server using \`${d.configDb.get('prefix', `_${data.guild.id}`)}support\``,
							color: d.constants.colors.red
						}]
					})
				})
			})
		})
	}
}