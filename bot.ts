import Discord, { Intents, MessageReaction, Message, ReactionEmoji, TextChannel, Guild } from "discord.js";
import schedule = require('node-schedule')
import axios from "axios";
import * as cheerio from 'cheerio';

import { components } from "./compoments";
import { trans } from "./tatsumi translate"


const client = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const component = new components

const prefix ='!';

client.on('ready', async () => {
	console.log('Ready!');
});



// client.on('interactionCreate', async interaction => {
//     if (!interaction.isCommand()) return;
//     const cmd = interaction.commandName.toLowerCase()
//     const queue = new Map()

//     switch(cmd) {

//         case "dev": {
//             const reportMessage = await interaction.channel?.send({embeds: [component.reportEmbed], components: [component.reportbtn]})
//             const collector1 = reportMessage?.createMessageComponentCollector({ componentType: 'BUTTON' });

//             collector1?.on("collect", async collected1 => {
//                 let date = new Date()
//                 let channelName =  'ticket-' + (date.getMonth()+1) + '_' + date.getDate() //ticket名稱 ex:ticket-7_30

//                 await interaction.guild!.channels //ticket channel create 
//                 .create(channelName, {
//                 type: "GUILD_TEXT", 
//                 permissionOverwrites: [
//                     {
//                         id: interaction.guild!.roles.everyone, 
//                         allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'], //Allow permissions
//                         //deny: ['VIEW_CHANNEL', 'SEND_msgS', 'READ_msg_HISTORY'] //Deny permissions
//                     }
//                 ], 
//                 parent: "939861652529090573"
            
//                 })
//                 .then(async (channel) => {

//                     const ticketmsg = await channel.send({
//                         content: "<@" + interaction.user.id + ">" + "請稍候。",
//                         embeds: [component.ticketEmbed],
//                         components: [component.lockbtn]
//                     })

//                     const collector2 = ticketmsg.createMessageComponentCollector({ componentType: 'BUTTON' })
//                     collector2.on("collect", async collected2 => {

//                         channel.permissionOverwrites.edit(channel.guild.roles.everyone, { SEND_MESSAGES: false })
//                         const ticketLockEmbed = new Discord.MessageEmbed()
//                             .setColor("#D94600")
//                             .setDescription("Ticket Closed by" + `<@${collected2.member?.user.id}>`)
                            
//                         const ticketLockmsg = await channel.send({
//                             embeds: [ticketLockEmbed],
//                             components: [component.unlockbtn, component.delbtn]                          
//                         })

//                         const collector3 = ticketLockmsg.createMessageComponentCollector({ componentType: 'BUTTON' })
//                         collector3.on("collect", collected3 => {
//                             if (collected3.customId === "unlock") {
//                                 channel.permissionOverwrites.edit(channel.guild.roles.everyone, { SEND_MESSAGES: true })
//                                 ticketLockmsg.delete();
//                             } else if (collected3.customId === "delete") {
//                                 channel.send({content: "Ticket will be deleted in 5 seconds"})
//                                 setTimeout(() => channel.delete(), 5000)
//                             }
//                         })
                        

//                     })
//                 })

//             })
//         }

//         case "covid": {
//             const rule = new schedule.RecurrenceRule();
//             rule.hour = 17;
//             rule.minute = 0;
//             interaction.channel?.send({content: "session start!"}) 

//             const job = schedule.scheduleJob(rule, async () => {
//                 const date = (new Date().getMonth()+1).toString() + "/" + new Date().getDate().toString()

//                 const res = axios.get("https://atlas.jifo.co/api/connectors/5abcdbf9-c775-4a58-80e8-56bc80097684")
//                 res.then(response => {
//                     let data = response.data.data[3][1]
//                     let embed = component.covidInfo(data[0], data[1], data[2], date)
//                     interaction.channel?.send({embeds: [embed]}) 
//                     return;
//                 })
                
//             })
//         }

//         case "music": {
//             let arg = cmd.split(" ")
//             console.log(interaction.guild)
//         }
//     }
// });

client.on("messageCreate", async (msg: Discord.Message) => {
    if (msg.author.bot) return;
    if (msg.content.startsWith(prefix)){
        const cmd = msg.content.split(" ")[0].substring(prefix.length).toLowerCase()

        switch(cmd){

            //豆知識 
            case 'info': { 
                const info: Array<string> = ['尼知道摸？龍見城最偉大的魔法師霍爾克斯，一個人供給的魔力就佔了整個龍見城魔法結界的９０%喔！',
                             '尼知道摸？據說龍見城裡有個叫化師聯合的組織喔！但從來都沒有人目擊過呢！',
                             '尼知道摸？大魔法師霍爾克斯的魔法標誌物是鑰匙喔！',
                             '尼知道摸？龍見城裡有個叫中央魔法管理局的東東喔！裡面管理著各種關於魔法的事物呢！',
                             '尼知道摸？據說龍見城天空中的龍群他們其實原來都是魔法師喔！但因為進去了異界所以被變成了龍呢！']               
                let x: number = Math.random()*5;
                msg.reply(info[Math.floor(x)])
                break;
            }

            //龍見轉碼
            case 'd': {
                    const transResult = trans(msg.content.substring(3))
                    msg.reply(transResult)
                break
            }

            //ticket
            case "ticket": {
                const reportMessage = await msg.channel?.send({embeds: [component.reportEmbed], components: [component.reportbtn]})
                const collector1 = reportMessage?.createMessageComponentCollector({ componentType: 'BUTTON' });
    
                collector1?.on("collect", async collected1 => {
                    let date = new Date()
                    let channelName =  'ticket-' + (date.getMonth()+1) + '_' + date.getDate() //ticket名稱 ex:ticket-7_30
    
                    await msg.guild!.channels //ticket channel create 
                    .create(channelName, {
                    type: "GUILD_TEXT", 
                    permissionOverwrites: [
                        {
                            id: msg.guild!.roles.everyone, 
                            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'], //Allow permissions
                            //deny: ['VIEW_CHANNEL', 'SEND_msgS', 'READ_msg_HISTORY'] //Deny permissions
                        }
                    ], 
                    // parent: guildID
                
                    })
                    .then(async (channel) => {
                        //開啟ticket
                        const ticketmsg = await channel.send({
                            content: "<@" + msg.member + ">" + "請稍候。",
                            embeds: [component.ticketEmbed],
                            components: [component.lockbtn]
                        })
                        //重新開啟或刪除ticket的btn
                        const collector2 = ticketmsg.createMessageComponentCollector({ componentType: 'BUTTON' })
                        collector2.on("collect", async collected2 => {
    
                            channel.permissionOverwrites.edit(channel.guild.roles.everyone, { SEND_MESSAGES: false })
                            const ticketLockEmbed = new Discord.MessageEmbed()
                                .setColor("#D94600")
                                .setDescription("Ticket Closed by" + `<@${collected2.member?.user.id}>`)
                                
                            const ticketLockmsg = await channel.send({
                                embeds: [ticketLockEmbed],
                                components: [component.unlockbtn, component.delbtn]                          
                            })
                            
                            const collector3 = ticketLockmsg.createMessageComponentCollector({ componentType: 'BUTTON' })
                            collector3.on("collect", collected3 => {
                                
                                if (collected3.customId === "unlock") /*重新開啟*/ { 
                                    channel.permissionOverwrites.edit(channel.guild.roles.everyone, { SEND_MESSAGES: true })
                                    ticketLockmsg.delete();
                                } else if (collected3.customId === "delete") /*刪除*/ {
                                    channel.send({content: "Ticket will be deleted in 5 seconds"})
                                    setTimeout(() => channel.delete(), 5000)
                                }
                            })
                            
    
                        })
                    })
    
                })
                break
            }
            
            case "covid": {
                const rule = new schedule.RecurrenceRule();
                rule.hour = 16;
                rule.minute = 30;

                msg.channel?.send({content: "session start!"}) 
                schedule.scheduleJob(rule, async () => {
                    axios("https://www.gvm.com.tw/category/news")
                    .then(async response => {
                        const $ = cheerio.load(response.data)
                        $(".article-list").each((i, element) => {
                            const result = $(element).find("img")
                            const link = []

                            for (let i = 0; i<result.length; i++) {
                                if (result[i].attribs.alt.includes("本土")) {
                                    link.push(result[i])
                                }
                            }
                            let string = JSON.stringify(link[0].attribs)
                            msg.channel.send({files: [string.split(`"`)[15]]})
                        })

                    })
                })
            break;
            }

            
            // //刪除頻道
            // case 'r': { 
            //     const { guild } = msg
            //     const channel = guild?.channels.cache               
            //     .filter((channel) => channel.parentId === "872090808956878888")
            //     .first()

            //     if (!channel) {
            //     msg.reply('There is no current ticket exist.')
            //     return 
            //     } 

            //     channel.delete();
            //     msg.delete()
            //     break;  
            // } 

        //     //ticket bot (v12用 靠北多錯誤)
        //     case 'report': {
        //         let date = new Date()
        //         let channelName =  'ticket-' + (date.getMonth()+1) + '_' + date.getDate() //ticket名稱 ex:ticket-7_30
                
        //         if(msg.channel.id === "873601369607643186") { 
                    
        //             msg.delete()
        //             await msg.guild!.channels //ticket channel create 
        //             .create(channelName, {
        //                 type: "text", 
        //                 permissionOverwrites: [
        //                 {
        //                 id: msg.guild!.roles.everyone, 
        //                 allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'], //Allow permissions
        //                 //deny: ['VIEW_CHANNEL', 'SEND_msgS', 'READ_msg_HISTORY'] //Deny permissions
        //                 }
        //                 ],
        //                 parent: "872090808956878888"
                        
        //             })
                    
        //             .then(async (channel) => {
                        
        //                 let lock = false; //lock status
        //                 const ticketmsg = await channel.send({content: "<@" + msg.author.id + ">" + "請稍候。",embeds: [component.ticketEmbed]})
        //                 await ticketmsg.react("🔒")

        //                 //通用filter (過濾bot)
        //                 const reactionFilter: Discord.CollectorFilter = ( reaction: MessageReaction, user: Discord.User) => {
        //                     return !user.bot
        //                 }
                        
        //                 //🔒collector
        //                 const lockCollector = ticketmsg.createReactionCollector({filter: reactionFilter });
        //                 lockCollector.on("collect", async (lockReaction, user) => {
        //                     console.log("okay")
        //                    if (lockReaction.emoji.name === "🔒" && !lock) {

        //                         const solvemsg = (await channel.send("確定關閉?"))
        //                         solvemsg.react("✅")
        //                         solvemsg.react("❎")

        //                         //✅❎collector
        //                         const problemSolvedCollector = solvemsg.createReactionCollector({filter: reactionFilter, dispose: true })
        //                         problemSolvedCollector.on("collect", async (reaction, user) => {
        //                             reaction.users.remove(user.id)

        //                             if(reaction.emoji.name === "✅") {                                             
        //                                 channel.permissionOverwrites.edit(channel.guild.roles.everyone, { SEND_MESSAGES: false }) //確認鎖定 (鎖定頻道)
        //                                 try {
        //                                     solvemsg.delete()
        //                                 } catch(err) {console.error(err)}

        //                                     const ticketLockEmbed = new Discord.MessageEmbed()
        //                                     .setColor("#D94600")
        //                                     .setDescription("Ticket Closed by" + `<@${user.id}>`)

        //                                 const lockmsg = await channel.send({content: "本串已鎖定", embeds: [ticketLockEmbed]})
        //                                 lockmsg.react("🔓")
        //                                 lockmsg.react("⛔")       
        //                                 lockReaction.users.remove(user.id)                                

        //                                 //🔓⛔collector
        //                                 const unlock_deleteCollector = lockmsg.createReactionCollector({filter: reactionFilter, dispose: true })
        //                                 unlock_deleteCollector.on("collect", (reaction, user) => {
        //                                     if (reaction.emoji.name === "🔓") { //重新開啟
        //                                         try { 
        //                                             lockmsg.delete
        //                                         } catch(err) {console.error(err)}

        //                                         //重開ticket (解除頻道鎖定)
        //                                         channel.permissionOverwrites.edit(channel.guild.roles.everyone, { SEND_MESSAGES: true });

        //                                         const ticketOpenEmbed = new Discord.MessageEmbed()
        //                                         .setColor("#009100")
        //                                         .setDescription("Ticket Opened by" + `<@${user.id}>`)

        //                                         channel.send({embeds: [ticketOpenEmbed]})
        //                                         return lock = false; //回傳上鎖狀態
                                                
        //                                     } else if (reaction.emoji.name === "⛔" && msg.guild!.members.cache.find((member) => member.id === user.id)?.permissions.has("ADMINISTRATOR") ) { //刪除頻道
        //                                         channel.send("Deleting this ticket in 5 seconds")
        //                                         try {
        //                                             setTimeout(() => channel.delete(), 5000)
        //                                         } catch(err) {console.error(err)}
        //                                     } else if (reaction.emoji.name === "⛔") {
        //                                         channel.send(`<@${user.id}> You don't have the permission`)
        //                                         try { 
        //                                             reaction.users.remove() 
        //                                         } catch(err) {console.error(err)}
        //                                     }
        //                                 })
        //                                 return lock = true;

        //                             } else if (reaction.emoji.name === "❎") { //取消鎖定頻道
        //                                 try {
        //                                     solvemsg.delete()
        //                                 } catch(err) {console.error(err)}

        //                                 lockReaction.users.remove(user.id)
        //                                 channel.permissionOverwrites.edit(channel.guild.roles.everyone, { SEND_MESSAGES: true });
        //                             }
                                
        //                         })
                                      
        //                     } else if (lockReaction.emoji.name === "🔒") { //已鎖定時仍🔒的操作 (僅移除)
        //                         lockReaction.users.remove(user.id)
        //                     }
        //                 })
        //             })
        //             .catch((error) => console.error(error))
        //         }
 
        //     }         

        // }
        }
    }
})

client.login('ODY4MTM3NzIxNTE0ODQ4MjY2.YPrSQg.GT0JyzxoUD-aGdMAKdHCc8YJLCs')




