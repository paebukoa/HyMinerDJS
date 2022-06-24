module.exports = {
	name: ['eval', 'e'],
	display: false,
	code: async d => {
		try {
			if (!d.configDb.get("isDev", `_${d.author.id}`)) return;
			
			let evalued = eval(d.args.join(" "))
			let result = typeof evalued === 'string' ? evalued : JSON.stringify(evalued, null, 4)
			
			d.channel.send({
				content: `\`\`\`
${result}
\`\`\``
			})
		} catch (e) {
			d.channel.send(`\`${e}\``)
		}
	}
}