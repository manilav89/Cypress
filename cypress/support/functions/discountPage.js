import { contractpage } from "../pages/contractPage";

export class discountPage {

    addDiscountBeforeInvoiceCreated(discountType) {

        cy
            .contains('Invoices Detail').should('be.visible');

        this.clickAddDiscount();

        cy
            .get('#customDiscountModalLabel').should('be.visible');
        cy
            .get('#membership_discounts_holder').select(discountType);

        this.saveDiscount();
    }

    addDiscountAfterInvoiceCreated(discountType) {

        cy
            .get('#add_discount').click()
        cy
            .get('#customDiscountModalLabel').should('be.visible');
        cy
            .get('#discount_type').select(discountType);
        cy
            .get('#btn-save-discount').click();
    }

    validateDiscount(discountName, status, amountText) {

        this.validateDiscountName(discountName);

        this.validateDiscountStatus(status);

        this.validateDiscountAmount(amountText + '.00 monetary discount');
    }

    validateDiscountName(discountName) {

        cy
            .scrollTo(0, 500)
        cy
            .get(".inner-container.row")
            .find('.list-row').eq(0)
            .find('div:nth-child(1)').eq(0)
            .should('have.text', discountName)

    }

    validateDiscountStatus(status) {

        cy
            .get('.status_field').should('have.text', status)

    }

    validateDiscountAmount(amountText) {

        cy
            .get(".inner-container.row")
            .find('.list-row').eq(0)
            .find('div:nth-child(5)').eq(0)
            .should('have.text', amountText)

    }

    goBackToMembership() {
        cy.get('#back_button > span').click();
        cy.get('#back_button > span').click();

    }

    payInvoiceBy(paymentMethod, price) {
        cy.dropDownSelectByText('.select-dropdown', paymentMethod, paymentMethod);
        cy.get('#mark_btn').click();
        contractpage.markInvoiceAsPaidModalButton().click();
        cy.get('.payment_results_price').should('have.text', price)
        cy.get('.payment_results_method').should('have.text', paymentMethod)

    }

    openInvoice() {

        cy.get('a.full_row').click()

    }

    addCustomDiscount(amount, type) {

        this.clickAddDiscount();

        this.selectDiscountBeforeInvoiceCreated('Custom discount');

        this.setCustomDiscount(amount, type);

    }

    clickAddDiscount() {

        cy.get('.col-xs-12 > .btn').click();

    }

    selectDiscountBeforeInvoiceCreated(discountType) {

        cy.get('#customDiscountModalLabel').should('be.visible');
        cy.get('#membership_discounts_holder').select(discountType);

    }

    saveDiscount() {

        cy.get('#btn-save-discount').click();
        cy.get('#btn-save-discount').should('not.be.visible');

    }

    setCustomDiscount(amount, discountType) {

        cy.dropDownSelectByText('#discount_price_type', discountType, discountType)

        cy.get('#discount_price').type(amount);

    }

    validateCustomDiscount(Price, discountPrice) {

        if (Price === discountPrice) {

            cy.get('#discount_old_price').should('not.be.visible');

            cy.get('#discount_new_price').should('have.text', 'EUR ' + Price + ' ')

        } else {
            cy.get('.vg-modal-price-row').should('be.visible');

            cy.get('#discount_old_price').should('be.visible');

            cy.get('#discount_old_price').should('have.text', 'EUR ' + Price)

            cy.get('#discount_new_price').should('be.visible');

            cy.get('#discount_new_price').should('have.text', 'EUR ' + discountPrice + ' ')

        }

    }

    validateErrorMessage() {
        //Validate the error message when the multiple discount added 

        cy
            .get('div.bootbox-body').should('be.visible')
        cy
            .get('div.bootbox-body')
            .should('have.text', 'There is already another discount active in the chosen timeframe')
        cy
            .contains('OK').click()

    }

    closeAddDiscountPopUp() {

        cy
            .get('.discount_modal_header > .close').click()
    }

    validateNoDiscountMessage() {
        //Validate the pop-up message when the membership has no Discount

        cy
            .get('#customDiscountModalLabel').should('be.visible')
        cy
            .contains('#customDiscountModalLabel', 'Add discount')
        cy
            .get('#no_discounts_for_membership')
            .should('have.text', 'There are no discounts for this memberships')

        this.closeAddDiscountPopUp()

    }

}
export const discountsPage = new discountPage()
