// Définition des fonctions que l'on utilise ...
const fs = require('fs');
const ytdl = require('ytdl-core');
const Discord = require('discord.js');
const Music = require('discord.js-musicbot-addon');
const kernel = new Discord.Client();
// Définition de l'utlisation fonction ydl-core & fs
const token = (process.env.TOKEN) // Recommended to load from json file.
// Défnition de l'utilisation fonction deepL
const { translate, detectLanguage, wordAlternatives, translateWithAlternatives } = require('deepl-translator');
prefix = "!";
// Définition du temps ...
var date = new Date();
var jour = date.getDay();
var mois = date.getMonth();
var heure = date.getHours();
var minute = date.getMinutes();
var seconde = date.getSeconds();


const music = new Music(kernel, {
    youtubeKey: 'AIzaSyD1q9yBpOElSYO7ffxjpNDPxkrWgMj5XDM',
    prefix: "!",
    maxQueueSize: "100",
    ownerOverMember: true,
    botOwner: '215784113666392065',
    defVolume: '50',
    clearInvoker: true,

  });
   
// Fonction de lancement, status du bot ...
kernel.on ('ready',() => {
    if (heure >= '18'){
        kernel.user.setStatus('afk')
        kernel.user.setPresence({game:{name: 'Dormir paisiblement',type: 0}});
    } else {
        kernel.user.setStatus('online')
        kernel.user.setPresence({game:{name: 'Étudie le monde',type: 0}});
    }
        console.log('Kernel is work !');
        
});

// Fonction 'message', commandes ...
kernel.on('message', message => {
    // Définition de terme pour ce facilité la vie ...
    let msg = message.content.toLowerCase();
    let sender = message.author;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // Commande de salutation, adapté selon l'heure
    if (msg === prefix + 'hello') {
        if (heure >= '18'){
            sender.send(`Salut, ${sender} .`);
        }
    };
    // Commande de remerciement...
    if (msg === prefix + 'thank') {
        sender.send(`Derien ${sender} :slight_smile:`);
    }
    // Commande qui donne l'heure 
    if (msg === prefix + 'time') {
        sender.send(`Désolé ${sender} je ne peux pas vous donner l'heure, car je change de lieux toutes les heures.`);
        var date = new Date(Date.UTC(2018, 1, 1, 14, 0, 0));
        var options = {
       weekday: "long", year: "numeric", month: "short",
       day: "numeric", hour: "2-digit", minute: "2-digit"
       }
        sender.send(date.toLocaleTimeString("fr-FRA", options));
    }
    // Commande de traduction ...
    if (msg.startsWith(prefix + 'translate')) {
        // Définition des arguments spécifiques à chaque tâches
        let text2 = args.slice(2,600).join(" ");
        let text0 = args.slice(0,1).join(" ");
        let text1 = args.slice(1,2).join(" ");

        translate(text2, text1, text0)
  .then(res => message.reply(`Traduction : ${res.translation}`))
  .catch(console.error);
    }
    // Commande invitation
    if (msg === prefix + 'discord') {
        const embed = new Discord.RichEmbed()
        .setAuthor('Les accros !')
        .setDescription('Serveur de jeux :')
        .setColor('#0ef92e')
        .setThumbnail('https://i.imgur.com/w6NAx6C.png')
        .addField('Invitation :','https://discord.gg/Bsz4UcC', true)
        message.channel.send({embed});
    }
    // Commande purge
    if (msg.startsWith(prefix + 'purge')) {
        async function purge() {
          message.delete();
          if (!message.member.roles.find("name", "Gestionnaire")) {
            message.member.send('Vous n\'avez pas la permission adequate ! :joy:')
            return;
          }
          const fetched = await message.channel.fetchMessages({limit: args[0]});
         
          message.channel.bulkDelete(fetched)
            .catch(error => message.channel.send('Erreur: ${error}'));
        }
        purge();};
      //Commande play

});

// Token login
kernel.login(token);
