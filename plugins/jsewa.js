let handler  = async (m, { conn, usedPrefix: _p }) => {
let info = `
joke doang banh gw ga open jasa sewa ๐ฅธ
`.trim()

conn.fakeReply(m.chat, info, '0@s.whatsapp.net', `*โงโโโโโโโโโโยทยทยทโโโโโโโโโโโง*\n                   Putbotz Ganteng`, 'status@broadcast')
}
handler.help = ['payment']
handler.tags = ['info']
handler.command = /^(payment)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.limit = false

module.exports = handler