const expect = require("expect");
const request = require("supertest");
const {ObjectID}=require("mongodb");
const {app} = require("./../server");

const {Todo} = require("./../models/todo");


const todos = [{
    _id:new ObjectID(),
    text: "Primer test"
},{
    _id:new ObjectID(),
    text: "Segundo test",
    completed: true,
    completedAt: 333
}];

beforeEach((done)=>{
    Todo.remove({}).then(()=>{
        return Todo.insertMany(todos);
    }).then(()=>{
        done();
    })
});

describe("POST /todos", ()=>{
    it("Deberia crear un nuevo todo", (done)=>{
        var text ="Probando";

        request(app)
            .post("/todos")
            .send({text})
            .expect(200)
            .expect((res)=>{
                expect(res.body.text).toBe(text);
            })
            .end((err,res)=>{
                if(err){
                    return done(err);
                }
                Todo.find({text}).then((todos)=>{
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e)=>done(e));
            });
    });

    it("No deberia crear un todo con un cuerpo invalido",(done)=>{
        request(app)
            .post("/todos")
            .send({})
            .expect(400)
            .end((err,res)=>{
                if(err) {
                    return done(err);
                }
                Todo.find().then((todos)=>{
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e)=>done(e));
            });
    });
});

describe("GET /todos",()=>{
    it("Deberia mostrar todos los todos",(done)=>{
        request(app)
            .get("/todos")
            .expect(200)
            .expect((res)=>{
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe("GET /todos/:id",()=>{
    it("Deberia mostrar un todo",(done)=>{
        request(app)
        .get("/todos/"+todos[0]._id.toHexString())
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });

    it("Deberia devolver 404 si no se encuentra el todo",(done)=>{
        var hexId = new ObjectID().toHexString();
        request(app)
        .get("/todos/"+ObjectID().toHexString())
        .expect(404)
        .end(done);
    });

    it("Deberia devolver 404 si hay algun id que no sea object",(done)=>{
        request(app)
        .get("/todos/123ab")
        .expect(404)
        .end(done);
    });


});

describe("DELETE /todos/:id", ()=>{
    it("Deberia remover un todo",(done)=>{
        var hexId = todos[1]._id.toHexString();

        request(app)
            .delete("/todos/"+hexId)
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo._id).toBe(hexId);
            })
            .end((err,res)=>{
                if(err){
                    return done(err);
                }
                Todo.findById(hexId).then((todo)=>{
                    expect(todo).toNotExist();
                    done();
                }).catch((e)=> done(e));
            });
    });

    it("Deberia devolver 404 si no encuentra el todo",(done)=>{
        var hexId = new ObjectID().toHexString();
        request(app)
        .delete("/todos/"+ObjectID().toHexString())
        .expect(404)
        .end(done);
    });

    it("Deberia devolver 404 si el id es invalido",(done)=>{
        request(app)
        .delete("/todos/123ab")
        .expect(404)
        .end(done);
    });
});

describe("PATCH /todos/:id", () =>{
   it("Deberia updatear todo",(done)=>{
       var hexId = todos[0]._id.toHexString();
       var text = "Hola";
       request(app)
           .patch("/todos/"+hexId)
           .send({
               completed: true,
               text
           })
           .expect(200)
           .expect((res)=>{
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completed).toBe(true);
            expect(res.body.todo.completedAt).toBeA("number");
           })
           .end(done);

   });

   it("Deberia vaciar completedAt cuando todo no esta completo",(done)=>{
    var hexId = todos[1]._id.toHexString();
    var text = "Cambiando";
    request(app)
        .patch("/todos/"+hexId)
        .send({
            completed:false,
            text
        })
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completed).toBe(false);
            expect(res.body.todo.completedAt).toNotExist();
        })
        .end(done);
   });
});