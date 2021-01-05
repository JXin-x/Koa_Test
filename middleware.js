const Koa = require('koa')
const app = new Koa()

const middleware = function async(ctx,next) {
    console.log('这里是middleware1')
    next()
    console.log('这里是middleware1 ending')
}

const middleware2 = function async(ctx,next) {
    console.log('这里是middleware2')
    next()
    console.log('这里是middleware2 ending')
}

const middleware3 = function async(ctx,next) {
    console.log('这里是middleware3')
    next()
    console.log('这里是middleware3 ending')
}

app.use(middleware)
app.use(middleware2)
app.use(middleware3)

app.listen(3000)

// 打印顺序，整个应用按照use的链式调用，顺序调用，碰到next()丢到use顺序的下一个中间件 执行完之后先进后出执行回调funciton（打印一些日志啊，清理一些不必要的缓存信息或者销毁某个函数的执行）
// 这里是middleware1
// 这里是middleware2
// 这里是middleware3
// 这里是middleware3 ending
// 这里是middleware2 ending
// 这里是middleware1 ending
