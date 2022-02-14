import { clientpage } from '../pages/clientPage'

class clientOverviewPage {

    selectRandomClientFromClientOverview() {

        clientpage.selectRowFromClientTable().find('tr').then((row) => {
            var size = row.length
            var ranNumber = Math.floor((Math.random() * size-1) + 1);
            console.log("ranNumber" + ranNumber)
            clientpage.selectRowFromClientTable().find('tr').eq(ranNumber).click({ force: true })
            cy.getTextFromElement(clientpage.getClientName()).then(actualValue => {
                const actual = actualValue;
                cy.log("actualValue", actual)

            })

        })
    }

    searchAndSelectClient(clientName)
    {
        cy.get('[data-cy=text-input-keyword]').type(clientName+'{enter}');
        cy.wait(3000)
        cy.get('.member-name').click();

    }

}
export const clientoverviewpage = new clientOverviewPage()
