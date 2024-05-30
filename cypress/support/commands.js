let token; 

Cypress.Commands.add('login', () => {

    //here, an authentication method should be used.
    // to avoid using my personal data, I defined a token that will expire on 07/Jun.   
    token = Cypress.env('token')
    cy.log('User authenticated')
    
})

// user commands
Cypress.Commands.add('createUser', (name, gender, email) => {
    cy.request({
        method: 'POST',
        url: `/users`,
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
        },
        failOnStatusCode: false,
        body: {
        "name": name,
        "gender": gender,
        "email": email,
        "status": "active"
        }
    })
})

Cypress.Commands.add('getUser', (userId) => {
    cy.request({
        method: 'GET',
        url: `/users/${userId}`,
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
        },
        failOnStatusCode: false
    })
})  

Cypress.Commands.add('updateUser', (userId) => {
    cy.request({
        method: 'PATCH',
        url: `/users/${userId}`,
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
        },
        failOnStatusCode: false,
        body: {
        "status": "inactive"
        }
    })
}) 

Cypress.Commands.add('deleteUser', (userId) => {
    cy.request({
        method: 'DELETE',
        url: `/users/${userId}`,
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
        },
        failOnStatusCode: false
    })
})  

Cypress.Commands.add('errorList', (rbody) => {
    rbody.forEach(body => {
        const field = body.field;
        const message = body.message;
        cy.log(`Field: ${field}: ${message}`)
    })
})  

Cypress.Commands.add('userAuth', () => {
    cy.request({
        method: 'POST',
        url: `/users`,
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        failOnStatusCode: false
    })
}) 

Cypress.Commands.add('wrongMethod', (name, gender, email) => {
    cy.request({
        method: 'TRACE',
        url: `/users/123`,
        headers: {
        'Accept': 'C',
        'Content-Type': 'X/teste',
        'Authorization': token
        },
        body: {
        "name": name,
        "gender": gender,
        "email": email,
        "status": "active"
        },
        failOnStatusCode: false
    })
}) 


//todos

Cypress.Commands.add('getTodos', () => {
    cy.request({
        method: 'GET',
        url: `/todos`,
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        failOnStatusCode: false
    })
}) 

Cypress.Commands.add('schemaValidation', (rbody) => {
    rbody.forEach(body => {
        const id = body.id;
        const user_id = body.user_id;
        const title = body.title;
        const due_on = body.due_on;
        const status = body.status
        cy.log(`
        Id found with value: ${id},
        User Id found with value: ${user_id},
        Title found with value: ${title},
        Due On found with value: ${due_on},
        Status found with value: ${status}
        `)
    })
})  

Cypress.Commands.add('statusValidation', (rbody, callback) => {
    let i = 0;
    rbody.forEach(body => {
        const status = body.status;
        if(status != "completed") {
            i++
            cy.log(`Status found with value: ${status}`)
        }
    })
    if (callback) {
        callback(i);
    }
})  