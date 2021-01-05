// koa 的简单使用

// ***********************1**********************//
// const Koa = require('koa')
// const app = new Koa()
// 1.request ,method,respond  发送请求，get、post方法，响应？返回json格式怎么办
// 2.api url => function ,router   不同url实现不同的方法（需要路由），路由在koa的实现原理
// 3.ctx,async  上下文和async的用法

// ctx在这里包括整个应用的上下文，相当于一个令牌，有了ctx，可以对用户所有的请求和响应进行处理
// app.use(async ctx => {
//     console.log(ctx)
//     console.log(ctx.request)
//     ctx.body = 'hello world'
// })

// app.listen(3000)

//***********************2.使用koa-router*********************//
const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

//middleware:中间件要处理的内容，相当于一个功能模块
router.get('/',ctx => {
    // 要处理的内容
    console.log(ctx)
    console.log(ctx.request)
    ctx.body = 'hello,world'
})

router.get('/api',ctx => {
    console.log(ctx)
    console.log(ctx.request)
    ctx.body = 'hello,api'
})

router.get('/async',async (ctx)=>{
    let result1 = await new Promise((resolve)=>{
        setTimeout(function(){
            resolve('hello')
        },5000)
    })
    ctx.body = result1
})

// allowedMethods:拦截器，拦截应用里面没有的请求，返回一个4xx或者5xx的错误
// router.routers():把前面定义的路由方法，添加到应用上，作为中间件去处理
// 应用上面属于链式操作
app.use(router.routes())
    .use(router.allowedMethods())

app.listen(3000)

