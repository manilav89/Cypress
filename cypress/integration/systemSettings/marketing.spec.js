import { onSystemSettingsPage } from "../../support/pages/systemSettingsPage";

describe('Marketing banner options in bussiness settings', () => {

    let cluburl;
    let marketingUrl;

    before(() => {
        cy.getURL('guillermofitness', '').then(url => {
            cluburl = url;
        })
        cy.getURL('guillermofitness', '/business-settings/marketing').then(url => {
            marketingUrl = url;
        })
    })


    beforeEach(() => {

        cy.visit(cluburl);
        cy.loginUI('guillermo+manager', 'vgdemo');
        cy.visit(marketingUrl);

    });


    it('Edit banner link does not add http when https is already there', () => {


        onSystemSettingsPage.editBannerlink('https://guillermofitness.test3.virtuagym.com/classes');

        cy.wait(1500);

        onSystemSettingsPage.checkBannerlink('https://guillermofitness.test3.virtuagym.com/classes');

    });

    it('Edit banner link does not add http when app deplink (://)', () => {

        onSystemSettingsPage.editBannerlink('virtuagym://app.virtuagym.com/fitness/video-workouts');

        cy.wait(1500);

        onSystemSettingsPage.checkBannerlink('virtuagym://app.virtuagym.com/fitness/video-workouts');
        
    });

    it('Edit banner link add http if not previous case', () => {
        onSystemSettingsPage.editBannerlink('guillermofitness.test3.virtuagym.com/classes');

        cy.wait(1500);

        onSystemSettingsPage.checkBannerlink('http://guillermofitness.test3.virtuagym.com/classes');
    });
});