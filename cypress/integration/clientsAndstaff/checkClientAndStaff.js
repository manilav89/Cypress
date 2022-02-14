import clubs from '../../fixtures/clubs.json'
import { addNewMember } from '../../support/functions/addMember';

describe('Add new Client and Staff', () => {

    let cluburl;

    before(() => {
        cy.getURL(clubs.shal.url, '').then(url => {
            cluburl = url;
        })
    })

    beforeEach(() => {
        cy.visit(cluburl);
        cy.loginUI(clubs.shal.members.manager.username, clubs.shal.members.manager.pass);
        cy.db.deleteMemberUsingEmailId('cecila@virtuagym.com')
        cy.db.deleteUserUsingEmailId('cecila@virtuagym.com')
    });

    it('As a CM I should be able to add a new client in the club', () => {

        cy.visit(cluburl + '/club_portal/clients')
        addNewMember.addNewClient('Cecila', 'Test', 'cecila@virtuagym.com', 'vgdemo', 'vgdemo')   

    });

    it('As a CM I should be able to add a new staff in the club', () => {

        cy.visit(cluburl + '/club_portal/personnel')
        addNewMember.addNewStaff('Cecila', 'Test', 'cecila@virtuagym.com', 'vgdemo', 'vgdemo', 'Standard Employee')       

    })
      
})