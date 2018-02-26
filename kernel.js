// Définition des fonctions que l'on utilise ...
const Discord = require('discord.js');
const kernel = new Discord.Client();
// Définition de l'utlisation fonction ydl-core & fs
const fs = require('fs');
const ytdl = require('ytdl-core');
// Défnition de l'utilisation fonction deepL
const { translate, detectLanguage, wordAlternatives, translateWithAlternatives } = require('deepl-translator');


// Définition du temps ...
var date = new Date();
var heure =date.getHours();
var minute=date.getMinutes();
var seconde=date.getSeconds();
// Modification de l'heure par rapport au server d'hébergement
let modif_horaie_server_heure = (heure + 1);
//let modif_horaie_server_minute = (minute - 25);
//let modif_horaie_server_seconde = (seconde + 5);

// Définition du prefix (avant toute commande) ...
const prefix = '!';

// Fonction de lancement, status du bot ...
kernel.on ('ready',() => {
    switch(modif_horaie_server_heure) {
    case (modif_horaie_server_heure >= "06"):
        kernel.user.setStatus('online')
        kernel.user.setPresence({game:{name: 'Ferder - Album',type: 2}});
        console.log(modif_horaie_server_heure >= "06");
        break;
    case (modif_horaie_server_heure >= "18"):
        kernel.user.setStatus('dnd')
        kernel.user.setPresence({game:{name: 'La voie du destin',type: 0}});
        console.log(modif_horaie_server_heure >= "18");
        break;
    case (modif_horaie_server_heure >= "23"):
        kernel.user.setStatus('dnd')
        kernel.user.setPresence({game:{name: 'Tom Walker - Album',type: 2}});
        console.log(modif_horaie_server_heure >= "23");
        
}});

// Fonction 'message', commandes ...
kernel.on('message', message => {
    // Définition de terme pour ce facilité la vie ...
    let msg = message.content.toLowerCase();
    let sender = message.author;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();



    // Commande de salutation, adapté selon l'heure
    if (msg === prefix + 'hello') {
        if (modif_horaie_server_heure >= '06') {
        sender.send(`Bonjour, ${sender} :sunny:`);
        } else if (modif_horaie_server_heure >= '18') {
        sender.send(`Bonsoir, ${sender} :waxing_crescent_moon:`);
        } else if (modif_horaie_server_heure >= '23') {
        sender.send(`Salut, ${sender} :zzz:`);
        } else {
        sender.send(`Salut, ${sender} :zzz:`);
        }
    };
    // Commande de remerciement...
    if (msg === prefix + 'thank') {
        sender.send(`Derien ${sender} :slight_smile:`);
    }
    // Commande qui donne l'heure 
    if (msg === prefix + 'time') {
        sender.send(`Il est actuellement : ${modif_horaie_server_heure}:${minute}:${seconde} :timer:`);
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
      if (msg.startsWith(prefix + 'play')) {

        const voiceChannel = message.member.voiceChannel;
    
        if (!voiceChannel) {
          return message.reply('Vous n\'êtes pas dans un channel vocal ! :rolling_eyes: ');
        
        }
    
        voiceChannel.join()
        .then(connection => {
          const stream = ytdl(args[0], {filter: 'audioonly'});
          const dispatcher = connection.playStream(stream);
          dispatcher.on('end', () => {
           
            voiceChannel.leave()
          
          })})};

});

// Token login
kernel.login(process.env.TOKEN);
