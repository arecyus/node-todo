const expect = require("expect");
const request = require("supertest");

const {app} = require("./../server");

const {Todo} = require("./../models/todo");

beforeEach((done)=>{
    Todo.remove({}).then(()=>{
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
                Todo.find().then((todos)=>{
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
                    expect(todos.length).toBe(0);
                    done();
                }).catch((e)=>done(e));
            });
    });
});