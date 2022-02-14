
cy.api = {
    createUser: (clubUrl, clubId, apiKey, club_secret, firstName, lastName, email) => {
        return new Promise((resolve, reject) => {

            const url = 'https://' + clubUrl + '.' + Cypress.env('testServer') + '.virtuagym.com/api/v1/club/' + clubId + '/member/?api_key=' + apiKey + '&club_secret=' + club_secret;

            cy.request({
                method: 'POST',
                url: url,
                header: { 'Content-Type': 'application/json' },
                body: {
                    firstname: firstName,
                    lastname: lastName,
                    email: email,
                }
            }).then((response) => {
                expect(response.status).to.eq(200);
                const user = { 'firstname': response.body.result.firstname, 'lastname': response.body.result.lastname, 'id': response.body.result.member_id };
                resolve(user);
            });
        });
    },

    createUserWithBankDetails: (clubUrl, clubId, apiKey, club_secret, firstName, lastName, email, ownerName, accountNumber, bicCode) => {
        return new Promise((resolve, reject) => {

            const url = 'https://' + clubUrl + '.' + Cypress.env('testServer') + '.virtuagym.com/api/v1/club/' + clubId + '/member/?api_key=' + apiKey + '&club_secret=' + club_secret;

            cy.request({
                method: 'PUT',
                url: url,
                header: { 'Content-Type': 'application/json' },
                body: {
                    firstname: firstName,
                    lastname: lastName,
                    email: email,
                    ba_owner: ownerName,
                    ba_number: accountNumber,
                    ba_bic_code: bicCode
                }
            }).then((response) => {
                expect(response.status).to.eq(200);
                const user = { 'firstname': response.body.result.firstname, 'lastname': response.body.result.lastname, 'id': response.body.result.member_id };
                resolve(user);
            });
        });
    },

    activateUser: (clubUrl, clubId, apiKey, clubSecret, memberId, firstName, lastName, email) => {

        const url = 'https://' + clubUrl + '.' + Cypress.env('testServer') + '.virtuagym.com/api/v1/club/' + clubId + '/member/activate_user?api_key=' + apiKey + '&club_secret=' + clubSecret

        cy.request({
            method: 'POST',
            url: url,
            header: { 'Content-Type': 'application/json' },
            body: {
                "firstname": firstName,
                "lastname": lastName,
                "email": email,
                "password": "vgdemo",
                "member_identifier": {
                    "type": "member_id", "value": memberId
                }
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
        })
    },

    deleteUser: (clubUrl, clubId, memberId, apiKey, clubSecret) => {

        const url = 'https://' + clubUrl + '.' + Cypress.env('testServer') + '.virtuagym.com/api/v1/club/' + clubId + '/member/' + memberId + '/?api_key=' + apiKey + '&club_secret=' + clubSecret

        cy.request({
            method: 'POST',
            url: url,
            header: { 'Content-Type': 'application/json' },
            body: {
                active: false,
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
        })
    }
}
