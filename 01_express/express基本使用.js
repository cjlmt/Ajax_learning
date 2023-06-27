const express = require('express')

const app = express()

app.get('/', (requext, response) => {
    //设置响应
    response.send('HELLO EXPRESS')
})

app.listen(8000, () => {
    console.log('服务已经启动,8000')
})
