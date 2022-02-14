
import { clientpage } from '../../support/pages/clientPage'
import { contractpage } from '../../support/pages/contractPage'


class productPage {
    clickAssignMembershipButton() {
        contractpage.clickAssignMembershipFromProductPage().click({ force: true })
    }

    clickProductTab() {
        clientpage.clickProductsTab().click({ force: true })
    }



}
export const productpage = new productPage()
