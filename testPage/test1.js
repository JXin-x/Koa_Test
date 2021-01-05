// koa开发restful接口
const Koa = require('koa')
const Router  = require('koa-router')
// 引用
const KoaBody = require('koa-body')
const KoaCors = require('@koa/cors')

const app = new Koa()
const router = new Router()

// 前缀，所有接口都需要加上api
router.prefix('/api')
// json格式处理使用koa-json插件

router.get('/params',ctx=>{
    // 获取params
    const params = ctx.request.query
    // 使用postman调用接口
    console.log(params)
    console.log(params.name,params.age)
    // ctx.body = 'hello,params'
    // body返回一个json对
    ctx.body={
        ...params
    }
})
router.post('/post',async ctx=>{
    const {body} = ctx.request
    console.log(body)
    console.log(ctx.request)
    ctx.body={
        ...body
    }
})

// 使用中间件
app.use(KoaBody())
app.use(KoaCors())

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000)