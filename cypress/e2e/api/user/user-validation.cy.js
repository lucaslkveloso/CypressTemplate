import { faker } from '@faker-js/faker';

describe('User Validation Cases', () => {

    const name = faker.person.fullName();
    const gender = faker.person.sex();
    const email = faker.internet.email();
    let userId;

    it('Authentication', () => {
        cy.login()
    })   

    it('[401] - User not authorized', ()=>{
        cy.userAuth().then((response) => 
        {
            expect(response.status).to.equal(401);

        });
    })

    it('[404] - User not found', ()=>{
        cy.getUser(0).then((response) => 
        {
            expect(response.status).to.equal(404);

        });
    })
    it('[405] - Method not allowed', ()=>{
        cy.wrongMethod(name, gender, email).then((response) => 
        {
            expect(response.status).to.equal(405);

        });
    })
    it('[422] - Should fail to create an user without name and email', ()=>{
        cy.createUser(null, gender, "teste").then((response) => 
        {
            if (response.status == 422) 
                cy.errorList(response.body)

        });
    })

})