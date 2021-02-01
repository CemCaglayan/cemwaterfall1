const Discord = require("discord.js"); //lEXAR
/*
<a:sifir:772409953570783243>
<a:bir:772410000252338218>
<a:iki:772410036278263810>
<a:uc:772410075046346752>
<a:dort:772410247628193842>
<a:bes:772410283217125396>
<a:alti:772410315367383051>
<a:yedi:772410352788176896>
<a:sekiz:772410443079090176>
<a:dokuz:772410491683209216>
                */
const mapping = {
  "0": "<a:0_:785436074868342804>", //BURAYA SAYI EMOJILERINI KOYUN ÖRNEK : <a:emojisim:emojidid>
  "1": "<a:1_:785436037924782090>",
  "2": "<a:2_:785436044677349407>",
  "3": "<a:3_:785436040315666432>",
  "4": "<a:4_:785436044854034473>",
  "5": "<a:5_:785436047214510120>",
  "6": "<a:6_:785436046414446623>",
  "7": "<a:7_:785436046237106177>",
  "8": "<a:8_:785436045855817750>",
  "9": "<a:9_:785436046112456755>"
};

"abcdefghijklmnopqrstuvwxyz".split("").forEach(c => {
  mapping[c] = mapping[c.toUpperCase()] = `:regional_indicator_${c}:`;
});

exports.run = function(client, message, args) {
  let toplam = message.guild.memberCount;
  let sunucu = `${toplam}`
    .split("")
    .map(c => mapping[c] || c)
    .join("");
  let onlinesayi = message.guild.members.cache.filter(
    only => only.presence.status != "offline"
  ).size;
  let online = `${onlinesayi}`
    .split("")
    .map(c => mapping[c] || c)
    .join("");
  let tag = message.guild.members.cache.filter(m =>
    m.user.username.includes("⋏")
  ).size;
  let tagdakiler = `${tag}`
    .split("")
    .map(c => mapping[c] || c)
    .join("");
  const voiceChannels = message.guild.channels.cache.filter(
    c => c.type === "voice"
  );
  let count = 0;
  for (const [id, voiceChannel] of voiceChannels)
    count += voiceChannel.members.size;
  let ses = `${count}`
    .split("")
    .map(c => mapping[c] || c)
    .join("");
  let boost = message.guild.premiumSubscriptionCount;
  let boostcuk = `${boost}`
    .split("")
    .map(a => mapping[a] || "0")
    .join("");
  const say = new Discord.MessageEmbed().setDescription(
    `<a:yanipsonengif:785149832917680150> **Sunucudaki Kullanıcı Sayısı;** ${sunucu} \n<a:yanipsonengif:785149832917680150> **Sunucudaki Aktif Kullanıcı Sayısı;** ${online} \n <a:yanipsonengif:785149832917680150> **Sunucuda Tagımızı Alan Kullanıcı Sayısı;** ${tagdakiler} \n<a:yanipsonengif:785149832917680150> **Sesli Kanallarda Bulunan Kullanıcı Sayısı;** ${ses}\n<a:yanipsonengif:785149832917680150> **Sunucudaki Boost Sayısı;** ${boostcuk}`
  );

  message.channel.send(say);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["onlinesayi"],
  permLevel: 0
};

exports.help = {
  name: "say",
  usage: "Sunucudaki Online Kişileri Sayar",
  desscription: "say"
};
