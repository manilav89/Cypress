class adminSettingsPage {

    getAdminSettingLink() {
        return cy.get('a.table-link.full_row')
    }
    getHeaderFromSettingsPage() {
        return cy.get('h2')
    }

    getV2Pausesetting() {
        return cy.get('#enable_contract_pauses_v2')
    }
    getV2pauseSaveIcon() {
        return cy.get('#enable_contract_pauses_v2_save > .icon')
    }
    getv1pauseSetting() {
        return cy.get('#enable_contract_pauses')
    }
    getv1pauseSaveIcon() {
        return cy.get('#enable_contract_pauses_save > .icon')
    }


}
export const adminsettingspage = new adminSettingsPage()

