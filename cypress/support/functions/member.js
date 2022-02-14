export class Member {

    cleanMembershipsAndInvoices(club_id, member_id) {

        cy.db.softDeleteContractFromMember(club_id, member_id);
        cy.db.softDeleteInvoiceFromMember(club_id, member_id);

    }

}

export const member = new Member()