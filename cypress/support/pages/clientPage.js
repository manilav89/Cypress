class clientPage {

    getClientName() {
        return cy.getTextFromElement('h1 > a')
    }
    
    getClientEmailID()
    {
        return cy.get('[style="display:inline-block;padding-top: 5px;"]')
    }

    selectRowFromClientTable() {
        return cy.get('table.table_small tbody')
    }

    clickProductsTab() {
        return cy.get('#tab_memberships > .tab_border > span')
    }

}
export const clientpage = new clientPage()
