/// <reference types="Cypress"/>
import activity from '../../fixtures/activity.json'
import { activityCalendar } from '../../support/functions/activityCalendar.js'

describe('Activity calendar', () => {

    let cluburl;
    let userCalendarUrl;
  
      before(()=>{
        cy.getURL(activity.club,'').then(url=>{
          cluburl=url;
        })
  
        cy.getURL(activity.club,activity.userCalendar).then(url=>{
            userCalendarUrl=url;
        })
      })
  
      beforeEach(() => {
  
        cy.visit(cluburl);     
        cy.loginUI(activity.coach, activity.coachpass );
        cy.visit(userCalendarUrl);
  
      })

    it('As a Coach I should be able to add activities in a client calendar', () => {

      activityCalendar.deleteActivities()
      activityCalendar.addActivity('Walking')
      cy.logout();
      cy.loginUI(activity.user, activity.userPass );
      cy.visit(userCalendarUrl);
      activityCalendar.deleteActivities()
       
    })
})