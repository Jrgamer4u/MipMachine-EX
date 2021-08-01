const keepAlive = require("./server.js")
                let Discord;
                let Database;
                if(typeof window !== "undefined"){
                    Discord = DiscordJS;
                    Database = EasyDatabase;
                } else {
                    Discord = require("discord.js");
                    Database = require("easy-json-database");
                }
                const delay = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms));
                const s4d = {
                    Discord,
                    client: null,
                    tokenInvalid: false,
                    reply: null,
                    joiningMember: null,
                    database: new Database("./db.json"),
                    checkMessageExists() {
                        if (!s4d.client) throw new Error('You cannot perform message operations without a Discord.js client')
                        if (!s4d.client.readyTimestamp) throw new Error('You cannot perform message operations while the bot is not connected to the Discord API')
                    }
                };
                s4d.client = new s4d.Discord.Client({
                    fetchAllMembers: true
                });
                s4d.client.on('raw', async (packet) => {
                    if(['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)){
                        const guild = s4d.client.guilds.cache.get(packet.d.guild_id);
                        if(!guild) return;
                        const member = guild.members.cache.get(packet.d.user_id) || guild.members.fetch(d.user_id).catch(() => {});
                        if(!member) return;
                        const channel = s4d.client.channels.cache.get(packet.d.channel_id);
                        if(!channel) return;
                        const message = channel.messages.cache.get(packet.d.message_id) || await channel.messages.fetch(packet.d.message_id).catch(() => {});
                        if(!message) return;
                        s4d.client.emit(packet.t, guild, channel, message, member, packet.d.emoji.name);
                    }
                });
                function colourRandom() {
  var num = Math.floor(Math.random() * Math.pow(2, 24));
  return '#' + ('00000' + num.toString(16)).substr(-6);
}

function colourBlend(c1, c2, ratio) {
  ratio = Math.max(Math.min(Number(ratio), 1), 0);
  var r1 = parseInt(c1.substring(1, 3), 16);
  var g1 = parseInt(c1.substring(3, 5), 16);
  var b1 = parseInt(c1.substring(5, 7), 16);
  var r2 = parseInt(c2.substring(1, 3), 16);
  var g2 = parseInt(c2.substring(3, 5), 16);
  var b2 = parseInt(c2.substring(5, 7), 16);
  var r = Math.round(r1 * (1 - ratio) + r2 * ratio);
  var g = Math.round(g1 * (1 - ratio) + g2 * ratio);
  var b = Math.round(b1 * (1 - ratio) + b2 * ratio);
  r = ('0' + (r || 0).toString(16)).slice(-2);
  g = ('0' + (g || 0).toString(16)).slice(-2);
  b = ('0' + (b || 0).toString(16)).slice(-2);
  return '#' + r + g + b;
}

function mathRandomInt(a, b) {
  if (a > b) {
    // Swap a and b to ensure a is smaller.
    var c = a;
    a = b;
    b = c;
  }
  return Math.floor(Math.random() * (b - a + 1) + a);
}


s4d.client.login(process.env['TOKEN']).catch((e) => { s4d.tokenInvalid = true; s4d.tokenError = e; });

keepAlive()

s4d.client.on('ready', async () => {
  s4d.client.channels.cache.find((channel) => channel.name === 'general').send(String('connected'));

});

s4d.client.on('message', async (s4dmessage) => {
  if ((s4dmessage.content) == 'hi') {
    s4dmessage.channel.send(String('nah'));
  } else if ((s4dmessage.content) == 'pi') {
    s4dmessage.channel.send(String((Math.PI)));
  } else if (((s4dmessage.content) || '').startsWith('I\'m not racist but' || '')) {
    s4dmessage.delete();
    s4dmessage.channel.send(String('You are racist.'));
  } else if ((s4dmessage.content) == ((s4dmessage.member || await s4dmessage.guild.members.fetch(s4dmessage.author.id)).nickname)) {
    s4dmessage.channel.send(String((s4dmessage.author.username)));
  } else if ((s4dmessage.content) == 'color') {
    s4dmessage.channel.send(String((String(colourRandom()) + String(colourBlend(colourRandom(), colourRandom(), Math.random())))));
  } else if (String((s4dmessage.content)).includes(String('among us'))) {
    s4dmessage.channel.send(String('sus'));
  } else if ((s4dmessage.content) == 'OBR') {
    (s4dmessage.channel).send(String('outlier'));
    (s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, { time: (0.166*60*1000), max: 1 }).then(async (collected) => { s4d.reply = collected.first().content;
       s4dmessage.channel.send(String('hmm.'));

     s4d.reply = null; }).catch(async (e) => { console.error(e);   s4dmessage.channel.send(String('https://cdn.discordapp.com/attachments/870522417079017474/870760305179910155/Cake_BFN_asset.png'));
     });} else if ((s4dmessage.content) == 'Click') {
    s4d.database.add(String((String(s4dmessage.member) + ' Clicks')), parseInt(1));
    s4d.database.add(String('Total Clicks'), parseInt(1));
    s4dmessage.channel.send(String(([s4dmessage.member,' Gained ',' 1 ',' Click '].join(''))));
  } else if ((s4dmessage.content) == 'My clicks') {
    s4dmessage.channel.send(s4d.database.get(String((String(s4dmessage.member) + ' Clicks'))));
  } else if ((s4dmessage.content) == 'Total clicks') {
    s4dmessage.channel.send(s4d.database.get(String('Total Clicks')));
  } else if ((s4dmessage.content) == 'Version') {
    s4dmessage.channel.send(String('Version 1.1.0'));
  } else if (String((s4dmessage.content)).includes(String('sus'))) {
    s4dmessage.channel.send(String('among us'));
  } else if ((s4dmessage.content) == 'What\'s the Date?') {
    s4dmessage.channel.send(String(((new Date().getDate()))));
  } else if ((s4dmessage.content) == 'Click Soft Risk') {
    s4d.database.set(String((String(s4dmessage.member) + ' Soft Risk')), (mathRandomInt(-10, 10)));
    s4d.database.add(String((String(s4dmessage.member) + ' Clicks')), parseInt(s4d.database.get(String((String(s4dmessage.member) + ' Soft Risk')))));
    s4d.database.add(String('Total Clicks'), parseInt(s4d.database.get(String((String(s4dmessage.member) + ' Soft Risk')))));
    s4dmessage.channel.send(String(([s4dmessage.member,' Gained ',s4d.database.get(String((String(s4dmessage.member) + ' Soft Risk'))),' Clicks '].join(''))));
  } else if ((s4dmessage.content) == 'Click Hard Risk') {
    s4d.database.set(String((String(s4dmessage.member) + ' Hard Risk')), (mathRandomInt(-100, 100)));
    s4d.database.add(String((String(s4dmessage.member) + ' Clicks')), parseInt(s4d.database.get(String((String(s4dmessage.member) + 'Hard Risk')))));
    s4d.database.add(String('Total Clicks'), parseInt(s4d.database.get(String((String(s4dmessage.member) + ' Soft Risk')))));
    s4dmessage.channel.send(String(([s4dmessage.member,' Gained ',s4d.database.get(String((String(s4dmessage.member) + ' Hard Risk'))),' Clicks '].join(''))));
  }
  if ((s4dmessage.content) == 'Help, OBR!') {
    s4dmessage.channel.send(String((['Command List','\n','Commands created in 7/30/2021','\n','hi','\n','Help, OBR!','\n',(s4dmessage.member || await s4dmessage.guild.members.fetch(s4dmessage.author.id)).nickname,'\n','pi','\n','I\'m not racist but','\n','color','\n','among us','\n','OBR'].join(''))));
    s4dmessage.channel.send(String((['Command List','\n','Commands created in 7/31/2021','\n','Click','\n','My clicks','\n','Total clicks','\n','sus','\n','Version','\n','What\'s the Date?','\n','Click Soft Risk','\n','Click Hard Risk'].join(''))));
  }

});

                s4d;
            
