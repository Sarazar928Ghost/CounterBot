"use strict";
// GitHub :  Sarazar928Ghost
// Discord : Kevin#6537
// Merci de ne pas vendre ce code , je l'ai fais gratuitement , donnez gratuitement.
// Ne pas oublier de donner les permissions au bot sur le panel discord dev
const {Client, Intents} = require("discord.js");
const {TOKEN, ID_SERVER} = require("./config.json");
const optionChannels = require("./channels.json");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES] });
let guild; // The server
let channels = [];
const types = {
    "members": "members",
    "roles": "roles",
    "offline": "offline",
    "online": "online",
    "idle": "idle",
    "dnd": "dnd",
    "bot": "bot",
}
client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    guild = await client.guilds.fetch(ID_SERVER);
    await Object.values(optionChannels).forEach(async (channel) => {
        channel.count = 0;
        channel.channel = await guild.channels.fetch(channel.ID);
        channels.push(channel);
    });
    setInterval(updateChannel, 6 * 60 * 1000); // 6 minutes ( Ne pas dépasser 2 requêtes dans une période de 10 minutes )
    client.user.setActivity("😻 Kevin#6537 😻", {
        type: "WATCHING"
      });
});
function updateChannel()
{
    console.log("Update des channels en cours ...");
    channels.forEach(channel => {
        channel.count = 0;
    })
    guild.members.fetch().then((members)=>{
        members.forEach(member => {
            channels.forEach(channel => {
                let hasRoles = true;
                const countBot = channel.countBot;
                /* Members Section && Bot Section */

                if(channel.type.includes(types.members))
                    if((countBot && member.user.bot) || !member.user.bot) ++channel.count;

                if(channel.type.includes(types.bot) && member.user.bot) ++channel.count;
                
                /* Si il n'y a pas le type bot , on arrete ici pour les bot */
                if(!countBot && member.user.bot) return;

                /* Roles Section */
                if(channel.type.includes(types.roles))
                {
                    channel.ID_ROLES.forEach(idRole => {
                        if(!member.roles.cache.some(role => role.id === idRole)) hasRoles = false;
                    });
                    if(hasRoles) ++channel.count;                 
                }

                /* Status Section */
                if(channel.type.includes(types.offline) && (member.presence == null || member.presence.status === types.offline)) ++channel.count;
                if(member.presence == null) return;
                if(channel.type.includes(types.online) && member.presence.status === types.online) ++channel.count;
                else if(channel.type.includes(types.dnd) && member.presence.status === types.dnd) ++channel.count;
                else if(channel.type.includes(types.idle) && member.presence.status === types.idle) ++channel.count;
            })
        })
        channels.forEach(channel => {
            const name = channel.name.replace("{count}", channel.count);
            console.log(name);
            channel.channel.setName(name);
        });
        console.log("Update des channels terminé !");
    }).catch((error) => {
        console.error(error);
      });
}
client.login(TOKEN);
