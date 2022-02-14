// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })



Cypress.Commands.add('setProfileTo', (profile) => {

    cy.get('.user-menu-data').click();

    cy.get('.user-menu-switcher > a > :nth-child(2)').invoke('text').then((text) => {

        if (text === 'Switch to ' + profile) {
            cy.get('.user-menu-switcher > a').click()
        }else{
            cy.get('.user-menu-data').click();
        }
    })
})

Cypress.Commands.add('logout', () => {

    cy.get('.user-menu-data').click();

    cy.get('.user-menu-dropdown').contains('Logout').click();


})

Cypress.Commands.add('loginUI', (email, password) => {

    cy.get('input[name="username"]').click().type(email);

    cy.get('input[name="password"]').click().type(password);

    cy.get('button[id="login_btn"]').click();

})

Cypress.Commands.add('getURL', (club, end) => {
    const url = 'https://' + club + '.' + Cypress.env('testServer') + '.virtuagym.com' + end;
    return url
})

Cypress.Commands.add('dropDownSelectByText', (element, expectedElementText, actualElementText) => {

    cy.get(element).select(expectedElementText, { force: true })
    cy.get('select' + element + ' option:selected').should('have.text', actualElementText)
})

Cypress.Commands.add('getTextFromElement', (element) => {
    cy.get(element).then(($text) => {
        const actualValue = $text.text()
        return actualValue
    })
})

Cypress.Commands.add('getRandomValueFrom1To10', () => {
    var ranNumber = Math.floor((Math.random() * 10) + 1);
    return ranNumber

})

Cypress.Commands.add('getURLForAdminPage', (club, end, clubid) => {
    const url = 'https://' + club + '.' + Cypress.env('testServer') + '.virtuagym.com' + end + clubid;
    return url
})




Cypress.Commands.add('getEmailIdOfclient', () => {
    let clientEmailtext;
    cy.get('table.table_small tbody').find('tr').then((row) => {
        var size = row.length
        var ranNumber = Math.floor((Math.random() * 2) + 1);
        console.log("ranNumber" + ranNumber)
        cy.get('table.table_small tbody').find('tr').eq(ranNumber).click({ force: true })
        cy.get('[style="display:inline-block;padding-top: 5px;"]').then($element => {
            clientEmailtext = $element.text();
            cy.wrap(clientEmailtext);
        })
    })
    return clientEmailtext;



})






//WIP It does get and set the token but still ask to login in website
Cypress.Commands.add('login', (email, password) => {

    cy.request({

        method: 'POST',
        url: Cypress.env('auth_url'),
        header: { 'Content-Type': 'application/json', 'Cookie': 'virtuagymtest_u=1; virtuagymtest_k=; virtuagymtest_sid=e34a103c61bd131df85f7c95aa6b5622d31e' },

        body: {
            username: email,
            password: password,
        }
    }).then((resp) => {
        cy.setCookie('vg-test-user-access-token', resp.body.accessToken);
        cy.setCookie('vg-test-user-refresh-token', resp.body.refreshToken);
        /*  cy.setCookie('virtuagymtest_k', 'ff06df10b21441ef50a47975a351b14a9b43');
         cy.setCookie('virtuagymtest_sid','e1c6a0331e76cd5ebe2f027600e2878e6fff');
         cy.setCookie('virtuagymtest_u','32129786');  */
    })

})


Cypress.Commands.add('clearLoginCookies', () =>
 {
    cy.clearCookie('vg-test-user-access-token');
    cy.clearCookie('vg-test-user-refresh-token');
    cy.clearCookie('virtuagymtest_k');
    cy.clearCookie('virtuagymtest_sid');
    cy.clearCookie('virtuagymtest_u');
})

Cypress.Commands.add('sideBarNavigation', (sideBarText) => {
    //Open the Side Navigation drawer if its closed
    cy.get('#sideBar > nav').then((element) =>{
        if(element.hasClass('sidebar-collapsed')){
            cy.get('.sidebar-icon.btn-sidebar-collapse').click();
        }
    });
    //Navigate to the Desired Module
    cy
    .get('#sideBar > nav > ul.sidebar-menu')
    .contains(sideBarText)
    .click();
})
Cypress.Commands.add('setAdminSettings',(club_url, club_id, settingLocator, inputValue) => {
    //just provide the id of the locator without # symbol
    
    cy.visit(club_url + '/vgadministration/club/' + club_id + '/settings')
    cy.get('#' + settingLocator).clear({scrollBehavior : "nearest"})
    cy.get('#' + settingLocator).type(inputValue, {scrollBehavior : "nearest"})
    cy.get('#' + settingLocator +'_save > .icon').click({scrollBehavior : "nearest"})
    cy.get('#' + settingLocator + '_save').should('contain','Saved.')
})
