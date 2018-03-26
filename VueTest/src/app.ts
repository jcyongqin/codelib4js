import * as Koa from "koa";
import {  Middleware } from "koa";
import * as route from "koa-route";

import * as koaStatic from "koa-static";
import { Context } from "vm";


//定义Application
let app = new Koa();

//定义中间件
let md: Middleware = async (ctx, next) => {
    
    // 设置response的Content-Type:
    ctx.response.type = "text/html";
    // 设置response的内容:
    ctx.response.body = "<h1>Hello, koa2!</h1>";
    await next();
}

let mdLog: Middleware = async (ctx, next) => {
    console.log(`${ctx.request.method}: ${ctx.request.url}`);
    await next();
}

app.use(md);


//定义路由方法

const db = {
    tobi: { name: 'tobi', species: 'ferret' },
    loki: { name: 'loki', species: 'ferret' },
    jane: { name: 'jane', species: 'ferret' }
};

const pets = {
    list: (ctx) => {
        const names = Object.keys(db);
        ctx.body = 'pets: ' + names.join(', ');
    },

    show: (ctx, name) => {
        const pet = db[name];
        if (!pet) return ctx.throw('cannot find that pet', 404);
        ctx.body = pet.name + ' is a ' + pet.species;
    }
};

app.use(route.get('/pets', pets.list));
app.use(route.get('/pets/:name', pets.show));






app.listen(5500);



console.log("Server is running at http://127.0.0.1:5500/");