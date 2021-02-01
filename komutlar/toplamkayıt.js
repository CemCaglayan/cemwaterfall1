const Discord = require("discord.js");
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {//splashen
  let yetkiliROL = ayarlar.yetkiliROL
  let kişi = message.mentions.users.first() || message.member
let erkek = db.fetch(`erkek_${kişi.id}_${message.guild.id}`) || 0
let kız = db.fetch(`kız_${kişi.id}_${message.guild.id}`) || 0
let toplam = erkek+kız
var embed = new Discord.MessageEmbed()
.setDescription(`
●▬▬▬▬▬▬▬ <a:kirmiziyildiz:785148964138909727> **Kayıt İstatistikleri** <a:kirmiziyildiz:785148964138909727> ▬▬▬▬▬▬▬▬▬●

                • Yetkili • **${kişi}**
                • Toplam Üye Kayıt Sayısı • **${toplam}**
                • Toplam Erkek Kayıt Sayısı • **${erkek}**
                • Toplam Kadın Kayıt Sayısı • **${kız}**
               

●▬▬▬▬▬▬▬ <a:kirmiziyildiz:785148964138909727> **Kayıt  İstatistikleri** <a:kirmiziyildiz:785148964138909727> ▬▬▬▬▬▬▬▬▬●

`)
message.reply(embed)

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'toplamkayıt'
};//splashen