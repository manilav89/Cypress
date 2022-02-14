///<reference types = "cypress"/>
import clubs from '../../fixtures/clubs.json'

import { discountsPage } from '../../support/functions/discountPage';
import { clientoverviewpage } from '../../support/functions/clientOverviewPage';
import { member } from '../../support/functions/member';
import { membershipcontractpage } from '../../support/functions/membershipContractPage';

describe('Custom discount for the User', () => {

    let cluburl;

    let amount;
    let type;
    let price;
    let discountPrice;
    let monthlyPrice;

    before(() => {
        cy.getURL(clubs.newFit.url, '').then(url => {
            cluburl = url;
        })
    });

    beforeEach(() => {
        member.cleanMembershipsAndInvoices(clubs.newFit.id, clubs.newFit.members.custom.member_id);
        cy.visit(cluburl);
        cy.loginUI(clubs.newFit.members.manager.username, clubs.newFit.members.manager.pass);


    });
    describe('Custom discount: EUR', () => {

        beforeEach(() => {
            amount = 10;
            type = 'EUR';
        });
   
        it('Verify Custom Discount for 4 weekly Membership with 4 weekly billing', () => {

            cy.setProfileTo('Professional');

            cy.sideBarNavigation('Clients'); //Choosing the Module in the Side drawer

            clientoverviewpage.searchAndSelectClient(clubs.newFit.members.custom.username);

            membershipcontractpage.pickAMembershipForClient('A 4 WeeklyMembership4WeeklyBilling');

            membershipcontractpage.getMembershipPrice().then(membershipPrice => {

                price = parseFloat(membershipPrice);

                discountsPage.addCustomDiscount(amount, type);

                discountPrice = price - amount;

                discountsPage.validateCustomDiscount(price, discountPrice);

                discountsPage.saveDiscount();

                membershipcontractpage.saveMembership();

                discountsPage.validateDiscount('Custom discount', 'ACTIVE', amount)

                membershipcontractpage.validateInvoice(0, '(Pro forma)', discountPrice, 'EUR')

                membershipcontractpage.clickGenerateNextInvoice()

                membershipcontractpage.validateInvoice(0, '(Pro forma)', discountPrice * 2, 'EUR')

                discountsPage.openInvoice()

                discountsPage.payInvoiceBy('Cash', '€' + discountPrice * 2 + '.00')

                discountsPage.goBackToMembership()

                membershipcontractpage.endMembership("immediately")
            });


        })

        it('Verify Custom Discount for NonPro MonthlyMembership 2Monthly Billing', () => {

            cy.setProfileTo('Professional');

            cy.sideBarNavigation('Clients'); //Choosing the Module in the Side drawer

            clientoverviewpage.searchAndSelectClient(clubs.newFit.members.custom.username);

            membershipcontractpage.pickAMembershipForClient('ANonPro MonthlyMembership 2Monthly Billing');

            membershipcontractpage.getMembershipPrice().then(membershipPrice => {

                price = parseFloat(membershipPrice);

                monthlyPrice = price / 2

                discountsPage.addCustomDiscount(amount, type);

                discountPrice = monthlyPrice - amount;

                discountsPage.validateCustomDiscount(monthlyPrice, discountPrice);

                discountsPage.saveDiscount();

                membershipcontractpage.saveMembership();

                discountsPage.validateDiscount('Custom discount', 'ACTIVE', amount)

                membershipcontractpage.validateInvoice(0, '(Pro forma)', discountPrice * 2, 'EUR')

                membershipcontractpage.clickGenerateNextInvoice()

                membershipcontractpage.validateInvoice(0, '(Pro forma)', discountPrice * 4, 'EUR')

                discountsPage.openInvoice()

                discountsPage.payInvoiceBy('Cash', '€' + discountPrice * 4 + '.00')

                discountsPage.goBackToMembership()

                membershipcontractpage.endMembership("immediately")
            })

        })
        it('Verify Custom Discount for NonPro MonthlyMembership Monthly Billing', () => {

            cy.setProfileTo('Professional');

            cy.sideBarNavigation('Clients'); //Choosing the Module in the Side drawer

            clientoverviewpage.searchAndSelectClient(clubs.newFit.members.custom.username);

            membershipcontractpage.pickAMembershipForClient('ANonPro MonthlyMembership Monthly Billing');

            membershipcontractpage.getMembershipPrice().then(membershipPrice => {

                price = parseFloat(membershipPrice);

                discountsPage.addCustomDiscount(amount, type);

                discountPrice = price - amount;

                discountsPage.validateCustomDiscount(price, discountPrice);

                discountsPage.saveDiscount();

                membershipcontractpage.saveMembership();

                discountsPage.validateDiscount('Custom discount', 'ACTIVE', amount)

                membershipcontractpage.validateInvoice(0, '(Pro forma)', discountPrice, 'EUR')

                membershipcontractpage.clickGenerateNextInvoice()

                membershipcontractpage.validateInvoice(0, '(Pro forma)', discountPrice * 2, 'EUR')

                discountsPage.openInvoice()

                discountsPage.payInvoiceBy('Cash', '€' + discountPrice * 2 + '.00')

                discountsPage.goBackToMembership()

                membershipcontractpage.endMembership("immediately")
            })
        })
        it('Verify Custom Discount for NonPro MonthlyMembership yearly Billing', () => {

            cy.setProfileTo('Professional');

            cy.sideBarNavigation('Clients'); //Choosing the Module in the Side drawer

            clientoverviewpage.searchAndSelectClient(clubs.newFit.members.custom.username);

            membershipcontractpage.pickAMembershipForClient('ANonPro MonthlyMembership yearly Billing');

            membershipcontractpage.getMembershipPrice().then(membershipPrice => {

                price = parseFloat(membershipPrice);
                monthlyPrice = price/12;
                discountsPage.addCustomDiscount(amount, type);

                discountPrice = monthlyPrice - amount;

                discountsPage.validateCustomDiscount(monthlyPrice, discountPrice);

                discountsPage.saveDiscount();

                membershipcontractpage.saveMembership();

                discountsPage.validateDiscount('Custom discount', 'ACTIVE', amount)

                membershipcontractpage.validateInvoice(0, '(Pro forma)', discountPrice * 12, 'EUR')
                
                membershipcontractpage.validateCanNotGenerateNextInvoice()

                discountsPage.openInvoice()

                discountsPage.payInvoiceBy('Cash', '€' + discountPrice * 12 + '.00')

                discountsPage.goBackToMembership()

                membershipcontractpage.endMembership("immediately")
            })
        })
        it('Verify Custom Discount for Total membership', () => {

            cy.setProfileTo('Professional');

            cy.sideBarNavigation('Clients'); //Choosing the Module in the Side drawer

            clientoverviewpage.searchAndSelectClient(clubs.newFit.members.custom.username);

            membershipcontractpage.pickAMembershipForClient('ATotal membership');

            membershipcontractpage.getMembershipPrice().then(membershipPrice => {

                price = parseFloat(membershipPrice);

                discountsPage.addCustomDiscount(amount, type);

                discountPrice = price - amount;

                discountsPage.validateCustomDiscount(price, discountPrice);

                discountsPage.saveDiscount();

                membershipcontractpage.saveMembership();

                discountsPage.validateDiscount('Custom discount', 'ACTIVE', amount)

                membershipcontractpage.validateInvoice(0, '(Pro forma)', discountPrice, 'EUR')

                membershipcontractpage.validateCanNotGenerateNextInvoice()  

                discountsPage.openInvoice()

                discountsPage.payInvoiceBy('Cash', '€' + discountPrice + '.00')

                discountsPage.goBackToMembership()

                membershipcontractpage.endMembership("immediately")

            })
        })
        it('Verify Custom Discount for Total mebershipWithWeeklyDuration', () => {

            cy.setProfileTo('Professional');

            cy.sideBarNavigation('Clients'); //Choosing the Module in the Side drawer

            clientoverviewpage.searchAndSelectClient(clubs.newFit.members.custom.username);

            membershipcontractpage.pickAMembershipForClient('Atotal mebershipWithWeeklyDuration');

            membershipcontractpage.getMembershipPrice().then(membershipPrice => {

                price = parseFloat(membershipPrice);

                discountsPage.addCustomDiscount(amount, type);

                discountPrice = price - amount;

                discountsPage.validateCustomDiscount(price, discountPrice);

                discountsPage.saveDiscount();

                membershipcontractpage.saveMembership();

                discountsPage.validateDiscount('Custom discount', 'ACTIVE', amount)

                membershipcontractpage.validateInvoice(0, '(Pro forma)', discountPrice, 'EUR')

                membershipcontractpage.validateCanNotGenerateNextInvoice()  

                discountsPage.openInvoice()

                discountsPage.payInvoiceBy('Cash', '€' + discountPrice + '.00')

                discountsPage.goBackToMembership()

                membershipcontractpage.endMembership("immediately")
            })
        })
        it('Verify Custom Discount for Weekly memership with 4 weekly billing', () => {

            cy.setProfileTo('Professional');

            cy.sideBarNavigation('Clients'); //Choosing the Module in the Side drawer

            clientoverviewpage.searchAndSelectClient(clubs.newFit.members.custom.username);

            membershipcontractpage.pickAMembershipForClient('Aweekly memership with 4 weekly billing');

            membershipcontractpage.getMembershipPrice().then(membershipPrice => {

                price = parseFloat(membershipPrice);

                monthlyPrice = price/4
                
                discountsPage.addCustomDiscount(amount, type);

                discountPrice = monthlyPrice - amount;

                discountsPage.validateCustomDiscount(monthlyPrice, discountPrice);

                discountsPage.saveDiscount();

                membershipcontractpage.saveMembership();

                discountsPage.validateDiscount('Custom discount', 'ACTIVE', amount)

                membershipcontractpage.validateInvoice(0, '(Pro forma)', discountPrice*4, 'EUR')

                membershipcontractpage.clickGenerateNextInvoice()

                membershipcontractpage.validateInvoice(0, '(Pro forma)', discountPrice * 8, 'EUR')

                discountsPage.openInvoice()

                discountsPage.payInvoiceBy('Cash', '€' + discountPrice * 8 + '.00')

                discountsPage.goBackToMembership()

                membershipcontractpage.endMembership("immediately")
            })
        })
        it('Verify Custom Discount for WeeklyMembership4WeeklyBilling', () => {

            cy.setProfileTo('Professional');

            cy.sideBarNavigation('Clients'); //Choosing the Module in the Side drawer

            clientoverviewpage.searchAndSelectClient(clubs.newFit.members.custom.username);

            membershipcontractpage.pickAMembershipForClient('WeeklyMembership4WeeklyBilling');

            membershipcontractpage.getMembershipPrice().then(membershipPrice => {

                price = parseFloat(membershipPrice);

                discountsPage.addCustomDiscount(amount, type);

                discountPrice = price - amount;

                discountsPage.validateCustomDiscount(price, discountPrice);

                discountsPage.saveDiscount();

                membershipcontractpage.saveMembership();

                discountsPage.validateDiscount('Custom discount', 'ACTIVE', amount)

                membershipcontractpage.validateInvoice(0, '(Pro forma)', discountPrice, 'EUR')

                membershipcontractpage.clickGenerateNextInvoice()

                membershipcontractpage.validateInvoice(0, '(Pro forma)', discountPrice * 2, 'EUR')

                discountsPage.openInvoice()

                discountsPage.payInvoiceBy('Cash', '€' + discountPrice * 2 + '.00')

                discountsPage.goBackToMembership()

                membershipcontractpage.endMembership("immediately")
            })
        })
    })
    describe('When 0 discount', () => {

        it('Verify when zero percent discount is given then no discount row should appear in the contract', () => {
            type = 'Percent (%)';
            amount = 0;

            cy.setProfileTo('Professional');

            cy.sideBarNavigation('Clients'); //Choosing the Module in the Side drawer

            clientoverviewpage.searchAndSelectClient(clubs.newFit.members.custom.username);

            membershipcontractpage.pickAMembershipForClient('A 4 WeeklyMembership4WeeklyBilling');

            membershipcontractpage.getMembershipPrice().then(membershipPrice => {

                price = parseFloat(membershipPrice);
                discountsPage.addCustomDiscount(amount, type);

                discountPrice = price - amount;

                discountsPage.validateCustomDiscount(price, discountPrice);

                discountsPage.saveDiscount();

                membershipcontractpage.saveMembership();

                discountsPage.validateDiscountName('Add your first discount to this membership');

                membershipcontractpage.validateInvoice(0, '(Pro forma)', discountPrice, 'EUR')

                membershipcontractpage.clickGenerateNextInvoice()

                membershipcontractpage.validateInvoice(0, '(Pro forma)', discountPrice * 2, 'EUR')

                discountsPage.openInvoice()

                discountsPage.payInvoiceBy('Cash', '€' + discountPrice * 2 + '.00')

                discountsPage.goBackToMembership()

                membershipcontractpage.endMembership("immediately")


            })
        })

        it('Verify when zero euro discount is given then no discount row should appear in the contract', () => {
            amount = 0;
            type = 'EUR';

            cy.setProfileTo('Professional');

            cy.sideBarNavigation('Clients'); //Choosing the Module in the Side drawer

            clientoverviewpage.searchAndSelectClient(clubs.newFit.members.custom.username);

            membershipcontractpage.pickAMembershipForClient('A 4 WeeklyMembership4WeeklyBilling');

            membershipcontractpage.getMembershipPrice().then(membershipPrice => {

                price = parseFloat(membershipPrice);
                discountsPage.addCustomDiscount(amount, type);

                discountPrice = price - amount;

                discountsPage.validateCustomDiscount(price, discountPrice);

                discountsPage.saveDiscount();

                membershipcontractpage.saveMembership();

                discountsPage.validateDiscountName('Add your first discount to this membership');

                membershipcontractpage.validateInvoice(0, '(Pro forma)', discountPrice, 'EUR')

                membershipcontractpage.clickGenerateNextInvoice()

                membershipcontractpage.validateInvoice(0, '(Pro forma)', discountPrice * 2, 'EUR')

                discountsPage.openInvoice()

                discountsPage.payInvoiceBy('Cash', '€' + discountPrice * 2 + '.00')

                discountsPage.goBackToMembership()

                membershipcontractpage.endMembership("immediately")
            })
        })
    })
})
