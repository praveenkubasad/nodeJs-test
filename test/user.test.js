const supertest = require("supertest");
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const app = require('../app');
const expect = chai.expect;

chai.use(chaiAsPromised);


describe("POST /users", function(){
  it("should fail to create a user without a firstName",async() => {
    const res = await supertest(app)
      .post("/users")
      .send({
              lastName: 'Smith',
              age: 16,
              profession: 'gamer',
            })
            console.log(res.status)
            expect(res.status).to.equal(400);  
           
  });
 
  it('should create a user', async () => {
    const user = {
      firstName: 'John',
      lastName: 'Smith',
      age: '16',
      profession: 'gamer',
    };
    const res = await supertest(app).post('/users').send(user);    
    expect(res.status).to.equal(201);
   expect(res.body.firstName).to.equal(user.firstName);
   expect(res.body.lastName).to.equal(user.lastName);
   expect(res.body.age).to.equal(user.age);
  expect(res.body.profession).to.equal(user.profession);
  });

  it('shuould fetch all user',async()=>{
    const res = await supertest(app).get('/users').send();
    expect(res.status).to.equal(200);
  })

  it('shuould fetch user by name',async()=>{
    const res = await supertest(app).get('/users?name=praveen123').send();    
    expect(res.status).to.equal(200);
    expect(res.body[0].firstName).to.equal('praveen123');    
    expect(res.body[0].lastName).to.equal('Smith');
    expect(res.body[0].age).to.equal('27');
   expect(res.body[0].profession).to.equal('sr engineer');
  })

  it('should update a user', async () => {
    const user = {
      firstName: 'praveen1234',
      lastName: 'Smith',
      age: '27',
      profession: 'sr engineer',
    };
    const res = await supertest(app).put('/users').send(user);    
    expect(res.status).to.equal(200);    
   expect(res.body.firstName).to.equal(user.firstName);
   expect(res.body.lastName).to.equal(user.lastName);
   expect(res.body.age).to.equal(user.age);
  expect(res.body.profession).to.equal(user.profession);
  });
  
});

