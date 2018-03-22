console.log('Hello world');

module APP {
    var dependenciesMap;
    function warp(next: any) {
        return function (...args) {
            console.log("Before");
            let temp = next(args);
            console.log("After");
            return temp;
        }
    }

    function doTask(parameters) {
        console.log(parameters);
    }

    class Pencil {
        public printName() {
            console.log("This is a pencil");
        }
    }

    class Eraser {
        public printName() {
            console.log("This is eraser");
        }
    }

    class NoteBook {
        public printName() {
            console.log("This is notebook");
        }
    }

    @Inject(NoteBook, Pencil, Eraser)
    class Student {
        pencil: Pencil;
        eraser: Eraser;
        notebook: NoteBook;

        public constructor(notebook: NoteBook, eraser: Eraser, pencil: Pencil) {
            this.pencil = pencil;
            this.eraser = eraser;
            this.notebook = notebook;
        }

        public write() {
            if (!this.pencil || !this.notebook) {
                throw new Error("依赖未满足");
            }
            console.log("Writing...");
        }

        public draw() {
            if (!this.pencil || !this.notebook || !this.eraser) {
                throw new Error("依赖未满足");
            }
            console.log("Drawing ...");
        }
    }

    let injector = {
        resolve: (constructor) => {
            let dependecies = dependenciesMap[constructor.name];
            dependecies = dependecies.map((dependency) => new dependency);
            /**
             * es5语法替换下面一行代码
             * let mockConstructor=()=>constructor.apply(this,dependecies);
             * mockConstructor.prototype=constructor.prototype;
             * return new mockConstructor();
             */
            return new constructor(...dependecies);
        }
    };

    function Inject(...dependencies) {
        dependenciesMap = Object();
        function retFun(constructor) {
            dependenciesMap[constructor.name] = dependencies;
            return constructor;
        }

        return retFun;
    }

    (() => {
        let student = injector.resolve(Student);
        console.log(student instanceof Student);
        student.eraser.printName();
        student.pencil.printName();
        student.notebook.printName();
        student.write();
        student.draw();
    })();
}
