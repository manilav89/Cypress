
class sideBarPage {

    getSystemSettings() {
        return cy.get('ul.sidebar-footer .sidebar-text')
    }
    getClientSettings() {
        return cy.get('a[href$=client-settings]')
    }
    getClientsCanPauseOwnContract() {
        return cy.get('#pref_memberships_pause')
    }
    getMembershipMinPauseValue() {
        return cy.get("input#pref_memberships_pause_min")
    }
    getClubAccountInfo()
    {
        return cy.get('[data-app_id="club_account_info"] > .sidebar-link > .sidebar-text')
    }

}
export const sidebarpage = new sideBarPage()

