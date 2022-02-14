
class clientPause {

  



    pauseClientMembership(pauseStartDate, pauseEndDate) // pausing the first membership of the client
    {

        cy.get('[data-app_id="club_account_info"] > .sidebar-link > .sidebar-text').click({ force: true }).then(() => {
            cy.get('.nav > :nth-child(2) > a').click({ force: true }).then(() => {
                cy.wait(600)
                cy.get('.table-small.table-plain tbody').eq(1).within(($form) => {
                    cy.wrap($form).find('tr').eq(0).within(($column) => {
                        cy.wrap($column).find('td.cursor_pointer').click({ force: true })
                    })
                })
                cy.get('div.fancybox-inner .col-xs-12.action_membership p').eq(0).click({ force: true }).then(() => {
                    cy.wait(1000)     
                        cy.get('.fancybox-inner .return_paused form .col-xs-12 input').then(()=>{
                        cy.get('.fancybox-inner .return_paused form .col-xs-12 input').eq(0)
                        .tab()
                        .type(pauseEndDate).tab({ shift: true })
                        .type(pauseStartDate)
                    })
                       
                }).then(() => {
                    cy.get('.col-xs-6.action_membership.one-click-limit').click({ force: true })
                    cy.wait(1000)
                    cy.get('.nav.nav-tabs li').eq(1).should('be.visible')
                    cy.get('.nav > :nth-child(2) > a').click({ force: true })
                    cy.get('.table-small.table-plain tbody').eq(1).within(($form) => {
                        cy.wrap($form).find('tr').eq(0).within(($column) => {
                            cy.wrap($column).find('td.cursor_pointer').should(($div) => {
                                expect($div.get(0).innerText.replace('\u00A0', '').trim()).to.eq("Contract paused")
                            })
                        })
                    })
                        
                })
            })
        })
    }


}
export const clientpause = new clientPause()