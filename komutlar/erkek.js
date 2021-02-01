const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
  

  let erkekROL = ayarlar.erkekROL;
  let kayıtsızROL = ayarlar.kayıtsızROL;
  let kayıtlıROL = ayarlar.kayıtlıROL;
  let yetkili = ayarlar.yetkiliROL;
  let kayıtLOG = ayarlar.kayıtLOG;

  if (!message.member.roles.cache.has(yetkili))
    return message.channel.send("Bu işlemi sadece yetkililer yapabilir");

  if (!args[0]) return message.channel.send(`Bir kişiyi etiketlemelisin.`);

  let kullanıcı = message.mentions.users.first();
  if (!kullanıcı)
    return message.channel.send(
      `${args[0]}, kullanıcısını sunucuda bulamıyorum.`
    );
  if (kullanıcı.bot) return;

  const kurulus = new Date().getTime() - kullanıcı.createdAt.getTime();
  var kontrol;
  if (kurulus < 1296000000) kontrol = "❌Şüpheli";
  if (kurulus > 1296000000) kontrol = "✔️Güvenli";

  let isim =
    args[1]
      .charAt(0)
      .replace("i", "İ")
      .toUpperCase() + args[1].slice(1).toLowerCase();

  if (!isim) return message.channel.send(`Üyenin ismini belirtmelisin.`);
  if (isim.length > 16) return message.channel.send(`Daha kısa bir isim yaz.`);

  let yaş = args[2];
  if (!yaş) return message.channel.send(`Üyenin yaşını belirtmelisin.`);
  if (yaş.length > 100)
    return message.channel.send(`Üyenin yaşı 100'den büyük olamaz.`);

  const emb = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.avatarURL())
    .setThumbnail(client.user.avatarURL())
    .setTimestamp()
    .setColor(`#fffff0`)
    .setFooter(`Kayıt Başarılı`);
  let sohbetkanalı = '785136001290207242'
// embed olarak atmasını istiyorsan
let sohbetkanalmesaj = new Discord.MessageEmbed()
.setDescription(`<a:onayli:785146111199019059> Aramıza hoş geldin ${kullanıcı}, keyifli vakit geçirmen dileğiyle!`)
.setColor('RANDOM')
.setTimestamp()

message.guild.channels.cache.get(sohbetkanalı).send(sohbetkanalmesaj)
  
  let kız = db.fetch(`kız_${message.author.id}_${message.guild.id}`) || 0;
  let erkek = db.fetch(`erkek_${message.author.id}_${message.guild.id}`) || 0;
  let toplam = erkek + kız;
  let toplam2 = db.fetch(`toplam_${message.guild.id}`) || 0;
  let tag = ayarlar.tag || "";
  message.guild.members.cache
    .get(kullanıcı.id)
    .setNickname(`${tag} ${isim} • ${yaş}`);
  message.guild.members.cache.get(kullanıcı.id).roles.add(erkekROL);
  message.guild.members.cache.get(kullanıcı.id).roles.add(kayıtlıROL);
  message.guild.members.cache.get(kullanıcı.id).roles.remove(kayıtsızROL);
  message.guild.members.cache.get(kullanıcı.id)
    .send(
      emb.setDescription(
        `• Kaydın başarıyla ${message.author} tarafından yapıldı. \n • Sunucudaki İsmin : ${isim} • ${yaş} \n • Kurallar kanalımızı okumayı unutma!`
        
      )
 
    );
  
  

  
  
  db.add(`erkek_${message.author.id}_${message.guild.id}`, "1");
  db.add(`toplam_${message.guild.id}`, "1");
  
  
  let embed3 = new Discord.MessageEmbed()
    .setColor("WHITE")
    .setDescription(
      `
●▬▬▬▬ <a:mavitik:785130502583615528> **Kayıt Başarıyla Tamamlandı** <a:mavitik:785130502583615528> ▬▬▬▬●

         <a:onayli:785146111199019059> • Kayıt Olan Kullanıcı ${kullanıcı}
         <a:kristal:785146111341887508> • İsim Yaş  **${isim} | ${yaş}**
         <a:rainbow:785149833073393664> • Bu Kullanıcı **${kontrol}**
         <a:kraltac:785148963744645121> • Kayıt eden yetkili : ${message.author}
         <a:hype:785146109278420993> • Sunucumuz şu an **${message.guild.members.cache.size}** kişi 
         <a:zil:785149834834214912> • Toplam Kayıtlar : **${toplam2}**

●▬▬▬▬ <a:mavitik:785130502583615528> **Kayıt Başarıyla Tamamlandı** <a:mavitik:785130502583615528> ▬▬▬▬●
`
    )
      .setImage("https://media.giphy.com/media/MQ3Cgmkf1u9jAq9Zec/giphy.gif");
  message.channel.send(embed3);
  
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["e"],
  permLevel: 0
};

exports.help = {
  name: "erkek"
}; //splashen
