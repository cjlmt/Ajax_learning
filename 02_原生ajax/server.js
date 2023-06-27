const express = require('express')

const app = express()

app.get('/server', (requext, response) => {
    //设置响应头
    response.setHeader('Access-Control-Allow-Origin', '*')
    //设置响应体
    response.send('HELLO EXPRESS')
})

app.all('/server', (requext, response) => {
    //设置响应头
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Headers', '*')
    //设置响应体
    response.send('HELLO EXPRESS POST')
})

app.all('/json-server', (requext, response) => {
    //设置响应头
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Headers', '*')
    const data = {
        name: 'atguigu'
    }
    //设置响应体
    // let str = JSON.stringify(data)
    // response.send(data)
    response.send('HELLO EXPRESS POST 2')
})

app.get('/ie', (requext, response) => {
    //设置响应头
    response.setHeader('Access-Control-Allow-Origin', '*')
    //设置响应体
    response.send('HELLO IE')
})

app.all('/delay', (requext, response) => {
    //设置响应头
    response.setHeader('Access-Control-Allow-Origin', '*')
    //设置响应体
    setTimeout(() => {
        response.send('延时响应')
    }, 3000)
})

app.all('/axios-server', (requext, response) => {
    //设置响应头
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Headers', '*')

    //设置响应体
    response.send('延时响应')
})

// fetch服务
app.all('/fetch-server', (requext, response) => {
    //设置响应头
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Headers', '*')

    //设置响应体
    response.send('延时响应')
})

//jsonp服务
app.all('/jsonp-server', (request, response) => {
    // response.send('hello jsonp-server')
    response.send('console.log("hello jsonp - server")')
})

// jsonp实践/检测用户名是否存在
app.all('/check-username', (request, response) => {
    const data = {
        exist: 1,
        msg: '用户名已存在'
    }
    // 将数据转化为字符串
    let str = JSON.stringify(data)
    // 返回结果
    response.end(`handle(${str})`)
})

// jsonp实践/检测用户名是否存在
app.all('/jquery-jsonp-server', (request, response) => {
    const data = {
        name: '尚硅谷',
        city: ['北京', '上海', '深圳']
    }
    // 将数据转化为字符串
    let str = JSON.stringify(data)
    //接收callback参数
    let cb = request.query.callback; //记住是怎么取的
    // 返回结果
    response.end(`console.log(${str})`)
    // response.end(`${cb}(${str})`)
})

// cors
app.all('/cors-server', (request, response) => {
    const data = {
        name: '尚硅谷',
        city: ['北京', '上海', '深圳']
    }

    response.setHeader('Access-Control-Allow-Origin', '*')

    let str = JSON.stringify(data)
    response.send(str)
})

app.listen(8000, () => {
    console.log('服务已经启动,8000端口监听中')
})
