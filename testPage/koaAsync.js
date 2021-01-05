const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

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

app.listen(4000)

