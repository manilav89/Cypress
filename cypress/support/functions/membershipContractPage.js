import { contractpage } from '../pages/contractPage'
import { fromdatecalculationspage } from '../functions/dateCalculations'
import { productpage } from '../functions/productPage'

import dayjs from 'dayjs'
var calendar = require('dayjs/plugin/calendar')
dayjs.extend(calendar)
var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat);
import 'cypress-plugin-tab'
//require('cypress-plugin-tab')

var pauseStartDate;
var InvoiceStartDate;
var InvoiceEndDate;
var billedUntil;
var NextInvoiceStartDate;
var NextInvoiceEndDate;
var dayDiff;
var incrementor = 1;
var todayDate;
var pausebeginDate;
var pauseEndDate;
var pauseEndFormattedDate;

class membershipContractPage {

    pickAMembershipForClient(membership) {
        productpage.clickProductTab();

        productpage.clickAssignMembershipButton();

        this.selectMembershipFromDropDown(membership);
    }


    getMembershipPrice() {
        return new Promise((resolve, reject) => {
            cy.getTextFromElement('#total_membership_price').then(text => {
                return resolve(text)
            });
        })

    }

    selectMembershipFromDropDown(MembershipName) {

        contractpage.getMembershipFromDropdown().select(MembershipName, { force: true })
        cy.get('#fullscreen_loader > .text > .loading', { timeout: 30000 }).should('not.be.visible')
        contractpage.clickAssignMembership().should('be.visible')
        cy.get('select#membership_id option:selected').should('have.text', MembershipName)
    }


    setStartDateForMembership() {
        cy.get('#membership_start_date').then(() => {
            cy.focused().tab()
                .type(fromdatecalculationspage.getTodaysDate());
        })



    }

    selectPaymentMethodFromContractPage(element, expectedElementText, actualText) {
        cy.dropDownSelectByText(element, expectedElementText, actualText);
    }

    saveMembership() {
        contractpage.clickAssignMembership().click({ force: true })
        cy.get('#fullscreen_loader > .text > .loading', { timeout: 30000 }).should('not.be.visible')
        contractpage.getContractAgreementTitle().should('have.text', 'Contract agreements')
    }


    validateInvoice(row, invoiceNo, invoicePrice, invoiceCurrency) {

        this.validateInvoiceNo(row, invoiceNo);

        this.validateInvoicePrice(row, invoicePrice + '.00');

        this.validateInvoiceCurrency(row, invoiceCurrency);

    }

    validateInvoiceNo(row, invoiceNo) {
        //based on the give row the invoice "No." will be validated
        cy
            .scrollTo(0, 500)
        cy
            .get('a.full_row').eq(row).should('have.text', invoiceNo)
    }

    validateInvoicePrice(row, invoicePrice) {

        contractpage.selectFirstInvoicesRow().find('.list-row.invoice').eq(row).find('div.col-xs-2').eq(1).should(($div) => {
            expect($div.get(0).innerText).to.eq(invoicePrice)
        })
    }

    validateInvoiceCurrency(row, invoiceCurrency) {

        contractpage.selectFirstInvoicesRow().find('.list-row.invoice').eq(row).find('div.col-xs-2').eq(2).should(($div) => {
            expect($div.get(0).innerText).to.eq(invoiceCurrency)
        })
    }

    validateInvoiceDates(price, InvoiceStartDate, InvoiceEndDate, format) {

        cy.scrollTo(0, 500);
        contractpage.selectFirstInvoicesRow().find('.list-row.invoice').eq(0).find('div.col-xs-2').eq(1).should(($div) => {
            expect($div.get(0).innerText).to.eq(price)
        })
        contractpage.selectFirstInvoicesRow().find('.list-row.invoice').eq(0).find('div.col-xs-2').eq(4).should(($div) => {
            expect($div.get(0).innerText).to.eq(dayjs(InvoiceStartDate).format(format))
        })

        contractpage.selectFirstInvoicesRow().find('.list-row.invoice').eq(0).find('div.col-xs-2').eq(5).should(($div) => {
            expect($div.get(0).innerText).to.eq(dayjs(InvoiceEndDate).format(format))
        })
    }


    clickThreeDots() {
        contractpage.ClickThreeDotsInContractPage().click({ force: true })
    }

    clickGenerateNextInvoice() {
        this.clickThreeDots()
        contractpage.clickDropDownMenu().should("have.attr", "style").and("match", /display: block/)
        cy.contains("Generate next invoice").click({ force: true })
        cy.get('#fullscreen_loader > .text > .loading', { timeout: 30000 }).should('not.be.visible')
    }

    clickPauseContract() {
        contractpage.clickDropDownMenu().find('ul li a span').contains('Pause contract').click({ force: true });
    }


    //------------------------ pause a contract And Validate Invoices ------------------------
    validatePauseAndInvoiesGenerated(price, reason, pauseCost, pauseType, doesPauseHasCost, isPauseApplied, format) {
        for (var numberOfTimesToGenerateInvoice = 0; numberOfTimesToGenerateInvoice <= 2; numberOfTimesToGenerateInvoice++) {
            membershipcontractpage.setDatesToPauseContract(pauseType, format)

            if (numberOfTimesToGenerateInvoice === 0) {
                InvoiceStartDate = fromdatecalculationspage.getTodaysDate();
                InvoiceEndDate = fromdatecalculationspage.getNextMonthEndDate(InvoiceStartDate);
                membershipcontractpage.validateInvoiceDates(price, InvoiceStartDate, InvoiceEndDate, format);
                membershipcontractpage.validateInvoiceUntil(InvoiceEndDate, format)
                if (isPauseApplied === "yes") {
                    membershipcontractpage.clickThreeDots();
                    membershipcontractpage.clickPauseContract();
                    membershipcontractpage.createPause(pausebeginDate, pauseEndDate, reason, pauseCost);
                    membershipcontractpage.validatePause(pausebeginDate, pauseEndFormattedDate, pauseStartDate, pauseEndDate, pauseCost, todayDate, reason)
                    dayDiff = fromdatecalculationspage.getDateDifference(pauseStartDate, pauseEndDate);
                    billedUntil = dayjs(InvoiceEndDate).add(dayDiff + 1, 'd').format('YYYY-MM-DD');
                    membershipcontractpage.validateInvoiceUntil(billedUntil, format);
                    if (doesPauseHasCost === "yes") {
                        contractpage.selectFirstInvoicesRow().find('.list-row.invoice').should('have.lengthOf', numberOfTimesToGenerateInvoice + incrementor + 1).then((validate) => {
                            incrementor = incrementor + 1;
                            membershipcontractpage.duringPauseGenerateNextInvoiceAndValidate(0, incrementor, billedUntil, price, format)
                        })
                    }
                    else {
                        membershipcontractpage.duringPauseGenerateNextInvoiceAndValidate(0, incrementor, billedUntil, price, format)
                    }
                }
            }

            else {
                if (doesPauseHasCost === "yes") {
                    numberOfTimesToGenerateInvoice = numberOfTimesToGenerateInvoice + 1;
                    membershipcontractpage.clickThreeDots();
                    contractpage.clickDropDownMenu().find('ul li a').eq(1).click({ force: true })
                    cy.get('#fullscreen_loader > .text > .loading').should('not.be.visible')
                    contractpage.selectFirstInvoicesRow().find('.list-row.invoice').should('have.lengthOf', numberOfTimesToGenerateInvoice + incrementor + 1).then((validate) => {
                        NextInvoiceStartDate = fromdatecalculationspage.getNextMonthStartDate(NextInvoiceEndDate);
                        NextInvoiceEndDate = fromdatecalculationspage.getNextMonthEndDate(NextInvoiceStartDate);
                        membershipcontractpage.validateInvoiceDates(price, NextInvoiceStartDate, NextInvoiceEndDate, format)
                        membershipcontractpage.validateInvoiceUntil(NextInvoiceEndDate, format)
                    })
                }
                else {
                    membershipcontractpage.clickThreeDots();
                    contractpage.clickDropDownMenu().find('ul li a').eq(1).click({ force: true })
                    cy.get('#fullscreen_loader > .text > .loading').should('not.be.visible')
                    contractpage.selectFirstInvoicesRow().find('.list-row.invoice').should('have.lengthOf', numberOfTimesToGenerateInvoice + incrementor + 1).then((validate) => {
                        NextInvoiceStartDate = fromdatecalculationspage.getNextMonthStartDate(NextInvoiceEndDate);
                        NextInvoiceEndDate = fromdatecalculationspage.getNextMonthEndDate(NextInvoiceStartDate);
                        membershipcontractpage.validateInvoiceDates(price, NextInvoiceStartDate, NextInvoiceEndDate, format)
                        membershipcontractpage.validateInvoiceUntil(NextInvoiceEndDate, format)
                    })
                }
            }
        }
    }








    //-------------Set pause Start and End Dates--------------------//

    setDatesToPauseContract(pauseType, format) {
        todayDate = dayjs().format('YYYY-MM-DD')
        if (pauseType === "CurrentDay") {
            pauseStartDate = dayjs(todayDate).format('YYYY-MM-DD')
        }
        else {
            pauseStartDate = dayjs(todayDate).add(3, 'd').format('YYYY-MM-DD')
        }
        pausebeginDate = dayjs(pauseStartDate).format(format)
        pauseEndDate = dayjs(pauseStartDate).add(3, 'd').format('YYYY-MM-DD')
        pauseEndFormattedDate = dayjs(pauseEndDate).format(format)

    }

    //-------Generate And Validate Invoies During Pause-----------//

    duringPauseGenerateNextInvoiceAndValidate(k, incrementor, billedUntil, price, format) {
        membershipcontractpage.clickThreeDots();
        contractpage.clickDropDownMenu().find('ul li a').eq(1).click({ force: true })
        cy.get('#fullscreen_loader > .text > .loading').should('not.be.visible')
        contractpage.selectFirstInvoicesRow().find('.list-row.invoice').should('have.lengthOf', k + incrementor + 1).then((validate) => {
            NextInvoiceStartDate = fromdatecalculationspage.getNextMonthStartDate(billedUntil);
            NextInvoiceEndDate = fromdatecalculationspage.getNextMonthEndDate(NextInvoiceStartDate)
            membershipcontractpage.validateInvoiceDates(price, NextInvoiceStartDate, NextInvoiceEndDate, format)
            membershipcontractpage.validateInvoiceUntil(NextInvoiceEndDate, format);
        })

    }

    //------------create a pause-----------//

    createPause(pausebeginDate, pauseEndDate, reason, pauseCost) {
        cy.wait(500);
        cy.on('window:alert', (string) => {

            expect(string).to.equal('Pause contract')
        }).then((func) => {
            cy.get('body').tab()

            contractpage.clickPauseStartDate().type(pausebeginDate).tab()
                .type(pauseEndDate).tab({ shift: true })
                .type(pausebeginDate).tab()
                .tab()
                .type(reason).tab()
                .type(pauseCost)
            contractpage.clickPauseSave().click();

        })
    }


    // -----------Pause Invoice Validation----------------//

    validatePause(pausebeginDate, pauseEndFormattedDate, pauseStartDate, pauseEndDate, pauseCost, todayDate, reason) {

        cy.wait(1000);

        contractpage.contractPauseDetails().eq(-1).find('div.col-xs-2.col-sm-2 ').eq(0).should(($div) => {
            expect($div.get(0).innerText).to.eq(pausebeginDate)
        })

        contractpage.contractPauseDetails().eq(-1).find('div.col-xs-2.col-sm-2 ').eq(1).should(($div) => {
            expect($div.get(0).innerText).to.eq(pauseEndFormattedDate)
        }).then((status) => {
            if (pauseStartDate > todayDate) {
                status = "UPCOMING"
            }
            else if (pauseStartDate == pauseEndDate) {
                status = "ENDED"
            }
            else {
                status = "ACTIVE"
            }
            console.log("status" + status)

            contractpage.contractPauseDetails().eq(-1).find('div.col-xs-2.col-sm-1').eq(0).should(($div) => {
                expect($div.get(0).innerText).to.eq(status)
            })

            contractpage.contractPauseDetails().eq(-1).find('div.col-xs-1.col-sm-2 ').eq(1).should(($div) => {
                expect($div.get(0).innerText).to.eq(reason)
            })

            contractpage.contractPauseDetails().eq(-1).find('div.col-xs-1.col-sm-1 ').eq(0).should(($div) => {
                expect($div.get(0).innerText).to.eq(pauseCost)
            })

            var dayDiff = fromdatecalculationspage.getDateDifference(pauseStartDate, pauseEndDate);
            contractpage.contractPauseDetails().eq(-1).find('div.col-xs-2.col-sm-1').eq(1).should(($div) => {
                var dayDiffAddOne = dayDiff + 1;
                expect($div.get(0).innerText).to.eq('' + dayDiffAddOne + '')
            })


        })
    }

    //-----------Validate Cost for Pause Invoice-------------- //

    validatePauseInvoice(price, doesPauseHasCost) {
        if (doesPauseHasCost !== "yes") {
            contractpage.selectFirstInvoicesRow().find('.list-row.invoice').eq(0).find('div.col-xs-2').eq(1).should(($div) => {
                expect($div.get(0).innerText).to.eq(price)
            })
        }

    }

    //----------------Get Billed Until Date ------------//
    validateInvoiceUntil(endDate, format) {
        var FormattedInvoicedDate = dayjs(endDate).format(format)
        contractpage.invoicedUntilDate().should(($div) => {
            expect($div.get(0).innerText).to.eq(FormattedInvoicedDate)
        })
    }


    validateCanNotGenerateNextInvoice() {

        this.clickThreeDots()
        contractpage.clickDropDownMenu().contains("Generate next invoice").should('not.exist');

    }

    endMembership(endType) {

        this.clickThreeDots();

        contractpage.clickDropDownMenu().should("have.attr", "style").and("match", /display: block/)
        contractpage.clickDropDownMenu().find('ul li a span').contains('End membership').click({ force: true })

        contractpage.endContractModalLabel()
            .should('be.visible')
            .and('have.text', "End membership")

        cy
            .contains(endType, { matchCase: false })
            .click({ force: true })

        cy
            .get('#btn-end-request').click()

        contractpage.endContractModalLabel()
            .should('not.be.visible')

        cy
            .get('.inner-container.row')
            .eq(0)
            .find('.list-item-status')
            .should('contain', "Contract stopped")
    }

}


export const membershipcontractpage = new membershipContractPage()
