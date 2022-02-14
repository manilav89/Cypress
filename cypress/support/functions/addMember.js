function fillPasswordAndCompleteRegistration(new_password, confirm_password)
{
    cy.get('#new_password').type(new_password)
    cy.get('#confirm_password').type(confirm_password)
    cy.get('#register_btn_submit').dblclick({scrollBehavior : "nearest"}, {force: true})
    cy.get('.signup-header').should('contain', 'Almost there!')


    cy.get('#gender').select('Female')
    cy.get('#bday_day').select('5')
    cy.get('#bday_month').select('Jun')
    cy.get('#bday_year').select('2000')
    cy.get('#length').clear().type('150')
    cy.get('#weight').type('54')
    cy.get('#submit_btn').click()
    cy.get('.member_status_active').should('contain', 'active')
}


export class AddMember{

    addNewClient(firstname, lastname, email, new_password, confirm_password)
    {
        cy.contains("Add new client").click()
        cy.get('#firstname').type(firstname)
        cy.get('#lastname').type(lastname)
        cy.get('#email').type(email)
        cy.get('#save').click()
        cy.contains('Activate manually').click()
        cy.on('window:confirm', (str) => {
            expect(str).to.equal('Activation by coach should only be done with client present. Are you sure?')
        })

        fillPasswordAndCompleteRegistration(new_password, confirm_password)

    }
// There are 2 options to create a new account or connect to existing

    addNewStaff(firstname, lastname, email, new_password, confirm_password, staffPermission)
    {
        cy.contains("Add new employee").click()
        cy.get('#firstname').type(firstname)
        cy.get('#lastname').type(lastname)
        cy.get('#email').type(email)
        cy.get('tr td div label').contains('label', staffPermission).click()
        cy.get('#save').click()
        cy.contains('Activate manually').click()

         fillPasswordAndCompleteRegistration(new_password, confirm_password)

    }
}

export const addNewMember = new AddMember()