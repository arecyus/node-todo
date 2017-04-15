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
    text: "Segundo test"
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