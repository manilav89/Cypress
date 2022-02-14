//This class can be used for normal and corona checkin.

export class CheckinAPI {

    apiRequest(clubId, checkinClubSecret, checkinApiKey, qr_code)
    {
        return new Promise((resolve, reject) => {
        const url = 'http://' + Cypress.env('testServer') + '.virtuagym.com/api/v0/club/' + clubId + '/devices' + '?api_key=' + checkinApiKey + '&club_secret=' + checkinClubSecret
        
        cy.request({
            method: 'PUT',
            url: url,
            body: {
                "action": "identification",
                "card_id": qr_code,
                "version": "1.0.0.0",
                "application": "desktop1"
            }
      }).then(response => {
          expect(response.status).to.eq(200)
          resolve(response)
        })
      })
    }
}


export const checkin = new CheckinAPI()