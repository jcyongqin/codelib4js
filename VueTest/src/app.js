"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const route = require("koa-route");
//定义Application
let app = new Koa();
//定义中间件
let md = (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    // 设置response的Content-Type:
    ctx.response.type = "text/html";
    // 设置response的内容:
    ctx.response.body = "<h1>Hello, koa2!</h1>";
    yield next();
});
let mdLog = (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    console.log(`${ctx.request.method}: ${ctx.request.url}`);
    yield next();
});
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
        if (!pet)
            return ctx.throw('cannot find that pet', 404);
        ctx.body = pet.name + ' is a ' + pet.species;
    }
};
app.use(route.get('/pets', pets.list));
app.use(route.get('/pets/:name', pets.show));
app.listen(5500);
console.log("Server is running at http://127.0.0.1:5500/");
//# sourceMappingURL=app.js.map