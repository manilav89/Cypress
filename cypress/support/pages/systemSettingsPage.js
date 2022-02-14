export class SystemSettingsPage {

    editBannerlink(link) {

        cy.get('.col-xs-9 ').find('.edit-banner').first().contains('Edit').click({ scrollBehavior: false });

        cy.get('#banner_link').clear({ scrollBehavior: false }).type(link);

        cy.get('.btn-blue').click({ scrollBehavior: false });

    }

    checkBannerlink(link) {

        cy.get('.col-xs-9 ').find('.edit-banner').first().contains('Edit').click({ scrollBehavior: false });

        cy.get('#banner_link').invoke('val').then((url)=>{
            expect(url).to.eq(link)
        })
        
    }

}

export const onSystemSettingsPage = new SystemSettingsPage()