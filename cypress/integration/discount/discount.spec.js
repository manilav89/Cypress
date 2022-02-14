///<reference types = "cypress"/>
import clubs from '../../fixtures/clubs.json'
import { discountsPage } from '../../support/functions/discountPage';
import { membershipcontractpage } from '../../support/functions/membershipContractPage';
import { clientoverviewpage } from '../../support/functions/clientOverviewPage';

describe('Discount for the User', () => {

    let cluburl;

    before(() => {
        cy.getURL(clubs.bdd.url, '').then(url => {
            cluburl = url;
        })
    })

    beforeEach(() => {
        cy.visit(cluburl);
        cy.loginUI(clubs.bdd.members.ClubManager.username, clubs.bdd.members.ClubManager.pass);
    });

    it('Verify the functionality when club manager apply percentage(euro) discount on Total membership', () => {

        cy
            .setProfileTo('Professional');
        cy
            .sideBarNavigation('Clients');

        clientoverviewpage.searchAndSelectClient('Total Client');

        membershipcontractpage.pickAMembershipForClient('TotalMembershipWithDifferent Discount');

        discountsPage.addDiscountBeforeInvoiceCreated('Percentage Discount - 10.00%');

        membershipcontractpage.saveMembership();

        var returnedUrl = null
        cy.url().then(url => {
            returnedUrl = url;
            cy.log("URL", returnedUrl);
        });

        cy
            .url().should('contain', 'invoice_created');

        discountsPage.validateDiscountName('Percentage Discount');

        discountsPage.validateDiscountStatus('ACTIVE');
    })

    it('Verify the functionality when club manager apply monetary(euro) discount on pro rata membership', () => {

        cy
            .sideBarNavigation('Clients'); //Choosing the Module in the Side drawer

        clientoverviewpage.searchAndSelectClient('Non Prorata Test client');

        membershipcontractpage.pickAMembershipForClient('Pro rata Membership With Different Discount');

        discountsPage.addDiscountBeforeInvoiceCreated('Euro Discount - 10.00- discount');

        membershipcontractpage.saveMembership();

        cy
            .url().should('contain', 'invoice_created');

        discountsPage.validateDiscountName('Euro Discount');

        discountsPage.validateDiscountStatus('ACTIVE');

        membershipcontractpage.validateInvoiceNo(0, '(Pro forma)');

    })

    it('Verify the functionality when club manager apply monetary(euro) discount on Total membership', () => {

        cy
            .sideBarNavigation('Clients'); //Choosing the Module in the Side drawer

        clientoverviewpage.searchAndSelectClient('Total Client');

        membershipcontractpage.pickAMembershipForClient('TotalMembershipWithDifferent Discount');

        discountsPage.addDiscountBeforeInvoiceCreated('Euro Discount - 10.00- discount');

        membershipcontractpage.saveMembership();

        cy
            .url().should('contain', 'invoice_created');

        discountsPage.validateDiscountName('Euro Discount');

        discountsPage.validateDiscountStatus('ACTIVE');

    })

    it('Try to assign multiple discount for the same period and validate the error message', () => {

        cy
            .sideBarNavigation('Clients'); //Choosing the Module in the Side drawer

        clientoverviewpage.searchAndSelectClient('Discount client2');

        membershipcontractpage.pickAMembershipForClient('NonProMembership with Different Discount');

        discountsPage.addDiscountBeforeInvoiceCreated('Euro Discount - 10.00- discount')

        membershipcontractpage.saveMembership();

        cy
            .url().should('contain', 'invoice_created');

        discountsPage.validateDiscountName('Euro Discount');

        discountsPage.validateDiscountStatus('ACTIVE');

        discountsPage.addDiscountAfterInvoiceCreated('Euro Discount - 10.00- discount')

        discountsPage.validateErrorMessage()

        discountsPage.closeAddDiscountPopUp()

    })

    it('Percentage Discount for a Nonpro rata Membership', () => {

        cy
            .sideBarNavigation('Clients'); //Choosing the Module in the Side drawer

        clientoverviewpage.searchAndSelectClient('discount client2');

        membershipcontractpage.pickAMembershipForClient('NonProMembership with Different Discount');

        discountsPage.addDiscountBeforeInvoiceCreated('Percentage Discount - 10.00%')

        membershipcontractpage.saveMembership();

        cy
            .url().should('contain', 'invoice_created');

        membershipcontractpage.clickGenerateNextInvoice()

        membershipcontractpage.validateInvoiceNo(0, '(Pro forma)')

        membershipcontractpage.validateInvoiceNo(1, '(Pro forma)')

        membershipcontractpage.validateInvoicePrice(0, '36.00')

        membershipcontractpage.validateInvoiceCurrency(0, 'EUR')

        membershipcontractpage.endMembership("immediately")

    })

    it('Nonprorata membership with euro discount', () => {
        
        cy
            .sideBarNavigation('Clients'); //Choosing the Module in the Side drawer

        clientoverviewpage.searchAndSelectClient('discount client2');

        membershipcontractpage.pickAMembershipForClient('NonProMembership with Different Discount');

        discountsPage.addDiscountBeforeInvoiceCreated('Euro Discount - 10.00- discount')

        membershipcontractpage.saveMembership();

        cy
            .url().should('contain', 'invoice_created');

        discountsPage.validateDiscountName('Euro Discount');

        discountsPage.validateDiscountStatus('ACTIVE');

        membershipcontractpage.validateInvoiceNo(0, '(Pro forma)');

        membershipcontractpage.clickGenerateNextInvoice()

        membershipcontractpage.validateInvoiceNo(0, '(Pro forma)')

        membershipcontractpage.validateInvoiceNo(1, '(Pro forma)')

        membershipcontractpage.validateInvoicePrice(0, '30.00')

        membershipcontractpage.validateInvoiceCurrency(0, 'EUR')

        membershipcontractpage.endMembership("immediately")

    })

    it('Non pro rata Membership with Fixed price discount', () => {

        cy
            .sideBarNavigation('Clients'); //Choosing the Module in the Side drawer

        clientoverviewpage.searchAndSelectClient('discount client2');

        membershipcontractpage.pickAMembershipForClient('NonProMembership with fixed price Discount');

        discountsPage.addDiscountBeforeInvoiceCreated('Fixed price Discount - 20.00- fixed price')

        membershipcontractpage.saveMembership();

        cy
            .url().should('contain', 'invoice_created');

        discountsPage.validateDiscountName('Fixed price Discount');

        discountsPage.validateDiscountStatus('ACTIVE');

    })

    it('Assign a membership without discount to a client', () => {

        cy
            .sideBarNavigation('Clients'); //Choosing the Module in the Side drawer

        clientoverviewpage.searchAndSelectClient('discount client2');

        membershipcontractpage.pickAMembershipForClient('MonthlyMembership');

        discountsPage.clickAddDiscount()

        discountsPage.validateNoDiscountMessage()

        membershipcontractpage.saveMembership();

        cy
            .url().should('contain', 'invoice_created');

        membershipcontractpage.validateInvoiceNo(0, '(Pro forma)')

        membershipcontractpage.validateInvoicePrice(0, '90.00')

        membershipcontractpage.validateInvoiceCurrency(0, 'EUR')

    })

})
