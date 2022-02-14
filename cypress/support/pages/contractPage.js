class contractPage {


    clickAssignMembershipFromProductPage() {
        return cy.get('a[href$="assign"]')
    }


    getMembershipFromDropdown() {
        return cy.get('#membership_id')
    }

    clickAssignMembership() {
        return cy.get('#save_button')
    }
    getContractAgreementTitle() {
        return cy.get('.col-xs-12.col-md-7 p.subheading')
    }
    setStartDate() {
        return cy.get('#membership_start_date')

    }
    selectPaymentMethod() {
        return cy.get('#membership_payment_method')
    }

    selectFirstInvoicesRow() {
        return cy.get('.inner-container.row')
    }

    ClickThreeDotsInContractPage() {
        return cy.get('.top-right-corner-button.dropdown #grid')
    }

    clickDropDownMenu() {
        return cy.get('.col-xs-12.col-md-7 .dropdown-menu.dropdown-menu-right')
    }

    clickPauseStartDate() {
        return cy.get('input#pause_start');
    }

    clickPauseEndDate() {
        return cy.get('input#pause_end');
    }

    clickReason() {
        return cy.get('textarea.suspend_contract');
    }
    clickCost() {
        return cy.get('input#pause_cost');
    }
    clickPauseSave() {
        return cy.get('#btn-pause-request')
    }

    contractPauseDetails() {
        return cy.get(".inner-container.row .row.no-margin.list-row")

    }
    invoicedUntilDate() {
        return cy.get('#billed_till_span')
    }

    markInvoiceAsPaidModalButton() {
        return cy.get('#modal-mark-invoice-as-paid > .vg-plain-modal__dialog > .vg-plain-modal__content > .vg-plain-modal__footer > :nth-child(2) > .vg-plain-btn')
    }

    endContractModalLabel() {
        return cy.get("#end_contract_form > .modal-header > #exampleModalLabel")
    }

}
export const contractpage = new contractPage()

