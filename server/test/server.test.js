const expect = require("expect");
const request = require("supertest");
const {ObjectID}=require("mongodb");
const {app} = require("./../server");
const {User} = require("./../models/user");
const {Todo} = require("./../models/todo");
const {todos,populateTodos,users,populateUsers} = require("./seed/seed");
beforeEach(populateUsers);
beforeEach(populateTodos);

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

describe("GET /users/me", () =>{
   it("Deberia retornar un usuario si esta logueado",(done)=>{
      request(app)
       .get("/users/me")
           .set("x-auth",users[0].tokens[0].token)
           .expect(200)
           .expect((res)=>{
            expect(res.body._id).toBe(users[0]._id.toHexString());
            expect(res.body.email).toBe(users[0].email);
           })
           .end(done);
   });

   it("Deberia retornar 401 si no esta logueado",(done)=>{
        request(app)
            .get("/users/me")
            .expect(401)
            .expect((res)=>{
            expect(res.body).toEqual({});
            })
            .end(done);
   });
});

describe("POST /users", () =>{
    it("Deberia crear un usuario", (done)=>{
       var email = "example@example.com";
       var password = "1234abc";

       request(app)
           .post("/users")
           .send({email,password})
           .expect(200)
           .expect((res)=>{
            expect(res.headers["x-auth"]).toExist();
            expect(res.body._id).toExist();
            expect(res.body.email).toBe(email);
           })
           .end((err)=>{
            if(err){
                return done(err);
            }

            User.findOne({email}).then((user)=>{
                expect(user).toExist();
                expect(user.password).toNotBe(password);
                done();
            }).catch((e)=>{
                   done(e);
               });
           });

    });

    it("Deberia retornar error si el request es invalido", (done)=>{
        var email= "a";
        var password ="123";
        request(app)
            .post("/users")
            .send({email,password})
            .expect(400)
            .end(done)
    });

    it("Deberia no crear usuario si el email esta en uso", (done)=>{
        var email ="Matias@gmail.com";
        request(app)
            .post("/users")
            .send({email})
            .expect(400)
            .end(done)
    });

})

describe("POST /users/login", ()=>{
   it("Deberia loguear user y retornar el auth token",(done)=>{
      request(app)
          .post("/users/login")
          .send({
              email:users[1].email,
              password:users[1].password
          })
          .expect(200)
          .expect((res)=>{
            expect(res.headers["x-auth"]).toExist();
          })
          .end((err,res)=>{
            if(err){
                return done(err);
            }
            User.findById(users[1]._id).then((user)=>{
               expect(user.tokens[0]).toInclude({
                  access: "auth",
                   token: res.headers["x-auth"]
               });
               done();
            }).catch((e)=>done(e));
          });
   });

   it("Deberia reject login invalido",(done)=>{
        request(app)
            .post("/users/login")
            .send({
                email:users[1].email,
                password:"12345678"
            })
            .expect(400)
            .expect((res)=>{
                expect(res.headers["x-auth"]).toNotExist();
            })
            .end((err,res)=>{
                if(err){
                    return done(err);
                }
                User.findById(users[1]._id).then((user)=>{
                    expect(user.tokens.length).toBe(0);
                    done();
                }).catch((e)=>done(e));
            });
   });
});

describe("DELETE /users/token/me",()=>{
   it("Deberia eliminar el auth token al desloguearse",(done)=>{
       request(app)
           .delete("/users/me/token")
           .set("x-auth",users[0].tokens[0].token)
           .expect(200)
           .end((err,res)=>{
            if(err){
                return done(err);
            }

            User.findById(users[0]._id).then((user)=>{
               expect(user.tokens.length).toBe(0);
               done();
            }).catch((e)=>done(e));
           });
   })
});