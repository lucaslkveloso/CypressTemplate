import { faker } from '@faker-js/faker';

describe('User Cases', () => {

    const name = faker.person.fullName();
    const gender = faker.person.sex();
    const email = faker.internet.email();
    let userId;

    it('Authentication', () => {
        cy.login()
    })   

    it('Should create a new user', ()=>{
        cy.createUser(name, gender, email).then((response) => 
        {
            expect(response.status).to.equal(201)
            expect(response.body).to.have.property('id')
            expect(response.body.name).to.equal(name)
            expect(response.body.gender).to.equal(gender)
            expect(response.body.email).to.equal(email)
            userId = response.body.id
            cy.log(userId)
        });
    })

    it('Should get the created user', ()=>{
        cy.getUser(userId).then((response) => 
        {
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('id')
            expect(response.body.name).to.equal(name)
            expect(response.body.gender).to.equal(gender)
            expect(response.body.email).to.equal(email)
            expect(response.body.status).to.equal("active")

        });
    })

    it('Should update the user status', ()=>{
        cy.updateUser(userId).then((response) => 
        {
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('id')
            expect(response.body.name).to.equal(name)
            expect(response.body.status).to.equal("inactive")

        });
    })

    it('Should delete the user', ()=>{
        cy.deleteUser(userId).then((response) => 
        {
            expect(response.status).to.equal(204)

        });
    })

    it('Validating if the user was delete (example of code reuse)', ()=>{
        cy.getUser(userId).then((response) => 
        {
            expect(response.status).to.equal(404)
            expect(response.body.message).to.equal('Resource not found')
        });
    })
})