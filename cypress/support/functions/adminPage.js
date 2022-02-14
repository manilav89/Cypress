
/// <reference types="Cypress" />
import { sidebarpage } from '../pages/sideBarPage'



class adminPage {

    validateClientsCanPauseIsEnabled() {
        sidebarpage.getSystemSettings().contains("System Settings").click()
        sidebarpage.getClientSettings().click({ force: true })
        sidebarpage.getClientsCanPauseOwnContract().check({ force: true }).should('be.checked')
    }

   
    updateMinimumAndMaximumPauseDaysForClients(pauseMaxDays,pauseMinDays) 
    {
        cy.get('#pref_memberships_pause').tab().type(pauseMaxDays)
        .tab().type(pauseMinDays)

    }

}
export const adminpage = new adminPage()

