var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
console.log('Hello world');
var APP;
(function (APP) {
    var dependenciesMap;
    function warp(next) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.log("Before");
            var temp = next(args);
            console.log("After");
            return temp;
        };
    }
    function doTask(parameters) {
        console.log(parameters);
    }
    var Pencil = /** @class */ (function () {
        function Pencil() {
        }
        Pencil.prototype.printName = function () {
            console.log("This is a pencil");
        };
        return Pencil;
    }());
    var Eraser = /** @class */ (function () {
        function Eraser() {
        }
        Eraser.prototype.printName = function () {
            console.log("This is eraser");
        };
        return Eraser;
    }());
    var NoteBook = /** @class */ (function () {
        function NoteBook() {
        }
        NoteBook.prototype.printName = function () {
            console.log("This is notebook");
        };
        return NoteBook;
    }());
    var Student = /** @class */ (function () {
        function Student(notebook, eraser, pencil) {
            this.pencil = pencil;
            this.eraser = eraser;
            this.notebook = notebook;
        }
        Student.prototype.write = function () {
            if (!this.pencil || !this.notebook) {
                throw new Error("依赖未满足");
            }
            console.log("Writing...");
        };
        Student.prototype.draw = function () {
            if (!this.pencil || !this.notebook || !this.eraser) {
                throw new Error("依赖未满足");
            }
            console.log("Drawing ...");
        };
        Student = __decorate([
            Inject(NoteBook, Pencil, Eraser)
        ], Student);
        return Student;
    }());
    var injector = {
        resolve: function (constructor) {
            var dependecies = dependenciesMap[constructor.name];
            dependecies = dependecies.map(function (dependency) { return new dependency; });
            /**
             * es5语法替换下面一行代码
             * let mockConstructor=()=>constructor.apply(this,dependecies);
             * mockConstructor.prototype=constructor.prototype;
             * return new mockConstructor();
             */
            return new (constructor.bind.apply(constructor, [void 0].concat(dependecies)))();
        }
    };
    function Inject() {
        var dependencies = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            dependencies[_i] = arguments[_i];
        }
        dependenciesMap = Object();
        function retFun(constructor) {
            dependenciesMap[constructor.name] = dependencies;
            return constructor;
        }
        return retFun;
    }
    (function () {
        var student = injector.resolve(Student);
        console.log(student instanceof Student);
        student.eraser.printName();
        student.pencil.printName();
        student.notebook.printName();
        student.write();
        student.draw();
    })();
})(APP || (APP = {}));
//# sourceMappingURL=app.js.map