# ajax

## 介绍

- 全称：Asynchronous Javascript And XML（异步JavaScript和XML）
- 特点：**网页不刷新的情况**下，在浏览器中向服务器发送异步的http请求，得到http响应
  - 每一次请求都可以在控制台的network中看到
  - ajax不是新的编程语言，而是将一种现有的标准组合在一起使用的新方式
  - *页面中所有的数据不是固定的，而是从服务器得到的，可以提高性能、加载速度，提高资源利用率*
- 应用：
  - 搜索框输入文字，下拉框更新服务器存储的相关词条
  - 注册时用户名检验是否已被使用，请求发给服务器校验数据库是否已经存在(不是是否规范)
  - 鼠标放在一级分类下弹出的二级分类框(*懒加载：数据用才加载、呈现，不用就不加载，按需加载*)
  - 滚动条滚到底，向服务端（服务器端）发送请求，**得到数据，对数据进行遍历，动态创建节点插入到文档中**，加载新内容（不需要刷新就可以看到更多内容）
  - 局部刷新，实现vue Router一样的效果也可以使用ajax（*但其实两者并不是一个东西，ajax重点是数据，切换路由时从服务器获取数据，vue路由是实现局部刷新效果的方式*）
- 目录：
  - xml
  - http协议（ajax发送的是http请求）
  - 原生ajax、jQuery、fetch函数和axios的发送方式（都说Fetch可以替代ajax）
  - ajax跨域问题
  - 服务端一些内容

## XML介绍

- 概念：
  - 可扩展标记语言
  - 和html类似，都由标签组成
- 作用：
  - 用于**传输和存储**数据
  - ajax数据交换之前使用的就是XML格式的字符串.比如服务器发送给客户端,前端再进行解析，提取并处理
    - 但是现在ajax使用的是**JSON**格式(**更加简洁，更容易数据转换**)
- 和HTML的区别
  - html用于网页呈现数据，xml用于传输和存储数据
  - html里都是预定义标签(div/span/p)，而xml全是自定义标签

## ajax优缺点

- 优点：
  - 无刷新实现页面和服务器通信
  - 允许你**根据用户事件（鼠标/键盘）来更新部分页面内容**，可以在用户特定行为下向服务器发送请求
- 缺点：
  - 没有浏览历史，不能回退。
  - 存在跨域问题(同源)，a.com向另一个服务器b.com发送请求默认是不允许的
  - SEO(搜索引擎优化)不友好，**爬虫爬不到页面里的很多数据，因为这些数据都不是写死在源代码里的，** *是通过ajax异步请求从服务器获取的*

## HTTP协议

- ### 概念

  - hypertext transport protocol === 超文本传输协议
  - 协议详细规定了浏览器和万维网服务器之间相互通信的规则/约定

- ### 约定内容（报文格式/结构）

  - #### 请求报文（浏览器->服务器）

    - **【行】**：
      
      - 请求类型(get/post)
      - url路径
      - HTTP协议的版本
    - **【头】**：
      - Host：atguigu.com
      - Cookie：name=guigu
      - Content-type：application/x-www-form-urlencoded（请求体是什么类型的）
      - User-Agent：chrome 83
    - **【空行】**  必须得有
    - **【请求体】**：
      - #### *如果是get请求，请求体必须为空*(单纯地读取数据)
      - #### *如果是post请求，请求体可以不为空*(写请求参数)
      - username=admin&password=admin
  
  - #### 响应报文（服务器->浏览器）
  
    - **【行】**：
      - 协议版本 HTTP/1.1
      - 响应状态码 200
      - 响应状态字符串 OK
    - **【头】**:
      - <img src="E:\porn\Vue\Ajax_learning\img\image-20230529162854190.png" alt="image-20230529162854190" style="zoom:80%;" /> 
      - 对响应体内容的描述。类型、长度、压缩方式
    - **【空行】**  必须得有
    - **【响应体】**：
      - <img src="E:\porn\Vue\Ajax_learning\img\image-20230529163216543.png" alt="image-20230529163216543" style="zoom:67%;" /> 
      - html内容，浏览器提取并解析
      - 如果响应只是用于跳转，则响应体内容为空

## 浏览器查看通信报文

- 以后调试ajax都要使用控制台里的Network，方便定位问题

- 请求

  - <img src="E:\porn\Vue\Ajax_learning\img\image-20230529170307615.png" alt="image-20230529170307615" style="zoom:67%;" />  新版的查询字符串参数移到payload里了

  - <img src="E:\porn\Vue\Ajax_learning\img\image-20230529170325522.png" alt="image-20230529170325522" style="zoom:67%;" /> 

- 响应
  - <img src="E:\porn\Vue\Ajax_learning\img\image-20230529170357203.png" alt="image-20230529170357203" style="zoom:67%;" /> Preview是对响应体内容解析后的预览

## node.js

- 介绍：就是一个应用程序，可以解析js分配计算机资源

- 作用：需要配置一个服务器

## Express服务端框架

- 介绍：是基于Node.js平台的web开发框架

- 为什么学习：

  - 因为ajax给服务端发请求，需要一个服务端
  - 只使用其基本的功能即可

- ### 安装

  - npm init --yes  初始化
  - npm i express
  - 目录不可以出现中文

- ### 引入express

  - ```js
    const express = require('express')
    ```

- ### 创建应用对象

  - ```js
    const app = express()
    ```

- ### 创建路由规则

  - ```js
    app.get('/',(requext,response)=>{
        //设置响应
        response.send('HELLO EXPRESS')
    })
    ```

  - request是对请求报文的封装

  - response是对响应报文的封装

- ### 监听端口启动服务

  - ```js
    app.listen(8000,()=>{
        console.log('服务已经启动，8000端口监听中')
    })
    ```

  - 这样下来就创建了一个服务器，用来接收反馈客户端传过来的数据

- ### 启动该服务器

  - *右击**服务器文件所在的根目录**，终端中输入*

    - ```shell
      node express基本使用.js
      ```

  - 启动成功后会**执行监听函数体的内容**，终端输出'服务已经启动，8000端口监听中'

  - 页面**发送get请求后会收到'HELLO EXPRESS'(响应体)**，并呈现在页面上

- #### 功能

  - 借助这个服务器，和前端的ajax做一个交互

## ajax发送请求准备

- ### 前端页面准备

  - 需求：点击按钮后，向服务端发送一个ajax请求，把服务端返回的响应体在div中做一个呈现。页面不会刷新

- ### 服务端代码准备

  - 将之前的代码复制过来

  - ```js
    app.get('/server', (requext, response) => {
        //设置响应头  设置允许跨域
        response.setHeader('Access-Control-Allow-Origin','*')
        //设置响应体
        response.send('HELLO AJAX')
    })
    ```

  - 将get函数的*第一个参数修改为/server，代表如果get请求的请求行的url路径是'/server'，则执行对应的回调函数*

  - setHeader是设置响应头的，第一个参数为属性名，第二个参数为属性值

- ### 注意

  - 如果端口已经被占用，服务器就会启动失败，要么需要释放该服务窗口，要么使用另一个端口

## ajax请求的基本操作

- 先获取按钮元素，然后给按钮绑定一个点击事件，*在点击事件的回调函数中进行以下的发送行为*

- ### 发送ajax请求

  - #### 创建对象

    ```js
    const xhr = new XMLHttpRequest()
    ```

    xhr就是ajax请求

  - #### 初始化；设置请求方法和url

    - 方法：open

    - ```js
      xhr.open('GET','http://127.0.0.1:8000/server')
      //第一个参数：请求的类型
      //第二个参数：url路径，给谁发
      ```

    - 路径包括http要写全不可以省略

  - #### 发送

    - ```js
      xhr.send()
      ```

  - #### 事件绑定

    - 作用：***处理服务端返回的结果***

    - ```js
      xhr.onreadystatechange = function(){
          //应该在属性值为4的时候才处理结果，因为此时服务端返回了所有数据
          //判断（服务端返回了所有的结果）
          if(xhr.readyState === 4){
              //判断响应状态码,只要是2开头的都是成功
              if(xhr.status >= 200 && xhr.status < 300){
                  //处理结果：行 + 头 + 空行 + 响应体
                  console.log(xhr.status) //响应状态码
                  console.log(xhr.statusText) //状态字符串 OK
                  console.log(xhr.getAllResponseHeaders()) //所有响应头
                  console.log(xhr.response) //响应体
              }
          }
      }
      //当readystate属性改变的时候
      ```

    - **readyState是xhr对象中的属性**，表示状态。值为：

      - 0：初始值，未初始化
      - 1：open方法调用完毕
      - 2：send方法调用完毕
      - 3：服务端返回了部分结果
      - 4：服务端返回了所有结果

    - 注意在判断readyState的时候，**S一定要是大写的**！！！

    - 并且输出响应头的时候要**加上()**表示调用该函数

- ### 页面呈现响应体的内容

  - ![image-20230529214628857](E:\porn\Vue\Ajax_learning\img\image-20230529214628857.png) 
  - *没有页面刷新就可以从服务器得到结果*

## ajax设置请求参数

- ajax请求当中如何**设置url的参数**
  - **<u>方式</u>**：*url后面用?隔开写参数名=参数值，多个参数用&分隔*
  - <img src="E:\porn\Vue\Ajax_learning\img\image-20230529223443657.png" alt="image-20230529223443657" style="zoom: 80%;" /> 
  - ![image-20230529223642607](E:\porn\Vue\Ajax_learning\img\image-20230529223642607.png) 
  - ![image-20230529223653754](E:\porn\Vue\Ajax_learning\img\image-20230529223653754.png) 

## ajax发送post请求

- 需求：当鼠标移到显示框上时，ajax发送POST请求，将响应体在显示框中做呈现

- ```js
  const result = document.querySelector('#result')
  result.addEventListener('mouseover', function () {
      //检测鼠标移入 => mouseover
      //创建对象
      const xhr = new XMLHttpRequest()
      //初始化：设置请求类型和url
      xhr.open('POST', 'http://127.0.0.1:8000/server')
      //发送请求
      xhr.send()
      //事件绑定
      xhr.onreadystatechange = function () {
          //状态判断
          if (xhr.readyState === 4) {
              if (xhr.status >= 200 && xhr.status < 300) {
                  //处理服务端返回的结果
                  result.innerHTML = xhr.response
              }
          }
      }
  })
  ```

- *如果报错，是因为服务器没有与该请求匹配的路由规则，而且没有设置响应头*

- 路由规则是区分GET和POST的，发送的get请求才会匹配app.get()配置的路由规则。post请求匹配的是app.post()，否则匹配不上

- 所以服务器要做出的修改：

  - ```js
    app.post('/server', (requext, response) => {
        //设置响应头
        response.setHeader('Access-Control-Allow-Origin', '*')
        //设置响应体
        response.send('HELLO EXPRESS POST')
    })
    ```

- *post请求是可以传递参数的*

  - get不是也可以初始化时在url中传递？
  - 只有post可以在请求体中传递参数

## post请求设置参数/请求体

- *参数放在post请求的请求体当中，可以在控制台的request payload中查看*
- 请求体在**xhr.send()**发送请求中传入

- url参数形式（**用的比较多**，JSON用的也多）
  - ![image-20230529231343020](E:\porn\Vue\Ajax_learning\img\image-20230529231343020.png) 
- 键值对形式
  - ![image-20230529231658330](E:\porn\Vue\Ajax_learning\img\image-20230529231658330.png) 
- *其实可以传输任意格式的请求体，只要服务端能处理就行*。
- #### ==POST请求的参数既可以通过url传递，也可以通过send放在请求体中传递。都可以在payload中查看==

  - <img src="E:\porn\Vue\Ajax_learning\img\image-20230531190352583.png" alt="image-20230531190352583" style="zoom:80%;" /> 
  - <img src="E:\porn\Vue\Ajax_learning\img\image-20230531190421396.png" alt="image-20230531190421396" style="zoom:80%;" /> 


## ajax设置请求头信息

- **我们已经学会用xhr.open()初始化请求行信息，用xhr.send()设置请求体信息**

- xhr.open()初始化后调用setRequestHeader函数

  - ```js
    xhr.setRequestHeader('Contype-Type','application/x-www-form-urlencoded') //设置请求体类型为查询参数字符串
    //第一个参数：属性
    //第二个参数：属性值
    xhr.setRequestHeader('name','atguigu')
    //设置请求头多个属性就调用多次这个方法
    ```

- ### 添加自定义的请求头属性会报错，默认发不了

  - 原因：因为安全机制不给你发

  - 解决办法：服务器中多设置一个响应头属性(一般是后端负责)

    - ```js
      response.setHeader('Access-Control-Allow-Headers','*')
      ```

    - *表示所有类型的请求头信息都可以被接收*

- ### 但是还是不行

  - *因为在发送POST请求之前，还发送了一个OPTIONS请求（发送了非预定义的请求头信息所以需要通过OPTIONS请求进行校验头信息是否可用）*

  - 而OPTIONS请求没有对应的结果/路由，所以不能发送这个POST请求

  - ```js
    app.all('/server',function(){})
    ```

  - *all表示可以接收任意类型的请求*

  - 如果还是不行，很大可能是修改了服务器但是没有重新关闭开启

- ### 作用

  - *用于身份校验*，将身份信息放在请求头信息中，传递给服务器，服务器对参数提取并校验
  - 作用主要依赖于请求头中预定义的属性

## 服务端响应JSON数据

- 向服务端发送请求，绝大多数情况返回的都是JSON格式的结果

- ### 需求：

  - 按下某个按键，发送请求，服务端返回JSON结果，在页面呈现

- ### 事件绑定：

  - ```js
    window.onkeydown = function () {}
    ```

- ### open初始化请求url

  - ```js
    xhr.open('GET', 'http://127.0.0.1:8000/json-server')
    ```

  - 不给/server发请求了，换一个发，服务器要多写一个匹配的路由规则

  - ```js
    app.all('/json-server', (requext, response) => {}
    ```

- ### 服务器将对象返回给浏览器

  - ```js
    //响应一个数据
    const data = {
        name:'atguigu'
    };
    //设置响应体
    response.send('')
    ```

  - response.send方法只能接收字符串，需要对对象进行格式转化

  - ```js
    let str = JSON.stringify(data)
    response.send(str)
    ```

  - ***新版不用转换，直接响应对象也可以被接收。==但是仍然是字符串类型，因为底层自动转换为了字符串==***

    - ![image-20230530150100809](E:\porn\Vue\Ajax_learning\img\image-20230530150100809.png) 

- ### 客户端处理返回的结果

  - 所以无论是否手动转换为字符串，在客户端中都要对响应的JSON字符串进行处理

  - #### 用JSON.parse()将字符串类型*手动*转为对象类型

    - ```js
      //客户端当中
      if (xhr.status >= 200 && xhr.status < 300) {
          let data = JSON.parse(xhr.response)
          result.innerHTML = data.name
      }
      ```

    - 如果页面中要显示一个对象data，得到的是<img src="E:\porn\Vue\Ajax_learning\img\image-20230530150612508.png" alt="image-20230530150612508" style="zoom: 80%;" /> 所以需要取出里面的属性

      - 不过log打印可以得到整个对象预览

  - #### *自动*转换:利用<u>xhr的一个属性</u>

    - ```js
      const xhr = new XMLHttpRequest()
      //设置响应体数据的类型
      xhr.responseType = 'json'
      ```

    - 页面直接使用xhr.response即可，已经被转换为对象了。这种方法比较方便

## nodemon自动重启工具

- 痛点：我们不断调试服务器代码的时候，需要不停关闭并启动服务器，很麻烦

- 作用：当文件内容修改并保存，自动重启服务端，方便改服务端代码

- **安装：**

  - ```shell
    npm i -g nodemon
    ```

- **开启自动重启服务：**

  - ```shell
    nodemon server.js
    ```

## ajax-IE缓存问题解决

- ### 解释：

  - IE浏览器会对ajax的请求结果进行缓存，*下一次发送相同的请求时，返回的是本地的缓存*，而不是服务器返回的最新数据。对有时效性要求的场景不友好

- 使用新的路由

  - ```js
    app.get('/ie', (requext, response) => {
        //设置响应头
        response.setHeader('Access-Control-Allow-Origin', '*')
        //设置响应体
        response.send('HELLO IE')
    })
    ```

- 此时修改服务器对应路由的响应体内容，**浏览器重新发送请求，收到的数据却仍是修改前的数据**（*IE浏览器下是这样，其他浏览器不会这样*）

- ### 解决办法：

  - ```js
    xhr.open('GET', 'http://127.0.0.1:8000/ie')
    // 修改为
    xhr.open('GET', 'http://127.0.0.1:8000/ie?t=' + Date.now())
    // 字符串拼接加一个参数
    ```

  - **Date.now()表示当前的时间戳**

  - *这样子，每次点击时的时间戳都不一样，url就不一样，所以浏览器会认为这是两次不同的请求。此时就会将新的请求发给服务器获取新的结果，而不是直接走本地缓存*

## ajax请求超时&网络异常处理

- 项目上线后，无法保证每次请求服务端都能及时快速响应，可能出现请求超时的情况。所以需要设置ajax请求超时/网络异常时的提示用户

- ### 需求：

  - 服务端返回响应时，添加超时设置(2s)，如果时间到了还没返回结果，则提醒用户（网络超时，稍后重试）

- ### 手动制造请求超时：

  - 应用新路由规则步骤省略

  - ```js
    app.get('/ie', (requext, response) => {
        //设置响应头
        response.setHeader('Access-Control-Allow-Origin', '*')
        //设置响应体
        setTimeout(() => {
            response.send('HELLO IE')
        }, 3000) //3s后才进行响应
    })
    ```

- ### 客户端超时设置

  - #### 超时设置

    - ```js
      const xhr = new XMLHttpRequest()
      //超时设置为2s，如果2s内还没有返回结果，则取消请求
      xhr.timeout = 2000
      ```

    - ![image-20230530163743617](E:\porn\Vue\Ajax_learning\img\image-20230530163743617.png) 请求超时取消请求

  - #### 超时回调

    - ```js
      //如果2s内没有返回响应则取消请求
      xhr.timeout = 2000
      //超时执行的回调
      xhr.ontimeout = function () {
          alert('网络异常，请稍后重试')
      }
      ```

  - #### 网络异常回调

    - ```js
      //网络异常的回调
      xhr.onerror = function () {
          alert('你的网络似乎出现了一些问题')
      }
      ```

## ajax手动取消请求

- ### 解释：

  - 请求的过程中，结果返回之前，可以**手动取消请求**

- ### 需求：

  - 点击发送按钮发送请求，点击取消按钮取消请求

- ### 取消：

  - 发送请求后不用写事件绑定onreadystatechange，不需要看到结果

  - *使用XMLHttpRequest对象的方法abort*

  - ```js
    cancelBtn.onclick = function(){
        xhr.abort()
    }
    ```

  - 响应之前取消才有用


## ajax重复发送请求问题

- ### 背景：

  - 当连续点击多次按钮发送请求时（比如网络不好的时候用户疯狂多次点击）就会向服务器发送大量的相同请求，服务器压力很大。

- ### 解决：

  - 发送请求之前***先查看有没有正在发送相同请求，如果有，则取消正在发送的请求(没完成的请求)，再发送新的请求。***对于相同的请求，*服务器始终只需要处理一个，并且是最后一个*。提升性能

  - ```js
    // 声明一个标识变量
    let isSending = false //表示是否正在发送AJAX请求
    
    send.addEventListener('click', () => {
        if (isSending === true) xhr.abort() //记得全等
        xhr = new XMLHttpRequest()
        isSending = true
        xhr.open('GET', 'http://127.0.0.1:8000/delay')
        xhr.send()
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                // 不判断状态码是因为请求很可能会失败
                //不管你请求是否成功，响应了都要修改false
                isSending = false
                //请求完成之后，还原为false
            }
        }
    })
    ```

- ### 注意：

  - *针对于网络不佳，请求没那么快响应的时候（**有响应时间，类似节流**）。如果请求响应很快，就不存在正在发送的请求，疯狂的点击服务器照样收到大量的请求*

## Jquery发送ajax请求

- cdn是方便快速引入在线库

- crossorigin="anonymous"(匿名)，向目标url发送请求时，不会携带当前域名的cookie

- 可以直接通过data发送参数

- ### 发送get请求

  - <img src="E:\porn\Vue\Ajax_learning\img\image-20230531171308877.png" alt="image-20230531171308877" style="zoom:67%;" /> 

  - *第四个参数设置响应体的数据类型*，如果不写，**默认响应体是字符串类型的**

    - ![image-20230531171750236](E:\porn\Vue\Ajax_learning\img\image-20230531171750236.png) 如果写明响应体是'json'类型，则打印出来的是对象

    - #### ==参数自动加到了url后面，可以在参数查询中看到==

- ### 发送post请求

  - <img src="E:\porn\Vue\Ajax_learning\img\image-20230531171852256.png" alt="image-20230531171852256" style="zoom: 67%;" /> 

    - ![image-20230531171427290](E:\porn\Vue\Ajax_learning\img\image-20230531171427290.png) 

      - #### ==post请求中，参数不是加到了url后面，而是放到了请求体中传递，可以在payload里查看==

- ### 通用型方法ajax（适用不同类型的请求）

  - <img src="E:\porn\Vue\Ajax_learning\img\image-20230531173309222.png" alt="image-20230531173309222" style="zoom:67%;" /> 
  - <img src="E:\porn\Vue\Ajax_learning\img\image-20230531183924483.png" alt="image-20230531183924483" style="zoom:80%;" /> ajax方法还可以传入头信息参数，但是这里的头信息是自定义的，所以还是会和之前一样报错
    - 要在对应路由规则中加上**response.setHeader('Access-Control-Allow-Headers','*')表示接收各种头信息**
    - *路由规则的请求类型改为all，因为客户端发送带有自定义信息的请求之前会发送OPTIONS类型的预检测请求*
    - **如果返回的响应体不是json类型，但是请求又要求响应体类型为json，也会报错**
    - ajax方法可以设置请求行，请求头，请求体，可以设置报文任何位置的参数。功能性强，简易程度不如get和post

## axios发送ajax请求

- axios是最热门的ajax工具*库*，vue和react推荐的ajax工具包

  - 作用：发送ajax请求
  - 可以在node.js中发送请求
  - 支持Promise（ES6推出的异步编程新解决方案）
  - 等等特性

- ### 使用：

  - ```shell
    npm i axios
    ```

  - 或者页面中使用cdn链接引入文件

- #### 语法和jQuery很像

- ### 发送GET请求

  - ```js
    // 配置baseURL
    axios.defaults.baseURL = 'http://127.0.0.1:8000'
    //发送请求时，可以对路径做简化
    
    btns[0].onclick = function () {
        // 发送GET请求
        axios.get('/axios-server', {
            // url参数（行参数）
            params: {
                id: 100,
                vip: 77
            },
            // 请求头信息（头参数）
            headers: {
                name: 'atguigu',
                age: 20
                // 如果是自定义参数记得服务器路由规则设置一下响应头(Access-Control-Allow-Headers)
            }
            // get请求设置不了请求体
        })
    }
    ```

  - #### *可以传入url参数，设置请求头信息*

  - 此外还有非常多的配置项，比如baseurl之类的

  - *响应数据返回和处理（jQuery里是回调函数success:function(){}），是基于Promise的*

    - ```js
      axios.get('/axios-server', {
          ...
      }).then(value => {
          console.log(value);
      })
      ```

    - 返回的结果对象包含配置，响应体data（响应体解析后的结果，自动把json转成对象），头信息，请求的原生ajax对象，响应状态码+字符串**（比较完整）**

- ### 发送POST请求

  - ```js
    btns[1].onclick = function () {
        axios.post('/axios-server',{
            	// 请求体	
                username: 'admin',
                password: 'admin'
            },
            {
            // url参数
            params: {
                id: 90,
                vip: 8
            },
            // 请求头参数
            headers: {
                height: 100,
                weight: 200
            },
        })
    }
    ```

  - #### *post的三个参数分别为：url + 请求体 + 其他配置*

    - <img src="E:\porn\Vue\Ajax_learning\img\image-20230531204115205.png" alt="image-20230531204115205" style="zoom:67%;" /> 客户端收到的请求体是json形式的字符串
    - *注意请求体一定要放到第二个参数，get因为没有请求体，使用就两个参数：url + 其他配置*
    - ![image-20230531204417873](E:\porn\Vue\Ajax_learning\img\image-20230531204417873.png) 
      - ~~奇怪的是post请求url携带了url参数~~，*因为url参数本来就是会显示在url上的*

  - **请求行、请求头、请求体，请求报文的结构设置非常清晰**

## axios函数发送ajax请求

- ***通用方式***发送请求（类似jQuery框架里的ajax方法）

- ### 方法：

  - ```js
    axios()
    ```

  - axios中直接传一个对象，对象里面有很多配置项（和jQuery很像）

  - ```js
    btns[2].onclick = function () {
        axios({
            // 请求方法(类型)
            methods: 'POST',
            // url
            url: '/axios-server',
            // url参数(行参数)
            params: {
                vip: 10,
                level: 30
            },
            // 请求头信息
            headers: {
                a: 100,
                b: 200
            },
            // 请求体参数
            data: {
                username: 'admin',
                password: 'admin'
            }
        }).then(response=>{
            //处理返回结果还是用then
            console.log(response) 
            //就是之前说的value
        })
    }
    ```

  - #### 响应里的内容都可以获取到

    - <img src="E:\porn\Vue\Ajax_learning\img\image-20230531205643580.png" alt="image-20230531205643580" style="zoom:67%;" /> 

  - #### ==**按照报文的结构来配置，非常贴合，很清晰，很惬意**==

## 使用fetch函数发送ajax请求

- fetch是全局对象，可以直接调用。*返回的结果是promise对象*。axios用的还是多一点

- ### 使用：

  - *第一个参数：url或者request对象(实验阶段)*

  - *第二个参数：配置对象(请求方法，头，体)，也是可以设置请求报文的任何位置*

  - ```js
    btn.onclick = function () {
        fetch('http://127.0.0.1:8000/fetch-server', {
            // 请求行
            method: 'POST',
            // 请求头
            headers: {
                name: 'atguigu'
            },
            // 请求体
            body: "username=admin&password=admin"
        }).then(response => {
            //处理返回的结果
            //返回的结果是promise对象
            return response.text()
    	}).then(response => {
            //返回请求体
            console.log(response)
        })
    }
    ```

  - ##### then()方法用来处理promise对象，response.text()或json()返回的仍是promise对象，两个then一起是promise的链式调用，*前一个then方法成功之后才调用下一个then方法*

    - ##### 在.then的一系列链式调用中，*每个.then都会生成一个新的promise*，*通过 return 来让后面的promise接收到onFullfill的值*

    - ##### 前一个then()方法中的回调函数中又可能返回一个Promise实例，这时候后面一个then()方法中的回调函数会等前一个Promise实例的状态发生变化才会调用。

## 跨域-同源策略

- 同源策略是Netscape公司提出的一种浏览器安全策略

- ### 描述：

  - **当前访问网页的url**(http/a.com/8000)和ajax**请求的目标资源所在url**(http/a.com/8000)，*两者的协议、域名、端口号必须完全相同。这样即满足同源策略*
  - *ajax默认遵循同源策略，不满足同源策略，无法发送直接ajax请求*
  - 同源就是指同一个来源，**网页所在服务器和请求的资源所在的服务器来自同一服务器的服务**

- ### 跨域：

  - 网页是a.com，向b.com发请求，则为跨域请求，不来自同一个服务
  - *违背同源策略就是跨域(3000->8000 / http->https)*
  - ***跨域在项目中经常出现，因为单台服务器，服务有上限(性能)，所以需要更多的服务器来提供更多的服务***（形成了跨域）

- ### 同源策略案例：

  - #### 需求：

    - 访问一个url(http:127.0.0.1:9000/home)，响应一个页面(index.html)
    - 点击页面的按钮(/data)，发送请求获得用户数据(response.send)

  - ```js
    btn.onclick = function () {
        const xhr = new XMLHttpRequest()
        // 因为是满足同源策略的，所以url可以简写
        //浏览器会自动加上协议、域名和端口
        xhr.open('GET', '/data')
        xhr.send()
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    console.log(xhr.response);
                }
            }
        }
    }
    ```

  - 页面是127.0.0.1:9000来的，用户数据也来自于127.0.0.1:9000，所以是同源的，可以直接发送ajax请求

- ### 如何解决跨域：

  - JSONP
  - CORS

## JSONP实现原理

- ### JSONP是什么

  - ===JSON with Padding，是一个非官方的*跨域解决方案*，纯粹凭借程序员的聪明才智开发出来，***只支持GET请求***

- ### 工作原理：

  - 网页中有一些标签(img/link/iframe/script)天生具有跨域能力，***JSONP就是利用script标签的跨域能力来发送请求的***
  - 在axios案例中，使用script引入axios库就是使用了一个cdn链接，这也是一个跨域请求
    - ![image-20230601165609521](E:\porn\Vue\Ajax_learning\img\image-20230601165609521.png) **file协议访问http协议的资源，当然是跨域请求**。但是不影响使用，说明**script本身支持跨域**

- ### ==其实使用script就是在发送请求获取资源，不管是否同源都能接收==：

  - #### ==*自动发送了一个GET请求*，引入的js代码等资源就作为响应体==

  - ```js
    //在一个html文件中引入js文件
    <script src="./js/app.js"></script>
    ```

  - 【**同源1**】**（比较熟悉）**：如果是本地打开网页，可以直接引入并执行app.js

  - 【**同源2**】但如果通过open with live server打开（url:http://127.0.0.1/···），则会发送一个请求获取app.js，注意是的

    - http访问页面，所以js文件的访问也一定是发送http协议的请求

  - 【**跨域**】但如果是*本地file协议打开网页*，但是使用*http协议从服务器引入app.js资源*，则会发送一个跨域请求，也能正常接收资源

    - <img src="E:\porn\Vue\Ajax_learning\img\image-20230603213743391.png" alt="image-20230603213743391" style="zoom:67%;" /> 

  - ==**这几个例子只是证明了script可以跨域**==

- ### JSONP的原理（使用script）：

  - 需求：使用script请求js资源，将里面的数据显示在html盒子中

  - ```js
    //客户端代码
    //老师对函数做了个封装
    function handle(data){
        const result = document.querySelector('#result')
        result.innerHTML = data.name
    }
    ```

  - ```js
    //服务端代码
    const data = {
        name:'尚硅谷atguigu'
    }
    handle(data)
    ```

    - #### ==**其实引入js文件和在html里面写script没什么区别**==

    - #### ==***script引入的js文件中的代码，作为响应的响应体返回回来，script标签对里面内容做一个解析和执行***==

- ### 原理进阶（==***其实就是访问路由规则send返回js代码***==）：

  - 真正的开发中不是直接访问资源的url地址(可能是不好维护的原因)，而是***客户端访问服务器***，通过路由规则，再通过`response.send()`返回响应体

    - ```js
      //客户端：访问服务器的对应路由规则
      <script src="http://127.0.0.1:8000/jsonp-server"></script>
      ```

      - ***结果返回了，可以在响应体(Response)中看到：就是responses.send()里的内容***

  - 之前说了script这种特殊的可以发送请求的标签，会对响应体里的内容进行解析和执行。所以路由规则返回给script发送的get请求的内容必须是js语句

    - ```js
      app.all('/jquery-jsonp-server', (request, response) => {
      	response.send('hello jsonp-sserver')
      })
      //如果只是返回普通的数据
      ```

      - ***我script本来就是处理js语句的，我给你服务器发请求你居然给我返回字符串，我js引擎解析不了，所以报错（unexpected identifier）***

    - ```js
      // jsonp实践/检测用户名是否存在
      app.all('/jquery-jsonp-server', (request, response) => {
          const data = {
              name: '尚硅谷',
              city: ['北京', '上海', '深圳']
          }
          // 将数据转化为字符串
          let str = JSON.stringify(data)
          // 返回结果
          response.end(`handle(${str})`)     //返回handle函数的调用，script标签执行，处理数据将数据呈现在网页中
      })
      ```

      - ***所以要响应script标签发送的请求，就要返回一段js代码。可以带上服务器自己的参数***

- ### 注意：

  - **之前一直使用send()，为什么突然用end()。**
    - respond.end()只能发送string类型或者Buffer类型，不会附带特殊响应头


## 原生JSONP实践

- ## ==***不是写死script标签，需要的时候才创建script标签***==

- ### ==上一节讲的是使用script标签直接引入js资源，这一节讲的是*原生JSONP如何动态的请求资源*==

  - 为什么叫原生JSONP实现跨域，因为后面有jQuery等框架对原生JSONP的封装

- ### 需求：

  - 用户名输入框输入内容后丧失交点，此时向服务端发送请求，检测用户名是否存在（这里不真的比对是否存在，直接返回已存在）返回不存在之后将input框的颜色变为红色

- ### html：

  - ```html
    用户名：<input type="text" id="username">
    <p></p>
    
    <script>
        // 获取元素
        const int = document.querySelector('input')
        const p = document.querySelector('p')
    
        // 声明handle函数
        // 作用:将边框变为红色；将msg显示在p标签中
        function handle(data) {
            int.style.border = 'solid 1px #f00'
            // 修改p标签的提示文本
            p.innerHTML = data.msg
        }
    
        // 绑定blur事件，也可以使用onblur
        int.addEventListener('blur', function () {
            //获取用户的输入值
            let username = this.value  //获取当前表单元素的属性value
            //向服务器端发送请求，检测用户名是否存在
            // 1.创建script标签
            const script = document.createElement('script')
            // 2.设置script标签的src属性
            script.src = "http://127.0.0.1:8000/check-username"
            // 3.将script插入到文档中(最后)，不然不会发送请求
            document.body.appendChild(script)
        })
    </script>
    ```

    - html页面是file协议访问的，请求的资源采用http协议
    - handle事先全局声明，后续请求被响应，*服务端返回一个handle函数的调用*
      - *浏览器看到是js语句就进行解析并执行，在handle中处理数据，实现了跨域*

- ### 服务器：

  - ```js
    // jsonp实践/检测用户名是否存在
    app.get('/check-username', (request, response) => {
        const data = {
            exist: 1,
            msg: '用户名已存在'
        }
        // 将数据转化为字符串
        let str = JSON.stringify(data)
        // 返回结果
        response.end(`handle(${str})`)
    })
    ```

    - 因为要把变量str传给handle这个函数在放到response.end中传递给客户端，所以要**使用模板字符串**

    - 使用script标签是发送了GET请求的，只是我们浏览器可能没显示

      - ![image-20230601214000027](E:\porn\Vue\Ajax_learning\img\image-20230601214000027.png) 

    - response.end()响应回来的响应体结果（我们浏览器也没显示出来），记得要是js语句才能被html解析

      - ![image-20230601214010339](E:\porn\Vue\Ajax_learning\img\image-20230601214010339.png) 

    - #### ==必须手动把对象转换为JSON字符串再响应给客户端，客户端收到会自动将JSON格式字符串转换为对象==

- ### 总结：

  - ##### ==服务端配好路由规则，html中 创建标签 + 设置请求url + 添加元素到页面==

## jQuery发送JSONP请求

- 因为进行了封装，所以非常方便

- #### 作用：发送跨域请求

- ### 需求：

  - 点击按钮，向8000端口发请求，服务器返回的结果在div中呈现

- ### 解决：

  - ```js
    $('button').eq(0).click(function () {
        // 如何发送jsonp请求
        $.getJSON('http://127.0.0.1:8000/jquery-jsonp-server?callback=?', function (data) {
            //console.log(data);
            $('#resultl').html(`
            	名称:${data.name}
            	校区:${data.city}
            `)
        })
    })
    ```

    - 第一个参数：url，给谁发请求

    - 第二个参数：*回调函数，用来处理服务端返回的数据*

    - 注意：***用jQuery发jsonp请求，要在url参数的最后补?callback=?(固定写法)***,**==callback只是jQuery里的内容不要搞混==**

      - 实际发送请求时，url参数callback会带一个值
      - ![image-20230602205301175](E:\porn\Vue\Ajax_learning\img\image-20230602205301175.png) 
      - 服务端接收到之后把值作为函数调用的函数去拼接字符串（jQuery已经注册了一个函数，数据响应回来之后，返回这个函数的调用，前端就可以对数据做一个处理）
    - #### ==*说白了就是jQuery发送jsonp请求后，客户端会执行服务器返回的js代码，但是不会执行收到数据的回调函数。如果想要执行，就要在响应体返回的js代码中调用。怎么在服务器中调用客户端的回调函数呢？要使用到前面说的url参数callback，请求会把回调函数作为callback的值发送给服务器，服务器在请求行中获取这个callback url参数，就相当于获取了调用回调函数的资格，就可以执行回调函数处理响应体中的数据*==

  - ```js
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
        response.end(`${cb}(${str})`)
    })
    ```

  - 客户端收到服务端响应的js语句，并且执行了js代码

## CORS发送跨域请求

除了jsonp的另一种解决方案，是**官方的跨域解决方案**

- ### 概念

  - Cross-Origin-Resourse-Sharing 跨域资源共享 

- ### 特点：

  - 客户端不需要做任何特殊操作，完全在服务器中进行处理，就可以实现跨域
  - 支持get和post请求等请求
  - 跨域资源共享标准新增了***一组HTTP首部字段***（响应头），**允许服务器声明哪些源站通过浏览器有权限访问哪些资源**

- ### 使用：

  - ***客户端照样用ajax步骤发跨域请求***，***服务端设置响应头就可以实现跨域***，==***非常方便、简单，只用加响应头设置就可以了***==
  - 我们其实以前就已经使用过该方法了

- ### 案例：

  - #### 需求：

    - 点击按钮发送请求，将响应的结果在div中做呈现

  - ```js
    const btn = document.querySelector('button')
    const result = document.querySelector('#result')
    btn.onclick = function () {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', 'http:127.0.0.1:8000/cors-server')
        xhr.send()
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    // result.innerHTML = JSON.parse(xhr.response).name
                    result.innerHTML = xhr.response
                }
            }
        }
    }
    ```

    - 这个随便看一眼就行了，之前写过很多次，很基础

  - 如果服务端没有设置响应头，客户端发送跨域请求（file -> http）就会报错

    - ![image-20230603230853367](E:\porn\Vue\Ajax_learning\img\image-20230603230853367.png)
    - 请求被CORS跨域共享机制阻挡了，因为服务端没有返回==***'Access-Control-Allow-Origin'这个响应头***==
    - 所以要想跨域请求，要在服务端返回结果的时候设置一个响应头。允许跨域

  - ```js
    app.all('/cors-server', (request, response) => {
        const data = {
            name: '尚硅谷',
            city: ['北京', '上海', '深圳']
        }
        
        //设置响应头，允许跨域
        response.setHeader('Access-Control-Allow-Origin', '*')  //就是这一句
        //*表示通配，所有的网页都好使
    
        let str = JSON.stringify(data)
        response.send(str)
    })
    ```

    - *如果只想允许某一个网站可以向本服务发送请求，则设置响应头第二个参数为`http://127.0.0.1:5500`*

- ### 其他响应头：

  - ==Access-Control-Allow-Origin==：最基础的，哪些网页可以给我们发请求。值设置为*则所有跨域请求都可以接受
  - Access-Control-Expose-Headers：用来暴露（响应）头部信息
  - Access-Control-Max-Age：预请求的结果缓存
  - Access-Control-Allow-Credentials：跨域请求时是否可以携带验证信息，cookie等
  - ==Access-Control-Allow-Methods==：设置请求允许的方法，默认允许get和post
  - ==Access-Control-Allow-Headers==：指明请求中允许携带的头字段，**如果是请求头中有自定义属性，就会报错不让发送**。路由中要设置允许的头字段('*')，则表示头信息可以自定义 

## 请求get和post的区别

- ***get传递参数只能在地址栏中传递***，而~~post的参数不在地址栏中显示~~，post除了可以在地址栏中传递，还可以通过请求体传递
  - *POST请求，url参数和请求体可以同时设置*，***url参数就是会显示在地址栏中，只是说post请求可以让参数不出现在地址栏中(使用请求体传参)***

- get请求会直接跟在地址后面，这是直接能获取到的数据，怎么就安全了？get是比post效率要高，安全性要差





















