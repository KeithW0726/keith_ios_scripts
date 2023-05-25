const cookieName = 'V2EX'
const cookieKey = 'chavy_cookie_v2ex'
const cookieVal = $request.headers['Cookie']


function get_cookie(){
    if (cookieVal) {
        let cookie = $peristentStore.write(cookieVal, cookieKey)
        if (cookie) {
          let msg = `${cookieName}`
          $notification.post(msg, 'Cookie写入成功', '详见日志')
          console.log(msg)
          console.log(cookieVal)
        }
      }
}

get_cookie({})




