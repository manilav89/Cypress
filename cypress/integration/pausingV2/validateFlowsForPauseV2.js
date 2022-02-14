/// <reference types="Cypress"/>
import clubs from '../../fixtures/clubs.json'
import commonurl from '../../fixtures/commonUrl.json'
import { clientoverviewpage } from '../../support/functions/clientOverviewPage'
import { adminpage } from '../../support/functions/adminPage'
import { membershipcontractpage } from '../../support/functions/membershipContractPage'
import { productpage } from '../../support/functions/productPage'


describe('validate v2 pause', () => {
   let cluburl;
   let adminsettingUrl;
   let clientsStaffsUrl;

   before(() => {
      cy.getURL(clubs.invoicebdd.url, '').then(url => {
         cluburl = url;
         cy.visit(cluburl);
         cy.loginUI(clubs.admin.username, clubs.admin.pass);
      }).then(()=>{     
            cy.setAdminSettings(cluburl, clubs.invoicebdd.id, "enable_contract_pauses_v2", "1");
            cy.setAdminSettings(cluburl, clubs.invoicebdd.id, "enable_contract_pauses", "1");
            cy.logout()

         })
    


   })

   beforeEach(() => {

      cy.visit(cluburl);
      cy.loginUI(clubs.invoicebdd.members.manager.username, clubs.invoicebdd.members.manager.pass);
      cy.db.deleteMembershipContractsSinceDateFromClub(clubs.invoicebdd.id, '2021-01-29')


   })

   it('validate clients can pause their contract is enabled when v2 is on', () => {

      adminpage.validateClientsCanPauseIsEnabled();

   })


   it('validate pause invoice when pause cost is 0', () => {


      cy.getURL(clubs.invoicebdd.url, commonurl.clientsAndStaffs).then(url => {
         clientsStaffsUrl = url;
         cy.visit(clientsStaffsUrl);
         clientoverviewpage.selectRandomClientFromClientOverview()
         productpage.clickProductTab()
         productpage.clickAssignMembershipButton()
         membershipcontractpage.selectMembershipFromDropDown('SimplePause')
         membershipcontractpage.setStartDateForMembership()
         membershipcontractpage.selectPaymentMethodFromContractPage('#membership_payment_method', 'Cash', 'Cash')
         membershipcontractpage.saveMembership()
         membershipcontractpage.validatePauseAndInvoiesGenerated("30.00", "Sick", "0.00", "CurrentDay", "no", "yes", "DD-MM-YYYY")
      })

   })

   it('validate if staff is able to pause the memebership for the client with pause cost', () => {


      cy.getURL(clubs.invoicebdd.url, commonurl.clientsAndStaffs).then(url => {
         clientsStaffsUrl = url;
         cy.visit(clientsStaffsUrl);
         clientoverviewpage.selectRandomClientFromClientOverview()
         productpage.clickProductTab()
         productpage.clickAssignMembershipButton()
         membershipcontractpage.selectMembershipFromDropDown('SimplePause')
         membershipcontractpage.setStartDateForMembership()
         membershipcontractpage.selectPaymentMethodFromContractPage('#membership_payment_method', 'Cash', 'Cash')
         membershipcontractpage.saveMembership()
         membershipcontractpage.validatePauseAndInvoiesGenerated("30.00", "Sick", "10.00", "CurrentDay", "yes", "yes", "DD-MM-YYYY")
      })

   })



})

