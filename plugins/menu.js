let levelling = require('../lib/levelling')
let { MessageType } = require('@adiwajshing/baileys')
let fs = require('fs')
let path = require('path')
let fetch = require('node-fetch')
let moment = require('moment-timezone')
const defaultMenu = {
  before: `
┌── ⳹°❀❬ %me ❭❀°
│✎ Hai, %name!
│
│✎ Tersisa *%limit Limit*
│✎ Role *%role*
│✎ Level *%level (%exp / %maxexp)* [%xp4levelup]
│✎ %totalexp XP secara Total
│ 
│✎ Tanggal: *%date*
│✎ Tanggal Islam: *%dateIslamic*
│✎ Waktu: *%time*
│
│✎ Uptime: *%uptime (%muptime)*
│✎ Database: %rtotalreg dari %totalreg
└─────┈ ⳹ ❋ཻུ۪۪⸙
%readmore`.trimStart(),
  header: '┌─ ⳹°❀❬ %category ❭❀°',
  body: '│✎ %cmd %islimit %isPremium',
  footer: '└────┈ ⳹ ❋ཻུ۪۪⸙\n',
  after: `
*%npmname@^%version*
${'```%npmdesc```'}
`,
}
let handler = async (m, { conn, usedPrefix: _p, args, command }) => {
  let tags
  let teks = `${args[0]}`.toLowerCase()
  let arrayMenu = ['all', 'game', 'edukasi', 'news', 'nsfw', 'xp', 'stiker', 'image', 'anime', 'kerangajaib', 'quotes', 'admin', 'rpg', 'grup', 'premium', 'internet', 'anonymous', 'nulis', 'downloader', 'tools', 'fun', 'database', 'quran', 'audio', 'jadibot', 'info', 'vote', 'tanpakategori', 'owner', 'gift', 'thnks']
  if (!arrayMenu.includes(teks)) teks = '404'
  if (teks == 'all') tags = {
    'main': 'Utama',
    'game': 'Game',
    'xp': 'Exp & Limit',
    'fun': 'Fun',
    'jodoh': 'Jodoh',
    'anime': 'Anime',
    'anonymous': 'Anonymous Chat',
    'kerang': 'Kerang Ajaib',
    'quotes': 'Quotes',
    'absen': 'Absen',
    'admin': `Admin`,
    'group': 'Grup',
    'internet': 'Internet',
    'edukasi': 'Edukasi',
    'quran': 'Islam',
    'sticker': 'Stiker',
    'nulis': 'MagerNulis & Logo',
    'downloader': 'Downloader',
    'tools': 'Tools',
    'database': 'Database',
    'jadibot': 'Jadi Bot',
    'info': 'Info'
  }
  if (teks == 'game') tags = {
    'game': 'Game'
  }
  if (teks == 'xp') tags = {
    'xp': 'Exp & Limit'
  }
  if (teks == 'news') tags = {
    'news': 'News'
  }
  if (teks == 'edukasi') tags = {
    'edukasi': 'Edukasi'
  }
  if (teks == 'nsfw') tags = {
    'hentai': 'NSFW',
    'nsfw': 'HENTAI',
  }
  if (teks == 'stiker') tags = {
    'sticker': 'Stiker'
  }
  if (teks == 'rpg') tags = {
    'rpg': 'Epic Rpg'
  }
  if (teks == 'kerangajaib') tags = {
    'kerang': 'Kerang Ajaib'
  }
  if (teks == 'quotes') tags = {
    'quotes': 'Quotes'
  }
  if (teks == 'admin') tags = {
    'admin': `Admin ${global.opts['restrict'] ? '' : '(Dinonaktifkan)'}`
  }
  if (teks == 'grup') tags = {
    'group': 'Grup'
  }
  if (teks == 'premium') tags = {
    'premium': 'Premium'
  }
  if (teks == 'internet') tags = {
    'internet': 'Internet'
  }
  if (teks == 'image') tags = {
    'image': 'Random Image'
  }
  if (teks == 'anonymous') tags = {
    'anonymous': 'Anonymous Chat'
  }
  if (teks == 'nulis') tags = {
    'nulis': 'MagerNulis & Logo'
  }
  if (teks == 'downloader') tags = {
    'downloader': 'Downloader'
  }
  if (teks == 'tools') tags = {
    'tools': 'Tools'
  }
  if (teks == 'fun') tags = {
    'fun': 'Fun',
    'jodoh': 'Jodoh'
  }
  if (teks == 'jodoh') tags = {
    'jodoh': 'Jodoh'
  }
  if (teks == 'database') tags = {
    'database': 'Database'
  }
  if (teks == 'vote') tags = {
    'vote': 'Voting',
    'absen': 'Absen'
  }
    if (teks == 'anime') tags = {
    'anime': 'Anime'
  }
  if (teks == 'quran') tags = {
    'quran': 'Islam'
  }
  if (teks == 'gift') tags = {
    'gift': 'Gift'
  }
  if (teks == 'audio') tags = {
    'audio': 'Pengubah Suara'
  }
  if (teks == 'jadibot') tags = {
    'jadibot': 'Jadi Bot'
  }
  if (teks == 'info') tags = {
    'info': 'Info'
  }
  if (teks == 'owner') tags = {
    'owner': 'Owner',
    'host': 'Host',
    'advanced': 'Advanced'
  }


  try {
    let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))
    let { exp, limit, level, role, registered } = global.db.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let name = registered ? global.db.data.users[m.sender].name : conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.help) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    if (teks == '404') {
      return conn.relayWAMessage(conn.prepareMessageFromContent(m.chat, {
        "listMessage": {
          "title": `${ucapan()}, _${name}_`.trim(),
          "description": `┏─── ⳹°❀❬ _Putbotz_ ❭❀°
│✎ _Aktif Selama ${uptime}_
│✎ _Baterry_ ${conn.battery != undefined ? `${conn.battery.value}% ${conn.battery.live ? '🔌 Charging' : ''}` : 'tidak diketahui'}
│✎ _Terblock_ *${conn.blocklist.length}*
│✎ _Chat Terbanned_ *${Object.entries(global.db.data.chats).filter(chat => chat[1].isBanned).length}*
│✎ _Pengguna Terbanned_ *${Object.entries(global.db.data.users).filter(user => user[1].banned).length}*
┗──────┈ ⳹ ❋ཻུ۪۪⸙`.trim(),
                        "footerText": "© 𝕻𝖚𝖙𝖇𝖔𝖙𝖟",
                                  "buttonText": "Click Here!",
          "listType": "SINGLE_SELECT",
          "sections": [
                            {
                                "rows": [{
                                         "title": "📊 ❯╾ Status ╼-",
                                         "description": "Status Putbotz",
                                         "rowId": ".botstat"
                                    }, {
                                         "title": "            🗒️ ❯╾ Info ╼-",
                                         "description": "Menampilkan Info Bot",
                                         "rowId": ".info"
                                    }, {
                                         "title": "                  🎐 ❯╾ Creator Putbotz ╼-",
                                         "description": "Kontak Creator ku ^~^",
                                         "rowId": ".creator"
                                    }, {
                                         "title": "                        📌 ❯╾ Biodata Owner ╼-",
                                         "description": "biodata owner ku ≧ω≦",
                                         "rowId": ".biodata"
                       }],
                    "title": "✧───────────────[ Stats ]───────────────✧"
                }, {
                  "rows": [{
                  "title": "🧾› 𐐪-Menu 01-𐑂",
                  "description": "All Commands",
                  "rowId": ".? all"
                }, {
                  "title": "🎮› 𐐪-Menu 02-𐑂",
                  "description": "Game",
                  "rowId": ".? game"
                }, {
                  "title": "✨› 𐐪-Menu 04-𐑂",
                  "description": "Exp & limit",
                  "rowId": ".? xp"
                }, {
                  "title": "🧩› 𐐪-Menu 05-𐑂",
                  "description": "Fun",
                  "rowId": ".? fun"
                }, {
                  "title": "⛩️› 𐐪-Menu 08-𐑂",
                  "description": "Anime",
                  "rowId": ".? anime"
                },  {
                  "title": "🕋› 𐐪-Menu 10-𐑂",
                  "description": "Islami",
                  "rowId": ".? quran"
                }, {
                  "title": "🏫› 𐐪-Menu 11-𐑂",
                  "description": "Edukasi",
                  "rowId": ".? edukasi"
                }, {
                  "title": "🎫› 𐐪-Menu-𐑂 13",
                  "description": "Sticker",
                  "rowId": ".? stiker"
                }, {
                  "title": "🐚› 𐐪-Menu 14-𐑂",
                  "description": "Kerang ajaib",
                  "rowId": ".? kerangajaib"
                }, {
                  "title": "📑› 𐐪-Menu 15-𐑂",
                  "description": "Quotes",
                  "rowId": ".? quotes"
                }, {
                  "title": "👑› 𐐪-Menu 16-𐑂",
                  "description": "Admin Group",
                  "rowId": ".? admin"
                }, {
                  "title": "👥› 𐐪-Menu 17-𐑂",
                  "description": "Group Chat",
                  "rowId": ".? grup"
                }, {
                  "title": "🌟› 𐐪-Menu 18-𐑂",
                  "description": "Premium Users",
                  "rowId": ".? premium"
                }, {
                  "title": "💻› 𐐪-Menu 19-𐑂",
                  "description": "Internet",
                  "rowId": ".? internet"
                }, {
                  "title": "🎭› 𐐪-Menu 20-𐑂",
                  "description": "Anonymous Chat",
                  "rowId": ".? anonymous"
                }, {
                  "title": "✍️› 𐐪-Menu 21-𐑂",
                  "description": "Menulis & Membuat Logo",
                  "rowId": ".? nulis"
                }, {
                  "title": "📥› 𐐪-Menu 22-𐑂",
                  "description": "Downloader",
                  "rowId": ".? downloader"
                }, {
                  "title": "🧰› 𐐪-Menu 23-𐑂",
                  "description": "Tools",
                  "rowId": ".? tools"
                }, {
                  "title": "📂› 𐐪-Menu 24-𐑂",
                  "description": "Database",
                  "rowId": ".? database"
                }, {
                  "title": "🗳️› 𐐪-Menu 25-𐑂",
                  "description": "Vote & Absen",
                  "rowId": ".? vote"
                }, {
                  "title": "🤖› 𐐪-Menu 27-𐑂",
                  "description": "Jadibot",
                  "rowId": ".? jadibot"
                }, {
                  "title": "ℹ️› 𐐪-Menu 28-𐑂",
                  "description": "Info",
                  "rowId": ".? info"
                }, {
                  "title": "🧑‍💻› 𐐪-Menu 29-𐑂",
                  "description": "Owner",
                  "rowId": ".? owner"
                }],
                                "title": "✧───────────────[ Menu ]───────────────✧"
                                }, {
                                "rows": [{
                                "title": "                        🗳️ ❯╾ Donasi ╼-",
                                "description": "Donasi kak, jangan enak pakenya doang",
                                "rowId": ".donasi"
                                }, {
                                "title": "                  🔖 ❯╾ Sewa ╼-",
                                "description": "Menampilkan List harga sewabot",
                                "rowId": ".sewa"
                                }, {
                                "title": "            ℹ️ ❯╾ Rules Putbotz ╼-",
                                "description": "Mau diban bang?",
                                "rowId": ".rules"
                                }, {
                                "title": "      🧰 ❯╾ Last Update Putbotz ╼-",
                                "description": "fitur fitur yang ditambah oleh © Putbotz",
                                "rowId": ".updateee"
                                }],
                                "title": "✧────────────────[ Info ]────────────────✧"
                            }
                        ], "contextInfo": 
						{ "stanzaId": m.key.id,
                        "participant": "0@s.whatsapp.net",
                        "remoteJid": "6283136505591-1614953337@g.us",
                        "quotedMessage": m.message
						}
                    }
                 }, {}), {waitForAck: true})
    }
    // gunakan ini jika kamu menggunakan whatsapp bisnis
    //   throw `
    // ┌〔 DAFTAR MENU 〕
    // ├ ${_p + command} all
    // ├ ${_p + command} game
    // ├ ${_p + command} xp
    // ├ ${_p + command} stiker
    // ├ ${_p + command} kerang
    // ├ ${_p + command} quotes
    // ├ ${_p + command} admin
    // ├ ${_p + command} group
    // ├ ${_p + command} premium
    // ├ ${_p + command} internet
    // ├ ${_p + command} anonymous
    // ├ ${_p + command} nulis
    // ├ ${_p + command} downloader
    // ├ ${_p + command} tools
    // ├ ${_p + command} fun
    // ├ ${_p + command} database
    // ├ ${_p + command} vote
    // ├ ${_p + command} quran
    // ├ ${_p + command} audio
    // ├ ${_p + command} jadibot
    // ├ ${_p + command} info
    // ├ ${_p + command} tanpa kategori
    // ├ ${_p + command} owner
    // └────  
    //     `.trim()
    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
      // for (let tag of plugin.tags)
      //   if (!(tag in tags)) tags[tag] = tag
    }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Jasa Hosting oleh https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '(Limit)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Premium)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.user.name,
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp <= 0 ? `Siap untuk *${_p}levelup*` : `${max - exp} XP lagi untuk levelup`,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      level, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    await conn.send2ButtonLoc(m.chat, await (await fetch(fla + teks)).buffer(), text.trim(), 'made with ❤️ by Putbotz Ganteng', 'Pemilik Bot', `${_p}owner`, 'Donasi', `${_p}donasi`, m)
  } catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error (LAG WOY)', m)
    throw e
  }
}
handler.help = ['menu', 'help', '?']
handler.tags = ['main']
handler.command = /^(menu|help|\?)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 3

module.exports = handler

const more = String.fromCharCode(1)
const readMore = more.repeat(1)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
function ucapan() {
  const time = moment.tz('Asia/Jakarta').format('HH')
  res = "_Woy tidur Jangan Bergadang_"
  if (time >= 4) {
    res = "_Selamat Pagi_"
  }
  if (time > 10) {
    res = "_Selamat Tengah Hari_"
  }
  if (time >= 15) {
    res = "_Selamat Petang_"
  }
  if (time >= 18) {
    res = "_Selamat Malam_"
  }
  return res
}
