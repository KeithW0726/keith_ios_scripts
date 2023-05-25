const cookieName = 'V2EX'
const cookieKey = 'chavy_cookie_v2ex'
const cookieVal = $request.headers['cookie']


function get_cookie(){
    
    try {
        // 请求头
    const head = $request.headers
    console.log(head);
    if (cookieVal) {
        let cookie = $peristentStore.write(cookieVal, cookieKey)
        if (cookie) {
          let msg = `${cookieName}`
          $notification.post(msg, 'Cookie写入成功', '详见日志')
          console.log(msg)
          console.log(cookieVal)
        }
      }
    } catch (err) {
        console.log(`错误：${err}`);
    }
    
}

get_cookie({})




