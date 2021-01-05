const Koa = require('koa')
const Router = require('koa-router')

const KoaBody = require('koa-body')
const KoaCors = require('@koa/cors')

const app = new Koa()
const router = new Router()

router.get('/test',ctx=>{
    const params = ctx.request.query
    const headers = ctx.request.header
    console.log(headers.role)
    if(headers.role !='admin'){
        ctx.body={
            code:'401',
            msg:'unauthorized post'
        }
    }else if(!params.name || !params.email){
        ctx.body={
            code:'404',
            msg:'name与email不得为空'
        }
    }else{
        ctx.body={
            code:'200',
            data:{
                ...params
            },
            msg:'上传成功'
        }
    }

})
// 使用中间件
app.use(KoaBody())
app.use(KoaCors())
app.use(router.routes()).use(router.allowedMethods())
app.listen(3000)