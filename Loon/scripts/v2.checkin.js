const cookieName = 'V2EX'
const cookieKey = 'chavy_cookie_v2ex'
const cookieVal = $persistentStore.read(cookieKey)

function sign() {
  let prama = {
    url: `https://www.v2ex.com/mission/daily`,
    headers: {
      Cookie: cookieVal
    }
  }

  $httpClient.get(prama).then((response) => {
    let data = response.body
    if (data.indexOf('每日登录奖励已领取') >= 0) {
      let title = `${cookieName}`
      let subTitle = `签到结果: 签到跳过`
      let detail = `今天已经签过了, ${data.match(/已连续登录 (\d+?) 天/)[0]}`
      console.log(`${title}, ${subTitle}, ${detail}`)
      $notification.post(title, subTitle, detail)
      $done()
    } else {
      signMission(data.match(/<input[^>]*\/mission\/daily\/redeem\?once=(\d+)[^>]*>/)[1])
    }
  })
}

function signMission(code) {
  let prama = {
    url: `https://www.v2ex.com/mission/daily/redeem?once=${code}`,
    headers: { Cookie: cookieVal }
  }
  $httpClient.get(prama).then((response) => {
    let data = response.body
    if (data.indexOf('每日登录奖励已领取') >= 0) {
      let title = `${cookieName}`
      let subTitle = `签到结果: 签到成功`
      let detail = `V2ex今日签到成功：${data.match(/已连续登录 (\d+?) 天/)[0]}`
      console.log(`${title}, ${subTitle}, ${detail}`)
      $notification.post(title, subTitle, detail)
    } else {
      let title = `${cookieName}`
      let subTitle = `签到结果: 签到失败`
      let detail = `详见日志`
      console.log(`签到失败: ${cookieName}, data: ${data}`)
      $notification.post(title, subTitle, detail)
    }
    $done()
  })
}

sign({})
