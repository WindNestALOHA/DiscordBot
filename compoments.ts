import Discord, { MessageActionRow, MessageButton, MessageEmbed } from "discord.js";

export class components {
	private client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });
	public reportEmbed = new MessageEmbed()
		.setColor('#006030')
		.setTitle('問題及意見')
		//.setURL('https://discord.js.org/')
		//.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
		.setDescription('按下 📩 開啟新回報')
		//.setThumbnail('https://i.imgur.com/wSTFkRM.png')
		.addFields(
		//	{ name: 'Regular field title', value: 'Some value here' },
		//	{ name: '\u200B', value: '\u200B' },
		//	{ name: 'Inline field title', value: 'Some value here', inline: true },
		//	{ name: 'Inline field title', value: 'Some value here', inline: true },
		)
		//.addField('name','value' )
		//.setImage('https://i.imgur.com/wSTFkRM.png')
		//.setTimestamp()
		.setFooter('balababa', 'https://i.imgur.com/Gj9y7aC.png');


	public ticketEmbed = new MessageEmbed()
		.setColor('#000079')
		.setTitle('請稍候，管理員將會進行處理。')
		.setFooter('balababa', 'https://i.imgur.com/Gj9y7aC.png');

	public notSolvedEmbed = new MessageEmbed()
		.setColor("#6C3365")
		.setTitle('請稍待管理員協助解決問題')
	
	public covidInfo(domestic: number, abroad: number, death: number, date: string) {
		const covidInfo = new MessageEmbed()
			.setTitle(date + " 疫情資訊")
			.addFields(
				{name: "今日本土新增人數", value: `${domestic}例`},
				{ name: '\u200B', value: '\u200B' },
				{name: "今日境外新增人數", value: `${abroad}例`},
				{ name: '\u200B', value: '\u200B' },
				{name: "今日本土死亡人數", value: `${death}例`}
			)
			.setDescription("covid-19 information")
		return covidInfo;
	}
		
			
	public reportbtn = new MessageActionRow()
		.addComponents(
			new MessageButton()
				.setCustomId('report')
				.setLabel("Create Ticket")
				.setStyle("SECONDARY")
				.setEmoji("📩")
	)

	public lockbtn = new MessageActionRow()
		.addComponents(
			new MessageButton()
				.setCustomId('lock')
				.setLabel("Close")
				.setStyle("SECONDARY")
				.setEmoji("🔒")
	);

	public unlockbtn = new MessageActionRow()
		.addComponents(
			new MessageButton()
				.setCustomId('unlock')
				.setLabel("Open")
				.setStyle("SECONDARY")
				.setEmoji("🔓")
	);

	public delbtn = new MessageActionRow()
		.addComponents(
			new MessageButton()
				.setCustomId('delete')
				.setLabel("Delete")
				.setStyle("SECONDARY")
				.setEmoji("⛔")
	);
	
}


//真的是註解
/*v13*/