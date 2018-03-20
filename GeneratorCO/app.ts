"use scrict";


export function sleep(milliScend: number) {
    let startTime = Date.now();
    while (Date.now() < startTime + milliScend);
}

async function doTaskAsync(task: string) {
    console.log(`start task ${task}`);
    sleep(2000);
    return "task done";
}

async function testAsync() {
    let result = doTaskAsync("新任务");
    console.log(`任务完成 ${await result}`);
}

testAsync();




function* gen(): Iterator<number> {
    console.log("doing something");
    sleep(2000);
    let numIn = yield;
    console.log("go on doing " + numIn);
    sleep(2000);
}

function doTaskPromise(task: string): Promise<string> {
    function Task(resolve: (resolve: string) => void, reject: (reject) => void): void {
        console.log("do task " + task);
        sleep(2000);
        resolve("task done");
    }

    return new Promise<string>(Task);
}

let testPromise = () => {

    doTaskPromise("新任务")
        .then((reslot) => console.log("任务完成" + reslot));
}

function doTask(task: string, cb: (err: string, result: string) => void) {
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

}