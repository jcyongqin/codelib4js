"use scrict";
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
function sleep(milliScend) {
    let startTime = Date.now();
    while (Date.now() < startTime + milliScend)
        ;
}
exports.sleep = sleep;
function doTaskAsync(task) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`start task ${task}`);
        sleep(2000);
        return "task done";
    });
}
function testAsync() {
    return __awaiter(this, void 0, void 0, function* () {
        let result = doTaskAsync("新任务");
        console.log(`任务完成 ${yield result}`);
    });
}
testAsync();
function* gen() {
    console.log("doing something");
    sleep(2000);
    let numIn = yield;
    console.log("go on doing " + numIn);
    sleep(2000);
}
function doTaskPromise(task) {
    function Task(resolve, reject) {
        console.log("do task " + task);
        sleep(2000);
        resolve("task done");
    }
    return new Promise(Task);
}
let testPromise = () => {
    doTaskPromise("新任务")
        .then((reslot) => console.log("任务完成" + reslot));
};
function doTask(task, cb) {
    console.log("do task " + task);
    sleep(2000);
    cb(undefined, "done");
}
function testGen() {
    // 不执行
    let co = gen();
    // 开始第一次执行
    co.next();
    console.log(co.next("新任务").done ? "结束" : "");
}
let testCallback = () => {
    doTask("新任务", (err, rel) => err ? "" : console.log(rel));
};
//# sourceMappingURL=app.js.map