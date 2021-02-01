const Discord = require("discord.js");
require("events").EventEmitter.defaultMaxListeners = 30000;
  require("events").defaultMaxListeners = 30000;
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const kanal = ayarlar.kanal;
const fs = require("fs");
require("./util/eventLoader")(client);
const express = require("express");
const app = express();
const http = require("http");
var Jimp = require('jimp');
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const log = message => {
  console.log(` => { ${message} } `);
  
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`AKTİF: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
////////////////////////


////////////////////////

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  return permlvl;
};

client.login(ayarlar.token);




client.on("ready", () => {//splashen
  client.user.setPresence({
    game: { name: `Inception V0.0.1`, type: "WATCHING" },
    status: "online"
  });
});




// İSİM YAŞ İSİM DEĞİŞTİRME 

client.on("guildMemberAdd", member => {
  let tag = ayarlar.tag;
  //splashen
  member.setNickname(`${tag} İsim • Yaş`);
});

// İSİM YAŞ İSİM DEĞİŞTİRME SON






//BOT ROLÜ

client.on(`guildMemberAdd`, async member => {//splashen
  let botrol = ayarlar.botROL;
if(!member.bot) return;
member.roles.add(botrol)
})

// BOT ROLÜ SON




// kayıtsız rolü

client.on(`guildMemberAdd`, async member => {
  let kayıtsızROL = ayarlar.kayıtsızROL;
if(member.bot) return;
member.roles.add(kayıtsızROL)
})

/// kayıtsız rolü son
//splashen



//splashen

// BOT OTOROL

client.on('guildMemberAdd', async member => {//splashen
if(member.user.bot) {
  const botROL = ayarlar.botROL
member.roles.add(botROL)
}
})
// GİRİŞ 
  client.on("guildMemberAdd", member => { 
    const moment = require('moment');
  const kanal = ayarlar.giriskanal;
  let user = client.users.cache.get(member.id);
  require("moment-duration-format");
    const tarih = new Date().getTime() - user.createdAt.getTime();  
  const embed = new Discord.MessageEmbed()
  let rol = ayarlar.kayıtsızROL
 member.roles.add(rol)//splashen

  var kontrol;
if (tarih < 1296000000) kontrol = '⛔️ Bu Kullanıcı **Şüpheli**'
if (tarih > 1296000000) kontrol = '✅ Bu Kullanıcı **Güvenli**'
  moment.locale("tr");
  let kanal1 = client.channels.cache.find(x => x.id === kanal);
    let giris = new Discord.MessageEmbed()
    .setDescription(`
●▬▬▬▬▬▬▬▬ <a:kraltac:785148963744645121> **Bir Üye Katıldı** <a:kraltac:785148963744645121> ▬▬▬▬▬▬▬▬●

• <a:giris:785149838861795368> Hoşgeldin ${member}

• <a:siyahkristal:785146111177785394> Seninle birlikte **${member.guild.memberCount}** kişiyiz.

• <a:yanipsonengif:785149832917680150> [ **${ayarlar.tag}** ] Tagımızı alarak ekibimize katılabilirsin.

• <a:bekleme:785146109559046184> <@&${ayarlar.yetkiliROL}> rolündekiler seninle ilgilenicektir.

• <a:kristal:785146111341887508> Hesabın Oluşturulma Tarihi: \n • \` ${moment(member.user.createdAt).format("DD/MMMM/YYYY • dddd (hh:mm:ss)")} \`

•  ${kontrol} 

• <a:zil2:785149836168921088> Ses teyit odasında kaydınızı yaptırabilirsiniz. 

`)//splashen
    .setImage('https://media.giphy.com/media/CvztERdYXTYeTmVpLh/giphy.gif')
    .setTimestamp()
client.channels.cache.find(x => x.id === kanal).send(giris)
  });
// GİRİŞ SON

client.on('ready', function(){
  let channel = client.channels.cache.get('785256841511829534');
channel.join()
})

//////////////

client.on("userUpdate", function(oldUser, newUser) {
  if (oldUser.username === newUser.username) return;
  let sunucuID = "785112120961400854";
  let logID = "785160412055994418";
  let rolID = "785113357669367838";
  let tag = "⋏";
  let member = client.guilds.cache.get(sunucuID).members.cache.get(oldUser.id);
  let roller = client.guilds.cache.get(sunucuID).members.cache.get(oldUser.id).roles.cache.filter(r => r.name !== "@everyone", "Véronique", "♀️", "Mâschio", "♂️").map(r => r.id)
  let codeming = oldUser.username;
  let newcodeming = newUser.username;
  let dm = oldUser;

  const embed1 = new Discord.MessageEmbed()
    .setDescription(
      `${member} adlı kişi, ⋏ Tagımızı alarak <@&785113357669367838> rolünü kazandı.`
    )
    .setColor("#000000");
  const embed2 = new Discord.MessageEmbed()
    .setDescription(
      `${member}, ⋏ Tagımızı çıkardığı giçin <@&785113357669367838> rolü geri alındı!`
    )
    .setColor("#000000");

  if (codeming.includes(tag)) {
    if (!newcodeming.includes(tag)) {
      client.channels.cache.get(logID).send(embed2);
      member.roles.remove(rolID)
      dm.send(
        `Görünüşe göre kullanıcı adından tagı kaldırmışsın. Bu sebepten dolayı üzerinde bulunan "\`Inception Team\`" rolü alındı.`
      );
    }
  }

  if (!codeming.includes(tag)) {
    if (newcodeming.includes(tag)) {
      client.channels.cache.get(logID).send(embed1);
      member.roles.add(rolID);
      dm.send(
        `Görünüşe göre kullanıcı adına tag almışsın. Bu sebepten dolayı "\`Inception Team\`" rolün verildi. \n*Seni seviyor, bizimle olduğun için mutluluk duyuyoruz.*`
      );
    }
  }
});

///////////
client.on("message", async msg => {
  if (msg.content.toLowerCase() === "!tag" ||
    msg.content.toLowerCase() === "tag") {
    msg.channel.send("Tagımız : ⋏");
  }
  if (msg.content.toLowerCase() === "sa" ||
     msg.content.toLowerCase() === "selamın aleyküm" ||
     msg.content.toLowerCase() === "selamun aleyküm" ||
     msg.content.toLowerCase() === "selamün aleyküm" ||
     msg.content.toLowerCase() === "sea" || 
     msg.content.toLowerCase() === "selamlars" ||
     msg.content.toLowerCase() === "selamke" ||
     msg.content.toLowerCase() === "salam" ||
     msg.content.toLowerCase() === "s.a" ||
     msg.content.toLowerCase() === "selam") {
    msg.react('728654749800333392')
    msg.channel.send(`**Aleyküm Selam <@${msg.author.id}>, Hoşgeldin!**`)
  }
});



