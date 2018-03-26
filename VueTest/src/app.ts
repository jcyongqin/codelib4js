import * as Koa from "koa";
import * as http from "http";
import { IncomingMessage, ServerResponse } from "http";
import { Context } from "koa";

let app = new Koa();
type KoaMiddleware = (ctx: Context, next: () => Promise<any>) => void;

let md: KoaMiddleware = (ctx, next) => {
    next();
    // 设置response的Content-Type:
    ctx.response.type = 'text/html';
    // 设置response的内容:
    ctx.response.body = '<h1>Hello, koa2!</h1>';
}

app.use(md);

// 创建http server，并传入回调函数:
let server = http.createServer((request: IncomingMessage, response: ServerResponse) => {
    // 回调函数接收request和response对象,
    // 获得HTTP请求的method和url:
    console.log(request.method + ": " + request.url);
    // 将HTTP响应200写入response, 同时设置Content-Type: text/html:
    response.writeHead(200, { 'Content-Type': "text/html" });
    // 将HTTP响应的HTML内容写入response:
    response.end("<h1>Hello world!</h1>");
});

// 让服务器监听8080端口:
server.listen(8080);

console.log("Server is running at http://127.0.0.1:8080/");