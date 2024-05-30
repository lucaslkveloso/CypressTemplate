describe('User Validation Cases', () => {

    it('Authentication', () => {
        cy.login()
    })   

    it('Check To Do Schema', ()=>{
        cy.getTodos().then((response) => 
        {
            if (response.status == 200) 
                cy.schemaValidation(response.body)
        });
    })

    it('Check status', ()=>{
        cy.getTodos().then((response) => 
        {
            cy.statusValidation(response.body, (count) => {
                expect(count).to.equal(0);
            });           
        });
    })

})