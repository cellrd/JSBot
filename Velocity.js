var token = (webpackChunkdiscord_app.push([[''],{},e=>{m=[];for(var c in e.c)m.push(e.c[c])}]),m).find(m=>m?.exports?.default?.getToken!==void 0).exports.default.getToken()
function headers(token, type) {
  if (type.includes('Bot')) {
    return {'content-type': 'application/json', 'Authorization': `Bot ${token}` }
  }
  else {
    return {'content-type': 'application/json', 'Authorization': token }
  }
}
function check_for_guild() {
  if (window.location.href.includes('@me')) {
    return 'Not In A Guild'
  }
  else {
    if (window.location.href.includes('channels/1')) {
      return window.location.href.split('/')[5]
    }
  }
}
if (window.location.href.includes('ptb.') == true) {
  var client = window.location.href.replace(window.location.href.toString(), 'https://ptb.discord.com')
}
if (window.location.href.includes('canary.') == true) {
  var client = window.location.href.replace(window.location.href.toString(), 'https://canary.discord.com')
}
if (window.location.href.includes('https://discord.com') == true) {
  var client = window.location.href.replace(window.location.href.toString(), 'https://discord.com')
}
function make_channels(name) {
  if (check_for_guild().includes('Not In A Guild')) {
    alert('Your Not In A Guild Page. Click On A Guild To Run This Function')
    return NaN
  }
  else {
    fetch(`${client}/api/v9/${check_for_guild()}/channels`, {
      method: 'POST',
      headers: headers(token, 'User'),
      body: JSON.stringify({'name': name.toString(), 'type': '0' })
    })
  }
}
function make_roles(name) {
  if (check_for_guild().includes('Not In A Guild')) {
    alert('Your Not In A Guild Page. Click On A Guild To Run This Function')
    return NaN
  }
  else {
    fetch(`${client}/api/v9/guilds/${check_for_guild()}/roles`, {
      method: 'POST',
      headers: headers(token, 'User'),
      body: JSON.stringify({'name': name.toString()})
    })
  }
}
function get_user_pfp(user_id) {
  fetch(`${client}/api/v9/users/${user_id}/profile`, {
    headers: headers(token, 'User')
  }
  )
    .then(response => {
      return `https://cdn.discordapp.com/avatars/${response.json()['user']['id']}/${response.json()['user']['avatar']}`
    })
}
function token_checker(token_queued) {
  fetch(`${client}/api/v9/users/@me`, {
    headers: headers(token_queued, 'User')
  })
    .then(response => {
      if (response.status.toString().startsWith('2')) {
        fetch('https://discordapp.com/api/users/@me/settings', {
          headers: headers(token_queued, 'User')
        })
          .then(_response => {
            return {'user_id': response.json()['id'], 'username': response.json()['username'], 'discriminator': response.json()['discriminator'], '2fa': response.json(['mfa_enabled']), 'email': response.json()['email'], 'phone': response.json()['phone'], 'theme': _response.json()['theme'], 'locale': _response.json()['locale'] }
          })
      } else {
        fetch(`${client}/api/v9/users/@me`, {
          headers: headers(token_queued, 'Bot')
        })
          .then(response => {
            if (response.status.toString().startsWith('2')) {
              if (response.status.toString().startsWith('4')) {
                return 'Token Is Invalid'
              } else {
                return {'user_id': response.json()['id'], 'username': response.json()['username'], 'discriminator': response.json()['discriminator'] }
              }
            }
          })
      }
    })
}
function export_chat() {
  fetch(`${client}/api/v9/channels/${window.location.href.toString().split('/')[5]}/messages?limit=50`, {
    headers: headers(token, 'User')
  })
    .then(response => response.json())
    .then(data => {
      var chat_logs = []
      for (var i = 0; i < data.length; i += 1) {
        chat_logs.push(`${data[i]['author']['username']}#${data[i]['author']['discriminator']} | ${data[i]['content']}`)
      }
      return chat_logs
    })
}
function purge() {
  fetch(`${client}/api/v9/users/@me`, {
    headers: headers(token, 'User')
  })
    .then(response => response.json())
    .then(userData => {
      var client_id = userData['id']
      fetch(`${client}/api/v9/channels/${window.location.href.toString().split('/')[5]}/messages?limit=50`, {
        headers: headers(token, 'User')
      })
        .then(response => response.json())
        .then(data => {
          for (let i = 0; i < data.length; i++) {
            if (data[i]['author']['id'] === client_id) {
              fetch(`${client}/api/v9/channels/${window.location.href.toString().split('/')[6]}/messages/${data[i]['id']}`, {
                method: 'DELETE',
                headers: headers(token, 'User')
              })
            }
          }
        })
    })
}
function check_gift(code) {
  fetch(`${client}/api/v9/entitlements/gift-codes/${code}??with_application=false&with_subscription_plan=true`)
    .then(response => {
      if (response.status.toString().startsWith('2')) {
        return 'Gift Is Valid'
      } else {
        if (response.status.toString() === '429') {
          return 'Ratelimited'
        } else {
          return 'Gift Is Invalid'
        }
      }
    })
}
