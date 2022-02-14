import clubs from '../../fixtures/clubs.json'
import commonurl from '../../fixtures/commonUrl.json'
import { adminpage } from '../../support/functions/adminPage'
import { membershipcontractpage } from '../../support/functions/membershipContractPage'
import { productpage } from '../../support/functions/productPage'
import { clientpause } from '../../support/functions/clientPause'
import dayjs from 'dayjs'

describe('validate v2 pause', () => {
   let cluburl;
   let pauseStartDateFormatted;
   let clientsStaffsUrl;
   let actualClientEmailId;
   let pauseStartDate;
   let pauseEndDate;
   let pauseEndFormattedDate;
   before(() => {
      cy.getURL(clubs.invoicebdd.url, '').then(url => {
         cluburl = url;
         cy.visit(cluburl);
         cy.loginUI(clubs.admin.username, clubs.admin.pass);
      })
      adminpage.validateClientsCanPauseIsEnabled();
      adminpage.updateMinimumAndMaximumPauseDaysForClients('1', '2');
      cy.logout()

   })


   beforeEach(() => {
      cy.visit(cluburl);
      cy.loginUI(clubs.invoicebdd.members.manager.username, clubs.invoicebdd.members.manager.pass);
      pauseStartDate = dayjs().format('YYYY-MM-DD')
      pauseStartDateFormatted = dayjs(pauseStartDate).format('DD-MM-YYYY')
      pauseEndDate = dayjs(pauseStartDate).add(1, 'd').format('YYYY-MM-DD')
      pauseEndFormattedDate = dayjs(pauseEndDate).format('DD-MM-YYYY')
      cy.db.deleteMembershipContractsSinceDateFromClub(clubs.invoicebdd.id, '2021-01-29')
    


   })


   it('validate clients can pause their own contract', () => {
      cy.getURL(clubs.invoicebdd.url, commonurl.clientsAndStaffs).then(url => {
         clientsStaffsUrl = url;
         cy.visit(clientsStaffsUrl).then(() => {
            cy.getEmailIdOfclient().then($clientEmail => {
               actualClientEmailId = $clientEmail
               productpage.clickProductTab()
               productpage.clickAssignMembershipButton()
               membershipcontractpage.selectMembershipFromDropDown('SimplePause')
               membershipcontractpage.setStartDateForMembership('DD-MM-YYYY')
               membershipcontractpage.selectPaymentMethodFromContractPage('#membership_payment_method', 'Cash', 'Cash')
               membershipcontractpage.saveMembership()
               cy.logout();
               cy.loginUI(actualClientEmailId, "vgdemo");
               cy.log("pauseStartDate",pauseStartDateFormatted)
               cy.log("pauseEndFormattedDate",pauseEndFormattedDate)
               clientpause.pauseClientMembership(pauseStartDateFormatted, pauseEndFormattedDate)
             

            })
         })
      })

   })

})

