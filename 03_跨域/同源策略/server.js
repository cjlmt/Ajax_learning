const express = require('express')

const app = express()

app.get('/home', (request, response) => {
    // 响应一个页面 , sendFile要写绝对路径
    response.sendFile(__dirname + '/index.html')
    //地址栏访问这个127.0.0.1：9000/home 的时候，会跳到这个界面
})

app.get('/data', (request, response) => {
    response.send('用户数据')
})

// 不和之前的使用同一个端口号
app.listen(9000, () => {
    console.log('服务已经启动');
})