//scby put

let fetch = require('node-fetch')
let { MessageType } = require('@adiwajshing/baileys')
let handler = async(m, { conn }) => {
    let Putbotz = `π΄ππππππππππ ππππππ πΊπ 15 π±πππππππ

βNew Fitur
 cek sendiri aja banh soalnya banyak gw tambahin 

Β© π»ππππππ

ππππ ππππππ 24 π±πππππππ
`.trim()
  const button = {
        buttonText: 'Klik Di sini',
        description: Putbotz,
        sections:  [{title: "Silahkan di pilih Β© Putbotz", rows: [
        {title: 'Menu Utama', description: "Kembali ke Menu Utama", rowId:".?"},
        {title: 'Nomor Owner', description: "Owner Putbotz", rowId:".owner"},
       ] }],
        listType: 1
       }
    conn.sendMessage(m.chat, button, MessageType.listMessage, { quoted: m })
}

handler.tags = ['updateee']
handler.command = /^(updateee)$/i
handler.help = ['info']
module.exports = handler
