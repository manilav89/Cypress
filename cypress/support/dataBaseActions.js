cy.db = {

    //delete

    // # delete all contracts since date for a club

    deleteMembershipContractsSinceDateFromClub(clubId, date) {

        cy.task("queryDb", "DELETE FROM `fit_vg_yl_member_contract` WHERE `club_id` =  " + "'" + clubId + "'" + " AND `start_date` >= " + "'" + date + "'" + "")
            .then(function (result) {
                cy.log(result)


            })
    },

    //delete a member by emailID

    deleteMemberUsingEmailId(emailId) {

        cy.task("queryDb", "DELETE FROM `fit_vg_yl_member` WHERE `email` LIKE  " + "'" + emailId + "'")
            .then(function (result) {
                cy.log(result)


            })

    },

    // # list contracts for a member
    // select * from fit_vg_yl_member_contract where club_id = 136129 and member_id = 7339434;

    getContractsFromMember(club_id, member_id) {

        cy.task("queryDb", "SELECT * from `fit_vg_yl_member_contract` WHERE `club_id` =  " + "'" + club_id + "'" + " AND `member_id` = " + "'" + member_id + "'" + "")
    },

    deleteUserUsingEmailId(emailId) {

        cy.task("queryDb", "DELETE FROM `fit_users` WHERE `user_email` LIKE  " + "'" + emailId + "'")
            .then(function (result) {
                cy.log(result)


            })

    },

    //softdelete

    // # soft delete pro forma invoices
    // update fit_vg_yl_invoice set invoice_deleted = 1 where club_id = 136129 and member_id = 7339434 and invoice_id = 0;

    softDeleteInvoiceFromMember(club_id, member_id) {

        cy.task("queryDb", "UPDATE `fit_vg_yl_invoice` set invoice_deleted = 1 WHERE `club_id` =  " + "'" + club_id + "'" + " AND `member_id` = " + "'" + member_id + "'" + "and invoice_id = 0")
            .then(function (result) {
                cy.log(result)


            })
    },


    // # soft delete contracts
    // update fit_vg_yl_member_contract set deleted = 1 where club_id = 136129 and member_id = 7339434

    softDeleteContractFromMember(club_id, member_id) {

        cy.task("queryDb", "UPDATE `fit_vg_yl_member_contract` SET deleted = 1 WHERE `club_id` =  " + "'" + club_id + "'" + " AND `member_id` = " + "'" + member_id + "'" + "")
            .then(function (result) {
                cy.log(result)


            })
    }
}